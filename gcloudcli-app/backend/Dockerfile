# Use the official Node.js image.
FROM node:18

# Install Google Cloud CLI
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -sSL https://sdk.cloud.google.com | bash \
    && rm -rf /var/lib/apt/lists/*

# Add Google Cloud CLI to PATH
ENV PATH $PATH:/root/google-cloud-sdk/bin

# Set the working directory in the container.
WORKDIR /usr/src/app

# Install the necessary packages.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port the app runs on.
EXPOSE 5000

# Define the command to run the app.
CMD [ "node", "server.js" ]

