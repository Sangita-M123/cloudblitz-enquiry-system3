# CloudBlitz Enquiry Management System - Complete Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [API Documentation](#api-documentation)
7. [Frontend Features](#frontend-features)
8. [Database Schema](#database-schema)
9. [Authentication & Authorization](#authentication--authorization)
10. [User Roles & Permissions](#user-roles--permissions)
11. [Deployment Guide](#deployment-guide)
12. [Testing Guide](#testing-guide)

---

## 🎯 Overview

CloudBlitz Enquiry Management System is a full-stack web application designed to manage customer enquiries efficiently. It provides role-based access control with three user types (User, Staff, Admin) and includes features like enquiry tracking, status management, and user administration.

### Key Highlights
- **Full-Stack Application**: React frontend + Node.js backend
- **Real-time Updates**: Dynamic enquiry management
- **Role-Based Access**: Three-tier permission system
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Input Validation**: Comprehensive validation using Zod
- **Modern UI**: Responsive design with Tailwind CSS
- **RESTful API**: Well-structured API endpoints
- **MongoDB Database**: NoSQL database with Mongoose ODM

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 19 + Vite                                     │  │
│  │  - React Router DOM (Navigation)                     │  │
│  │  - Context API (State Management)                    │  │
│  │  - Axios (HTTP Client)                               │  │
│  │  - Tailwind CSS (Styling)                            │  │
│  │  - React Hook Form + Zod (Form Validation)           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Node.js + Express + TypeScript                      │  │
│  │  - JWT Authentication                                │  │
│  │  - Role-based Middleware                             │  │
│  │  - Zod Validation                                    │  │
│  │  - CORS Enabled                                      │  │
│  │  - Error Handling                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  MongoDB Atlas (Cloud Database)                      │  │
│  │  - Users Collection                                  │  │
│  │  - Enquiries Collection                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI Framework |
| Vite | 7.1.7 | Build Tool & Dev Server |
| React Router DOM | 6.30.1 | Client-side Routing |
| Axios | 1.13.2 | HTTP Client |
| Tailwind CSS | 4.1.17 | CSS Framework |
| React Hook Form | 7.66.0 | Form Management |
| Zod | 4.1.12 | Schema Validation |
| JWT Decode | 4.0.0 | Token Decoding |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 16+ | Runtime Environment |
| Express | 5.1.0 | Web Framework |
| TypeScript | 5.9.3 | Type Safety |
| MongoDB | - | Database |
| Mongoose | 8.19.3 | ODM (Object Data Modeling) |
| JWT | 9.0.2 | Authentication |
| Bcryptjs | 3.0.3 | Password Hashing |
| Zod | 4.1.12 | Validation |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| Dotenv | 17.2.3 | Environment Variables |

### Development Tools
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- ts-node-dev for development
- cross-env for environment variables

---

## ✨ Features

### 1. Authentication System
- **User Registration**: Create new accounts with name, email, and password
- **User Login**: Secure login with JWT token generation
- **Password Security**: Bcrypt hashing with salt rounds
- **Token Management**: JWT tokens with expiration
- **Protected Routes**: Frontend and backend route protection
- **Auto-login**: Token persistence in localStorage
- **User Profile**: Get current user information

### 2. Enquiry Management
- **Create Enquiries**: Users can submit enquiries with customer details
- **View Enquiries**: Role-based enquiry listing
- **Update Enquiries**: Edit enquiry details based on permissions
- **Delete Enquiries**: Soft delete functionality (admin only)
- **Status Tracking**: Three status levels (New, In Progress, Closed)
- **Assignment System**: Assign enquiries to staff members
- **Inline Editing**: Quick edit functionality in the UI
- **Real-time Updates**: Immediate reflection of changes

### 3. User Management (Admin Only)
- **View All Users**: List all registered users
- **Update Roles**: Change user roles (user/staff/admin)
- **Delete Users**: Remove users from the system
- **User Statistics**: View user counts by role

### 4. Role-Based Access Control
- **Normal Users**: 
  - View only their own enquiries
  - Create new enquiries
  - Edit name and message only
  - Cannot change status or delete
- **Staff Members**:
  - View all enquiries from all users
  - Update enquiry status
  - Delete enquiries
  - Assign enquiries
- **Administrators**:
  - Full access to all features
  - User management capabilities
  - System administration

### 5. Validation & Security
- **Input Validation**: Zod schemas on frontend and backend
- **Email Validation**: Proper email format checking
- **Phone Validation**: International phone number format
- **Length Constraints**: Min/max length for all fields
- **Error Messages**: Detailed validation error feedback
- **XSS Protection**: Input sanitization
- **Authorization Checks**: Endpoint-level permission verification

---
