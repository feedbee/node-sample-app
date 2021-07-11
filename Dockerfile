FROM node:alpine
ENV HOST "0.0.0.0"
ENV PORT 3000
EXPOSE 3000

COPY node_modules /usr/src/app/node_modules
COPY server.js /usr/src/app/server.js
WORKDIR /usr/src/app/

CMD node server.js
