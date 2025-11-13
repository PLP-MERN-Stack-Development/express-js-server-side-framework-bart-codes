# Express.js RESTful API Assignment

# Product API

A fully functional RESTful Express.js API for managing products. Features include CRUD operations, filtering, pagination, search, statistics, logging, authentication, validation, and comprehensive error handling.

## Installation

1. Clone or create the project directory.
2. Run `npm init -y` to initialize the project.
3. Install dependencies: `npm install express joi dotenv`.
4. Copy `.env.example` to `.env` and fill in the values (e.g., set `API_KEY`).

## Running the Server

- Start the server: `npm start` or `node server.js`.
- The server listens on port 3000 (or `PORT` from `.env`).
- Test the root endpoint: `curl http://localhost:3000/` (returns `{"message":"Hello World"}`).

## API Documentation

All `/api/*` endpoints require authentication via the `Authorization: Bearer <your_api_key>` header or `X-API-Key: <your_api_key>` header. Unauthorized requests return 401.

### Endpoints

| Method | Endpoint | Description | Query Params / Body |
|--------|----------|-------------|---------------------|
| GET | `/` | Hello World message | None |
| GET | `/api/products` | List all products (with optional filtering by category and pagination) | `?category=<cat>&page=<n>&limit=<n>` (default page=1, limit=10) |
| GET | `/api/products/:id` | Get a specific product by ID | None |
| POST | `/api/products` | Create a new product | JSON body: `{ "name": "string", "description": "string", "price": number, "category": "string", "inStock": boolean }` |
| PUT | `/api/products/:id` | Update an existing product by ID | JSON body: Partial or full product object |
| DELETE | `/api/products/:id` | Delete a product by ID | None |
| GET | `/api/products/search` | Search products by name (partial match) | `?q=<search_term>` |
| GET | `/api/products/stats` | Get statistics (count of products by category) | None |

### Error Handling
- 400: Validation errors (e.g., invalid request body).
- 401: Unauthorized (invalid/missing API key).
- 404: Not Found (e.g., product ID doesn't exist).
- 500: Internal Server Error.
- Responses include `{ "error": { "message": "..." } }` (stack trace in development).


## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 