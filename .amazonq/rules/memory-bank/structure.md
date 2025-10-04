# ConnectVerse - Project Structure

## Architecture Overview
ConnectVerse follows a monorepo architecture with three independent applications sharing a common root. The system uses a client-server architecture with separate frontend, admin panel, and backend services.

## Directory Structure

```
ConnectVerse/
├── admin/              # Next.js admin panel application
├── backend/            # Express.js REST API server
├── frontend/           # Next.js user-facing application
├── package.json        # Root monorepo orchestration
└── README.md           # Project documentation
```

## Backend Structure (`/backend`)

```
backend/
├── controllers/        # Request handlers and business logic
│   ├── authController.js      # Authentication operations
│   └── streakController.js    # User streak management
├── middleware/         # Express middleware functions
│   └── auth.js                # JWT authentication middleware
├── models/            # MongoDB/Mongoose schemas
│   ├── User.js               # User data model
│   └── Message.js            # Chat message model
├── routes/            # API endpoint definitions
│   ├── auth.js               # Authentication routes
│   ├── users.js              # User management routes
│   ├── messageRoutes.js      # Messaging endpoints
│   ├── streakRoutes.js       # Streak tracking routes
│   └── socket.js             # Socket.IO event handlers
├── utils/             # Utility functions and helpers
├── server.js          # Application entry point
└── package.json       # Backend dependencies
```

### Backend Architecture
- **MVC Pattern**: Controllers handle logic, models define data, routes map endpoints
- **Middleware Chain**: Authentication, validation, error handling
- **Real-Time Layer**: Socket.IO for bidirectional communication
- **Database**: MongoDB with Mongoose ODM

## Frontend Structure (`/frontend`)

```
frontend/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React UI components
│   │   └── navbar/    # Navigation components
│   ├── features/      # Redux Toolkit slices
│   ├── store/         # Redux store configuration
│   └── utils/         # Utility functions
│       └── api.js     # API client configuration
├── public/            # Static assets
│   ├── img/          # Images
│   └── *.svg         # Icons
└── package.json       # Frontend dependencies
```

### Frontend Architecture
- **Next.js App Router**: File-based routing with React Server Components
- **State Management**: Redux Toolkit with Redux Persist
- **Component Library**: PrimeReact for UI components
- **Styling**: TailwindCSS utility-first framework
- **Real-Time**: Socket.IO client for live updates

## Admin Structure (`/admin`)

```
admin/
├── src/
│   └── app/           # Next.js admin pages
├── public/            # Admin static assets
└── package.json       # Admin dependencies
```

### Admin Architecture
- **Next.js Framework**: Same stack as frontend for consistency
- **Separate Deployment**: Independent from user-facing app
- **Admin-Specific UI**: Management interfaces for platform oversight

## Core Components & Relationships

### Authentication Flow
1. User submits credentials → Frontend
2. Frontend sends request → Backend `/auth` routes
3. AuthController validates → User model
4. JWT token generated → Returned to frontend
5. Token stored → Redux + localStorage (persisted)
6. Subsequent requests → Include JWT in headers
7. Auth middleware validates → Grants access

### Messaging Flow
1. User sends message → Frontend
2. Socket.IO emits event → Backend socket handler
3. Message saved → Message model (MongoDB)
4. Backend broadcasts → Recipient's socket
5. Frontend receives → Updates UI in real-time
6. Message history → Fetched via REST API

### Friend Request Flow
1. User searches → Frontend queries `/users` endpoint
2. Send request → Backend creates relationship
3. Notification → Real-time via Socket.IO
4. Recipient responds → Updates relationship status
5. Friends list → Synced across both users

## Architectural Patterns

### Backend Patterns
- **RESTful API**: Standard HTTP methods for CRUD operations
- **JWT Authentication**: Stateless token-based auth
- **Middleware Pipeline**: Modular request processing
- **Schema Validation**: Mongoose schemas enforce data integrity
- **Event-Driven**: Socket.IO for real-time features

### Frontend Patterns
- **Component-Based**: Reusable React components
- **Container/Presentational**: Smart vs. dumb components
- **Redux Slices**: Feature-based state management
- **API Abstraction**: Centralized API client in utils
- **Persistent State**: Redux Persist for offline capability

### Monorepo Patterns
- **Workspace Scripts**: Root package.json orchestrates all services
- **Concurrent Execution**: Run all services simultaneously
- **Independent Deployment**: Each app deploys separately
- **Shared Configuration**: Common patterns across apps

## Data Flow

### Client → Server
Frontend/Admin → API Request → Backend Routes → Controllers → Models → Database

### Server → Client
Database → Models → Controllers → JSON Response → Frontend/Admin

### Real-Time Updates
Backend Event → Socket.IO → Connected Clients → UI Update

## Integration Points

- **Cloudinary**: Image upload and hosting
- **Nodemailer**: Email verification and password reset
- **MongoDB Atlas**: Cloud database hosting
- **Socket.IO**: WebSocket communication layer
- **JWT**: Cross-service authentication token
