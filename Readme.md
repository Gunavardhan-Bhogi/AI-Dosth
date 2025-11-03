AI Dosth - OpenRouter-Style Chat Interface

Live Application: [Link to your Nife.io or other hosted URL]
GitHub Repository: [Link to this repository]

🚀 Project Overview

This is a high-fidelity, production-ready AI chat client inspired by modern platforms like OpenRouter. Built with React/Vite (frontend) and Node/Express/MongoDB Atlas (backend), the application showcases end-to-end development skills, emphasizing advanced UI/UX and data persistence.

✨ Key Features Implemented

This project highlights expertise across front-end and full-stack development:

Frontend & UX

Full Responsive Design: The UI is optimized for all screen sizes (desktop, tablet, and mobile), utilizing a slide-out sidebar accessed via a Hamburger Menu for seamless history access on mobile devices.

Synchronized Streaming (Advanced UX): Implements a critical UI lock where the send mechanism is disabled and synchronized precisely with the word-by-word printing effect. This prevents message queuing and maintains a smooth user experience during generation.

Markdown Rendering: AI responses are correctly formatted with syntax-highlighted code blocks, lists, and stylized text using react-markdown and rehype-highlight.

Dynamic State Management: Uses React Context (MyContext) for efficient global state sharing across the application's components.

Backend & Persistence

Full-Stack Integration: The application connects to the OpenAI API (or similar LLM endpoint) via a secured Node/Express proxy, demonstrating control over the entire data lifecycle.

Persistent Chat History (MongoDB Atlas): Conversation threads are permanently stored and retrieved from a MongoDB Atlas database, ensuring history is maintained across browser sessions and reloads.

🛠️ Setup and Installation

Follow these steps to get a local copy of the project running:

Prerequisites

Node.js (v18+)

npm or Yarn

A valid OpenAI API Key

A MongoDB Atlas Connection URI

Frontend (React/Vite)

1 Clone the repository:

git clone [repository URL]
cd frontend



2 Install dependencies:

npm install
# or yarn install



3 Start the development server:

npm run dev



Backend (Node/Express)

1 Navigate to the backend directory:

cd ../backend



2 Install dependencies:

npm install



3 Create a file named .env in the backend folder and add your credentials:

# Replace with your actual key
OPENAI_API_KEY="sk-..." 

# Replace with your MongoDB Atlas connection string
MONGO_URI="mongodb+srv://..." 



4 Start the backend server:

npm start



The application will be accessible at http://localhost:5173 (or the port specified by Vite).