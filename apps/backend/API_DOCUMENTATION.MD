# Hall of Heroes API Documentation

## 🔹 Базовая информация

**Базовый URL**: `http://localhost:5001`

**Формат даты**: `YYYY-MM-DD`
**Формат времени**: `HH:mm`

## 🔹 Коды ответов

- `200` - Успешный запрос
- `201` - Ресурс создан
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Доступ запрещен
- `404` - Ресурс не найден
- `409` - Конфликт
- `429` - Слишком много запросов
- `500` - Внутренняя ошибка сервера

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
  "username": "JohnDoe",
  "phone": "+7 999 999-99-99"
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
    "phone": "+7 999 999-99-99",
    "role": "Player"
  }
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат данных
- `409` - Пользователь уже существует
- `429` - Слишком много попыток регистрации

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
    "phone": "+7 999 999-99-99",
    "role": "Player",
    "roles": ["Master"]
  }
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат данных
- `401` - Неверные учетные данные
- `429` - Слишком много попыток входа

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
#### 🔹 **Ошибки**
- `401` - Неверный или отсутствующий токен

### **4. Выход**
```http
DELETE /auth/session
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Сессия завершена"
}
```
#### 🔹 **Ошибки**
- `401` - Неверный или отсутствующий токен

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
  "role": "Master"
}
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Роль пользователя обновлена",
  "roles": ["Master"]
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат данных
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Пользователь не найден

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
- `format` (опционально): фильтр по формату
- `system` (опционально): фильтр по системе
- `genre` (опционально): фильтр по жанру
- `playerExperience` (опционально): фильтр по опыту игроков

#### 🔹 **Примеры использования**
```
GET /events/all?dateFrom=2024-04-01  // все события с 1 апреля 2024
GET /events/all?dateTill=2024-04-30  // все события до 30 апреля 2024
GET /events/all?dateFrom=2024-04-01&dateTill=2024-04-30  // события с 1 по 30 апреля 2024
GET /events/all?format=Игровая сессия&system=D&D 5e  // фильтр по формату и системе
```

#### 🔹 **Ответ (200)**
```json
{
  "events": [
    {
      "id": "event_id",
      "title": "D&D Кампания",
      "shortDescription": "Краткое описание",
      "description": "Полное описание",
      "organizerInfo": "Информация об организаторе",
      "format": "Игровая сессия",
      "system": "D&D 5e",
      "setting": "Forgotten Realms",
      "duration": "4-5 часов",
      "playerExperience": "Для новичков",
      "genre": "Фэнтези",
      "characterLevel": "1-5 уровень",
      "imageUrl": "https://example.com/image.jpg",
      "date": "2024-03-25",
      "startTime": "18:00",
      "endTime": "22:00",
      "location": "Место проведения",
      "price": 2000,
      "discount": 10,
      "maxParticipants": 6,
      "currentParticipants": 2,
      "status": "approved",
      "isPrivate": false,
      "creator": {
        "id": "user_id",
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

### **2. Получение события по ID**
```http
GET /events/:id
```
#### 🔹 **Ответ (200)**
```json
{
  "id": "event_id",
  "title": "D&D Кампания",
  "shortDescription": "Краткое описание",
  "description": "Полное описание",
  "organizerInfo": "Информация об организаторе",
  "format": "Игровая сессия",
  "system": "D&D 5e",
  "setting": "Forgotten Realms",
  "duration": "4-5 часов",
  "playerExperience": "Для новичков",
  "genre": "Фэнтези",
  "characterLevel": "1-5 уровень",
  "imageUrl": "https://example.com/image.jpg",
  "date": "2024-03-25",
  "startTime": "18:00",
  "endTime": "22:00",
  "location": "Место проведения",
  "price": 2000,
  "discount": 10,
  "maxParticipants": 6,
  "currentParticipants": 2,
  "status": "approved",
  "isPrivate": false,
  "creator": {
    "id": "user_id",
    "username": "DungeonMaster"
  },
  "applications": [
    {
      "id": "application_id",
      "user": {
        "id": "user_id",
        "username": "Player1",
        "avatar": "https://example.com/avatar.jpg"
      },
      "status": "pending",
      "createdAt": "2024-03-20T10:00:00Z"
    }
  ]
}
```
#### 🔹 **Ошибки**
- `404` - Событие не найдено

### **3. Создание события**
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
  "format": "Игровая сессия",
  "system": "D&D 5e",
  "setting": "Ravenloft",
  "duration": "4-5 часов",
  "playerExperience": "Для опытных игроков",
  "genre": "Хоррор",
  "characterLevel": "5-10 уровень",
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
#### 🔹 **Ответ (201)**
```json
{
  "id": "event_id",
  "message": "Событие создано"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат данных
- `401` - Не авторизован

### **4. Обновление события**
```http
PUT /events/:id
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "title": "Обновленное название",
  "description": "Обновленное описание",
  "date": "2024-04-01",
  "startTime": "19:00",
  "endTime": "23:00"
}
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Событие обновлено"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат данных
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Событие не найдено

### **5. Удаление события**
```http
DELETE /events/:id
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Событие удалено"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Событие не найдено

### **6. Подача заявки на участие**
```http
POST /events/:id/apply
Authorization: Bearer <token>
```
#### 🔹 **Ответ (201)**
```json
{
  "message": "Заявка подана",
  "applicationId": "application_id"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Регистрация закрыта
- `404` - Событие не найдено
- `409` - Заявка уже подана

### **7. Получение списка заявок** (для мастера)
```http
GET /events/:id/applications
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "applications": [
    {
      "id": "application_id",
      "user": {
        "id": "user_id",
        "username": "Player1",
        "avatar": "https://example.com/avatar.jpg",
        "rating": 4.5
      },
      "status": "pending",
      "createdAt": "2024-03-20T10:00:00Z"
    }
  ]
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Событие не найдено

### **8. Одобрение игрока** (для мастера)
```http
POST /events/:id/approve-player
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "userId": "user_id"
}
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Игрок одобрен"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Событие или пользователь не найдены

### **9. Отклонение игрока** (для мастера)
```http
POST /events/:id/reject-player
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "userId": "user_id"
}
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Игрок отклонен"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Событие или пользователь не найдены

