## Agent Forge

## Overview

Mini Agent Forge is an AI-powered development assistant that provides real-time coding support through an intuitive React/Next.js interface. The application offers a streamlined experience for developers to interact with AI, get code suggestions, and make direct code modifications.

![image](https://github.com/user-attachments/assets/1914583f-40d3-4956-afa8-f7aa07754e4a)

project link : https://mini-agent-forge-assign-neha-bb45.vercel.app/


## Core Requirements (100% Complete)

### 1. Prompt Composer UI 

- Next.js 15 + React 19 - Latest versions with Tailwind CSS
- Text input - 500 character limit with validation
- Tool dropdown - Web search & calculator selection
- Run button - Triggers backend with real-time feedback

### 2. Backend API 

- TypeScript + Express - Type-safe backend
- POST /api/run - Accepts {prompt, tool}
- Zod validation - 500 char limit + tool enum validation
- Tool routing - Web search (SerpAPI) & calculator

### 3. LLM Integration 

- Groq API - Fast LLM responses
- Contextual prompts - Different system prompts per tool
- Friendly responses - "Based on my search..." & "The answer is..."

### 4. Data Storage 

- Neon PostgreSQL - Cloud database with connection string
- Redis caching - Last 10 runs per user
- Full logging - Timestamp, prompt, tool, tokens, response

### 5. DevOps & Security 

- Docker Compose - One-line setup
- Environment config - .env.example provided
- Security headers - Helmet.js, CORS, input validation
- Jest testing - Unit tests with mocked dependencies

---

##  Bonus Features Implemented

### 1. Visual Flow Builder 🎨

- React Flow integration - Drag & drop node canvas
- Interactive nodes - Prompt → Tool → Result workflow
- Real-time editing - Edit prompts directly in nodes
- Animated execution - Visual feedback during runs
- Mini-map & controls - Professional flow interface

### 2. Enhanced UX ✨

-  Dual mode interface - Simple form + Visual flow tabs
-  Streaming simulation - Typewriter effect for responses
-  Run history sidebar - Recent executions with status
-  Quick examples - "Try Search" & "Try Math" buttons
-  Beautiful gradients - Modern glass-morphism design
-  Responsive design - Works on all screen sizes

### 3. Advanced Backend 

-  Cloud database - Neon PostgreSQL integration
- Connection pooling - Optimized database performance
- Error handling - Graceful fallbacks and user-friendly errors
- Health checks - Service monitoring endpoints
- Type safety - Full TypeScript with interfaces

### 4. Developer Experience 🛠

- Multiple startup modes - Docker, development, manual
- Comprehensive docs - README + Quick Start guides
- Clean architecture - Separation of concerns
- Production ready - Security, validation, error handling

---

##  How to Use the Enhanced Features

### Simple Mode 

1. Enter your prompt in the textarea
2. Select Web Search or Calculator tool
3. Click "Run Agent" to see streaming results
4. View your history in the sidebar

### Visual Flow Mode 🎨

1. Click the "Visual Flow" tab
2. Edit the prompt in the first node
3. Select your tool in the middle node
4. Click "Run Flow" to execute
5. Watch animated edges and see results in the final node
6. Drag nodes around to reorganize

### Live Features You Can Test 

#### Calculator Examples:

- Calculate 15 * 23 + 45 → "The answer is: 390"
- What's 100 / 4 + 50 → "The answer is: 75"


## Thankyou
