AI Dosth - Chat Interface

**Project Status:** Functional and Secure (Full-Stack Deployment)
**Submission For:** Full Stack Developer Role (Technical Assessment Option 3)

| **Live Application** | https://ai-dosth.vercel.app |
| **GitHub Repository** | https://github.com/Gunavardhan-Bhogi/AI-Dosth |

## 🚀 Project Overview

This is a high-fidelity, production-ready AI chat client inspired by modern platforms like OpenRouter. Built as a full-stack solution using **React/Vite (Frontend)** and **Node/Express with MongoDB Atlas (Backend)**, the application showcases end-to-end development skills, advanced UI/UX, and data persistence.

## ✨ Key Features Implemented

This project highlights expertise across front-end and full-stack development:

### Frontend & UX
* **Full Responsive Design:** The UI is optimized for all screen sizes (desktop, tablet, and mobile), utilizing a slide-out sidebar accessed via a Hamburger Menu for seamless history access.
* **Synchronized Streaming (Advanced UX):** Implements a critical UI lock where the send mechanism is disabled and synchronized precisely with the **word-by-word printing effect**. This prevents message queuing and maintains a smooth user experience during generation.
* **Markdown Rendering:** AI responses are correctly formatted with syntax-highlighted code blocks, lists, and stylized text using `react-markdown` and `rehype-highlight`.
* **Dynamic State Management:** Uses React Context (`MyContext`) for efficient global state sharing across components.

### Backend & Persistence
* **Full-Stack Integration:** The application connects to the OpenAI API (or similar LLM endpoint) via a secured Node/Express proxy, demonstrating control over the entire data lifecycle.
* **Persistent Chat History (MongoDB Atlas):** Conversation threads are permanently stored and retrieved from a MongoDB Atlas database, ensuring history is maintained across browser sessions and reloads.
* **Secure CORS Policy:** Explicitly configures the Express server to allow requests from the secure Vercel frontend domain, demonstrating production security knowledge.

## 🛠️ Setup and Installation

Follow these steps to get a local copy of the project running:

### Prerequisites
* Node.js (v18+)
* npm or Yarn
* A valid OpenAI API Key
* A MongoDB Atlas Connection URI

### Frontend (React/Vite)
1.  **Clone the repository:**
    ```bash
    git clone [repository URL]
    cd Frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create `.env` file:** Create a file named `.env` in the `Frontend` folder and add your local backend URL:
    ```
    # Frontend/.env
    VITE_BACKEND_URL="http://localhost:8080" 
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

### Backend (Node/Express)
1.  **Navigate to the backend directory:**
    ```bash
    cd ../Backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create `.env` file:** Create a file named `.env` in the `Backend` folder and add your credentials:
    ```
    # Backend/.env
    OPENAI_API_KEY="sk-..." 
    MONGO_URI="mongodb+srv://..." 
    PORT=8080
    ```
4.  **Start the backend server:**
    ```bash
    npm start
    ```

The application will be accessible at `http://localhost:5173` (Frontend) and `http://localhost:8080` (Backend).