# Utiliser l'image de base Node.js 18 Alpine
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Installer le CLI de NestJS globalement
RUN npm install -g @nestjs/cli

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/main.js"]
