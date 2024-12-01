FROM node:18-alpine

# Set working directory in the container
WORKDIR /

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files to the container
COPY . .

# Install TypeScript globally (or you can use a local installation if preferred)
RUN npm install -g typescript

# Compile the TypeScript code
RUN tsc

# Expose the port your backend runs on
EXPOSE 8000

# Start the server (change 'app.js' if your entry point has a different name)
CMD ["node", "dist/app.js"]
