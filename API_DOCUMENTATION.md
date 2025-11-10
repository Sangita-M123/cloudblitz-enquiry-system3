# CloudBlitz API Documentation

Base URL: `http://localhost:5000/api`

## Table of Contents
1. [Authentication](#authentication)
2. [Enquiries](#enquiries)
3. [Admin](#admin)
4. [Error Responses](#error-responses)

---

## Authentication

### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `name`: Min 2 characters, max 50 characters
- `email`: Valid email format
- `password`: Min 6 characters

**Success Response (201):**
```json
{
  "ok": true,
  "msg": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**
```json
{
  "ok": false,
  "msg": "User with this email already exists"
}
```

---

### Login User
Authenticate and receive JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Valid email format
- `password`: Required

**Success Response (200):**
```json
{
  "ok": true,
  "msg": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: Invalid credentials
- `403`: Account deactivated

---

### Get Current User
Retrieve authenticated user's profile.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "ok": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (401):**
```json
{
  "ok": false,
  "msg": "Not authenticated"
}
```

---

## Enquiries

### Create Enquiry
Create a new enquiry (authenticated users).

**Endpoint:** `POST /enquiries`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "customerName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "message": "I need help with my account setup and configuration."
}
```

**Validation Rules:**
- `customerName`: Min 2 characters, max 100 characters (required)
- `email`: Valid email format (optional)
- `phone`: Numbers, +, -, spaces, () only, max 20 characters (optional)
- `message`: Min 10 characters, max 1000 characters (required)

**Success Response (201):**
```json
{
  "ok": true,
  "msg": "Enquiry created successfully",
  "enquiry": {
    "_id": "507f1f77bcf86cd799439012",
    "customerName": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "message": "I need help with my account setup and configuration.",
    "status": "New",
    "createdBy": "507f1f77bcf86cd799439011",
    "createdAt": "2024-11-10T10:30:00.000Z",
    "updatedAt": "2024-11-10T10:30:00.000Z"
  }
}
```

---

### Get All Enquiries
Retrieve enquiries based on user role.

**Endpoint:** `GET /enquiries`

**Headers:**
```
Authorization: Bearer <token>
```

**Role-Based Filtering:**
- **Normal Users**: See only their own enquiries
- **Staff**: See all enquiries
- **Admin**: See all enquiries

**Success Response (200):**
```json
{
  "ok": true,
  "enquiries": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "customerName": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1234567890",
      "message": "I need help with my account setup.",
      "status": "New",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "assignedTo": null,
      "createdAt": "2024-11-10T10:30:00.000Z",
      "updatedAt": "2024-11-10T10:30:00.000Z"
    }
  ]
}
```

---

### Get Single Enquiry
Retrieve a specific enquiry by ID.

**Endpoint:** `GET /enquiries/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Authorization:**
- **Normal Users**: Can only view their own enquiries
- **Staff/Admin**: Can view any enquiry

**Success Response (200):**
```json
{
  "ok": true,
  "enquiry": {
    "_id": "507f1f77bcf86cd799439012",
    "customerName": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "message": "I need help with my account setup.",
    "status": "In Progress",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Staff Member",
      "email": "staff@example.com"
    },
    "createdAt": "2024-11-10T10:30:00.000Z",
    "updatedAt": "2024-11-10T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `403`: Access denied (not your enquiry)
- `404`: Enquiry not found

---

### Update Enquiry
Update an existing enquiry (role-based permissions).

**Endpoint:** `PUT /enquiries/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (Normal User):**
```json
{
  "customerName": "Jane Smith Updated",
  "message": "Updated message with more details about my issue."
}
```

**Request Body (Staff/Admin):**
```json
{
  "customerName": "Jane Smith Updated",
  "message": "Updated message",
  "status": "In Progress",
  "assignedTo": "507f1f77bcf86cd799439013"
}
```

**Permissions:**
- **Normal Users**: Can update only `customerName` and `message` of their own enquiries
- **Staff/Admin**: Can update all fields including `status` and `assignedTo`

**Validation Rules:**
- `customerName`: Min 2 characters, max 100 characters (optional)
- `message`: Min 10 characters, max 1000 characters (optional)
- `status`: Must be "New", "In Progress", or "Closed" (optional)
- `assignedTo`: Valid user ID or null (optional)

**Success Response (200):**
```json
{
  "ok": true,
  "msg": "Enquiry updated successfully",
  "enquiry": {
    "_id": "507f1f77bcf86cd799439012",
    "customerName": "Jane Smith Updated",
    "message": "Updated message with more details.",
    "status": "In Progress",
    "createdBy": {...},
    "assignedTo": {...},
    "updatedAt": "2024-11-10T11:30:00.000Z"
  }
}
```

**Error Responses:**
- `403`: Access denied or trying to update restricted fields
- `404`: Enquiry not found

---

### Delete Enquiry
Soft delete an enquiry (admin only).

**Endpoint:** `DELETE /enquiries/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Authorization:** Admin only

**Success Response (200):**
```json
{
  "ok": true,
  "msg": "Enquiry deleted",
  "enquiry": {
    "_id": "507f1f77bcf86cd799439012",
    "deletedAt": "2024-11-10T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `403`: Only admins can delete
- `404`: Enquiry not found

---

## Admin

### Get All Users
Retrieve all users (admin only).

**Endpoint:** `GET /admin/users`

**Headers:**
```
Authorization: Bearer <token>
```

**Authorization:** Admin only

**Success Response (200):**
```json
{
  "ok": true,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-11-10T09:00:00.000Z",
      "updatedAt": "2024-11-10T09:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Staff Member",
      "email": "staff@example.com",
      "role": "staff",
      "createdAt": "2024-11-10T09:15:00.000Z",
      "updatedAt": "2024-11-10T09:15:00.000Z"
    }
  ]
}
```

---

### Update User Role
Change a user's role (admin only).

**Endpoint:** `PUT /admin/users/:id/role`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "role": "staff"
}
```

**Validation Rules:**
- `role`: Must be "user", "staff", or "admin"

**Success Response (200):**
```json
{
  "ok": true,
  "msg": "Role updated",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff",
    "updatedAt": "2024-11-10T12:30:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid role
- `403`: Admins only
- `404`: User not found

---

### Delete User
Permanently delete a user (admin only).

**Endpoint:** `DELETE /admin/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Authorization:** Admin only

**Success Response (200):**
```json
{
  "ok": true,
  "msg": "User deleted"
}
```

**Error Responses:**
- `403`: Admins only
- `404`: User not found

---

## Error Responses

### Validation Error (400)
```json
{
  "ok": false,
  "msg": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "ok": false,
  "msg": "No token provided"
}
```

or

```json
{
  "ok": false,
  "msg": "Invalid or expired token"
}
```

### Forbidden (403)
```json
{
  "ok": false,
  "msg": "Access denied"
}
```

### Not Found (404)
```json
{
  "ok": false,
  "msg": "Resource not found"
}
```

### Server Error (500)
```json
{
  "ok": false,
  "msg": "Internal server error message"
}
```

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The token is returned upon successful login or registration and should be stored securely on the client side.

---

## Rate Limiting

Currently, there are no rate limits implemented. Consider adding rate limiting in production.

---

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

---

## Status Codes Summary

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error
