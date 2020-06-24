FROM node:12
ENV PORT 8080
ENV HOST 0.0.0.0
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
