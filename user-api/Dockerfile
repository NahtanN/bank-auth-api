# BUILD STAGE
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install 

COPY . .

RUN npm run build

# PROD STAGE 
FROM node:20-alpine AS production 

RUN apk add --no-cache tzdata
ENV TZ=Sao_Paulo/Brazil

WORKDIR /usr/src/app

ENV NODE_ENV=production 

RUN apk upgrade

COPY ./package*.json ./

RUN npm install --production

COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build --chown=node:node /usr/src/app/tsconfig.json .
COPY --from=build --chown=node:node /usr/src/app/tsconfig.build.json .

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run && node dist/main"]







