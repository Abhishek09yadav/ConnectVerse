# ConnectVerse - Development Guidelines

## Code Quality Standards

### File Organization
- **ES Modules**: Use `import/export` syntax throughout the codebase (backend has `"type": "module"`)
- **Single Responsibility**: Each file handles one primary concern (controllers, models, routes, components)
- **Consistent Naming**: Use camelCase for functions/variables, PascalCase for components/models
- **File Extensions**: `.js` for backend, `.jsx` for React components with JSX

### Code Formatting
- **Indentation**: 2 spaces (consistent across all files)
- **Semicolons**: Used consistently in backend, optional in frontend
- **String Quotes**: Double quotes for strings in backend, mixed in frontend
- **Line Length**: Keep lines readable, break long chains appropriately
- **Whitespace**: Blank lines separate logical sections within functions

### Structural Conventions
- **Async/Await**: Preferred over promises for asynchronous operations (5/5 files)
- **Try-Catch Blocks**: Wrap all async operations in try-catch for error handling (5/5 files)
- **Arrow Functions**: Use for inline functions and exports (4/5 files)
- **Destructuring**: Extract properties from objects in function parameters (5/5 files)
- **Template Literals**: Use backticks for string interpolation (5/5 files)

### Documentation Standards
- **Inline Comments**: Explain complex logic and business rules
- **Section Comments**: Use `//` to label major sections (e.g., "// Register new user")
- **Console Logging**: Include descriptive console.log/error for debugging
- **Error Messages**: Provide clear, user-friendly error messages in responses

## Backend Development Patterns

### Controller Pattern (authController.js, users.js)
```javascript
// Standard controller function structure
export const functionName = async (req, res) => {
  try {
    // 1. Extract data from request
    const { field1, field2 } = req.body;
    
    // 2. Validate input
    if (!field1) {
      return res.status(400).json({ message: "Field is required" });
    }
    
    // 3. Perform business logic
    const result = await Model.findOne({ field1 });
    
    // 4. Return response
    res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    console.error("Error description:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
```

### Error Handling Pattern
- **Consistent Structure**: All async functions use try-catch blocks
- **Status Codes**: 
  - 200/201: Success
  - 400: Bad request/validation error
  - 401: Unauthorized
  - 404: Not found
  - 500: Server error
- **Error Response Format**: `{ message: "Description", error: error.message }`
- **Console Logging**: Always log errors with descriptive context

### Authentication Pattern
```javascript
// JWT token generation
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET || "your-secret-key",
  { expiresIn: "24h" }
);

// Token verification
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Authorization header format
Authorization: `Bearer ${token}`
```

### Database Query Patterns
```javascript
// Find with conditions
const user = await User.findOne({ email });

// Find with exclusions
const user = await User.findById(id).select("-password");

// Find with population
const user = await User.findById(id).populate("friends", "name email");

// Update subdocuments
user.fieldName = newValue;
await user.save();

// Query operators
{ field: { $gt: Date.now() } }  // Greater than
{ field: { $ne: value } }        // Not equal
```

### Mongoose Model Patterns (User.js)
```javascript
// Schema definition with validation
const schema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,  // For emails
    unique: true,     // For unique fields
  },
  arrayField: [{
    type: String,
    required: true,
  }],
  referenceField: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ModelName",
  }],
}, { timestamps: true });

// Pre-save middleware
schema.pre("save", async function (next) {
  if (!this.isModified("field")) return next();
  // Perform operation
  next();
});

// Instance methods
schema.methods.methodName = async function (param) {
  return await operation(this.field, param);
};
```

### File Upload Pattern (users.js)
```javascript
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "app-name/subfolder",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage: storage });

// Route with file upload
router.put("/route", auth, upload.single("fieldName"), async (req, res) => {
  if (req.file) {
    model.imageField = req.file.path;
  }
});
```

