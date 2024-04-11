FROM node:21.7.2 as base
RUN --mount=type=secret,id=BASE_URL \
  cat /run/secrets/BASE_URL
RUN --mount=type=secret,id=POSTGRES_PRISMA_URL \
  cat /run/secrets/POSTGRES_PRISMA_URL
RUN --mount=type=secret,id=POSTGRES_URL_NON_POOLING \
  cat /run/secrets/POSTGRES_URL_NON_POOLING
WORKDIR /app
RUN npm install -g bun

FROM base AS deps
COPY package.json bun.lockb prisma/schema.prisma ./
RUN bun i --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun test
RUN NODE_ENV=production bun run build

FROM oven/bun:canary-distroless
WORKDIR /usr/src/app
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME 0.0.0.0
CMD ["run", "server.js"]
