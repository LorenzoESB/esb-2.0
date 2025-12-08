FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init git openssh bash openssl

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

ARG DATABASE_URL="postgresql://user:password@localhost:5432/postgres?schema=public"
ENV DATABASE_URL=${DATABASE_URL}

ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

COPY package.json pnpm-lock.yaml* prisma.config.ts ./
COPY prisma ./prisma

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

RUN mkdir -p /app/dist /app/generated && \
    chown -R node:node /app

ENV PORT=3030
EXPOSE 3030

USER node

CMD ["pnpm", "run", "start:dev"]
