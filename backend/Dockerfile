FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init git openssh

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .

# Generate Prisma client
RUN pnpx prisma generate

RUN mkdir -p /app/dist /app/generated && \
    chown -R node:node /app

ENV PORT=3030
EXPOSE 3030

USER node
CMD ["pnpm", "run", "start:dev"]
