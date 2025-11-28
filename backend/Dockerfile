# Dockerfile (Node + Prisma 6.x + NestJS)
FROM node:20-alpine

WORKDIR /app

# Dependências do sistema
RUN apk add --no-cache dumb-init git openssh bash openssl

# Corepack + PNPM
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate

# Copia manifests
COPY package.json pnpm-lock.yaml* ./

# Instala dependências (dev incluídas)
RUN pnpm install --frozen-lockfile

# Copia resto dos arquivos
COPY . .

# Ajusta dist
RUN mkdir -p /app/dist && chown -R node:node /app

# ENV DATABASE_URL
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Prisma (funciona apenas com Prisma 6)
RUN if [ -n "$DATABASE_URL" ]; then pnpx prisma db pull; fi
RUN pnpx prisma generate

ENV PORT=3030
EXPOSE 3030

USER node

CMD ["pnpm", "run", "start:prod"]
