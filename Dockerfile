# Use the official Node.js image as a base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app runs on
EXPOSE 3000

# Command to run the application
CMD [ "node", "src/app.js" ]
