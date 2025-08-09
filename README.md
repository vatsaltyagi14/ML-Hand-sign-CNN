<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Mental Health App AI Chatbot

This is a locally hosted mental health AI chatbot built using Flask (Python) with support for both local LLaMA 3B model (via Ollama) and Gemini API integration. It offers secure user authentication, persistent chat history, and a clean, user-friendly interface.
Users can interact with an AI chatbot for mental wellness conversations—either using locally run models or cloud-based Gemini responses—based on availability or preference.

## Features
- **User Authentication: Secure sign-up and login for all users.
- **Persistent Chat History: All conversations are stored in a local SQLite database (chat_logs.db).
- **Chat History Sidebar: Allows users to review past conversations.
- **Local AI (Offline): Uses Ollama LLaMA 3 3B model running on the local machine.
- **Cloud AI (Online): Supports Gemini API for enhanced conversational quality.
- **Flexible AI Backend: Choose between local and cloud models.
- **Logout Option: End sessions securely.
- **Entirely Flask-based Backend: Clean Python-only backend structure.

## Installation & Setup

### Prerequisites
Ensure you have the following installed:

- Python 3.8+
- Flask: pip install flask
- SQLite (included with Python)
- Ollama (ollama must be installed and configured)
- Gemini API Key (obtain from Google AI Studio)
- LLaMA 3B model pulled:
  ollama pull llama3:3b


### Steps to Run

1. Clone the repository:
   git clone <repository-url>
   cd ai-chatbot

2. Install Python dependencies:
   pip install -r requirements.txt

3. Set up your Gemini API key (optional for cloud use):
   Create a .env file in the root directory:
   GEMINI_API_KEY=your_api_key_here

4. Run the Ollama LLaMA 3B model (for local AI):
   ollama run llama3:3b

5. Start the Flask app:
   python app.py

6. Access the chatbot at:
   http://127.0.0.1:5000/

## File Structure

├── app.py              # Main Flask backend

├── local_llm.py        # Ollama LLaMA 3B response handler

├── gemini_api.py       # Gemini API response handler

├── chat_logs.db        # SQLite database

├── templates/

│     ├── index.html      # Chat UI

│     ├── login.html      # Login page

│     ├── user.html       # Signup page

├── static/             # CSS/JS assets

├── requirements.txt    # Python dependencies

├── .env                # (Your Gemini API Key goes here)

└── README.md

## How It Works
1. On accessing the chatbot, users are prompted to Sign Up or Login.
2. After login, previous conversations are fetched from SQLite.
3. When a user sends a message:
   - If Gemini API is active and configured, the response is generated using Gemini.
   - If not, the message is routed to the local LLaMA 3B model via Ollama.
4. Conversations are stored and associated with each user for future reference.

## Notes
- The Gemini integration is optional; the app functions fully offline using the LLaMA model.
- Ensure Ollama is running if using the local model.
- Data is stored locally and securely; no cloud storage is involved unless using Gemini API.

## Future Improvements
- Allow users to toggle between LLaMA and Gemini manually from the UI.
- Add user mood tracking and sentiment analysis.
- Enhance frontend with animations and voice input/output.

This chatbot enables private, local-first mental health support with the option to extend capabilities through Gemini AI—suitable for personal or enterprise-level deployments.

## Future Improvements
- Add support for multiple AI models.
- Improve UI/UX with a more dynamic frontend.
- Implement a feedback mechanism for AI responses.

---
This chatbot is a great example of running **AI models locally** for personal or enterprise use without cloud dependency.
it facilitates an insightful conversation between AI and user.


>>>>>>> 2fec96e (Readme)
