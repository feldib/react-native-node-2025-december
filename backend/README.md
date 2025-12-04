# TypeScript Node.js + PostgreSQL Backend with TypeORM

A REST API backend built with TypeScript, Node.js, Express, PostgreSQL, and TypeORM.

## Features

- **TypeScript** - Type-safe code with full IDE support
- **TypeORM** - Modern ORM with decorators and migrations
- User management (CRUD operations)
- Event management with soft delete
- User-Event relationships
- Password hashing with bcrypt
- RESTful API endpoints
- Axios integration for external API calls

## Database Schema

### Users

- id (SERIAL PRIMARY KEY)
- first_name (VARCHAR)
- last_name (VARCHAR)
- password (VARCHAR - hashed)
- date_joined (TIMESTAMP)
- age (INTEGER)
- gender (VARCHAR)
- description (TEXT)
- photos (TEXT[])

### Events

- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- start_date (TIMESTAMP)
- is_finished (BOOLEAN)
- is_deleted (BOOLEAN)
- category_id (INTEGER)

### UsersOfEvent

- id (SERIAL PRIMARY KEY)
- user_id (INTEGER - FK to Users)
- event_id (INTEGER - FK to Events)
- is_creator (BOOLEAN)
- is_approved (BOOLEAN)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure PostgreSQL

Create a PostgreSQL database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE your_database_name;

# Exit psql
\q
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
PORT=3000
```

### 4. Build TypeScript

Compile TypeScript to JavaScript:

```bash
npm run build
```

### 5. Start the Server

**Development mode** (with auto-reload and TypeScript support):

```bash
npm run dev
```

**Production mode**:

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`.

**Note:** TypeORM is configured with `synchronize: true`, which automatically creates/updates database tables based on your entities. In production, set this to `false` and use migrations instead.

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Events

- `POST /api/events` - Create a new event
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Soft delete event

### Users of Event

- `POST /api/users-of-event` - Create user-event relationship
- `GET /api/users-of-event/:id` - Get relationship by ID
- `GET /api/users-of-event/event/:eventId` - Get all users for an event
- `GET /api/users-of-event/user/:userId` - Get all events for a user
- `PUT /api/users-of-event/:id` - Update relationship
- `DELETE /api/users-of-event/:id` - Delete relationship

### Other

- `GET /health` - Health check endpoint
- `GET /api/example-axios` - Example axios request to external API

## Example Requests

### Create a User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "password": "securePassword123",
    "age": 25,
    "gender": "male",
    "description": "Hello, I am John!"
  }'
```

### Create an Event

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Meetup",
    "startDate": "2025-01-15T18:00:00Z",
    "categoryId": 1
  }'
```

### Add User to Event

```bash
curl -X POST http://localhost:3000/api/users-of-event \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "eventId": 1,
    "isCreator": true,
    "isApproved": true
  }'
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts       # TypeORM DataSource configuration
│   ├── entities/
│   │   ├── User.ts          # User entity
│   │   ├── Event.ts         # Event entity
│   │   └── UsersOfEvent.ts  # UsersOfEvent entity
│   ├── routes/
│   │   ├── users.ts         # User routes
│   │   ├── events.ts        # Event routes
│   │   └── usersOfEvent.ts  # UsersOfEvent routes
│   └── server.ts            # Main application file
├── dist/                    # Compiled JavaScript (generated)
├── .env.example            # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json           # TypeScript configuration
└── README.md
```

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **TypeORM** - Object-Relational Mapping with decorators
- **pg** - PostgreSQL driver
- **axios** - HTTP client for external API calls
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **ts-node-dev** - TypeScript development auto-reload
- **reflect-metadata** - Required for TypeORM decorators

## TypeORM Benefits

- **Entity-based** - Define database models using TypeScript classes with decorators
- **Type safety** - Full TypeScript support with intellisense
- **Auto-sync** - Automatically creates/updates database schema (development)
- **Relations** - Easy one-to-many and many-to-one relationships
- **Repository pattern** - Clean data access layer
- **Migration support** - Database version control (recommended for production)

## License

ISC
