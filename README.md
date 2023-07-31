# PicMapHub

PicMapHub is a social media web app that allows users to share photos of places they have visited. Users can signup/login, create posts about places they've been, add photos, mark locations on a map, and view posts from other users.

## Features

- User authentication and authorization using JWT 
- Create, edit, and delete your own posts 
- Add title, description, location, and photos for each post
- Posts are marked on an interactive OpenStreetMap 
- View posts from all users on the home page
- Responsive design

## Built With

- MongoDB - Database
- Express - Backend framework
- React - Frontend framework
- Node.js - Runtime environment
- CSS - Styling

## Backend

The backend is built with Node.js and Express. It connects to a MongoDB database to store user accounts and posts. It handles user authentication with JWT tokens and stores images locally. 

## Frontend

The frontend is built with React and fetches data from the backend API. Components are split for better code organization. React router manages navigation between pages.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repo
```
git clone https://github.com/ASCA1ON/picmaphub.git
```

2. Install dependencies
```
cd backend
npm install
cd ../frontend
npm install
```

3. Create a .env file in backend and add your MongoDB URI and JWT secret
```
MONGODB_URI= .....
JWT_secret=...
```

4. Start backend
```
cd backend
npm start
```

5. Start frontend
```
cd frontend 
npm start
```

## License

This project is licensed under the Apache License. See [LICENSE](LICENSE) for more details.