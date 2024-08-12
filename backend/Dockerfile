# Use the official Node.js image.
FROM node:18

# Define build arguments
ARG GOOGLE_APPLICATION_CREDENTIALS

# Copy the service account key into the image
# This step assumes that you have passed the key as a build argument and
# used it to create a file during the build process

# Set environment variable for Google Cloud SDK or other tools to find the credentials
ENV GOOGLE_APPLICATION_CREDENTIALS=/etc/gcloudcliapp-sa-key.json

# Install necessary tools, e.g., Google Cloud SDK, or other dependencies
# Install curl and other dependencies
RUN apt-get update && \
    apt-get install -y curl

# Install Google Cloud SDK
RUN curl https://sdk.cloud.google.com | bash

# Install additional components
RUN /bin/bash -c 'source /root/google-cloud-sdk/path.bash.inc && gcloud components install beta'


# Add Google Cloud CLI to PATH
ENV PATH $PATH:/root/google-cloud-sdk/bin

# Set the working directory in the container.
WORKDIR /usr/src/app

# Install the necessary packages.
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port the app runs on.
EXPOSE 5000

# Define the command to run the app.
CMD [ "node", "server.js" ]

