# ConnectVerse - Technology Stack

## Programming Languages

### JavaScript (ES6+)
- **Backend**: Node.js with ES Modules (`"type": "module"`)
- **Frontend**: React 19 with Next.js 15
- **Admin**: Next.js 15

## Backend Technologies

### Core Framework
- **Node.js**: JavaScript runtime environment
- **Express.js 4.18.2**: Web application framework
- **ES Modules**: Modern import/export syntax

### Database
- **MongoDB**: NoSQL document database
- **Mongoose 7.0.3**: ODM (Object Data Modeling) library
- **Schema Validation**: Built-in data validation

### Authentication & Security
- **jsonwebtoken 9.0.0**: JWT token generation and verification
- **bcryptjs 2.4.3**: Password hashing
- **CORS 2.8.5**: Cross-Origin Resource Sharing

### Real-Time Communication
- **Socket.IO 4.8.1**: WebSocket library for bidirectional communication
- **Event-Based**: Real-time messaging and notifications

### File Upload & Storage
- **Multer 1.4.5-lts.2**: Multipart/form-data handling
- **Cloudinary 1.41.3**: Cloud-based image hosting
- **multer-storage-cloudinary 4.0.0**: Cloudinary integration

### Email Services
- **Nodemailer 7.0.3**: Email sending (Gmail SMTP)
- **Email Verification**: User registration confirmation
- **Password Reset**: Secure password recovery

### Development Tools
- **Nodemon 2.0.22**: Auto-restart on file changes
- **dotenv 16.4.7**: Environment variable management

## Frontend Technologies

### Core Framework
- **Next.js 15.2.4**: React framework with App Router
- **React 19.0.0**: UI library
- **React DOM 19.0.0**: React rendering

### State Management
- **Redux Toolkit 2.8.2**: State management with simplified API
- **React Redux 9.2.0**: React bindings for Redux
- **Redux Persist 6.0.0**: Persist and rehydrate state

### HTTP Client
- **Axios 1.8.4**: Promise-based HTTP client
- **API Abstraction**: Centralized API configuration

### UI Components & Styling
- **TailwindCSS 4**: Utility-first CSS framework
- **PrimeReact 10.9.5**: Rich UI component library
- **PrimeIcons 7.0.0**: Icon library
- **Lucide React 0.488.0**: Additional icon set
- **React Icons 5.5.0**: Popular icon library

### Real-Time & Notifications
- **Socket.IO Client 4.8.1**: WebSocket client
- **React Hot Toast 2.5.2**: Toast notifications

### Additional Libraries
- **React Calendar 6.0.0**: Calendar component
- **React Confirm Alert 3.0.6**: Confirmation dialogs
- **React Spinners 0.17.0**: Loading indicators

### Build Tools
- **Turbopack**: Next.js bundler (dev mode)
- **PostCSS**: CSS processing
- **@tailwindcss/postcss 4**: TailwindCSS integration

## Admin Panel Technologies

### Framework
- **Next.js 15**: Same stack as frontend
- **React 19**: UI library
- **TailwindCSS 4**: Styling framework

## Monorepo Management

### Root Dependencies
- **Concurrently 8.2.2**: Run multiple commands simultaneously
- **NPM Workspaces**: Manage multiple packages

## Development Commands

### Root Level (Monorepo)
```bash
npm start                 # Run all services (frontend, backend, admin)
npm run frontend:start    # Run frontend only (port 3300)
npm run backend:start     # Run backend only (port 5500)
npm run admin:start       # Run admin panel only
npm run bootstrap         # Install all dependencies
```

### Backend
```bash
npm start                 # Production mode (node server.js)
npm run dev              # Development mode (nodemon)
```

### Frontend
```bash
npm run dev              # Development mode with Turbopack (port 3300)
npm run build            # Production build
npm start                # Production server
npm run lint             # ESLint code checking
```

### Admin
```bash
npm run dev              # Development mode
npm run build            # Production build
npm start                # Production server
npm run lint             # ESLint code checking
```

## Environment Configuration

### Backend (.env)
```
PORT=5500
MONGODB_URI=<connection_string>
JWT_SECRET=<secret_key>
EMAIL_USER=<gmail_address>
EMAIL_PASS=<gmail_app_password>
FRONTEND_URL=http://localhost:3300
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

### Frontend & Admin (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5500
NEXT_PUBLIC_BASE_URL=http://localhost:5500
```

## Deployment Stack

### Frontend & Admin
- **Platform**: Vercel
- **Framework**: Next.js (optimized for Vercel)
- **CDN**: Automatic edge network distribution

### Backend
- **Platform**: Render or AWS EC2
- **Database**: MongoDB Atlas (cloud)
- **Environment**: Node.js runtime

### Image Storage
- **Cloudinary**: Cloud-based CDN for images

## Version Requirements

- **Node.js**: 18.x or higher (for Next.js 15)
- **NPM**: 9.x or higher
- **MongoDB**: 5.x or higher

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
