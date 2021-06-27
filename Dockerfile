FROM node:alpine
ENV HOST "0.0.0.0"
ENV PORT 3000
EXPOSE 3000

COPY server.js /usr/src/app/server.js
WORKDIR /usr/src/app/

CMD node server.js