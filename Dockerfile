FROM node:alpine as build
 
COPY package.json  package.json 
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

CMD ["npm", "start"]