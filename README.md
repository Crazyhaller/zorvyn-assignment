# 💰 Finance Dashboard UI

A clean and interactive **Finance Dashboard** built using modern frontend technologies.
This project demonstrates UI design, state management, data visualization, and user experience thinking.

---

## 🚀 Live Features

- 📊 Dashboard overview with financial summary
- 📈 Balance trend visualization (line chart)
- 🥧 Spending breakdown (pie chart)
- 📋 Transactions table with search, filter & sorting
- 🔐 Role-based UI (Viewer / Admin)
- ➕ Add transaction (Admin only)
- 💡 Insights with monthly comparison & observations
- 🌙 Dark mode support
- 💾 LocalStorage persistence
- 🔌 Mock API integration
- 📱 Fully responsive design

---

## 🛠 Tech Stack

- **React (Vite + TypeScript)**
- **Tailwind CSS**
- **Redux Toolkit**
- **Motion**
- **Recharts**

---

## 🧠 Project Structure

```
src/
│
├── app/                # Redux store & hooks
├── features/           # Feature-based modules
│   ├── dashboard/
│   ├── transactions/
│   ├── insights/
│   ├── role/
│
├── components/         # Shared UI components
├── data/               # Mock data
├── utils/              # Helpers & mock API
├── pages/              # Main pages
│
├── App.tsx
├── main.tsx
```

---

## 📊 Key Functionalities

### 1. Dashboard Overview

- Displays:
  - Total Balance
  - Total Income
  - Total Expenses

- Includes:
  - Balance trend chart (time-based)
  - Spending breakdown chart (category-based)

---

### 2. Transactions Management

- View all transactions with:
  - Date
  - Amount
  - Category
  - Type (Income / Expense)

- Features:
  - 🔍 Search by category
  - 🔽 Filter (All / Income / Expense)
  - ↕ Sort (Date / Amount)

- Handles empty states gracefully

---

### 3. Role-Based UI

- **Viewer**
  - Can only view data

- **Admin**
  - Can add new transactions

- Role switch implemented via dropdown for demonstration

---

### 4. Insights Section

- 🥇 Highest spending category
- 📅 Monthly comparison (current vs previous month)
- 💡 Smart observations based on data trends
- 📊 Net savings calculation

---

### 5. State Management

Handled using **Redux Toolkit**:

- Transactions state
- Filters (search, sort, type)
- Role state

---

### 6. LocalStorage Persistence

- Saves transactions & role
- Restores state on reload

---

### 7. Mock API Layer

- Simulates backend using async function
- Adds realistic loading delay

---

### 8. Dark Mode

- Implemented using Tailwind `dark` class strategy
- Consistent UI across all components

---

### 9. Empty States

- Graceful fallback UI when no data is available
- Improves UX and completeness

---

## 📦 Installation & Setup

```bash
# Clone repository
git clone <your-repo-url>

# Navigate to project
cd finance-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🧠 Approach & Thought Process

- Used **feature-based architecture** for scalability
- Focused on **clean UI + usability**
- Derived insights from normalized transaction data
- Avoided overengineering while maintaining clarity
- Added enhancements (dark mode, persistence, mock API) to simulate real-world applications

---

## 👤 Author

**Suvigya**

---
