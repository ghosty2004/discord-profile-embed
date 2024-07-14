FROM node:18-alpine3.20 as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine3.20
WORKDIR /app
COPY --from=builder /app/package*.json .
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["npm", "run", "start"]
