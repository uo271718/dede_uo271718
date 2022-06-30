FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/uo271718/dede_uo271718
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install
CMD [ "npm", "start" ]