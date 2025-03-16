# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY . .  

# Expose the backend port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
