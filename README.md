
# MediBook 🏥

MediBook is a full-stack hospital appointment management platform designed for small hospitals and clinics. It provides a simple and efficient way for patients to find doctors, check their availability, book appointments, and manage payments.

The platform also includes dedicated **Admin** and **Doctor** portals for managing doctors, appointments, availability, leave requests, and patient appointments.

## 🌐 Live Demo

- Patient Portal: https://medi-book-gold.vercel.app/
- Admin & Doctor Portal: https://medi-book-admin-one.vercel.app/
- Backend API: https://medibook-backend-n7ef.onrender.com/

> **Note:** The application is deployed using Vercel, Render, MongoDB Atlas, Cloudinary, and Razorpay.

---

## ✨ Features

### 👤 Patient

- User registration and login
- Browse available doctors
- Filter doctors by speciality
- View doctor availability
- Select available appointment slots
- Book appointments
- View appointment history
- Cancel appointments
- Online payment using Razorpay
- View payment status
- Manage profile information
- Upload and update profile image

### 🩺 Doctor

- Secure doctor login
- Doctor dashboard
- View upcoming appointments
- View appointment history
- View patient details
- Manage appointment status
- Submit leave requests
- Manage availability based on assigned schedule

### 👨‍💼 Admin

- Secure admin authentication
- Dashboard with appointment and doctor statistics
- Add and manage doctors
- View all doctors
- View all appointments
- Manage doctor availability
- Review and approve doctor leave requests
- Manage doctor leave dates
- Monitor appointment and payment information

---

## 📅 Appointment System

MediBook uses doctor-specific availability to generate appointment slots.

Each doctor can have:

- Working days
- Starting and ending time
- Slot duration
- Leave dates

For example:

Doctor Availability

Monday    10:00 AM - 04:00 PM
Wednesday 10:00 AM - 04:00 PM
Friday    10:00 AM - 04:00 PM

Slot Duration: 30 minutes


The system generates appointment slots based on the doctor's availability and prevents already-booked slots from being available for another patient.

Doctor leave dates are also considered when generating available appointments.

---

## 💳 Online Payments

MediBook integrates **Razorpay** for online appointment payments.

The payment flow includes:

1. Patient books an appointment.
2. Appointment is created with a pending payment status.
3. Patient completes payment through Razorpay.
4. Payment is verified by the backend.
5. Appointment payment status is updated to `Paid`.
6. The patient can view the updated payment status from their appointment history.

---

## 🔐 Authentication & Authorization

MediBook uses JWT-based authentication to secure the application.

Different roles have access to different parts of the system:

Patient
   ↓
Patient Portal

Doctor
   ↓
Doctor Portal

Admin
   ↓
Admin Portal


Protected backend routes use authentication middleware to verify the user's JWT and role before allowing access.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API
- Lucide React

### Admin & Doctor Portal

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- bcrypt
- Razorpay

### Third-Party Services

- **MongoDB Atlas** — Database
- **Cloudinary** — Image storage
- **Razorpay** — Online payments
- **Vercel** — Frontend & Admin deployment
- **Render** — Backend deployment

---

## 🏗️ Project Structure

MediBook/
│
├── frontend/          # Patient-facing application
│
├── admin/             # Admin & Doctor portal
│
├── backend/           # Node.js & Express API
│
└── README.md


---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vishnu-11124/MediBook.git

cd MediBook
```

### 2. Install Dependencies

Install dependencies separately for each application.

#### Frontend

```bash
cd frontend
npm install
```

#### Admin

```bash
cd ../admin
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

---

## 🔑 Environment Variables

### Backend

Create a `.env` file inside the `backend` directory.

```env
PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### Frontend

Create a `.env` file inside `frontend`.

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Admin

Create a `.env` file inside `admin`.

```env
VITE_BACKEND_URL=http://localhost:4000
```

> Never commit your `.env` files or secret credentials to GitHub.

---

## ▶️ Running the Project Locally

You need to run the frontend, admin portal, and backend separately.

### Start Backend

```bash
cd backend
npm run server
```

The backend will run on:

```text
http://localhost:4000
```

### Start Patient Frontend

```bash
cd frontend
npm run dev
```

### Start Admin & Doctor Portal

```bash
cd admin
npm run dev
```

---

## 🔄 Application Flow

```text
                    MediBook
                       │
          ┌────────────┼────────────┐
          │            │            │
       Patient       Doctor       Admin
          │            │            │
          ↓            ↓            ↓
      Browse         View         Manage
      Doctors      Appointments   Doctors
          │            │            │
          ↓            ↓            ↓
       Book         History      Availability
     Appointment                  & Leaves
          │
          ↓
       Razorpay
          │
          ↓
       Payment
```

---

## 📌 Key Concepts Implemented

MediBook was built to practice and demonstrate real-world full-stack development concepts, including:

- REST API development
- JWT authentication
- Role-based authorization
- MongoDB data modeling
- Doctor-specific availability
- Dynamic appointment slot generation
- Appointment management
- Leave management
- Online payment integration
- Image upload and cloud storage
- Protected routes
- API integration with Axios
- React Context API for state management
- Admin and doctor dashboards
- Production deployment

---

## 🚀 Deployment

The application is deployed using:

```text
Patient Frontend  → Vercel
Admin Portal      → Vercel
Backend API       → Render
Database          → MongoDB Atlas
Images            → Cloudinary
Payments          → Razorpay
```

---

## 🔮 Future Improvements

Some possible improvements for future versions include:

- Email notifications for appointments
- SMS notifications
- Doctor profile management
- Appointment reminders
- More advanced analytics
- Hospital/clinic profile management
- Prescription management
- Medical record management
- Improved appointment rescheduling

---

## 👨‍💻 Author

**Vishnu T S**

MCA Graduate | MERN Stack Developer

- GitHub: [Vishnu-11124](https://github.com/Vishnu-11124)
- Portfolio: https://vishnu-developer.vercel.app/

---

## 📄 License

This project is developed for learning and portfolio purposes.
