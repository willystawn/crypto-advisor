# Crypto Airdrop Advisor

An AI-powered application to find and optimize strategies for crypto airdrops, providing clear, actionable steps to maximize potential rewards.

## About The Project

Crypto Airdrop Advisor helps users navigate the complex world of cryptocurrency airdrops. By simply entering a project name, protocol, or task, the application leverages Google's Gemini AI, grounded with real-time Google Search results, to provide a tailored strategy. It suggests an optimal interaction frequency, gives you a clear to-do list, and explains the reasoning behind its recommendations.

This tool is designed for both beginners and experienced users looking to optimize their airdrop hunting strategy efficiently.

## Key Features

- **AI-Powered Recommendations**: Utilizes the Google Gemini model for intelligent analysis.
- **Dynamic Interaction Frequency**: Suggests optimal timing like "Daily," "Weekly," or "One-Time."
- **Clear Action Plan**: Generates a concrete, step-by-step list of tasks in a "To-Do" format.
- **Data-Driven Reasoning**: Provides clear, point-by-point explanations for its advice.
- **Real-time Information**: Integrates Google Search to base recommendations on the latest data.
- **Responsive Design**: Clean, modern interface that works seamlessly on desktop and mobile devices.
- **One-Click Examples**: Pre-filled examples to help new users get started instantly.

## Built With

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini API](https://ai.google.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need a Google Gemini API key to run this application.

- **Google Gemini API Key**
  1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
  2. Click **Create API key** and copy your key.

### Installation & Setup

1.  **Get the project files:**
    Ensure you have all the project files (`index.html`, `App.tsx`, etc.) in a single directory.

2.  **Configure the API Key:**
    This application requires the Gemini API key to be available as an environment variable named `API_KEY`.
    
    The application is designed to be run in an environment where this variable is already set. For local development where `process.env` might not be available in the browser directly, you may need a development server or a build tool (like Vite or Create React App) that can inject environment variables.

3.  **Running the Application:**
    Since this is a simple project without a build step, you must run it using a local web server to avoid potential CORS or module resolution issues.
    
    - **Using Node.js `serve` package:**
      If you have Node.js, you can install and use the `serve` package:
      ```bash
      npm install -g serve
      serve .
      ```
      Then, open the URL provided in the terminal (usually `http://localhost:3000`).

Once the server is running, you can open `index.html` in your browser and start using the Crypto Airdrop Advisor.
