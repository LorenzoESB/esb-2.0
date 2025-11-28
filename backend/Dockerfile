FROM node:20-alpine

WORKDIR /app

# Dependências básicas
RUN apk add --no-cache dumb-init git openssh bash openssl

# PNPM versão compatível com lockfile
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate

# Copia manifest + lockfile primeiro
COPY package.json pnpm-lock.yaml* ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia código
COPY . .

# Diretório dist e permissões
RUN mkdir -p /app/dist && \
    chown -R node:node /app

# Prisma (apenas generate, SEM db pull durante a build!)
RUN pnpx prisma generate || true

ENV PORT=3030
EXPOSE 3030

USER node

CMD ["pnpm", "start:dev"]
