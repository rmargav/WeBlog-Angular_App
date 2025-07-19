# 📝 WeBlog - Angular Blog Application

**WeBlog** is a dynamic blog application built using **Angular** and powered by **Firebase**. It allows users to read categorized blog posts, view individual entries, and manage content through add/delete functionality. The app also features user authentication and category filtering.

This project demonstrates real-world Angular concepts such as routing, services, component-based architecture, and integration with a Firebase Realtime Database.

---

## ⚙️ Features

- 🔐 User Authentication (Login / Register)
- 📚 Category-wise blog filtering
- 📝 Create, delete, and view blog posts
- 🖼️ Image support for each blog post
- 💡 Single blog post detail view
- ♻️ Reusable Angular components (e.g., PostCard, Navbar)
- 🔥 Firebase Realtime Database & Authentication integration

---

## 🧑‍💻 Technology Stack

- **Angular** (v14)
- **Firebase** (Realtime Database & Auth)
- **TypeScript**
- **RxJS** for reactive programming
- **Bootstrap 5** & custom CSS

---

## 📸 Screenshots

### 🔐 Login
![Login](/angular_WeBlog_app/src/assets/images/screenshots/1.png)

### ❌ Login Validation
![Login Validation](/angular_WeBlog_app/src/assets/images/screenshots/2.png)

### 🏠 Dashboard
![Dashboard](/angular_WeBlog_app/src/assets/images/screenshots/3.png)

### 📂 Categories
![Categories](/angular_WeBlog_app/src/assets/images/screenshots/4.png)

### ✏️ Edit Categories
![Edit Categories](/angular_WeBlog_app/src/assets/images/screenshots/5.png)

### 📰 All Blog Posts
![All Blog Posts](/angular_WeBlog_app/src/assets/images/screenshots/6.png)

### ➕ Add New Post
![Add New Post](/angular_WeBlog_app/src/assets/images/screenshots/7.png)

### 🏠 Home Page
![Home Page](/angular_WeBlog_app/src/assets/images/screenshots/8.png)

### 📄 Single Post View
![Single Post](/angular_WeBlog_app/src/assets/images/screenshots/9.png)

### 👥 Subscribers Page
![Subscribers](/angular_WeBlog_app/src/assets/images/screenshots/10.png)

### ℹ️ About Us
![About Us](/angular_WeBlog_app/src/assets/images/screenshots/11.png)

### 📧 Contact Us
![Contact Us](/angular_WeBlog_app/src/assets/images/screenshots/12.png)

### 📜 Terms & Conditions
![Terms & Conditions](/angular_WeBlog_app/src/assets/images/screenshots/13.png)

### 🔓 Logout
![Logout](/angular_WeBlog_app/src/assets/images/screenshots/14.png)

---

## 📁 Folder Structure

WeBlog-Angular_App/
├── src/
│ ├── app/
│ │ ├── components/ # Reusable UI components (PostCard, Navbar, etc.)
│ │ ├── pages/ # Pages like Home, Login, SinglePost, etc.
│ │ ├── services/ # Firebase, blog, and auth services
│ │ └── app.module.ts
│ ├── assets/
│ │ └── images/screenshots/ # Screenshots for documentation
├── angular.json
├── firebase.json
└── package.json
