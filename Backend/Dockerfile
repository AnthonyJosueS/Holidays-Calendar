FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build       

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=development
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]