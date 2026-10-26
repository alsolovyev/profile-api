FROM node:26-alpine AS base
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
RUN \
  --mount=type=cache,target=/root/.npm \
  npm ci

FROM deps AS development
ENV NODE_ENV=development
CMD \ 
  npm install --no-audit --no-fund && \
  npm run db:generate && \
  npm run db:migrate:deploy && \
  npm run db:seed && \
  exec npm run start:dev

FROM deps AS build
COPY . .
RUN \
  npm run db:generate && \
  npm run build && \
  npm prune --omit-dev

FROM deps AS migration
COPY tsconfig.json prisma7.config.ts ./
COPY src ./src
CMD \
  npm run db:generate && \
  npm run db:migrate:deploy && \
  npm run db:seed

FROM base AS production
ENV NODE_ENV=production
COPY --chown=node:node package.json ./
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
USER node
CMD node dist/main

FROM deps AS e2e
COPY . .
RUN npm run db:generate
CMD \
  npm run db:migrate:deploy && \
  npm run db:seed && \
  npm run test:e2e
