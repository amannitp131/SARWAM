# Mess Help - Complete Mess Management System

A comprehensive mess management system built with modern web technologies to help students, contractors, and administrators manage mess operations efficiently.

## 🏗️ Project Structure

This project consists of three main components:

```
Mess_help/
├── Sarwam_Backend-main/     # Node.js/Express.js Backend API
├── Sarwam-main/             # Next.js Frontend Application
├── Socket_Sarwam-main/      # Socket.io Real-time Communication Server
└── README.md                # This file
```

## 🚀 Features

### 👨‍🎓 Student Features
- User registration and authentication
- Payment management and tracking
- Leave request submission
- Real-time chat support
- Dashboard for personal information
- Mess menu viewing

### 👨‍💼 Contractor Features
- Worker management
- Inventory tracking
- Payment collection
- Student management
- Menu planning

### 🔧 Admin Features
- User management (Students, Contractors)
- Payment oversight
- System notifications
- Analytics and reporting

## 🛠️ Technology Stack

### Backend (Sarwam_Backend-main)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary integration
- **Security**: bcrypt for password hashing
- **Email**: Nodemailer for OTP and notifications
- **Real-time**: Socket.io integration
- **Scheduling**: node-cron for automated tasks

### Frontend (Sarwam-main)
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **UI Components**: MDB React UI Kit
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Icons**: React Icons
- **Notifications**: React Hot Toast & React Toastify
- **Real-time**: Socket.io Client

### Socket Server (Socket_Sarwam-main)
- **Framework**: Express.js
- **Real-time Communication**: Socket.io
- **File Handling**: Multer

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Cloudinary Account** (for image uploads)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Mess_help
```

### 2. Backend Setup (Sarwam_Backend-main)
```bash
cd Sarwam_Backend-main
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/messhelp
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup (Sarwam-main)
```bash
cd ../Sarwam-main
npm install
```

### 4. Socket Server Setup (Socket_Sarwam-main)
```bash
cd ../Socket_Sarwam-main
npm install
```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server:**
```bash
cd Sarwam_Backend-main
npm run dev
```
Server will run on `http://localhost:5000`

2. **Start the Frontend Application:**
```bash
cd Sarwam-main
npm run dev
```
Application will run on `http://localhost:3000`

3. **Start the Socket Server:**
```bash
cd Socket_Sarwam-main
node server.cjs
```

### Production Mode

1. **Build and Start Backend:**
```bash
cd Sarwam_Backend-main
npm run build
npm run serve
```

2. **Build and Start Frontend:**
```bash
cd Sarwam-main
npm run build
npm start
```

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/login` | User login |
| POST | `/api/v1/signup` | User registration with profile image |
| GET | `/api/v1/checklogin` | Verify login status |
| POST | `/api/v1/sendOtp` | Send OTP for password reset |
| POST | `/api/v1/verifyOtp` | Verify OTP |
| POST | `/api/v1/updatePassword` | Update user password |
| GET | `/api/v1/user` | Get user information |

### Student Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/student/getPayment/:id` | Get payment details by student ID |
| POST | `/api/student/savePrice/:id` | Save payment information |

### Home & Contact Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/home/contact/send` | Send contact form |
| GET | `/home/getData` | Get home page data |

### Image Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/image/get_url` | Get image upload URL |

## 🗄️ Database Schema

### User Model
```typescript
{
  username: String (unique)
  password: String (hashed)
  name: String
  email: String
  rollNo: Number
  college: String
  hostelName: String
  messContractorName: String
  type: 'Student' | 'Contractor' | 'Admin'
  contractorName: String
  workers: Array<Worker>
  isVerified: Boolean
}
```

### Additional Models
- **Chat Model**: Real-time messaging
- **Payment Model**: Payment tracking
- **Menu Model**: Mess menu management
- **Inventory Model**: Stock management
- **Notification Model**: System notifications
- **Coupon Model**: Discount coupons
- **Ticket Model**: Support tickets
- **Letter Model**: Leave applications

## 🔐 Authentication Flow

1. **Registration**: Users sign up with profile image upload
2. **Login**: JWT token-based authentication
3. **OTP Verification**: Email-based OTP for password reset
4. **Token Validation**: Middleware for protected routes
5. **Role-based Access**: Different permissions for Students, Contractors, and Admins

## 📱 Frontend Pages

### Public Pages
- **Landing Page** (`/`): Project overview and features
- **Login** (`/login`): User authentication
- **Sign Up** (`/signUp`): User registration
- **OTP Verification** (`/login/otp`): Email verification
- **Password Reset** (`/login/otp/resetPassword`): Password recovery

### Protected Pages
- **Dashboard** (`/dashboard`): User-specific dashboard
- **Payments** (`/dashboard/payments`): Payment management
- **Make Payment** (`/dashboard/makepayment`): Payment processing
- **Request Leave** (`/dashboard/requestleave`): Leave applications
- **Help** (`/help`): Support and assistance

## 🌐 Real-time Features

- **Live Chat**: Student-contractor communication
- **Real-time Notifications**: Instant updates
- **Payment Status Updates**: Live payment tracking
- **Menu Updates**: Real-time menu changes

## 🔧 Utilities & Helpers

### Backend Utilities
- **JWT Utils**: Token creation and verification
- **OTP Utils**: OTP generation and validation
- **Mail Sender**: Email notification system
- **Scheduler**: Automated coupon management
- **Database Config**: MongoDB connection setup
- **Cloudinary Config**: Image upload configuration

### Frontend Components
- **Protected Routes**: Authentication guards
- **Context Providers**: State management
- **Reusable Components**: Header, Footer, Navbar
- **Loading States**: Preloader and loading contexts

## 🔒 Security Features

- **Password Hashing**: bcrypt encryption
- **JWT Authentication**: Secure token-based auth
- **CORS Configuration**: Cross-origin request handling
- **Input Validation**: Data sanitization
- **File Upload Security**: Cloudinary integration
- **Environment Variables**: Sensitive data protection

## 📦 Deployment

### Environment Variables
Ensure all environment variables are properly configured for production:

- Database connections
- API keys and secrets
- CORS origins
- Email configuration
- Cloudinary credentials

### Build Commands
```bash
# Backend
npm run build
npm run serve

# Frontend
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Aman Kumar Mishra** - Backend Development

## 🆘 Support

For support and queries:
- Create an issue in the repository
- Use the in-app help system
- Contact through the contact form

## 🚀 Future Enhancements

- Mobile application development
- Advanced analytics dashboard
- Integration with payment gateways
- Multi-language support
- Advanced reporting features
- Push notifications
- Offline functionality

---

**Note**: Make sure to configure all environment variables and dependencies before running the application. For detailed setup instructions, refer to the individual README files in each project directory.
