# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# 🕷️ Web Crawler Dashboard

A full-stack web crawler and analysis tool built using:

- 🟦 React + TypeScript (frontend)
- 🟨 Tailwind CSS for UI
- 🟩 Go (Golang) backend with Gin framework
- 🐬 MySQL for database
- ✅ Features global search, pagination, sorting, column filters, retry/delete, and broken link reports

---

## 🔧 Features

- 🌐 Submit any URL to crawl and analyze
- 📄 Detect HTML version, internal/external links, broken links, login forms
- 🧮 Paginated, searchable, sortable dashboard table
- 📊 Detail view with donut chart and broken link list
- 🔁 Retry crawl or delete URLs individually or in bulk
- 🔄 Real-time status update with loading spinners

---

## 🧱 Project Structure

```
web-crawler/
├── backend/         # Golang + Gin backend
│   ├── controllers/
│   ├── models/
│   ├── services/
│   └── main.go
├── frontend/        # React + Vite + Tailwind frontend
│   ├── src/
│   └── vite.config.ts
├── .env
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- Go (v1.21+)
- MySQL (running locally or in Docker)

---

## 🔙 Backend Setup (Golang + Gin)

### 1. Create `.env` file in `backend/` with:

```env
DB_USER=root
DB_PASS=yourpassword
DB_NAME=webcrawler
DB_HOST=localhost
DB_PORT=3306
```

### 2. Run MySQL Database

> Create database:

```sql
CREATE DATABASE webcrawler;
```

### 3. Install Go modules

```bash
cd backend
go mod tidy
```

### 4. Run server

```bash
go run main.go
```

Server will start at: `http://localhost:8080`

---

## 🌐 Frontend Setup (React + Tailwind)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start development server

```bash
npm run dev
```

App runs at: `http://localhost:5173`

---

## 🛠 API Endpoints

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/api/urls`           | Submit a new URL               |
| GET    | `/api/urls`           | Get all crawled URLs           |
| GET    | `/api/urls/:id`       | Get details for a specific URL |
| POST   | `/api/urls/:id/retry` | Retry crawling a URL           |
| DELETE | `/api/urls/:id`       | Delete a URL and its links     |

---

## 🧪 Testing via Postman

Use Postman or cURL to test:

```bash
curl -X POST http://localhost:8080/api/urls \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

---

## 📸 Screenshots

> Coming Soon: UI preview with dashboard and detail pages.

---

## 🧑‍💻 Contributors

- [Waqas Ahmed Khan](https://github.com/kewlspy) — Full-stack Developer

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🙌 Like this project?

Give it a ⭐ on GitHub!
