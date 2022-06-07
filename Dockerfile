FROM node:17-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY tsconfig.json ./

COPY src ./src
COPY .env ./
COPY dev.sqlite3 ./
EXPOSE 8000


CMD ["yarn", "start"]