FROM node:17-alpine
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY tsconfig.json ./

COPY src ./src
COPY .env ./
EXPOSE 8000


CMD ["yarn", "start"]