# FROM node:20-bullseye-slim AS build
# WORKDIR /hex
# COPY . /hex/
# EXPOSE 3000
# RUN npm install & npm run build

# FROM node:20-bullseye-slim AS run
# WORKDIR /hex/
# COPY --from=build /hex/build/ .
# RUN npm install -g serve
# CMD ["serve"]

# FROM node:alpine
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./
# RUN npm i
# CMD ["npm", "run", "start"]

FROM node:alpine AS build
WORKDIR /hex
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN ["npm", "run", "build"]

FROM node:alpine AS run
WORKDIR /app
COPY --from=build /hex/build/ .
RUN npm install -g serve
CMD ["serve"]