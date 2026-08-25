# ShopKaro Backend REST API Documentation

- **Base URL**: `http://localhost:5001/api`
- **Authentication**: Bearer Token in Request Header: `Authorization: Bearer <JWT_TOKEN>`
- **Response Standard Format**:
  ```json
  {
    "status": "success | error",
    "message": "Human readable message",
    "data": { ... }
  }
  ```

---

## 1. System & Health
### `GET /api/health`
- **Access**: Public
- **Description**: Health-check endpoint verifying Express backend operational status.
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "message": "ShopKaro Backend API is running smoothly",
    "timestamp": "2026-08-25T20:30:00.000Z",
    "environment": "development"
  }
  ```

---

## 2. Authentication (`/api/auth`)
### `POST /api/auth/register`
- **Access**: Public
- **Body**:
  ```json
  {
    "name": "Shubhashish Bhattacharya",
    "email": "shubh@shopkaro.com",
    "password": "Password123"
  }
  ```
- **Response**: `201 Created` returning user object & JWT token.

### `POST /api/auth/login`
- **Access**: Public
- **Body**:
  ```json
  {
    "email": "shubh@shopkaro.com",
    "password": "Password123"
  }
  ```
- **Response**: `201 Created` returning user object & JWT token.

---

## 3. User Profile (`/api/users`)
### `GET /api/users/profile`
- **Access**: Protected (`USER` or `ADMIN`)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` returning profile info.

### `PUT /api/users/profile`
- **Access**: Protected (`USER` or `ADMIN`)
- **Body**: `{ "name": "Updated Name" }`
- **Response**: `200 OK`.

---

## 4. Product Catalog (`/api/products`)
### `GET /api/products`
- **Access**: Public
- **Query Params**: `category`, `search`, `minPrice`, `maxPrice`
- **Response**: `200 OK` array of products.

### `GET /api/products/:id`
- **Access**: Public
- **Response**: `200 OK` product detail object with reviews and category.

### `POST /api/products`
- **Access**: Protected (`ADMIN Only`)
- **Body**: `{ "name": "...", "price": 1000, "stock": 10, "categoryId": "..." }`
- **Response**: `201 Created`.

### `PUT /api/products/:id`
- **Access**: Protected (`ADMIN Only`)
- **Response**: `200 OK`.

### `DELETE /api/products/:id`
- **Access**: Protected (`ADMIN Only`)
- **Response**: `200 OK`.

### `POST /api/products/:id/reviews`
- **Access**: Protected (`USER`)
- **Body**: `{ "rating": 5, "comment": "Great product!" }`
- **Response**: `201 Created`.

---

## 5. Categories (`/api/categories`)
### `GET /api/categories`
- **Access**: Public
- **Response**: `200 OK` list of categories with product counts.

### `POST /api/categories`
- **Access**: Protected (`ADMIN Only`)
- **Body**: `{ "name": "Electronics", "slug": "electronics" }`
- **Response**: `201 Created`.

---

## 6. Orders & Checkout (`/api/orders`)
### `POST /api/orders`
- **Access**: Protected (`USER`)
- **Body**:
  ```json
  {
    "totalAmount": 26990,
    "address": "123 Main Street",
    "city": "Bengaluru",
    "postalCode": "560001",
    "country": "India",
    "items": [
      { "productId": "prod-1", "quantity": 1, "price": 26990 }
    ]
  }
  ```
- **Response**: `201 Created`.

### `GET /api/orders/my-orders`
- **Access**: Protected (`USER`)
- **Response**: `200 OK` list of user's past orders.

### `GET /api/orders/admin`
- **Access**: Protected (`ADMIN Only`)
- **Response**: `200 OK` list of all customer orders.

### `PUT /api/orders/:id/status`
- **Access**: Protected (`ADMIN Only`)
- **Body**: `{ "status": "SHIPPED" }`
- **Response**: `200 OK`.
