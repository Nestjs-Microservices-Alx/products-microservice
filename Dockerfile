# ### Nest.js Dockerfile

FROM node:21-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# prisma client: solo si la db ya existe
# RUN npx prisma generate

EXPOSE 3001

