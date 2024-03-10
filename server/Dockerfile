# Import on the Node.js image.
FROM node

# Create the app directory.
WORKDIR /app

# Copy the package.json and package-lock.json files.
COPY package*.json .

# Install the dependencies.
RUN npm install

# Copy the app source code.
COPY . .

# Expose the port 3000.
EXPOSE 3000

# Run the app.
CMD ["node", "index.js"]