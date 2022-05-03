FROM node:16

# Create a app directory
WORKDIR /urs/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# if you are building code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
