ARG NODE_VERSION="16"

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /kupdar

FROM base AS build
COPY package*.json ./

RUN npm ci --omit=dev --ignore-scripts 

COPY public ./public
COPY nginx ./nginx

COPY src ./src
RUN npm run build

FROM nginx:latest AS production
COPY --from=build ./kupdar/nginx/conf.d /etc/nginx/conf.d
COPY --from=build ./kupdar/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]