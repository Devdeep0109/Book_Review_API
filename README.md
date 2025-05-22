# Book_Review_API
A RESTful API built with Node.js and MongoDB for managing books and user reviews. Features include book search, detailed book info with paginated reviews, user authentication, and review management.



## 🚀 Project Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Devdeep0109/Book_Review_API.git
cd Book_Review_API


### 2. Install dependencies
npm install


### 3. Create .env file
Create a .env file in the root directory and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000


### 4. Start the server
npm start


### 💻 How to Run Locally
Make sure MongoDB is running locally or connected via MongoDB Atlas. Then run:

node index.js
# or
npm run dev


**API Endpoints with Example Requests**

🔐 Signup
POST /signup
Body:
{
  "username": "ram",
  "password": "ram12@",
  "email": "ram@gmail.com"
}

Response:
{
  "username": "ram",
  "email": "ram@gmail.com",
  "_id": "...",
  "createdAt": "...",
  "updatedAt": "...",
  "salt": "...",
  "__v": 0
}

🔐 Login
POST /login
Body:
{
  "password": "ram12@",
  "email": "ram@gmail.com"
}

Response:
{
  "success": true,
  "token": "JWT_TOKEN"
}

📚 Add Book
POST /books
Headers: Authorization: Bearer <token>
Body:
{
  "title": "Clean Architecture",
  "author": "Robert C. Martin",
  "genre": "Software Engineering",
  "description": "A guide to structuring systems for maintainability and scalability."
}

📖 Get All Books
GET /books
Returns a list of all books with pagination and user who added them.

🔍 Get Book by ID
GET /books/:bookId
Returns a single book with full details.

✍️ Add Review
POST /books/:bookId/reviews
Headers: Authorization: Bearer <token>
Body:
{
  "content": "Great explanation of software architecture principles.",
  "averageRating": 5
}

✏️ Update Review
PUT /reviews/:reviewId
Headers: Authorization: Bearer <token>
Body:
{
  "content": "Updated review content",
  "averageRating": 4
}

🗑️ Delete Review
DELETE /reviews/:reviewId
Headers: Authorization: Bearer <token>


🔎 Search Books
GET /search?q=clean
Returns books with titles matching the keyword.


### 💡 Design Decisions and Assumptions
Passwords are hashed using HMAC with salt before storing.
JWT is used for authentication.
Each book is associated with the user who created it.
Each review is associated with both a book and a user.
Token is required for protected routes (add book, add/update/delete reviews).
Pagination is implemented for listing books.

###🗂️ Database Schema Overview

🔹 Users
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "password": String (hashed),
  "salt": String,
  "createdAt": Date
}

🔹 Books  
{
  "_id": ObjectId,
  "title": String,
  "author": String,
  "genre": String,
  "description": String,
  "createdBy": ObjectId (ref: User),
  "createdAt": Date
}

🔹 Reviews
{
  "_id": ObjectId,
  "bookId": ObjectId (ref: Book),
  "userId": ObjectId (ref: User),
  "content": String,
  "averageRating": Number,
  "createdAt": Date
}

### 🧾 Example Postman Collection
📎 [Postman Collection](docs/postman_collection.json)


