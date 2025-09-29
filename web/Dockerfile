# Dockerfile.dev -- para desenvolvimento (hot-reload)
FROM node:18-alpine

# Preparações
ENV NODE_ENV=development
ENV PORT=3001
WORKDIR /app


RUN corepack enable && corepack prepare pnpm@latest --activate

RUN addgroup -g 1000 devgroup \
 && adduser -u 1000 -G devgroup -s /bin/sh -D devuser


COPY package.json pnpm-lock.yaml* ./

# Instala dependências (inclui devDependencies)
RUN pnpm install --frozen-lockfile

# Copia o resto do projeto
COPY . .

# Garante permissões corretas para o usuário não-root
RUN chown -R devuser:devgroup /app

USER devuser

EXPOSE 3001

CMD ["pnpm", "dev", "--", "-H", "0.0.0.0", "-p", "3001"]
