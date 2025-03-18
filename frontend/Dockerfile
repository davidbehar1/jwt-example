# Build
FROM node:20-alpine AS build

WORKDIR /frontend

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .
RUN npm run build

FROM nginx

WORKDIR /frontend

COPY --from=build /frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]