# Stage 1: Build the app using Node
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build  # This will generate the `dist/` folder

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Clean the default nginx html folder
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite dist output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
