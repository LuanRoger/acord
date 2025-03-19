FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker's cache
COPY package*.json ./

# Install dependencies with specific sharp configuration
# Combine npm commands to reduce layers and cleanup in a single step
RUN npm ci --os=linux --libc=musl --cpu=x64 && \
    npm install --os=linux --libc=musl --cpu=x64 sharp

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Create production image
FROM node:22-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production for better performance
ENV NODE_ENV=production

# Copy only necessary files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# Add any other necessary files/directories needed for production

# Expose the application port
EXPOSE 3000

# Use non-root user for better security
USER node

# Define the command to run the application
CMD ["npm", "run", "start"]