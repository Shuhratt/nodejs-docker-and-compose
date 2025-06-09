ARG NODE_VERSION="20.19.0"

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /kupdar

FROM base AS build
COPY package*.json ./
COPY tsconfig*.json nest-cli.json ./
COPY ./src ./src
RUN npm ci --ignore-scripts
RUN npm run build

FROM base AS production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
RUN npm i -g pm2
COPY --from=build /kupdar/dist/ ./
ENTRYPOINT ["pm2-runtime", "start", "main.js"]





