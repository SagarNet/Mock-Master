# Mock Master - Mock Test Generator

A modern mock test platform built with React and Tailwind CSS, featuring secure authentication and JSON-powered test creation.

## Features
- Admin Authentication (Username: `sagaradmin`, Password: `adminsagar`)
- JSON Test Creation - Easily generate tests via AI prompts
- Interactive Testing Interface
- Instant Results with detailed scoring
- Responsive Dark/Light Mode

## Installation
```bash
git clone https://github.com/SagarNet/Mock-Master.git
cd mock-test-app
npm install
npm run dev
```
## How to Generate Test Data

- Use ChatGPT/DeepSeek with this prompt:
"Create a JSON array of 10 quiz questions about [TOPIC] with: id, question, 4 options, correctAnswer, and explanation fields."
- Save the output in the input field


#### Example Question Format
```json
{
  "id": 1,
  "question": "Sample question?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "B",
  "explanation": "Explanation text"
}
```
## Technologies Used
- Vite
- React
- Talwind CSS
- React Hook Form
- Framer Motion

  ## Available Scripts
- ```npm run dev``` - Start development server
- ```run build``` - Create production build
- ```npm run preview``` - Locally preview production build
