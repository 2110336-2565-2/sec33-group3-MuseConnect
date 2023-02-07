FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

# RUN npm install nodemon --save-dev

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]