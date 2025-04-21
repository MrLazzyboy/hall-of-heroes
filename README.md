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
  ```json
  Ответ:
  {
    "id": "string",
    "title": "string",
    "shortDescription": "string",
    "description": "string",
    "organizerInfo": "string",
    "format": "string (Игровая сессия | Мероприятие)",
    "imageUrl": "string",
    "date": "string (ISO date)",
    "startTime": "string (HH:mm)",
    "endTime": "string (HH:mm)",
    "location": "string",
    "price": "number",
    "discount": "number",
    "maxParticipants": "number",
    "currentParticipants": "number",
    "isPrivate": "boolean",
    "status": "string (approved | archived | pending | rejected)",
    "creator": {
      "username": "string",
      "email": "string"
    },
    "participants": [
      {
        "username": "string",
        "email": "string"
      }
    ],
    "invitations": [
      {
        "username": "string",
        "email": "string"
      }
    ],
    // Дополнительные поля для формата "Игровая сессия"
    "system": "string",
    "setting": "string",
    "duration": "string",
    "playerExperience": "string",
    "genre": "string",
    "characterLevel": "string",
    // Мета-информация о правах доступа текущего пользователя
    "userAccess": {
      "isCreator": "boolean",
      "isParticipant": "boolean",
      "isInvited": "boolean",
      "canEdit": "boolean",
      "canInvite": "boolean",
      "canJoin": "boolean"
    }
  }
  ```
- `GET /events/masters/search` - Поиск мастеров по никнейму
  ```
  Query параметры:
  - nickname: string (обязательный) - Никнейм для поиска

  Ответ:
  [
    {
      "id": "string",
      "username": "string",
      "email": "string",
      "avatar": "string",
      "rating": "number"
    }
  ]
  ```
- `GET /events/users/search` - Поиск пользователей
  ```
  Query параметры:
  - query: string (обязательный) - Строка для поиска по никнейму
  - role: string (опционально) - Фильтр по роли пользователя (например, 'Master')

  Ответ:
  [
    {
      "id": "string",
      "username": "string",
      "email": "string",
      "avatar": "string",
      "rating": "number",
      "role": "string"
    }
  ]
  ```
- `POST /events` - Создание нового события
  ```json
  {
    "title": "string",
    "shortDescription": "string",
    "description": "string",
    "organizerInfo": "string (optional)",
    "format": "string (enum: ['Игровая сессия', 'Мероприятие'])",
    "master": "string (ID мастера, required для Игровой сессии)",
    "system": "string (required для Игровой сессии)",
    "setting": "string (required для Игровой сессии)",
    "duration": "string (required для Игровой сессии)",
    "playerExperience": "string (required для Игровой сессии)",
    "genre": "string (required для Игровой сессии)",
    "characterLevel": "string (required для Игровой сессии)",
    "imageUrl": "string (optional)",
    "date": "string (ISO date)",
    "startTime": "string (HH:mm)",
    "endTime": "string (HH:mm)",
    "location": "string",
    "price": "number",
    "discount": "number (0-100)",
    "maxParticipants": "number",
    "isPrivate": "boolean"
  }
  ```
- `PUT /events/:id` - Обновление события
  ```json
  {
    "title": "string (optional)",
    "shortDescription": "string (optional)",
    "description": "string (optional)",
    "organizerInfo": "string (optional)",
    "format": "string (enum: ['Игровая сессия', 'Мероприятие'], optional)",
    "system": "string (optional)",
    "setting": "string (optional)",
    "duration": "string (optional)",
    "playerExperience": "string (optional)",
    "genre": "string (optional)",
    "characterLevel": "string (optional)",
    "imageUrl": "string (optional)",
    "date": "string (ISO date, optional)",
    "startTime": "string (HH:mm, optional)",
    "endTime": "string (HH:mm, optional)",
    "location": "string (optional)",
    "price": "number (optional)",
    "discount": "number (0-100, optional)",
    "maxParticipants": "number (optional)",
    "isPrivate": "boolean (optional)",
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
