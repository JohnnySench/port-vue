# Используем официальный Node.js образ
FROM node:22.13.0-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY ./package.json .

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения в контейнер
COPY . .

# Открываем порт, который будет использовать Vite
EXPOSE 3100

# Запускаем приложение в режиме разработки
CMD ["npm", "run", "dev"]