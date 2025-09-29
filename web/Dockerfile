# Dockerfile.dev - Next.js em desenvolvimento com hot-reload
FROM node:18-alpine

ENV NODE_ENV=development
ENV PORT=3001
WORKDIR /app

# Ativa corepack + pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia manifests e instala dependências (usa cache)
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copia o restante do código
COPY . .

# Define permissões (garante que o usuário 'node' consiga rodar e escrever arquivos)
RUN chown -R node:node /app

# Usa o usuário 'node' já presente na imagem (evita criar UID/GID fixos)
USER node

EXPOSE 3001

# Roda next em dev e escuta 0.0.0.0 para hot-reload funcionar fora do container
CMD ["pnpm", "dev", "-H", "0.0.0.0", "-p", "3001"]
