# 🎬 CineBook – Movie Ticket Booking Platform

CineBook is a **full-stack movie ticket booking platform** built using the **MERN stack** that allows users to browse movies, select seats, and securely book tickets online.
The platform includes an **admin dashboard**, **Stripe payment integration**, **seat locking logic**, and **email notifications for newly added movies**.

---

# 🔗 Live Demo

**User App**
[https://cinebook-zeta.vercel.app/](https://cinebook-zeta.vercel.app/)

**Admin Panel**
[https://cinebook-zeta.vercel.app/admin](https://cinebook-zeta.vercel.app/admin)

**Backend API**
[https://cinebook-server-ebon.vercel.app/](https://cinebook-server-ebon.vercel.app/)

---

# 🚀 Features

### 👤 User

* Browse movies fetched from **TMDB API**
* View **movie details and show timings**
* **Seat selection** for booking tickets
* **Stripe payment integration**
* **Add movies to favorites**
* **10-minute seat lock** during booking to prevent conflicts

### 🛠 Admin

* Add new movies
* Configure **multiple show timings for a movie**
* View **all movies**
* Monitor **booked seats and bookings**

### 📧 Email Notifications

* When an **admin adds a new movie**, users automatically receive an **email notification** about the movie.

---

# ⚙️ Tech Stack

**Frontend**

* React.js
* Tailwind CSS
* React Router
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* JWT Authentication

**Integrations**

* TMDB API (movie data)
* Stripe (payments)
* Nodemailer / SMTP (email notifications)

**Deployment**

* Frontend: Vercel
* Backend: Vercel

---

# 🎟 Seat Lock Logic

When a user selects seats, they are **temporarily locked for 10 minutes**.
If the payment is not completed within this time, the seats are **automatically released**, preventing double booking.

---

# 👩‍💻 Author

**Meghana Ponna**
Full Stack Developer

GitHub: [https://github.com/MeghanaPonna](https://github.com/MeghanaPonna)

---
