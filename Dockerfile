# Build stage
FROM node:20.18.2-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies first (better layer caching)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prefer-offline \
    && yarn cache clean

# Copy source code and build
COPY tsconfig*.json ./
COPY src/ src/
RUN yarn build

# Production stage
FROM node:20.18.2-alpine AS production

WORKDIR /usr/src/app

# Copy only production dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prefer-offline --production \
    && yarn cache clean \
    && rm -rf /usr/local/share/.cache

# Copy built application
COPY --from=builder /usr/src/app/dist ./dist

# Add non-root user
USER node

EXPOSE 3000

CMD ["node", "dist/main"] 