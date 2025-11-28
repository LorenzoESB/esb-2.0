FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init git openssh

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN mkdir -p /app/dist && \
    chown -R node:node /app

# Apenas gera o client – sem acessar DB
RUN pnpx prisma generate || true

ENV PORT=3030
EXPOSE 3030

USER node
CMD ["pnpm", "run", "start:dev"]
