# Hall of Heroes

Приложение для организации и управления мероприятиями.

## Требования

- Node.js v18 или выше
- MongoDB v7 или выше
- npm или yarn

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd hall-of-heroes
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка окружения

Создайте файл `.env` в директории `apps/backend`:

```env
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/hall-of-heroes
PORT=5001
```

### 4. Запуск MongoDB

Локально:
```bash
mongod --config /usr/local/etc/mongod.conf --fork
```

Или через Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Запуск приложения

Для разработки:
```bash
# Запуск бэкенда
cd apps/backend
npm run dev

# В отдельном терминале запуск фронтенда
cd apps/frontend
npm run dev
```

Для продакшена:
```bash
# Сборка
npm run build

# Запуск
npm start
```

## API Endpoints

- `POST /auth/register` - Регистрация пользователя
- `POST /auth/login` - Авторизация
- `GET /events` - Получение списка мероприятий
- `POST /events` - Создание мероприятия
- `GET /users` - Получение списка пользователей
- `GET /news` - Получение новостей

## Структура проекта

```
hall-of-heroes/
├── apps/
│   ├── backend/         # Backend на Express
│   └── frontend/        # Frontend на Vue
├── package.json
└── README.md
```

## Разработка

1. Создайте новую ветку для фичи:
```bash
git checkout -b feature/your-feature-name
```

2. Внесите изменения и создайте коммит:
```bash
git add .
git commit -m "feat: добавлена новая функциональность"
```

3. Отправьте изменения в репозиторий:
```bash
git push origin feature/your-feature-name
```

## Лицензия

MIT