### **10. Закрытие регистрации** (для мастера)
```http
POST /events/:id/close-registration
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Регистрация закрыта"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Событие не найдено

### **11. Открытие регистрации** (для мастера)
```http
POST /events/:id/open-registration
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Регистрация открыта"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Событие не найдено

## 🔹 Пользователи (`/user`)

### **1. Получение текущего пользователя**
```http
GET /user/me
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "id": "user_id",
  "username": "JohnDoe",
  "email": "user@example.com",
  "phone": "+7 999 999-99-99",
  "avatar": "https://example.com/avatar.jpg",
  "role": "Player",
  "roles": ["Master"],
  "rating": 4.5,
  "createdAt": "2024-01-01T00:00:00Z"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован

### **2. Обновление текущего пользователя**
```http
PATCH /user/me
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "username": "NewUsername",
  "phone": "+7 999 999-99-99",
  "avatar": "https://example.com/new-avatar.jpg"
}
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Данные пользователя обновлены"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат данных
- `401` - Не авторизован
- `409` - Имя пользователя уже занято

### **3. Удаление текущего пользователя**
```http
DELETE /user/me
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Пользователь удален"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован

### **4. Получение пользователя по ID**
```http
GET /user/:id
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "id": "user_id",
  "username": "JohnDoe",
  "avatar": "https://example.com/avatar.jpg",
  "role": "Player",
  "rating": 4.5,
  "createdAt": "2024-01-01T00:00:00Z"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `404` - Пользователь не найден

### **5. Получение уведомлений**
```http
GET /user/me/notifications
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "notifications": [
    {
      "id": "notification_id",
      "type": "event_approved",
      "message": "Ваша заявка на событие одобрена",
      "read": false,
      "createdAt": "2024-03-20T10:00:00Z",
      "data": {
        "eventId": "event_id",
        "eventTitle": "D&D Кампания"
      }
    }
  ]
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован

### **6. Загрузка аватара**
```http
POST /user/me/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
#### 🔹 **Тело запроса**
- `file`: Файл изображения (jpeg, png, gif, webp)

