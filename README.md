
# 💰 FinanceApp

A web application for budget management, helping users track their income and expenses. The project is built in a client-server architecture using **React + TypeScript** for the frontend and **.NET** for the backend REST API.

## 📌 Features

### User
- ✅ Register and login
- ✅ Create budgets
- ✅ Add expenses to budgets
- ✅ Visualizations:
  - 💸 Expenses vs savings
  - 📊 Expense categories

### Admin
- 👥 View all registered users
- 📂 View each user’s budgets
- 🗑️ Delete users’ budgets

---

## 🧑‍💻 Technologies

### Frontend
- **React** (v18+) + **TypeScript**
- **React Router DOM** – client-side routing
- **React Query** – asynchronous data fetching & caching
- **Axios** – API communication

### Backend
- **.NET 7** – RESTful API
- **Entity Framework Core** – database access
- **SQL Server – database
- **JWT** – authentication & authorization

---

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/FinanceApp.git
cd FinanceApp

## Run backend

cd backend
dotnet restore
dotnet ef database update
dotnet run

## Run frontend
cd frontend
npm install
npm run dev
