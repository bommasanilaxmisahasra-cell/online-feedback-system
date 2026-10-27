
# Online Feedback System

## 1. Project Description

The Online Feedback System is a web-based application that allows students to submit feedback about their subjects and classes. The dashboard displays submitted feedback and average ratings.

## 2. Objectives

- To collect student feedback online.
- To make feedback submission easy.
- To display feedback in a dashboard.
- To help identify areas for improvement in teaching.

## 3. Features

- Home page
- Student demo login
- Feedback submission form
- Subject ratings from 1 to 5
- Feedback dashboard
- Total feedback count
- Average rating calculation
- JSON file storage

## 4. Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Storage
- JSON file

## 5. Project Structure

- frontend/
  - index.html
  - login.html
  - feedback.html
  - dashboard.html
  - style.css
  - script.js
- backend/
  - server.js
  - package.json
  - feedback.json (created automatically)
  - routes/
    - feedbackRoutes.js
  - models/
    - Feedback.js
- README.md

## 6. How to Run

1. Install Node.js.
2. Open the backend folder in the terminal.
3. Run npm install.
4. Run npm start.
5. Open http://localhost:5000 in a browser.

## 7. Conclusion

The Online Feedback System provides a simple way to collect and review student opinions. It can help educational institutions understand student feedback and improve the learning experience.