#### 🔹 **Ответ (200)**
```json
{
  "avatarUrl": "/uploads/avatars/image-123456789.jpg"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат файла
- `401` - Не авторизован

## 🔹 Административные функции (`/admin`)

### **1. Получение всех пользователей**
```http
GET /admin/users
Authorization: Bearer <token>
```
#### 🔹 **Параметры запроса**
- `page` (опционально): номер страницы (по умолчанию: 1)
- `limit` (опционально): количество пользователей на странице (по умолчанию: 10)
- `role` (опционально): фильтр по роли
- `status` (опционально): фильтр по статусу (active/blocked)

#### 🔹 **Ответ (200)**
```json
{
  "users": [
    {
      "id": "user_id",
      "username": "JohnDoe",
      "email": "user@example.com",
      "role": "Player",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLogin": "2024-03-20T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10
  }
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `403` - Недостаточно прав

### **2. Блокировка пользователя**
```http
PATCH /admin/users/:id/block
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Пользователь заблокирован"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Пользователь не найден

### **3. Разблокировка пользователя**
```http
PATCH /admin/users/:id/unblock
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Пользователь разблокирован"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Пользователь не найден

### **4. Одобрение события**
```http
POST /admin/events/:id/approve
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Событие одобрено"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Событие не найдено

### **5. Отклонение события**
```http
POST /admin/events/:id/reject
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "reason": "Причина отклонения"
}
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Событие отклонено"
}
```
#### 🔹 **Ошибки**
- `400` - Не указана причина
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Событие не найдено

## 🔹 Новости (`/common`)

### **1. Получение новостей**
```http
GET /common/news
```
#### 🔹 **Параметры запроса**
- `page` (опционально): номер страницы (по умолчанию: 1)
- `limit` (опционально): количество новостей на странице (по умолчанию: 10)
- `sort` (опционально): сортировка по дате (asc/desc)

#### 🔹 **Ответ (200)**
```json
{
  "news": [
    {
      "id": "news_id",
      "title": "Заголовок новости",
      "content": "Содержание новости",
      "imageUrl": "https://example.com/news-image.jpg",
      "createdAt": "2024-03-20T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10
  }
}
```

### **2. Создание новости** (админ)
```http
POST /admin/news
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "title": "Заголовок новости",
  "content": "Содержание новости",
  "imageUrl": "https://example.com/news-image.jpg"
}
```
#### 🔹 **Ответ (201)**
```json
{
  "id": "news_id",
  "message": "Новость создана"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат данных
- `401` - Не авторизован
- `403` - Недостаточно прав

### **3. Обновление новости** (админ)
```http
PUT /admin/news/:id
Authorization: Bearer <token>
Content-Type: application/json
```
#### 🔹 **Тело запроса**
```json
{
  "title": "Обновленный заголовок",
  "content": "Обновленное содержание",
  "imageUrl": "https://example.com/new-image.jpg"
}
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Новость обновлена"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат данных
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Новость не найдена

### **4. Удаление новости** (админ)
```http
DELETE /admin/news/:id
Authorization: Bearer <token>
```
#### 🔹 **Ответ (200)**
```json
{
  "message": "Новость удалена"
}
```
#### 🔹 **Ошибки**
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Новость не найдена

### **5. Получение фильтров**
```http
GET /common/filters
```
#### 🔹 **Ответ (200)**
```json
{
  "formats": ["Игровая сессия", "Кампания", "Однодневка"],
  "systems": ["D&D 5e", "Pathfinder", "Warhammer"],
  "genres": ["Фэнтези", "Хоррор", "Научная фантастика"],
  "playerExperience": ["Для новичков", "Для опытных игроков", "Для всех"]
}
```

## 🔹 Загрузка файлов (`/upload`)

### **1. Загрузка изображения**
```http
POST /upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
#### 🔹 **Тело запроса**
- `image`: Файл изображения (jpeg, png, gif, webp)

#### 🔹 **Ответ (200)**
```json
{
  "imageUrl": "/uploads/images/image-123456789.jpg"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат файла
- `401` - Не авторизован

### **2. Административная загрузка изображения**
```http
POST /upload/admin/image
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
#### 🔹 **Тело запроса**
- `image`: Файл изображения (jpeg, png, gif, webp)

#### 🔹 **Ответ (200)**
```json
{
  "imageUrl": "/uploads/admin/images/image-123456789.jpg"
}
```
#### 🔹 **Ошибки**
- `400` - Неверный формат файла
- `401` - Не авторизован
- `403` - Недостаточно прав
