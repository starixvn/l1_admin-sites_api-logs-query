# Build stage
FROM node:20.18.2-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Clean development dependencies
RUN npm prune --production

# Production stage
FROM node:20.18.2-alpine AS production

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Copy only necessary files from builder
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Copy environment file if it exists
COPY --chown=nestjs:nodejs .env* ./

# Use non-root user
USER nestjs

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"] 