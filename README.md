# 🤖 Agent Runner

A minimal end-to-end agent runner application that allows users to craft prompts, select tools, and view live AI-powered results.

## 🚀 Features

- **Prompt Composer UI** - Beautiful Next.js frontend with Tailwind CSS
- **Tool Selection** - Choose between web search and calculator tools
- **LLM Integration** - Groq-powered AI responses
- **Data Persistence** - PostgreSQL storage with Redis caching
- **Real-time Results** - Instant feedback and streaming responses
- **Type Safety** - Full TypeScript implementation with Zod validation

## 🛠️ Tech Stack

### Frontend

- Next.js 15 with React 19
- Tailwind CSS for styling
- TypeScript for type safety

### Backend

- Node.js with Express
- TypeScript
- Zod for validation
- PostgreSQL for data storage
- Redis for caching
- Groq SDK for LLM integration
- SerpAPI for web search

### DevOps

- Docker & Docker Compose
- Jest for testing
- ESLint for code quality

## ⚡ Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

### One-Line Setup

```bash
docker-compose up
```

That's it! The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Environment Setup

1. Copy the environment template:

```bash
cp ser/.env.example ser/.env
```

2. Add your API keys to `ser/.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
SERPAPI_KEY=your_serpapi_key_here
```

## 🔧 Development

### Running Locally

1. **Backend Setup:**

```bash
cd ser
npm install
npm run dev
```

2. **Frontend Setup:**

```bash
cd cli
npm install
npm run dev
```

3. **Database Setup:**

```bash
# Start PostgreSQL and Redis
docker-compose up postgres redis
```

### Testing

Run the test suite:

```bash
cd ser
npm test
```

Watch mode:

```bash
npm run test:watch
```

## 📡 API Endpoints

### POST /api/run

Executes an agent run with the specified prompt and tool.

**Request:**

```json
{
  "prompt": "Search for the latest AI news",
  "tool": "web-search"
}
```

**Response:**

```json
{
  "id": "uuid-here",
  "result": "Based on my search, here's what I found...",
  "tool": "web-search",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/runs

Retrieves the last 10 cached runs for the current user.

## 🔍 Available Tools

### Web Search

- Uses SerpAPI to search Google
- Returns the top result with title and link
- LLM generates a friendly summary

### Calculator

- Safely evaluates mathematical expressions
- Supports basic arithmetic operations
- Returns computed results with explanations

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Next.js UI    │───▶│  Express API    │───▶│     Tools       │
│                 │    │                 │    │  (Search/Calc)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │                 │    │                 │
                       │   Groq LLM      │    │   PostgreSQL    │
                       │                 │    │   + Redis       │
                       └─────────────────┘    └─────────────────┘
```

## 📊 Database Schema

### Runs Table

```sql
CREATE TABLE runs (
  id VARCHAR(255) PRIMARY KEY,
  timestamp TIMESTAMP NOT NULL,
  prompt TEXT NOT NULL,
  tool VARCHAR(50) NOT NULL,
  tool_result TEXT NOT NULL,
  llm_response TEXT NOT NULL,
  llm_tokens INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Security

- Helmet.js for security headers
- CORS protection
- Input validation with Zod
- Safe mathematical expression evaluation
- Rate limiting ready (can be added)

## 📈 Performance

- Redis caching for recent runs
- Connection pooling for PostgreSQL
- Lazy loading and code splitting
- Optimized Docker builds

## 🧪 Testing

- Unit tests for API validation
- Integration tests for happy paths
- Mocked external dependencies
- Type-safe test helpers

## 🚀 Production Deployment

### Environment Variables

Set these in production:

- `NODE_ENV=production`
- `GROQ_API_KEY`
- `SERPAPI_KEY`
- Database credentials
- Redis credentials

### Scaling Considerations

- Add Redis Sentinel for HA
- Use read replicas for PostgreSQL
- Implement rate limiting
- Add monitoring and logging
- Use CDN for static assets

## 🎯 Future Enhancements

- [ ] React Flow visual prompt builder
- [ ] Streaming LLM responses
- [ ] User authentication
- [ ] More tools (image generation, code execution)
- [ ] Workflow chaining
- [ ] Real-time collaboration

## 📝 License

MIT License - feel free to use this project as a starting point for your own agent applications!

---

**Happy Building! 🎉**
