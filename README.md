# Smart Leads Dashboard - Full Stack Application

A complete lead management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with TypeScript, featuring authentication, role-based access control, advanced filtering, CSV export, and a beautiful modern UI.

## 🚀 Live Demo

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## ✨ Features

### Core Features
- ✅ **JWT Authentication** - Secure login/register system
- ✅ **Lead Management** - Complete CRUD operations
- ✅ **Advanced Filtering** - Filter by status, source, search
- ✅ **Pagination** - 10 records per page with metadata
- ✅ **CSV Export** - Export leads data to CSV file
- ✅ **Role-Based Access** - Admin and Sales User roles
- ✅ **Debounced Search** - Optimized search with 500ms delay

### UI/UX Features
- 🎨 **Modern Design** - Gradient backgrounds, glassmorphism
- 🌙 **Dark Mode** - Toggle between light and dark themes
- ✨ **Smooth Animations** - Framer Motion animations
- 📱 **Responsive** - Works on all devices
- 💫 **Loading States** - Beautiful loading indicators
- 🎯 **Toast Notifications** - User-friendly alerts

### Technical Features
- 📝 **TypeScript** - Full type safety throughout
- 🐳 **Docker Support** - Containerized application
- 🔒 **Security** - Password hashing, JWT tokens
- 📊 **RESTful API** - Clean API architecture
- 🗄️ **MongoDB Atlas** - Cloud database ready

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.18+ | Web framework |
| TypeScript | 5.0+ | Type safety |
| MongoDB | 6.0+ | Database |
| Mongoose | 7.5+ | ODM |
| JWT | 9.0+ | Authentication |
| bcryptjs | 2.4+ | Password hashing |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI library |
| TypeScript | 4.9+ | Type safety |
| TailwindCSS | 3.4 | Styling |
| Framer Motion | 10.16 | Animations |
| React Router | 6.20 | Navigation |
| React Hook Form | 7.48 | Form handling |
| Zod | 3.22 | Validation |
| Axios | 1.6 | API calls |

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas account)
- Git

## 🔧 Installation

### Option 1: Local Development

#### 1. Clone the repository
```bash
git clone <your-repo-url>
cd smart-leads-dashboard