# Stage 1: Build the React application
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 1: Build the vite widget application
FROM node:20-alpine AS widget-builder
WORKDIR /app/widget
COPY widget/package*.json ./
RUN npm install
COPY widget/ ./
RUN npm run build

# Stage 2: Build the backend and serve the frontend
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production
COPY backend/ ./
COPY --from=client-builder /app/client/build /app/client/build

EXPOSE 3002
CMD ["npm", "start"]
