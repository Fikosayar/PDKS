FROM node:20-alpine AS builder

WORKDIR /app

# Paket dosyalarını kopyala
COPY package.json package-lock.json* ./

# Tüm bağımlılıkları yükle (build için gerekli)
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Vite önyüzünü derle
RUN npm run build

# --- Prodüksiyon Aşaması ---
FROM node:20-alpine

WORKDIR /app

# Paket dosyalarını kopyala
COPY package.json package-lock.json* ./

# Sadece prodüksiyon bağımlılıklarını yükle
RUN npm install --omit=dev

# Sunucuyu çalıştırmak için tsx'i global kur
RUN npm install -g tsx

# Derlenmiş önyüzü kopyala
COPY --from=builder /app/dist ./dist

# Arkayüz dosyalarını ve yapılandırmayı kopyala
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/firebase-applet-config.json ./

EXPOSE 3000

# Sunucuyu başlat
CMD ["tsx", "server.ts"]
