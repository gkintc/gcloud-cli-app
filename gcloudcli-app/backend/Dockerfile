# Use the official Node.js image.
FROM node:18

# Set the working directory in the container.
WORKDIR /usr/src/app

# Install the necessary packages.
COPY package*.json ./

RUN npm install -g express body-parser

# Copy the server.js file into the container.
COPY server.js .

# Expose the port the app runs on.
EXPOSE 5000

# Define the command to run the app.
CMD [ "node", "server.js" ]

