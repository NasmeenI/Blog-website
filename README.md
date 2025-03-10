# Express Blog API

This project provides an Express-based backend with authentication and a blog system, using MongoDB as the database. The backend is containerized using Docker.

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### ⚙️ Setup and Run

#### 1️⃣ Configure Environment Variables
Inside the existing `config` folder, create a file named `config.env` (if not already created) and add the following:

```env
MONGO_INITDB_ROOT_USERNAME="myuser"
MONGO_INITDB_ROOT_PASSWORD="mypassword"
MONGO_INITDB_DATABASE="mydatabase"

PORT="8080"
NODE_ENV="development"
MONGO_URI="mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${MONGO_INITDB_DATABASE}"

JWT_SECRET="dasf;kagvg"
JWT_EXPIRE="30d"
JWT_COOKIE_EXPIRE="30"
```

#### 2️⃣ Run the Application
Navigate to the project root directory and execute:

```sh
docker-compose up --build -d
```
This will build and start the backend server and MongoDB in detached mode.

#### 3️⃣ Verify Running Containers
Run:
```sh
docker ps
```
Ensure that both `app` and `mongo` containers are running.

#### 4️⃣ Access the API
The server will be available at: [http://localhost:8080](http://localhost:8080)

---

## 📌 API Documentation

### Base URL
```
http://localhost:8080/api/v1
```

### 🔑 Authentication API

#### Register User
- **Endpoint:** `POST /auth/register`
- **Description:** Registers a new user.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "role": "user"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "jwt-token"
  }
  ```

#### Login User
- **Endpoint:** `POST /auth/login`
- **Description:** Authenticates a user and returns a token.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "jwt-token"
  }
  ```

#### Get Current User
- **Endpoint:** `GET /auth/me`
- **Description:** Retrieves the authenticated user.
- **Access:** Private (Requires JWT token in Authorization header)
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "userId",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "user",
      "createdAt": "2024-03-10T00:00:00.000Z"
    }
  }
  ```

### 📝 Blog API

#### Get All Blogs
- **Endpoint:** `GET /blogs`
- **Description:** Retrieves all blogs.
- **Access:** Private (Requires JWT token and user role authorization)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "blogId",
        "title": "Blog Title",
        "content": "Blog content...",
        "user": "userId",
        "createdAt": "2024-03-10T00:00:00.000Z",
        "updatedAt": "2024-03-10T00:00:00.000Z"
      }
    ]
  }
  ```

#### Get Single Blog
- **Endpoint:** `GET /blogs/:id`
- **Description:** Retrieves a specific blog by ID.
- **Access:** Private (Requires JWT token and user role authorization)
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "blogId",
      "title": "Blog Title",
      "content": "Blog content...",
      "user": "userId",
      "createdAt": "2024-03-10T00:00:00.000Z",
      "updatedAt": "2024-03-10T00:00:00.000Z"
    }
  }
  ```

#### Create a Blog
- **Endpoint:** `POST /blogs`
- **Description:** Creates a new blog post.
- **Access:** Private (Requires JWT token and user role authorization)
- **Request Body:**
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of my blog post."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "blogId",
      "title": "My First Blog",
      "content": "This is the content of my blog post.",
      "user": "userId",
      "createdAt": "2024-03-10T00:00:00.000Z",
      "updatedAt": "2024-03-10T00:00:00.000Z"
    }
  }
  ```

#### Update a Blog
- **Endpoint:** `PUT /blogs/:id`
- **Description:** Updates an existing blog post.
- **Access:** Private (Requires JWT token and user role authorization)
- **Request Body:**
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated content."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "blogId",
      "title": "Updated Blog Title",
      "content": "Updated content.",
      "user": "userId",
      "createdAt": "2024-03-10T00:00:00.000Z",
      "updatedAt": "2024-03-10T00:00:00.000Z"
    }
  }
  ```

#### Delete a Blog
- **Endpoint:** `DELETE /blogs/:id`
- **Description:** Deletes an existing blog post.
- **Access:** Private (Requires JWT token and user role authorization)
- **Response:**
  ```json
  {
    "success": true,
    "data": {}
  }
  ```

---

## 🛑 Stopping and Cleaning Up
To stop and remove containers, use:
```sh
docker-compose down
```
