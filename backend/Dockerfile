FROM node:20-alpine

WORKDIR /app

# Dependências do sistema
RUN apk add --no-cache dumb-init bash openssl openssh python3 make g++

# Habilitar PNPM 10 (MESMA versão do seu lockfile)
RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

# Copiar arquivos de manifesto
COPY package.json pnpm-lock.yaml ./

# Instalar dependências (SEM frozen-lockfile)
RUN pnpm install

# Copiar resto do projeto
COPY . .

# Build da aplicação (NODE_ENV=production evita watch)
RUN pnpm build

# Gerar client do Prisma (versão 6.x)
RUN pnpm prisma generate

ENV PORT=3030
EXPOSE 3030

CMD ["node", "dist/main.js"]
