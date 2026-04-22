# React + TypeScript Chatbot Template

A minimal template for building chatbot applications with a React + TypeScript UI and a LangGraph/LangChain backend.

This base focuses on:
- A clean, minimal chat UI template
- Light/dark mode ready styling
- A LangGraph backend for chat streaming and agent workflows

## Demo

Add your demo GIF here:

```md
![Chatbot Demo]()
```

## Run Manually (Frontend + Backend) [Recommended]

Manual install/run has been tested more thoroughly and is the recommended setup.

### 1. Backend (LangGraph)

```bash
cd backend
npm install
npx @langchain/langgraph-cli dev
```

### 2. Frontend (React + TS)

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and connects to the backend on `http://localhost:2024`.

## Basic Chat Configuration

The frontend chat options are defined in:
- `frontend/src/constants/index.ts`

Key values:
- `ChatSlug`: UI-visible chat tabs/options (`"weather"` and `"math"` by default)
- `SLUG_TO_ASSISTANT`: maps each slug to:
  - `assistantId` (must match a backend graph key)
  - `name`
  - `description`
- `AGENT_SERVER_URL`: backend URL (`VITE_API_URL` or `http://localhost:2024`)

Important:
- Each `assistantId` in `frontend/src/constants/index.ts` must exist in `backend/langgraph.json` under `graphs`.

## Available Agents (Default)

Available backend agents are determined by:
- `backend/langgraph.json`

Current defaults:

```json
{
  "graphs": {
    "my_weather_agent": "./src/weatherAgent.ts:agent",
    "math_agent": "./src/mathAgent.ts:agent"
  }
}
```

What they do:
- `my_weather_agent`: Weather assistant used by the frontend `"weather"` chat option
- `math_agent`: Math assistant used by the frontend `"math"` chat option

## How To Customize

1. Add or update backend agents in `backend/langgraph.json` under `graphs`.
2. Implement the agent module/function referenced by each graph path.
3. Update `frontend/src/constants/index.ts`:
   - Extend `ChatSlug` (if adding a new chat option)
   - Add/update entries in `SLUG_TO_ASSISTANT`
   - Ensure every `assistantId` exactly matches a key in `backend/langgraph.json`
4. Restart backend/frontend dev servers after config changes.

## Run With Docker Desktop (Experimental)

Prerequisite:
- Docker Desktop installed and running

From the project root:

```bash
docker compose up --build
```

App URLs:
- Frontend: `http://localhost:5173`
- Backend (LangGraph): `http://localhost:2024`

Note:
- Docker setup is currently experimental and may require additional local configuration depending on your environment.

## Notes

This is an intentionally small starting point for building and extending chatbot UI patterns and backend agents.
