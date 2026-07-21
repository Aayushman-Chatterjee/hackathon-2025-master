# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the production image
FROM node:18-slim AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 8080

# Set environment variable for Cloud Run
ENV PORT=8080

# Command to run the application
CMD ["node", "dist/server.js"]