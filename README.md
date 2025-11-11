# Fullstack TODO Application

A modern fullstack TODO application built with React on the frontend and Node.js/Express on the backend, using MongoDB for data persistence.

## Project Structure

```
.
├── client/                 # React frontend application
├── server/                 # Node.js/Express backend API
└── README.md              # This file
```

## Features

- Create, read, update, and delete TODO items
- Mark TODO items as complete/incomplete
- Responsive UI design
- RESTful API architecture
- MongoDB database integration
- Error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud instance)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd hiring-fullstack-todo
   ```

2. Install dependencies for both client and server:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:

   - Copy `.env.example` to `.env` in both `server` and `client` directories
   - Update the environment variables as needed

4. Run the applications:

   ```bash
   # Start the server (from server directory)
   npm run dev

   # Start the client (from client directory)
   npm start
   ```

## Architecture Overview

### Backend (server/)

- Built with Node.js and Express.js
- RESTful API for TODO management
- MongoDB database with Mongoose ODM
- CORS enabled for cross-origin requests
- Error handling middleware

### Frontend (client/)

- Built with React.js
- Axios for API communication
- Responsive CSS design
- Component-based architecture

## API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | /api/todos          | Get all todos      |
| POST   | /api/todos          | Create a new todo  |
| PUT    | /api/todos/:id      | Update a todo      |
| PATCH  | /api/todos/:id/done | Toggle todo status |
| DELETE | /api/todos/:id      | Delete a todo      |

## Development

This project follows a monorepo structure with separate client and server directories. Each has its own package.json and dependencies.

### Branching Strategy

- `main` - Production-ready code
- `development` - Feature development branch

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
