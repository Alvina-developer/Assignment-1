# Task Manager API Assignment

## Project Description

This project is developed using Node.js and Express.js. It covers Node.js basics, HTTP server, Express.js and REST API operations.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Postman

## Project Structure

```text
Assignment 1/
│
├── task_1/
│   └── index.js
│
├── task_2/
│   └── server.js
│
├── task_3/
│   └── server.js
│
├── postman/
├── .postman/
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Part A - Node.js CLI Tool

A command-line tool that accepts a task title and displays it.

Run:

```bash
node task_1/index.js "Complete Task Manager API"
```

## Part B - Core HTTP Server

A Node.js HTTP server with manually handled routes and in-memory data.

Run:

```bash
node task_2/server.js
```

## Part C - Express.js Task Manager API

An Express.js REST API that supports CRUD operations using an in-memory tasks array.

Run:

```bash
node task_3/server.js
```

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/tasks` | Get all tasks |
| GET | `/api/v1/tasks/:id` | Get single task |
| POST | `/api/v1/tasks` | Create a task |
| PUT | `/api/v1/tasks/:id` | Update a task |
| DELETE | `/api/v1/tasks/:id` | Delete a task |

### HTTP Status Codes

- 200 - Successful request
- 201 - Resource created
- 400 - Invalid request data
- 404 - Resource or route not found

## API Testing

API endpoints are tested using Postman.

## Data Storage

Task data is stored in an in-memory JavaScript array. No database is used.

## Installation

Install project dependencies:

```bash
npm install
```

## Author

Node.js and Express.js Assignment