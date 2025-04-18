# Пользовательские сценарии

## 📌 Основные роли
- **Гость** – неавторизованный пользователь
- **Игрок (Player)** – базовая роль после регистрации
- **Мастер (Master)** – может создавать события, роль назначается автоматически
- **Админ (Admin)** – управляет пользователями, событиями, новостями

---

## 🔹 Сценарии для гостей (неавторизованных пользователей)

### **1. Регистрация в системе**
#### Шаги:
1. Открывает форму регистрации.
2. Вводит **логин, email, телефон и пароль**.
3. Отправляет запрос:
   ```http
   POST /auth/register
   ```
4. Получает **токен** и становится **Игроком (Player)**.

### **2. Авторизация в системе**
#### Шаги:
1. Вводит email и пароль.
2. Отправляет запрос:
   ```http
   POST /auth/login
   ```
3. Получает **токен**.

### **3. Просмотр списка новостей**
#### Шаги:
1. Открывает страницу новостей.
2. Отправляет запрос:
   ```http
   GET /common/news
   ```

### **4. Просмотр списка фильтров**
#### Шаги:
1. Открывает страницу фильтров.
2. Отправляет запрос:
   ```http
   GET /common/filters
   ```

---

## 🔹 Сценарии для игроков (Player)

### **5. Просмотр профиля**
```http
GET /users/me
```

### **6. Изменение данных профиля**
```http
PATCH /users/me
```

### **7. Удаление аккаунта**
```http
DELETE /users/me
```

### **8. Просмотр других пользователей**
```http
GET /users/:id
```

### **9. Просмотр своих уведомлений**
```http
GET /users/me/notifications
```

---

## 🔹 Сценарии для мастеров (Master)

### **10. Создание нового события**
```http
POST /events
```

### **11. Просмотр событий**
```http
GET /events
```

### **12. Редактирование своего события**
```http
PUT /events/:id
```

### **13. Удаление своего события**
```http
DELETE /events/:id
```

### **14. Ответ на приглашение в событие**
```http
POST /events/:id/invitation-response
```

---

## 🔹 Сценарии для админов (Admin)

### **15. Утверждение события**
```http
POST /admin/events/:id/approve
```

### **16. Отклонение события**
```http
POST /admin/events/:id/reject
```

### **17. Блокировка пользователя**
```http
PATCH /admin/users/:id/block
```

### **18. Разблокировка пользователя**
```http
PATCH /admin/users/:id/unblock
```

### **19. Добавление нового фильтра**
```http
POST /admin/filters
```

### **20. Управление новостями**
- **Создать новость:**
  ```http
  POST /admin/news
  ```
- **Обновить новость:**
  ```http
  PUT /admin/news/:id
  ```
- **Удалить новость:**
  ```http
  DELETE /admin/news/:id
  ```

---

## 🎯 Итог
Этот список покрывает **основные сценарии** взаимодействия пользователей с API:
- 🔹 **Гости** → Регистрация, вход, просмотр новостей.
- 🔹 **Игроки (Player)** → Профиль, уведомления, участие в событиях.
- 🔹 **Мастера (Master)** → Создание, редактирование и управление событиями.
- 🔹 **Админы (Admin)** → Управление пользователями, событиями, новостями.

🚀 **Можно использовать этот список для тестирования и документации API!**

