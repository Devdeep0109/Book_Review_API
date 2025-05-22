Here's a polished `README.md` for your [Book\_Review\_API](https://github.com/Devdeep0109/Book_Review_API) repository, covering everything you asked for:

---

````markdown
# 📚 Book Review API

A **RESTful API** built using **Node.js**, **Express.js**, and **MongoDB**, designed for managing books and user-submitted reviews.
The application supports full user authentication, secure route access, and cleanly organizes data retrieval 
with pagination.

---

## Project Setup Instructions

**1. Clone the Repository**
```bash
git clone https://github.com/Devdeep0109/Book_Review_API.git
cd Book_Review_API
````

**2. Install Dependencies**

```bash
npm install
```

**3. Create a `.env` File**
In the root directory, create a `.env` file and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
```

**4. Start the Server**

```bash
npm start
# or for development mode
npm run dev
```

---

## How to Run Locally

1. Ensure MongoDB is running locally or connect via MongoDB Atlas.
2. Run:

   ```bash
   node index.js
   # or
   npm run dev
   ```
3. The server will run at: `http://localhost:8000`

---

## Example API Requests (Postman)

### 🔐 Signup

**POST** `/signup`

```json
{
  "username": "ram",
  "password": "ram12@",
  "email": "ram@gmail.com"
}
```

### 🔐 Login

**POST** `/login`

```json
{
  "email": "ram@gmail.com",
  "password": "ram12@"
}
```

### 📚 Add a Book

**POST** `/books`

* Headers: `Authorization: Bearer <token>`

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Software",
  "description": "Classic book on clean coding principles."
}
```

### 📖 Get All Books

**GET** `/books`

### 📖 Get Book by ID

**GET** `/books/:bookId`

### ✍️ Add Review

**POST** `/books/:bookId/reviews`

* Headers: `Authorization: Bearer <token>`

```json
{
  "content": "Excellent read!",
  "averageRating": 5
}
```

### ✏️ Update Review

**PUT** `/reviews/:reviewId`

* Headers: `Authorization: Bearer <token>`

```json
{
  "content": "Updated review content",
  "averageRating": 4
}
```

### 🗑️ Delete Review

**DELETE** `/reviews/:reviewId`

* Headers: `Authorization: Bearer <token>`

### 🔎 Search Books

**GET** `/search?q=clean`

---

## 💡 Design Decisions & Assumptions

* **JWT Authentication** is implemented for protected routes.
* **Password Hashing** is done with `crypto` using HMAC and salt.
* **Books & Reviews** are associated with authenticated users.
* **Pagination** is implemented for book listing.
* API follows **REST principles** with structured request/response patterns.

---

## 📁 Project Folder Structure

```
Book_Review_API/
│
├── config/             # MongoDB config and JWT utilities
├── controllers/        # Logic for user, book, review operations
├── middleware/         # Auth middlewares (JWT verification)
├── models/             # Mongoose models (User, Book, Review)
├── routes/             # Route definitions
├── docs/               # Documentation (Postman collection, schema diagrams)
│   └── book_review_api_collection.json
├── .env.example        # Example env file
├── index.js            # Entry point
├── package.json
└── README.md
```

---

## 📎 Postman Documentation

Import the collection below to test all endpoints:

📥 [Postman Collection – book\_review\_api\_collection.json](docs/book_review_api_collection.json)

---



