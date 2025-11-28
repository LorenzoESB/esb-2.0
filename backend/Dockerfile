FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init git openssh bash openssl

RUN corepack enable && corepack prepare pnpm@8.15.5 --activate

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

ENV PORT=3030
EXPOSE 3030

USER node

CMD ["pnpm", "run", "start:dev"]
