FROM node:latest

WORKDIR /nest_api

EXPOSE 3000

COPY package*.json ./

RUN ["yarn", "install"]

COPY . ./

RUN ["yarn", "global", "add", "prisma"]

RUN ["prisma", "generate"]

RUN ["yarn", "run", "build"]



CMD ["yarn", "run", "start"]
