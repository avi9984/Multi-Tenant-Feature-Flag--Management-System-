# Multi-Tenant Feature Flag Management System

This is a SaaS-style feature-flag management system that allows organizations to securely manage feature toggles for their applications. The project is divided into a Node.js backend API and a React (Vite) frontend with three distinct user roles.

## Project Overview

The system supports a hierarchical structure of users to manage feature flags across different organizations securely.

### System Roles & Features

1. **Super Admin**
   - **Access Level:** Highest (Static Configuration)
   - **Capabilities:**
     - Log in using hardcoded/config-based credentials.
     - View a list of all existing organizations.
     - Create new organizations and generate Organization IDs.
   - **Frontend Path:** `/super-admin/login`

2. **Organization Admin (Org Admin)**
   - **Access Level:** Organization Level
   - **Capabilities:**
     - Sign up by linking themselves to a specific Organization ID (provided by the Super Admin).
     - Log in securely.
     - Create, view, update (enable/disable), and delete feature flags specific to their organization.
   - **Frontend Path:** `/admin/login`

3. **End User**
   - **Access Level:** Public / Check Only
   - **Capabilities:**
     - Submit an Organization ID and a Feature Key to check if a specific feature is enabled or disabled for that organization.
   - **Frontend Path:** `/user`

---

## Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JSON Web Tokens (JWT) & bcryptjs (Custom Authentication)
- CORS & dotenv

**Frontend:**
- React 18 & Vite
- React Router DOM (Routing)
- Axios (API Client)
- Vanilla CSS (Rich, modern UI aesthetics)

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (Local instance or MongoDB Atlas URI)

---

## Installation & Setup

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (if not already present) and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   SUPER_ADMIN_EMAIL=admin@example.com
   SUPER_ADMIN_PASSWORD=adminpassword123
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend should now be running on `http://localhost:5000`.*

### 2. Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend should now be running on `http://localhost:5173` (or `5174` if port is in use).*

---

## How to Test the Flow

1. **Initialize the Database (Super Admin):**
   - Go to `http://localhost:5173/super-admin/login`
   - Log in using the `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` from your backend `.env` file.
   - Create a new Organization (e.g., "Acme Corp").
   - Copy the generated `ID` for this organization from the dashboard table.

2. **Setup an Organization (Org Admin):**
   - Go to `http://localhost:5173/admin/signup`
   - Fill in your details and paste the Organization ID you copied in step 1.
   - After signing up, log in at `http://localhost:5173/admin/login`.
   - Create a new feature flag (e.g., Key: `NEW_CHECKOUT`, Description: `Enables the new checkout flow`).
   - Toggle the feature flag to **Enabled**.

3. **Verify as a User (End User):**
   - Go to `http://localhost:5173/user` (or click "User View").
   - Enter the Organization ID and the Feature Key (`NEW_CHECKOUT`).
   - Click "Check Status". The system will communicate with the backend and display whether the feature is enabled or disabled.
