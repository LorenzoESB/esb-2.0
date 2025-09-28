# Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

# Instala dependências do sistema necessárias (ajuste se precisar de build-tools)
RUN apk add --no-cache dumb-init git openssh

# Habilita corepack e ativa pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia apenas arquivos de lock / manifest primeiro (cache eficiente)
COPY package.json pnpm-lock.yaml* ./

# Instala todas as dependências (dev + prod) para ambiente de desenvolvimento
RUN pnpm install --frozen-lockfile

# Copia o restante do código
COPY . .

# CORREÇÃO: Criar diretório dist e ajustar permissões
RUN mkdir -p /app/dist && \
    chown -R node:node /app

# (Opcional) Apenas gera o client do Prisma se DATABASE_URL estiver presente.
# Isso evita erro de build quando não há DB acessível durante a build.
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN if [ -n "$DATABASE_URL" ]; then pnpx prisma db pull; fi
RUN pnpx prisma generate || true

ENV PORT=3030
EXPOSE 3030

# Usa dumb-init para signal handling (opcional) e troca para usuario não-root
USER node

# Comando típico em dev (assume script "start:dev" no package.json)
CMD ["pnpm", "run", "start:dev"]
