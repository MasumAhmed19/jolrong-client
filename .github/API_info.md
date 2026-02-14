# Jolrong Server API Documentation

This documentation provides details on all available API endpoints for the Jolrong Server.

**Base URL**: `http://localhost:5000/api/v1` (Development) / `https://jolrong-server.vercel.app/api/v1` (Production)

---

## 🔐 Authentication Module

### 1. Register User
Create a new user account.
- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "strongpassword"
  }
  ```
- **Response**: User object (password omitted/hashed).

### 2. Login
Login with credentials. Returns Access and Refresh tokens via Cookies (and typically data in response).
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "strongpassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Login successful",
    "data": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
  ```

### 3. Logout
Clear auth cookies.
- **Endpoint**: `/auth/logout`
- **Method**: `POST`
- **Body**: None

---

## 👤 User Module

### 1. Get Me
Get currently logged-in user profile.
- **Endpoint**: `/user/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User profile data.

### 2. Change Password
- **Endpoint**: `/user/change-password`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "oldPassword": "oldpass",
    "newPassword": "newpass"
  }
  ```

---

## 🏗️ Project Module

### 1. Create Project (Admin Only)
- **Endpoint**: `/project`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (JSON):
  ```json
  {
    "name": "Luxury Villa",
    "client": "Mr. Smith",
    "location": "Dhaka",
    "size": "3000 sqft",
    "type": "INTERIOR", // See Enums below
    "status": "ONGOING", // See Enums below
    "typeofWork": ["DESIGN", "VISUALIZATION"], // Array
    "year": "2024",
    "description": " Detailed description...",
    "image": "https://cloudinary.url/image.jpg",
    "gallery": ["url1", "url2"],
    "isFeatured": true,
    "isPublic": true,
    "tags": ["modern", "luxury"],
    "featuredVideo": "youtube_link_or_url"
  }
  ```

### 2. Get All Projects
- **Endpoint**: `/project`
- **Method**: `GET`
- **Query Params**:
  - `page`: Page number (default 1)
  - `limit`: Items per page (default 10)
  - `search`: Search by name
  - `type`: Filter by ProjectType
  - `status`: Filter by ProjectStatus
  - `isFeatured`: boolean
  - `isPublic`: boolean

### 3. Get Project by Slug
- **Endpoint**: `/project/:slug`
- **Method**: `GET`

### 4. Get Related Projects
- **Endpoint**: `/project/related/:slug`
- **Method**: `GET`
- **Query Params**: `limit` (default 6)

### 5. Update Project (Admin Only)
- **Endpoint**: `/project/:id`
- **Method**: `PATCH`
- **Body**: Partial project object.

### 6. Delete Project (Admin Only)
- **Endpoint**: `/project/:id`
- **Method**: `DELETE`

**Project Enums:**
- **type**: `EXTERIOR`, `INTERIOR`, `STRUCTURAL`, `GRAPHICS`, `LANDSCAPE`
- **status**: `ONGOING`, `COMPLETED`, `UPCOMING`
- **typeofWork**: `DESIGN`, `VISUALIZATION`, `ANIMATION`, `CONSULTANCY`

---

## 📝 Creative Module (Sharing only Art Gallery)

### 1. Create Post (Admin Only)
**Note**: Uses `multipart/form-data`.
- **Endpoint**: `/creative/create`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Form Data**:
  - `image`: File (image)
  - `data`: JSON stringified object (OR individual fields if controller parses body directly, but usually for file upload integration it might expect fields):
    - `title`: string
    - `content`: string (HTML/Markdown)
    - `tags`: array of strings (or comma separated if plain form fields)
    - `isFeatured`: boolean
    - `isPublic`: boolean
  *Check implementation*: `req.body` handles text fields, `req.file` handles image. So send text fields as normal form-data fields.

### 2. Get All Posts
- **Endpoint**: `/creative`
- **Method**: `GET`
- **Query Params**: `page`, `limit`, `search`.

### 3. Get Post by Identifier
- **Endpoint**: `/creative/:identifier` (Accepts slug or ID)
- **Method**: `GET`

### 4. Update Post (Admin Only)
- **Endpoint**: `/creative/:id`
- **Method**: `PATCH`
- **Form Data**: Same as create (optional fields).

### 5. Delete Post (Admin Only)
- **Endpoint**: `/creative/:id`
- **Method**: `DELETE`

---

## 🖼️ Gallery Module

### 1. Upload Images (Admin Only)
- **Endpoint**: `/gallery/upload`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Form Data**:
  - `images`: Array of files (Key: `images`, Max 5)

### 2. List Images
- **Endpoint**: `/gallery/list`
- **Method**: `GET`
- **Query Params**: `page`, `limit`.

### 3. Delete Image (Admin Only)
- **Endpoint**: `/gallery/:id`
- **Method**: `DELETE`
