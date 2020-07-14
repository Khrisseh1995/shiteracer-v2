FROM node:12
WORKDIR /usr/src/app
ENV PORT 8080
ENV HOST 0.0.0.0
COPY package.json /usr/src/app
RUN npm install --only=production
COPY . /usr/src/app
RUN npx prisma generate
CMD ["npm", "run", "start"]