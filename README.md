# 📄 Resumind — AI-Powered Resume Analyzer

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=for-the-badge)](https://resume-maker-pi-seven.vercel.app/)

**An intelligent web application that empowers job seekers by analyzing resumes against job descriptions, identifying skill gaps, and providing actionable feedback using AI.**

## 📖 About the Project

In today's competitive job market, passing the Applicant Tracking System (ATS) is the biggest hurdle for candidates. Resumind solves this problem by providing an AI-driven pre-screening process that evaluates resumes exactly how an ATS would. By leveraging the Google Gemini API, it not only scores the resume but also offers personalized, actionable suggestions to improve the candidate's chances of landing an interview.

## ✨ Key Features

- 🤖 **AI-Driven ATS Scoring**: Get accurate compatibility scores using the advanced reasoning capabilities of the Google Gemini API.
- 📄 **Smart PDF Parsing**: Robust pipeline to extract and structure data seamlessly from uploaded resume PDFs.
- 🎯 **Skill Extraction & Matching**: Automatically identifies candidate skills and matches them against targeted job descriptions.
- 🔒 **Secure Authentication**: Safe and persistent user sessions managed via Firebase Authentication.
- 💻 **Clean & Responsive UI**: A beautiful, intuitive interface built from the ground up with React and Tailwind CSS.

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PDF.js](https://img.shields.io/badge/PDF.js-FF0000?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)

## ⚙️ How It Works

1. **Upload PDF**: The user securely uploads their resume in PDF format.
2. **Parse Text**: `pdfjs` reads and extracts structured text data from the document.
3. **Send to AI**: The extracted text, along with the target job context, is sent to the **Google Gemini API**.
4. **Return Results**: Gemini analyzes the context and returns an ATS compatibility score, identified skill gaps, and detailed suggestions for improvement.

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Firebase Project
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Resume_analyser.git
   cd Resume_analyser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your configurations:
   ```env
   # Firebase Config
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   
   # Google Gemini API
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 📸 Screenshots

*(Replace the placeholder URLs with actual screenshots of your application)*

| Dashboard | Analysis Results |
|:---:|:---:|
| ![Dashboard Placeholder](https://via.placeholder.com/600x400?text=Dashboard+View) | ![Results Placeholder](https://via.placeholder.com/600x400?text=Analysis+Results) |

## 🧠 What I Learned

Building Resumind was an incredible journey that deepened my understanding of several core technologies:
- **Google Gemini API Integration**: Learned how to effectively prompt engineering for structured JSON responses and handle rate limits/errors when interacting with LLMs.
- **Advanced PDF Parsing**: Mastered the intricacies of `pdfjs` to accurately extract text layers from complex PDF structures while maintaining semantic flow.
- **Firebase Authentication & State**: Implemented secure, persistent user sessions and managed global authentication state across a React application.
- **ATS Scoring Logic**: Gained domain knowledge on how Applicant Tracking Systems actually parse and weight keywords, transforming qualitative AI analysis into a quantitative metric.

## 🔮 Future Improvements

- **Job Description Matching**: Allow users to paste a specific job description link or text for hyper-targeted resume analysis.
- **AI Resume Rewriting**: Implement a feature where Gemini suggests optimized rewrites for specific bullet points directly within the UI.
- **Multi-Format Support**: Expand parsing capabilities to accept `.docx` and `.txt` files alongside PDFs.

## 📬 Contact

**Your Name**  
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)  
- GitHub: [Your Profile](https://github.com/yourusername)  
- Live Project: [Resumind](https://resume-maker-pi-seven.vercel.app/)
