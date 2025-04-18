# Hall of Heroes API Documentation

## 🔹 Базовая информация

**Базовый URL**: `http://localhost:5001`

**Формат даты**: `YYYY-MM-DD`
**Формат времени**: `HH:mm`

## 🔹 Аутентификация (`/auth`)

### **1. Регистрация**
```http
POST /auth/register
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "JohnDoe"
}
```
#### 🔹 **Ответ (200)**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "JohnDoe",
    "email": "user@example.com",
    "role": "User"
  }
}
```

### **2. Вход**
```http
POST /auth/login
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
#### 🔹 **Ответ (200)**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "JohnDoe",
    "email": "user@example.com",
    "role": "User"
  }
}
```

### **3. Проверка сессии**
```http
GET /auth/session
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "userId": "user_id",
  "message": "Сессия действительна"
}
```

### **4. Выход**
```http
DELETE /auth/session
Authorization: Bearer <token>
```

### **5. Изменение роли** (админ)
```http
PATCH /auth/role
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "userId": "user_id",
  "role": "Player"
}
```

## 🔹 События (`/events`)

### **1. Получение всех публичных событий**
```http
GET /events/all
```
#### 🔹 **Параметры запроса**
- `page` (опционально): номер страницы (по умолчанию: 1)
- `limit` (опционально): количество событий на странице (по умолчанию: 10)
- `dateFrom` (опционально): начальная дата для фильтрации (включительно)
- `dateTill` (опционально): конечная дата для фильтрации (включительно)

#### 🔹 **Примеры использования**
```
GET /events/all?dateFrom=2024-04-01  // все события с 1 апреля 2024
GET /events/all?dateTill=2024-04-30  // все события до 30 апреля 2024
GET /events/all?dateFrom=2024-04-01&dateTill=2024-04-30  // события с 1 по 30 апреля 2024
```

#### 🔹 **Ответ (200)**
```json
{
  "events": [
    {
      "title": "D&D Кампания",
      "shortDescription": "Краткое описание",
      "description": "Полное описание",
      "organizerInfo": "Информация об организаторе",
      "date": "2024-03-25",
      "startTime": "18:00",
      "endTime": "22:00",
      "location": "Место проведения",
      "price": 2000,
      "discount": 10,
      "maxParticipants": 6,
      "status": "approved",
      "creator": {
        "username": "DungeonMaster"
      }
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10
  }
}
```

### **2. Получение всех событий пользователя**
```http
GET /events/user
Authorization: Bearer <token>
```

### **3. Получение всех событий**
```http
GET /events
Authorization: Bearer <token>
```
#### 🔹 **Параметры запроса**
- `page` (опционально): номер страницы (по умолчанию: 1)
- `limit` (опционально): количество событий на странице (по умолчанию: 10)
- `sort` (опционально): сортировка по дате (asc/desc)
- `dateFrom` (опционально): начальная дата для фильтрации (включительно)
- `dateTill` (опционально): конечная дата для фильтрации (включительно)

#### 🔹 **Примеры использования**
```
GET /events?dateFrom=2024-04-01  // все события с 1 апреля 2024
GET /events?dateTill=2024-04-30  // все события до 30 апреля 2024
GET /events?dateFrom=2024-04-01&dateTill=2024-04-30  // события с 1 по 30 апреля 2024
```

### **4. Создание события**
```http
POST /events
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "title": "D&D Кампания: Проклятье Страда",
  "shortDescription": "Мрачное приключение в Баровии",
  "description": "Полное описание кампании...",
  "organizerInfo": "Опытный мастер, 5 лет опыта",
  "imageUrl": "https://example.com/image.jpg",
  "date": "2024-03-25",
  "startTime": "18:00",
  "endTime": "22:00",
  "location": "Москва, ул. Примерная, д. 1",
  "price": 2000,
  "discount": 10,
  "maxParticipants": 6,
  "isPrivate": true
}
```

### **5. Получение события**
```http
GET /events/:id
Authorization: Bearer <token>
```

### **6. Обновление события**
```http
PUT /events/:id
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса** (все поля опциональны)
```json
{
  "title": "Обновленное название",
  "price": 2500
}
```

### **7. Удаление события**
```http
DELETE /events/:id
Authorization: Bearer <token>
```

### **8. Приглашение на событие**
```http
POST /events/:id/invite
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "userId": "user_id"
}
```

### **9. Ответ на приглашение**
```http
POST /events/:id/accept
Authorization: Bearer <token>
```

```http
POST /events/:id/reject
Authorization: Bearer <token>
```

