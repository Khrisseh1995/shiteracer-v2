# Using Node:10 Image Since it contains all 
# the necessary build tools required for dependencies with native build (node-gyp, python, gcc, g++, make)
FROM node:12
WORKDIR /usr/src/app
ENV PORT 8080
ENV HOST 0.0.0.0
COPY package.json /usr/src/app
RUN npm install --only=production
COPY . /usr/src/app
# CMD ["npm", "run", "start"]