FROM node:18-alpine

WORKDIR /

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the frontend app
RUN npm run build

# Serve the frontend (using a lightweight server)
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"] 
