# Gemini Learn - Explain Like I'm 5 🧠✨

> **Note**: This project is still a work in progress! I'm building this for fun to learn how to use the Gemini API and explore conversational AI.

## 📖 Overview

Gemini Learn is a conversational AI web application that explains complex topics in simple, child-friendly language. Think of it as having a really smart friend who can break down any complicated concept into terms a 5-year-old would understand!

Built with Google's Gemini 1.5 Flash model, this app maintains conversation context and provides detailed, engaging explanations using creative analogies and simple language.


## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **Google Generative AI** (Gemini 1.5 Flash)
- **ES6 Modules** for modern JavaScript
- **UUID** for conversation tracking
- **dotenv** for environment configuration

### Frontend
- **Vanilla JavaScript** for client-side logic
- **Bootstrap 5.3** for responsive styling
- **Axios** for API requests
- **Marked.js** for Markdown rendering


## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Gemini_Learn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🎯 How It Works

1. **Start a Conversation**: Type any complex topic you want explained
2. **Get Simple Explanations**: The AI responds with child-friendly explanations using creative analogies
3. **Ask Follow-ups**: Continue the conversation with questions about the same topic
4. **Maintain Context**: The app remembers your conversation history throughout the session

### Example Conversation
```
You: "How does the internet work?"
AI: "Imagine the internet like a giant mail system for the whole world! 📮..."

```

## 🧠 AI Behavior

The Gemini AI is specially configured to:
- Use simple, everyday language
- Create creative analogies (not just LEGOs!)
- Keep explanations concise and clear
- Format responses in readable Markdown
- Provide detailed explanations for initial topics
- Answer follow-up questions in context

## 🗄️ Data Storage

Currently uses **in-memory storage** for conversation histories. This means:
- ✅ Fast response times
- ⚠️ Conversations reset when server restarts
- 🔮 Future: Could be upgraded to Redis or a database

## 🚧 Current Status

This is a learning project and is **still in development**! Here's what's working and what's planned:

### ✅ Working
- Basic conversational AI interface
- Gemini API integration
- Message history within sessions
- Responsive UI design
- Markdown formatting

### 🔮 Future Ideas
- Persistent conversation storage
- User authentication
- Conversation history across sessions
- Topic suggestions
- Voice input/output
- Mobile app version


## 🤝 Contributing

This is a personal learning project, but if you have ideas or spot bugs, feel free to open an issue or submit a pull request!

---

**Happy Learning! 🎓**