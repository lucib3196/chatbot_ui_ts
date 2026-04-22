FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy everything
COPY . .

# Expose LangGraph dev port (default is usually 2024 or 3000 depending on config)
EXPOSE 2024

# Run LangGraph dev server
CMD ["npx", "@langchain/langgraph-cli", "dev", "--host", "0.0.0.0"]