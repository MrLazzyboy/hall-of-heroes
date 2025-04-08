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

#### Аутентификация
- `POST /auth/register` - Регистрация пользователя
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- `POST /auth/login` - Авторизация
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

#### События
- `GET /events` - Получение всех событий пользователя (где он создатель, участник или приглашенный)
- `GET /events/:id` - Получение информации о конкретном событии
- `POST /events` - Создание нового события
  ```json
  {
    "title": "string",
    "description": "string",
    "date": "string (ISO date)"
  }
  ```
- `PUT /events/:id` - Обновление события
  ```json
  {
    "title": "string (optional)",
    "description": "string (optional)",
    "date": "string (ISO date, optional)",
    "status": "string (optional, только для админов)"
  }
  ```
- `DELETE /events/:id` - Удаление события
- `POST /events/:id/invite` - Приглашение пользователя на событие
  ```json
  {
    "userId": "string"
  }
  ```
- `POST /events/:id/accept` - Принятие приглашения на событие
- `POST /events/:id/reject` - Отклонение приглашения на событие

#### Общее
- `GET /news` - Получение списка новостей
- `GET /filters` - Получение доступных фильтров

Все эндпоинты, кроме `/auth/register` и `/auth/login`, требуют заголовок авторизации:
```
Authorization: Bearer <jwt_token>
```

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
