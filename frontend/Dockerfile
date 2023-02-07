FROM node:18-alpine

WORKDIR /app

COPY muse/package.json .

RUN npm install

COPY ./muse .

EXPOSE 3000

CMD ["npm", "run", "dev"]