### **10. Отправка заявки на участие в событии**
```http
POST /events/:id/apply
Authorization: Bearer <token>
```

#### 🔹 **Ответ для публичного события (200)**
```json
{
  "message": "Вы успешно присоединились к событию"
}
```

#### 🔹 **Ответ для приватного события (200)**
```json
{
  "message": "Заявка на участие отправлена"
}
```

#### 🔹 **Ошибки**
- `400` - Вы уже являетесь участником этого события
- `400` - Вы уже отправили заявку на участие
- `400` - Достигнуто максимальное количество участников
- `401` - Не авторизован
- `404` - Событие не найдено

## 🔹 Фильтры

### **1. Получение фильтров**
```http
GET /common/filters
```
#### 🔹 **Ответ (200)**
```json
[
  {
    "_id": "filter_id",
    "name": "Система",
    "options": [
      {
        "fullName": "D&D 5e",
        "tagName": "dnd5e"
      }
    ]
  }
]
```

### **2. Создание фильтра** (админ)
```http
POST /admin/filters
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "name": "Система",
  "options": [
    {
      "fullName": "D&D 5e",
      "tagName": "dnd5e"
    },
    {
      "fullName": "Pathfinder 2e",
      "tagName": "pf2e"
    }
  ]
}
```

## 🔹 Администрирование (`/admin`)

### **1. Получение всех пользователей**
```http
GET /admin/users
Authorization: Bearer <token>
```
#### 🔹 **Параметры запроса**
- `page` (опционально): номер страницы (по умолчанию: 1)
- `limit` (опционально): количество пользователей на странице (по умолчанию: 10)

#### 🔹 **Ответ (200)**
```json
{
  "users": [
    {
      "id": "user_id",
      "username": "JohnDoe",
      "email": "user@example.com",
      "role": "Player",
      "roles": ["Master"],
      "isBlocked": false,
      "profile": {
        "avatarUrl": "https://example.com/avatar.jpg",
        "bio": "About me"
      }
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10
  }
}
```

### **2. Одобрение события**
```http
POST /admin/events/:id/approve
Authorization: Bearer <token>
```

### **3. Отклонение события**
```http
POST /admin/events/:id/reject
Authorization: Bearer <token>
```

### **4. Блокировка пользователя**
```http
PATCH /admin/users/:id/block
Authorization: Bearer <token>
```

### **5. Разблокировка пользователя**
```http
PATCH /admin/users/:id/unblock
Authorization: Bearer <token>
```

## 🔹 Новости

### **1. Получение новостей**
```http
GET /common/news
```
#### 🔹 **Параметры запроса**
- `page`: номер страницы (по умолчанию: 1)
- `limit`: количество новостей на странице (по умолчанию: 10)
- `sort`: сортировка по дате (asc/desc)

### **2. Создание новости** (админ)
```http
POST /admin/news
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "title": "Новое обновление",
  "content": "Текст новости...",
  "imageUrl": "https://example.com/image.jpg"
}
```

### **3. Обновление новости** (админ)
```http
PUT /admin/news/:id
Authorization: Bearer <token>
Content-Type: application/json
```

### **4. Удаление новости** (админ)
```http
DELETE /admin/news/:id
Authorization: Bearer <token>
```

## 🔹 Коды ответов

- **200** - Успешное выполнение
- **201** - Ресурс создан
- **400** - Некорректный запрос
- **401** - Не авторизован
- **403** - Доступ запрещен
- **404** - Ресурс не найден
- **429** - Слишком много запросов
- **500** - Внутренняя ошибка сервера

## 🔹 Ограничения и безопасность

### Лимиты запросов
- Авторизация: 5 попыток за 15 минут
- Регистрация: 10 регистраций в час с одного IP
- Размер JSON: максимум 10kb

### Заголовки
Для защищенных эндпоинтов:
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## 🔹 Статусы событий

- `pending` - Ожидает одобрения
- `approved` - Одобрено
- `rejected` - Отклонено
- `archived` - В архиве

## 🔹 Роли пользователей

- `Player` - Обычный пользователь
- `Admin` - Администратор
- Дополнительные роли (например, `Master`) могут быть назначены администратором

## 🔹 Пользователи (`/users`)

### **1. Получение информации о себе**
```http
GET /users/me
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "id": "user_id",
  "username": "JohnDoe",
  "email": "user@example.com",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "bio": "About me"
  }
}
```

### **2. Получение уведомлений**
```http
GET /users/me/notifications
Authorization: Bearer <token>
```

### **3. Загрузка аватара**
```http
POST /users/me/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
#### 🔹 **Тело запроса**
- `file`: Файл изображения
