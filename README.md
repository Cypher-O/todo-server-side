# About Todo API

This project is a RESTful API built with Node.js, Express, and PostgreSQL, utilizing Neon for database management. It provides functionalities for user authentication and task management, including user registration, login, and CRUD operations for tasks.

## Features

- **User Management**: Create and authenticate users, handle user registration, and log in.
- **Task Management**: Create, read, update, and delete tasks for authenticated users.
- **API Documentation**: Swagger UI for easy API exploration and testing.

## API Endpoints

### Authentication Endpoints

- **POST /auth/register**
  - Register a new user.
  - Returns a token upon successful registration.

- **POST /auth/login**
  - Log in with credentials.
  - Returns a token upon successful login.

### Task Endpoints

- **GET /tasks**
  - Fetch all tasks for the authenticated user.

- **POST /tasks**
  - Create a new task for the authenticated user.

- **GET /tasks/:id**
  - Fetch a specific task by ID.

- **PUT /tasks/:id**
  - Update a specific task by ID.

- **DELETE /tasks/:id**
  - Delete a specific task by ID.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Cypher-O/todo-server-side.git
    cd todo-server-side
    ```

## Set Up Environment Variables

- Create a `.env` file in the root directory and add the following variables:

    ```env
    NODE_ENV=your_node_environment
    PORT=your_port
    JWT_SECRET=your_jwt_secret
    DB_CONNECTION_STRING=your_database_connection_string
    ```

## Usage

- To run the application, use the following commands from the project directory:

    ```sh
    npm run build
    npm run dev
    ```

## Contributing

- Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

- This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