### Email Pattern (authController.js)
```javascript
// Transporter configuration (global)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

// Email sending
const mailOptions = {
  from: `"App Name" <${process.env.EMAIL_USER}>`,
  to: user.email,
  subject: "Subject Line",
  html: `<h2>Title</h2><p>Content</p>`,
};

await transporter.sendMail(mailOptions);
```

### Token Generation Pattern
```javascript
// Crypto tokens for verification/reset
const token = crypto.randomBytes(32).toString("hex");
const tokenExpiry = Date.now() + 3600000; // 1 hour

user.tokenField = token;
user.tokenExpiryField = tokenExpiry;
await user.save();
```

### Route Definition Pattern
```javascript
// Import dependencies at top
import express from "express";
import Model from "../models/Model.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Define routes with middleware
router.get("/path", auth, async (req, res) => { /* handler */ });
router.post("/path/:param", auth, async (req, res) => { /* handler */ });

// Export router
export default router;
```

## Frontend Development Patterns

### Component Structure (Navbar.jsx)
```javascript
"use client";  // Next.js client component directive

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const ComponentName = () => {
  // 1. Hooks
  const router = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialValue);
  
  // 2. Helper functions
  const handleAction = () => {
    // Logic
  };
  
  // 3. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### State Management Pattern
```javascript
// Local state for UI
const [open, setOpen] = useState(false);
const [loading, setLoading] = useState(false);

// Redux for global state
const dispatch = useDispatch();
const data = useSelector((state) => state.slice.field);

