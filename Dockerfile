# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies (for both Next.js frontend and API backend)
RUN rm -rf node_modules/
RUN rm package-lock.json
RUN npm cache clear --force
RUN npm install

# Copy the rest of the application files into the container
COPY . .

RUN npm run build

