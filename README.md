# API Logs Query Service

A NestJS API service with MongoDB integration and health check endpoint.

## Prerequisites

- Node.js (v18 or later)
- MongoDB (v4.4 or later)
- Yarn package manager

## Installation

```bash
# Install dependencies
yarn install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/api-logs
PORT=3000
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## API Endpoints

### Health Check

- `GET /health`: Returns the health status of the service and its dependencies

## License

This project is MIT licensed.
