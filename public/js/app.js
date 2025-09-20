// DOM Elements
const noteForm = document.getElementById('noteForm');
const notesList = document.getElementById('notesList');
const categoryFilter = document.getElementById('categoryFilter');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeModal = document.getElementById('closeModal');

// API endpoints
const API_URL = '/api/notes';

// Note template
const noteTemplate = document.getElementById('noteTemplate');

// Event Listeners
noteForm.addEventListener('submit', handleAddNote);
editForm.addEventListener('submit', handleEditNote);
categoryFilter.addEventListener('change', filterNotes);
closeModal.addEventListener('click', () => editModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        editModal.style.display = 'none';
    }
});

// Load notes when page loads
document.addEventListener('DOMContentLoaded', loadNotes);

// Functions
async function loadNotes() {
    try {
        const response = await fetch(API_URL);
        const notes = await response.json();
        displayNotes(notes);
    } catch (error) {
        console.error('Error loading notes:', error);
        alert('Failed to load notes');
    }
}

function displayNotes(notes) {
    notesList.innerHTML = '';
    const selectedCategory = categoryFilter.value;

    notes.forEach(note => {
        if (selectedCategory === 'all' || note.category === selectedCategory) {
            const noteElement = createNoteElement(note);
            notesList.appendChild(noteElement);
        }
    });
}

function createNoteElement(note) {
    const noteClone = noteTemplate.content.cloneNode(true);
    const noteElement = noteClone.querySelector('.note');
    
    noteElement.dataset.id = note._id;
    noteElement.querySelector('.note-title').textContent = note.title;
    noteElement.querySelector('.note-content').textContent = note.content;
    noteElement.querySelector('.note-category').textContent = note.category;

    // Add event listeners for edit and delete buttons
    noteElement.querySelector('.btn-edit').addEventListener('click', () => openEditModal(note));
    noteElement.querySelector('.btn-delete').addEventListener('click', () => deleteNote(note._id));

    return noteElement;
}

async function handleAddNote(e) {
    e.preventDefault();

    const noteData = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        category: document.getElementById('category').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        });

        if (!response.ok) throw new Error('Failed to create note');

        const newNote = await response.json();
        const noteElement = createNoteElement(newNote);
        notesList.insertBefore(noteElement, notesList.firstChild);

        // Reset form
        noteForm.reset();
    } catch (error) {
        console.error('Error adding note:', error);
        alert('Failed to add note');
    }
}

function openEditModal(note) {
    document.getElementById('editId').value = note._id;
    document.getElementById('editTitle').value = note.title;
    document.getElementById('editContent').value = note.content;
    document.getElementById('editCategory').value = note.category;
    editModal.style.display = 'block';
}

async function handleEditNote(e) {
    e.preventDefault();

    const noteId = document.getElementById('editId').value;
    const noteData = {
        title: document.getElementById('editTitle').value,
        content: document.getElementById('editContent').value,
        category: document.getElementById('editCategory').value
    };

    try {
        const response = await fetch(`${API_URL}/${noteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        });

        if (!response.ok) throw new Error('Failed to update note');

        const updatedNote = await response.json();
        const noteElement = document.querySelector(`.note[data-id="${noteId}"]`);
        const newNoteElement = createNoteElement(updatedNote);
        noteElement.replaceWith(newNoteElement);

        // Close modal
        editModal.style.display = 'none';
    } catch (error) {
        console.error('Error updating note:', error);
        alert('Failed to update note');
    }
}

async function deleteNote(noteId) {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
        const response = await fetch(`${API_URL}/${noteId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete note');

        const noteElement = document.querySelector(`.note[data-id="${noteId}"]`);
        noteElement.remove();
    } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note');
    }
}

function filterNotes() {
    loadNotes();
}