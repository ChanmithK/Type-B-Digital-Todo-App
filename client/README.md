# TODO Application Client

The frontend for the Fullstack TODO Application, built with React.js.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Components](#components)
- [Styling](#styling)
- [API Integration](#api-integration)

## Features

- Modern React.js implementation with hooks
- Responsive UI design
- CRUD operations for TODO items
- Form validation
- Loading states and error handling
- Interactive UI elements (toggle switches, buttons)
- Smooth scrolling for edit functionality

## Technologies

- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces
- [Axios](https://axios-http.com/) - Promise based HTTP client
- [Create React App](https://create-react-app.dev/) - React project scaffolding
- CSS3 - Styling and animations

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the client directory with the following variable:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

This URL points to the backend API server.

## Running the Application

### Development Mode

```bash
npm start
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

The page will reload automatically when you make changes to the code.

### Running Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Project Structure

```
client/
├── public/              # Static assets
│   ├── index.html       # Main HTML template
│   └── ...              # Other static files
├── src/                 # Source code
│   ├── App.js           # Main application component
│   ├── App.css          # Main application styles
│   ├── index.js         # Entry point
│   └── ...              # Other source files
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Components

The client application is built as a single-page application with the following main features:

### Todo Form

- Add new todos with title and description
- Edit existing todos
- Form validation for required fields
- Loading states during submission

### Todo List

- Display all todos in reverse chronological order
- Toggle todo completion status
- Edit or delete todos
- Empty state when no todos exist
- Creation and update timestamps

### UI Features

- Responsive design for all screen sizes
- Visual feedback for user actions
- Confirmation dialogs for destructive actions
- Smooth scrolling to form when editing

## Styling

The application uses plain CSS for styling with a component-based approach:

- `App.css` contains all styling for the application
- CSS classes follow a BEM-like naming convention
- Responsive design with mobile-first approach
- Interactive elements with hover and focus states

## API Integration

The client communicates with the backend API using Axios with the following endpoints:

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | /todos          | Fetch all todos         |
| POST   | /todos          | Create a new todo       |
| PUT    | /todos/:id      | Update an existing todo |
| PATCH  | /todos/:id/done | Toggle todo completion  |
| DELETE | /todos/:id      | Delete a todo           |

### Error Handling

API errors are displayed to the user in the UI:

- Network errors
- Validation errors
- Server errors
- Resource not found errors

## Development

### Code Structure

The main application logic is contained in `App.js` which includes:

- State management with React hooks (useState, useEffect)
- API integration with Axios
- Form handling and validation
- Todo CRUD operations
- UI event handlers

### Adding New Features

1. Modify `App.js` to add new functionality
2. Update `App.css` for new styles if needed
3. Add new environment variables to `.env` if required

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.
