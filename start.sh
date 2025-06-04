#!/bin/bash

echo "🤖 Starting Agent Runner Application..."
echo "=================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env file exists in backend
if [ ! -f "ser/.env" ]; then
    echo "📝 Creating default .env file..."
    cat > ser/.env << EOF
PORT=3001
NODE_ENV=development

# Database (Neon)
DATABASE_URL=postgresql://neondb_owner:npg_OIHZWylG6x5v@ep-nameless-truth-a8su5bem-pooler.eastus2.azure.neon.tech/neondb?sslmode=require

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# APIs
GROQ_API_KEY=your_groq_api_key_here
SERPAPI_KEY=your_serpapi_key_here
EOF
    echo "✅ Created ser/.env file"
    echo "⚠️  Please add your GROQ_API_KEY and SERPAPI_KEY to ser/.env"
fi

echo "🚀 Starting services with Docker Compose..."
docker-compose up --build

echo "🎉 Application started!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:3001" 