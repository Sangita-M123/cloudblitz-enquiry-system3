#!/bin/bash

# CloudBlitz Build Script for Deployment
echo "🚀 Starting CloudBlitz build process..."

# Build Frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Build Backend
echo "⚙️ Building backend..."
cd backend
npm install
npm run build
cd ..

echo "✅ Build completed successfully!"
echo "📁 Frontend build: frontend/dist"
echo "📁 Backend build: backend/dist"
