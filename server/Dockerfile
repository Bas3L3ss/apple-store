# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
RUN npm install typescript
RUN npm run build

# Stage 2: Create the final image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env.example ./

# Install only production dependencies
RUN npm install --production

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/index.js"]
