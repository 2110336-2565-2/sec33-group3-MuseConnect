FROM node:18-alpine

WORKDIR /app/backend

COPY package.json .

RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]