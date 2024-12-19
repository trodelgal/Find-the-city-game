# Step 1: Build the React app
FROM node:14 as client-builder
WORKDIR /client
COPY ./client .
RUN npm install
RUN npm run build

# Step 2: Build the Express server
FROM node:14 as server
WORKDIR /server
COPY ./server .
COPY --from=client-builder /client/build ../client/build
RUN npm install

# Expose port and start the server
EXPOSE 8080
# CMD ["node", "index.js"]