# FinTrack – Personal Expense Tracker

A full-stack personal finance web app to track income, expenses, budgets, and generate monthly reports built with React, Node.js, Express, and MySQL.

---

## Features

- JWT-based user authentication (register/login)
- Multi-account management with live balance tracking
- Income, expense, and transfer transactions
- Budget creation with monthly utilization progress
- Dashboard with charts (monthly overview, category breakdown)
- Monthly reports with income, expense, and savings summary
- PDF report generation and download
- Fully responsive UI with Tailwind CSS

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React.js, React Router, Axios, Tailwind CSS, Recharts, Vite |
| Backend | Node.js, Express.js, MySQL, JWT, bcrypt, PDFKit |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MySQL

### Backend

```bash
cd fintrack-backend
npm install
```
Create `.env`:

```bash
npm run dev      
```

### Frontend

```bash
cd fintrack-frontend
npm install
npm run dev      
```

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login + get JWT |
| GET/POST | /api/accounts | Manage accounts |
| GET/POST/DELETE | /api/transactions | Manage transactions |
| GET/POST/PUT/DELETE | /api/budgets | Manage budgets |
| GET | /api/dashboard/stats | Income, expense, savings totals |
| GET | /api/dashboard/monthly | Month-wise breakdown |
| GET | /api/dashboard/recent | Recent 5 transactions |
| GET | /api/reports/monthly | Full monthly report table |
| GET | /api/reports/pdf | Download PDF report |

---


