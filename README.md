1. Create Project

npm create vite@latest Project-Management-Dashboard
cd Project-Management-Dashboard
npm install
npm run dev



2. Install Required Packages

  # Routing
npm install react-router-dom

# State management
npm install @reduxjs/toolkit react-redux

# HTTP client
npm install axios

# Forms & Validation
npm install react-hook-form yup @hookform/resolvers

# Drag & Drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Styling
npm install bootstrap

# UUID for unique IDs
npm install uuid




3. Set up JSON Server

npm install json-server --save-dev

add scripts => "server": "json-server --watch db.json --port 8000"
run json => npm run server

npm run server


Project Structure

Project-Management-Dashboard/
│
├─ src/
│  ├─ api/               # Axios API requests
│  ├─ components/        # Reusable components (Tasks, Projects, Employees)
│  ├─ features/          # Redux slices (tasks, projects, employees)
│  ├─ App.jsx            # Main app with routes
│  └─ main.jsx           # React entry point
│
├─ db.json               # JSON Server fake API
├─ package.json
└─ vite.config.js