FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm i

COPY . .

RUN npm run build --prod

# Step 2: Serve the application using Nginx

# Use an Nginx image to serve the built files
# FROM nginx:alpine

# Copy the built Angular app from the 'build' stage into the Nginx directory
# COPY --from=build /app/dist/[your-angular-project-name] /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 4500

# Start Nginx server
CMD ["ng", "serve"]







