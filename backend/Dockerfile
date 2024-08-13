# Use an official Node.js image as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

RUN npm install cors

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies for Google Cloud SDK
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Google Cloud SDK
RUN curl -sSL https://sdk.cloud.google.com | bash
ENV PATH $PATH:/root/google-cloud-sdk/bin

# Expose port 5000 (or whatever port your app is running on)
EXPOSE 5000

# Define the command to run your app using node
CMD ["node", "server.js"]
