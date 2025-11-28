# ---------- BASE ----------
FROM node:20-alpine AS base
WORKDIR /app

# Dependências do SO
RUN apk add --no-cache bash openssl openssh dumb-init python3 make g++

# Habilitar corepack + versão exata do pnpm compatível com seu lockfile
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# ---------- INSTALL STAGE ----------
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- BUILD STAGE ----------
FROM base AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Garante que o dist tem permissão de escrita
RUN mkdir -p /app/dist && chmod -R 777 /app/dist

# Gera Prisma Client (Prisma 6)
RUN pnpm prisma generate

# Compilar NestJS — sem watch
RUN pnpm run build

# ---------- PRODUCTION ----------
FROM node:20-alpine AS prod
WORKDIR /app

RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
ENV PORT=3030
EXPOSE 3030

# Copiar prod build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./

USER node

CMD ["dumb-init", "node", "dist/main.js"]
