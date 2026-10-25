FROM node:26-alpine AS base
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm ci

FROM deps AS development
ENV NODE_ENV=development
CMD npm install --no-audit --no-fund && npm run db:generate && exec npm run start:dev

