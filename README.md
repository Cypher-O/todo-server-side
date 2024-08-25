# About chat API

This project is a RESTful API built with Node.js, Express, and PostgreSQL, utilizing Neon for database management. It provides functionalities for user management and messaging, including user registration, login, OTP generation & verification, and conversation handling.

## Features

- **User Management**: Create and authenticate users, handle user registration, and log in.
- **OTP Handling**: Generate and verify OTPs for user verification.
- **Messaging**: Send and receive messages using WebSocket for real-time communication.
- **Conversation History**: Fetch and manage conversation history between users.

## API Endpoints

### User Endpoints

- **POST /register**
  - Register a new user with `username`, `email`, `password`, `firstName`, `lastName`, and `phoneNumber`.
  - Returns a token upon successful registration.

- **POST /login**
  - Log in with `username` and `password`.
  - Returns a token upon successful login.

- **GET /me**
  - Retrieve the current user's data based on the provided token.

### OTP Endpoints

- **POST /send-otp**
  - Send an OTP to a phone number.
  - Requires `phoneNumber` in the request body.

- **POST /verify-otp**
  - Verify the OTP sent to a phone number.
  - Requires `phoneNumber` and `otp` in the request body.

### Messaging Endpoints

- **GET /conversations/:userId**
  - Fetch conversation history between the current user and the specified `userId`.

- **GET /recent-conversations**
  - Fetch recent conversations for the current user.

- **POST /messages**
  - Create and send a new message.
  - Requires `recipientId` and `content` in the request body.

## WebSocket

- **WebSocket Endpoint**: `ws://localhost:3000/ws?token=YOUR_JWT_TOKEN`
  - Send and receive messages in real-time.
  - Messages should be sent as JSON objects with `recipientId` and `content`.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Cypher-O/chat-api.git
    cd chat-api
    ```

## Set Up Environment Variables

- Create a `.env` file in the root directory and add the following variables:

    ```env
    NODE_ENV=your_node_environment
    PORT=your_port
    JWT_SECRET=your_jwt_secret
    DB_CONNECTION_STRING=your_database_connection_string
    TWILIO_PHONE_NUMBER=your_registered_twilio_from_number
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
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
