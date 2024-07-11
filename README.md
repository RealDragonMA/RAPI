
# Rapi - A Blank API Template

## Overview

Welcome to Rapi, a blank API template designed to kickstart your next API project with ease. This project leverages the power and efficiency of Fastify, a fast and low-overhead web framework for Node.js. This template provides a solid foundation, integrating essential tools and packages to streamline development and ensure high performance.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Project Structure](#project-structure)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 14.x)
- pnpm, npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RealDragonMA/rapi.git
   cd rapi
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the API

To start the development server, run:
```bash
npm run dev
```

To build the project, run:
```bash
npm run build
```

To start the built project, run:
```bash
npm start
```

## Features

- **Fastify Framework**: Leveraging the power of Fastify for high performance and low overhead.
- **TypeScript**: Written in TypeScript for better type safety and development experience.
- **JWT Authentication**: Secure your API with JSON Web Tokens.
- **Mongoose**: Integration with MongoDB using Mongoose for schema-based data modeling.
- **Real-time Communication**: Socket.IO for real-time, bidirectional communication.
- **File Handling**: Multipart support for file uploads.
- **Static Files**: Serve static files with Fastify Static.
- **Schema Validation**: Fluent JSON Schema for robust request and response validation.
- **Logging**: Tslog for structured and configurable logging.

## Scripts

- `dev`: Starts the development server using `ts-node`.
- `build`: Compiles the TypeScript code into JavaScript.
- `start`: Starts the production server using the compiled code.

## Dependencies

- `@fastify/jwt`: JWT support for authentication.
- `@fastify/multipart`: Multipart support for handling file uploads.
- `@fastify/routes`: Route management.
- `@fastify/static`: Serving static files.
- `@fastify/cors`: Enable CORS support.
- `@fastify/sensible`: A collection of sensible defaults for Fastify.
- `fastify`: The core Fastify framework.
- `fastify-decorators`: Decorators for Fastify to improve code organization.
- `fastify-bcrypt`: Password hashing using bcrypt.
- `fastify-socket.io`: Socket.IO integration for real-time communication.
- `fluent-json-schema`: JSON schema builder for Fastify.
- `axios`: Promise-based HTTP client.
- `mongoose`: MongoDB object modeling tool.
- `reflect-metadata`: Metadata reflection API.
- `socket.io`: Real-time, bidirectional communication library.
- `tslog`: Structured logging library.

## Dev Dependencies

- `@types/node`: TypeScript definitions for Node.js.
- `ts-node`: TypeScript execution environment for Node.js.
- `typescript`: TypeScript language.

## Project Structure

```plaintext
rapi/
├── dist/                # Compiled output
├── node_modules/        # Node.js modules
├── src/                 # Source code
│   ├── index.ts         # Entry point
│   ├── routes/          # API routes
│   ├── controllers/     # Route handlers
│   └── models/          # Mongoose models
├── package.json         # Project configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

Developed with ❤️ by [RealDragonMA](https://github.com/RealDragonMA)
