# Stage 0: Build the React app
FROM node:22-alpine AS base
WORKDIR /app

# Leverage caching by installing dependencies first
COPY package*.json ./
RUN npm install


# Stage 1: Development environment
FROM base AS development

COPY . ./

EXPOSE 4321

CMD ["astro", "dev"]


# Stage 2: Build environment
FROM base AS build-stage

COPY . ./

ARG VITE_API_URL=${VITE_API_URL}

RUN npm run build


# Stage 3: Production environment
FROM nginx:alpine AS production

# Copy the production build artifacts from the build stage
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]