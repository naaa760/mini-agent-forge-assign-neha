#!/bin/bash

echo "🔧 Starting Agent Runner in Development Mode..."
echo "============================================"

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

echo "📦 Installing dependencies..."

# Install backend dependencies
cd ser
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Install frontend dependencies  
cd ../cli
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

cd ..

echo "🚀 Starting services..."

# Start backend in development mode
cd ser
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend in development mode
cd cli
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Services started!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:3001"
echo ""
echo "💡 Note: You'll need PostgreSQL and Redis running locally"
echo "   Or start them with: docker-compose up postgres redis"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for background processes
wait 