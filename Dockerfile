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
RUN bun test
RUN --mount=type=secret,id=POSTGRES_PRISMA_URL \
  --mount=type=secret,id=POSTGRES_URL_NON_POOLING \
  --mount=type=secret,id=S3_ACCESS_KEY_ID \
  --mount=type=secret,id=S3_SECRET_ACCESS_KEY \
  POSTGRES_PRISMA_URL=$(cat /run/secrets/POSTGRES_PRISMA_URL) \
  POSTGREWS_URL_NON_POOLING=$(cat /run/secrets/POSTGRES_URL_NON_POOLING) \
  S3_ACCESS_KEY_ID=$(cat /run/secrets/S3_ACCESS_KEY_ID) \
  S3_SECRET_ACCESS_KEY=$(cat /run/secrets/S3_SECRET_ACCESS_KEY) \
  bun run build

FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY prisma ./prisma

EXPOSE 3000
ENV AWS_LWA_ENABLE_COMPRESSION=true HOSTNAME=0.0.0.0 PORT=3000
CMD ["server.js"]
