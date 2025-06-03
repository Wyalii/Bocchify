# Stage 1: Build the Angular app (including SSR)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Angular app (production)
RUN npm run build

# Stage 2: Serve the SSR app with Node
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist/bocchify ./dist/bocchify
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the port your SSR app listens on (usually 4000 or 4200)
EXPOSE 4000

# Run the SSR server
CMD ["node", "dist/bocchify/server/server.mjs"]