// Dispatch actions
dispatch(actionName(payload));
```

### API Call Pattern (api.js)
```javascript
// Centralized API functions
export const functionName = async (params) => {
  const response = await axiosInstance.method("/endpoint", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// With query parameters
export const getWithParams = async (param) => {
  const response = await axiosInstance.get("/endpoint", {
    params: { param },
  });
  return response.data;
};

// With authentication
export const authenticatedCall = async () => {
  const token = localStorage.getItem("app-token");
  const response = await axiosInstance.get("/endpoint", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Error handling in components
try {
  const data = await apiFunction();
  // Handle success
} catch (error) {
  console.error("Error description:", error);
  // Handle error
}
```

### Navigation Pattern
```javascript
// Next.js navigation
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/path");  // Navigate to route
```

### Styling Pattern (TailwindCSS)
```javascript
// Conditional classes
className={`base-classes ${condition ? "true-classes" : "false-classes"}`}

// Gradient backgrounds
className="bg-gradient-to-r from-blue-500 to-purple-500"

// Responsive design
className="hidden md:flex"  // Hidden on mobile, flex on desktop

// Hover effects
className="hover:scale-105 transition-all duration-300"

// Backdrop blur
className="backdrop-blur-xl bg-white/80"
```

### Event Handling Pattern
```javascript
// Inline handlers for simple actions
onClick={() => setState(newValue)}

// Named handlers for complex logic
const handleClick = () => {
  // Multiple operations
  operation1();
  operation2();
};

// Prevent default
const handleSubmit = (e) => {
  e.preventDefault();
  // Form logic
};
```

### Conditional Rendering Pattern
```javascript
// Ternary for simple conditions
{condition ? <ComponentA /> : <ComponentB />}

// Logical AND for optional rendering
{condition && <Component />}

// Map for lists
{items.map((item, index) => (
  <Component key={index} {...item} />
))}
```

### LocalStorage Pattern
```javascript
// Store token
localStorage.setItem("app-token", token);

// Retrieve token
const token = localStorage.getItem("app-token");

// Remove token
localStorage.removeItem("app-token");
```

## Common Practices

### Environment Variables
- **Backend**: Access via `process.env.VARIABLE_NAME`
- **Frontend**: Prefix with `NEXT_PUBLIC_` for client-side access
- **Configuration**: Load with `dotenv.config()` in backend
- **Fallbacks**: Provide defaults for critical values

### Security Practices
- **Password Hashing**: Use bcrypt with salt rounds (10)
- **JWT Tokens**: 24-hour expiration
- **Token Storage**: localStorage for frontend, never expose in code
- **Password Exclusion**: Always exclude password from responses with `.select("-password")`
- **Input Validation**: Check required fields before processing
- **Token Verification**: Validate tokens in middleware before protected routes

### Data Validation
- **Required Fields**: Check existence before processing
- **Type Checking**: Validate data types (e.g., `typeof hobbies === 'string'`)
- **Existence Checks**: Verify records exist before operations
- **Duplicate Prevention**: Check for existing records before creation
- **Status Validation**: Verify request status before processing

### Response Patterns
```javascript
// Success response
res.status(200).json({ 
  message: "Success message",
  data: resultData 
});

// Error response
res.status(400).json({ 
  message: "Error description",
  error: error.message 
});

// Created response
res.status(201).json({ 
  message: "Created successfully",
  item: newItem 
});
```

### Logging Practices
- **Success Logs**: Log important operations (email sent, user created)
- **Error Logs**: Always log errors with context
- **Debug Logs**: Include data for debugging (e.g., `console.log("data", data)`)
- **Format**: Use descriptive messages: `console.error("Error in operation:", error)`

## Code Idioms

### Frequently Used Patterns

**Early Return Pattern**
```javascript
if (!condition) {
  return res.status(400).json({ message: "Error" });
}
// Continue with main logic
```

**Chained Queries**
```javascript
const user = await User.findById(id)
  .select("-password")
  .populate("friends", "name email");
```

**Conditional Assignment**
```javascript
user.field = newValue || user.field;  // Update only if new value exists
```

**Array Methods**
```javascript
// Filter
const filtered = array.filter(item => condition);

// Find
const found = array.find(item => item.id === targetId);

// Some (check if any match)
const hasMatch = array.some(item => condition);

// Map
const transformed = array.map(item => ({ ...item, newField: value }));
```

**Object Destructuring in Parameters**
```javascript
const handler = async (req, res) => {
  const { field1, field2 } = req.body;
  const { param } = req.params;
};
```

**Spread Operator**
```javascript
// Object spreading
const updated = { ...original, field: newValue };

// Array spreading
const combined = [...array1, ...array2];
```

**Optional Chaining**
```javascript
const value = object?.property?.nestedProperty;
error.response?.data || error.message;
```

**Nullish Coalescing**
```javascript
const value = input ?? defaultValue;
```

## Testing & Debugging

### Console Logging Strategy
- Log function entry points for debugging
- Log data received from API calls
- Log errors with descriptive context
- Include variable names in logs: `console.log("variable name:", variable)`

### Error Handling Strategy
- Wrap all async operations in try-catch
- Provide user-friendly error messages
- Log technical details to console
- Return appropriate HTTP status codes
- Include error.message in responses for debugging

## Performance Considerations

### Database Queries
- Use `.select()` to exclude unnecessary fields (especially passwords)
- Use `.populate()` to fetch related data in single query
- Filter at database level rather than in application code
- Use indexes on frequently queried fields (email, _id)

### Frontend Optimization
- Use `useEffect` with proper dependencies to prevent unnecessary re-renders
- Implement loading states for async operations
- Use conditional rendering to minimize DOM updates
- Lazy load components when appropriate

## Naming Conventions

### Variables & Functions
- **camelCase**: `getUserProfile`, `friendRequests`, `isVerified`
- **Descriptive**: Names clearly indicate purpose
- **Boolean Prefix**: `is`, `has`, `should` for boolean variables

### Components
- **PascalCase**: `Navbar`, `NotificationDot`
- **Descriptive**: Component name indicates its purpose

### Files
- **camelCase**: `authController.js`, `messageRoutes.js`
- **Descriptive**: File name matches primary export

### Constants
- **UPPER_SNAKE_CASE**: `NEWS_API_KEY` (for true constants)
- **camelCase**: For configuration objects

### Database Fields
- **camelCase**: `profileImage`, `friendRequests`, `resetPasswordToken`
- **Descriptive**: Field name indicates stored data type/purpose
