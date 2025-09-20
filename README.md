# Notes App

A simple full-stack notes application built with Node.js, Express, MongoDB, and a vanilla JavaScript frontend.

## Features
- Create, read, update, and delete notes
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- Responsive frontend using HTML, CSS, and JavaScript

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd notes-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/notes-app
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000`

## Project Structure
```
notes-app/
├── middleware/
├── models/
├── node_modules/
├── public/
│   ├── css/
│   ├── js/
│   └── index.html
├── routes/
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## License
This project is licensed under the MIT License.
