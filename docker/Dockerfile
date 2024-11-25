FROM node:16

ARG DEFAULT_PORT=3000

ENV PORT $DEFAULT_PORT

# Create app directory
WORKDIR /usr/src/app

# Create the required folders
RUN mkdir logs

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Bundle app source
COPY . .

# Run server
EXPOSE $PORT
CMD [ "npm", "run", "start" ]
