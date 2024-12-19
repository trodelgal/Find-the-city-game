# Use Node.js image for building the React app
FROM node:14-slim as builder

# Set working directory
WORKDIR /client

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files and build the React app
COPY . .
RUN npm run build

