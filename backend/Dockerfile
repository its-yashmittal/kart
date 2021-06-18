FROM node:10.19.0

WORKDIR /backend
COPY . .
EXPOSE 2424
RUN npm install
CMD ["node", "server.js"]