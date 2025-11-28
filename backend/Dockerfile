FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências do sistema
RUN apk add --no-cache bash openssl git

# Habilita PNPM
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate

# Copia arquivos
COPY package.json pnpm-lock.yaml ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia código restante
COPY . .

# Gera Prisma Client (usa variáveis do build)
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN pnpx prisma generate

# Gera build NestJS
RUN pnpm build



# ==========================
#        RUNTIME
# ==========================
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache dumb-init openssl

# Habilita pnpm
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate

# Copia apenas arquivos necessários
COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=3030

EXPOSE 3030

USER node

CMD ["node", "dist/main.js"]
