FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm install -g serve
RUN npm run build
EXPOSE 3000

ENV NODE_ENV=production
CMD ["serve", "-s", "build"]