# Step 1: Build the Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the project for production
RUN npm run build --prod

# Step 2: Serve the application using Nginx

# Use an Nginx image to serve the built files
# FROM nginx:alpine

# Copy the built Angular app from the 'build' stage into the Nginx directory
# COPY --from=build /app/dist/[your-angular-project-name] /usr/share/nginx/html

# Expose port 5000 to the outside world
EXPOSE 4500

# Start the Angular development server on port 5000
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4500"]
