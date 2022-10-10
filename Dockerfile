FROM node:14.17.2-alpine

#WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY server ./server
COPY prisma ./prisma
COPY client ./client
COPY .env ./.env
RUN yarn install
RUN yarn build
RUN yarn db:init
RUN yarn client:install
RUN yarn client:build

# FROM node:14.17.2-alpine

# #WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY --from=0 /app/prisma /prisma
# COPY --from=0 /app/dist /dist
# COPY --from=0 /app/client/build /client/build

# RUN npm prisma generate
RUN ls
EXPOSE 4000

CMD [ "npm", "start" ]
