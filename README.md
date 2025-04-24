
# 💰 FinanceApp

A web application for budget management, helping users track their income and expenses. The project is built in a client-server architecture using **React + TypeScript** for the frontend and **.NET** for the backend REST API.

## 📌 Features

### User
- ✅ Register and login
- ✅ Send email when registered succesfully
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
- **SQL Server** – database
- **JWT** – authentication & authorization
- **Middlewares**
- **Logger**
- **AutoMapper**

---

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
https://github.com/snix422/FinanceAppStudy.git
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
