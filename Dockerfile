FROM node:16-alpine

RUN apk add --no-cache --virtual builds-deps build-base python3
RUN npm rebuild bcrypt --build-from-source
