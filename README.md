# Hall of Heroes

Приложение для организации и управления мероприятиями.

## Структура проекта

```
hall-of-heroes/
├── apps/
│   ├── backend/         # Backend на Express
│   └── frontend/        # Frontend на Vue
└── README.md
```

## Backend

### Требования
- Node.js v18 или выше
- MongoDB v7 или выше
- npm или yarn

### Установка и запуск

1. Перейдите в директорию backend:
```bash
cd apps/backend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env`:
```env
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/hall-of-heroes
PORT=5001
```

4. Запустите MongoDB:
```bash
mongod --config /usr/local/etc/mongod.conf --fork
```
Или через Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. Запуск:
- Для разработки: `npm run dev`
- Для продакшена: `npm run prod`

### API Endpoints
- `POST /auth/register` - Регистрация пользователя
- `POST /auth/login` - Авторизация
- `GET /events` - Получение списка мероприятий
- `POST /events` - Создание мероприятия
- `GET /users` - Получение списка пользователей
- `GET /news` - Получение новостей

## Frontend

### Требования
- Node.js v18 или выше
- npm или yarn

### Установка и запуск

1. Перейдите в директорию frontend:
```bash
cd apps/frontend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env`:
```env
VITE_API_URL=http://localhost:5001
```

4. Запуск:
- Для разработки: `npm run dev`
- Для продакшена: 
  ```bash
  npm run build
  npm run preview # для локального просмотра сборки
  ```

## Разработка

1. Создайте новую ветку:
```bash
git checkout -b feature/your-feature-name
```

2. Внесите изменения и создайте коммит:
```bash
git add .
git commit -m "feat: добавлена новая функциональность"
```

3. Отправьте изменения:
```bash
git push origin feature/your-feature-name
```

## Лицензия

MIT
