# Use Nginx to serve static files
FROM nginx:alpine

# Copy static files into the Nginx container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

