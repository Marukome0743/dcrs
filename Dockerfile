# syntax=docker/dockerfile:labs
FROM node:21.7.3 as base
WORKDIR /app
RUN npm install -g bun

FROM base AS deps
COPY package.json bun.lockb prisma/schema.prisma ./
RUN bun i --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=secret,id=POSTGRES_PRISMA_URL \
  echo POSTGRES_PRISMA_URL=$(cat /run/secrets/POSTGRES_PRISMA_URL) >> .env.production
RUN --mount=type=secret,id=POSTGRES_URL_NON_POOLING \
  echo POSTGREWS_URL_NON_POOLING=$(cat /run/secrets/POSTGRES_URL_NON_POOLING) >> .env.production
RUN --mount=type=secret,id=S3_ACCESS_KEY_ID \
  echo S3_ACCESS_KEY_ID=$(cat /run/secrets/S3_ACCESS_KEY_ID) >> .env.production
RUN --mount=type=secret,id=S3_SECRET_ACCESS_KEY \
  echo S3_SECRET_ACCESS_KEY=$(cat /run/secrets/S3_SECRET_ACCESS_KEY) >> .env.production

RUN bun test
RUN bun run build

FROM oven/bun:canary-distroless
WORKDIR /usr/src/app
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.2 /lambda-adapter /opt/extensions/lambda-adapter

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY prisma ./prisma

EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["run", "server.js"]
