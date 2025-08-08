# Use Node.js 20 with Alpine Linux as base image
FROM node:20-alpine

# Install pnpm package manager globally
RUN npm install -g pnpm

# Set working directory inside container
WORKDIR /app

# Install system dependencies needed for building native modules
RUN apk add --no-cache git python3 make g++ libc6-compat

# Copy package configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install project dependencies
RUN pnpm install

# Copy all source code to container
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Start the development server
CMD ["pnpm", "dev"]