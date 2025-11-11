# TODO Application Server

The backend API for the Fullstack TODO Application, built with Node.js, Express.js, and MongoDB.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)

## Features

- RESTful API design
- MongoDB integration with Mongoose ODM
- CRUD operations for TODO items
- Input validation and error handling
- CORS support
- Security headers with Helmet
- Rate limiting
- Health check endpoint

## Technologies

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [Cors](https://www.npmjs.com/package/cors) - Cross-Origin Resource Sharing middleware
- [Dotenv](https://www.npmjs.com/package/dotenv) - Environment variable loader
- [Helmet](https://helmetjs.github.io/) - Security headers middleware
- [Express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - Rate limiting middleware

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud instance)

## Installation

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
NODE_ENV=development
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

A `.env.example` file is provided as a template.

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server with nodemon for automatic restarts on file changes.

### Production Mode

```bash
npm start
```

This will start the server in production mode.

## API Endpoints

### Health Check

- `GET /api/health` - Server health status

### TODO Operations

All TODO endpoints are prefixed with `/api/todos`:

| Method | Endpoint  | Description             |
| ------ | --------- | ----------------------- |
| GET    | /         | Get all todos           |
| POST   | /         | Create a new todo       |
| PUT    | /:id      | Update a todo           |
| PATCH  | /:id/done | Toggle todo done status |
| DELETE | /:id      | Delete a todo           |

### Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Description of the operation",
  "data": {}
}
```

In case of errors:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Project Structure

```
server/
├── config/              # Database configuration
├── controllers/         # Request handlers
├── middleware/          # Custom middleware
├── models/              # Database models
├── routes/              # API route definitions
├── .env                 # Environment variables
├── .env.example         # Environment variable template
├── server.js            # Application entry point
└── README.md            # This file
```

## Database Schema

### Todo Model

| Field       | Type    | Required | Description             |
| ----------- | ------- | -------- | ----------------------- |
| title       | String  | Yes      | Title of the todo       |
| description | String  | No       | Description of the todo |
| done        | Boolean | No       | Completion status       |
| createdAt   | Date    | Auto     | Creation timestamp      |
| updatedAt   | Date    | Auto     | Last update timestamp   |

## Error Handling

The application includes comprehensive error handling:

- Validation errors for required fields
- MongoDB cast errors for invalid IDs
- Server errors with appropriate HTTP status codes
- Custom error messages for better debugging

All errors are caught and returned in a consistent format to the client.

## Development

### Code Structure

- Controllers handle business logic
- Models define data structure and validation
- Routes define API endpoints
- Middleware handles cross-cutting concerns

### Extending the API

1. Add new routes in `routes/`
2. Implement controller functions in `controllers/`
3. Define data models in `models/` if needed
4. Register new routes in `server.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.
