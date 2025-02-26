# KBC Game (Kaun Banega Crorepati)

## Overview
This is an interactive quiz game inspired by the popular Indian television show "Kaun Banega Crorepati" (the Indian version of "Who Wants to Be a Millionaire"). Players can test their knowledge by answering multiple-choice questions while working their way up a prize ladder, with the ultimate goal of winning 7 Crores (70 million rupees).

## Features
- **User Authentication**: Register and login system to keep track of players
- **Progressive Difficulty**: Questions get progressively more difficult as prize money increases
- **Prize Ladder**: 16 levels of prize money from ₹1,000 to ₹7 Crores
- **Milestone Prizes**: Secure milestone rewards (₹40,000, ₹1 Crore, and ₹7 Crores)
- **Countdown Timer**: 60-second timer for each question
- **Lifelines**: Multiple assistance options:
  - **50:50**: Removes two incorrect answers
  - **Phone a Friend**: Simulates expert advice
  - **Swap Question**: Replaces current question with a new one

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Flask (Python)
- **Database**: MongoDB

## Installation

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB

### Setup

#### Backend Setup
1. Clone the repository
   ```
   git clone [repository-url]
   cd [repository-name]
   ```

2. Set up Python virtual environment
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Install dependencies
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the root directory with the following:
   ```
   secret_key=your_secret_key
   ```

5. Start the Flask server
   ```
   flask run
   ```

#### Frontend Setup
1. Navigate to the frontend directory
   ```
   cd frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

## How to Play
1. Register for an account or log in if you already have one
2. Start a new game
3. Answer each question by selecting one of the four options
4. Use lifelines strategically when you're unsure
5. Try to reach the highest prize level (₹7 Crores)
6. If you answer incorrectly, you'll receive the prize money from your last milestone reached

## Game Rules
- You have 60 seconds to answer each question
- Each lifeline can only be used once per game
- If the timer reaches zero, the current question is forfeited
- The game ends when you either answer incorrectly or complete all 16 questions


## API Endpoints
- **POST /register**: Register a new user
- **POST /login**: Authenticate a user
- **GET /get_username**: Get the username of the logged-in user
- **GET /logout**: Log out the current user
- **GET /generate_questions**: Generate quiz questions


## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.


## Acknowledgements
- Inspired by the television show "Kaun Banega Crorepati"
