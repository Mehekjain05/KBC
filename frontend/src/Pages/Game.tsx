import React, { useState, useEffect } from "react";

const Game = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(60);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const questions = [
    {
      question: "What was Draco Malfoy's screen name in the film Study?",
      options: ["Scorpius", "Draco", "Milli", "Cuthbert"],
      correctAnswer: 1,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: 1,
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["J.K. Rowling", "Harper Lee", "Mark Twain", "Ernest Hemingway"],
      correctAnswer: 1,
    },
  ];

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    }

    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert("Game Over!");
    }
    setTimer(60);
    setSelectedAnswer(null);
  };

  const generateDots = () => {
    const dots = [];
    for (let i = 0; i < 16; i++) {
      dots.push(
        <div
          key={i}
          className="h-1 w-1 bg-white rounded-full"
          style={{
            position: "absolute",
            transform: `rotate(${i * 22.5}deg) translateY(-120px)`,
          }}
        />
      );
    }
    return dots;
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="bg-gradient-to-b from-black to-purple-900 w-screen h-screen flex flex-col items-center justify-center p-8">
      {/* Timer Circle */}
      <div className="relative flex items-center justify-center mb-12 mt-12">
        <div className="absolute">{generateDots()}</div>
        <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center">
          <span className="text-white text-4xl font-bold">{timer}</span>
        </div>
      </div>

      {/* Question */}
      <div className="w-full max-w-5xl mb-12 mt-12">
        <div className="bg-gradient-to-r from-purple-900 to-black text-white p-6 rounded-lg text-center text-xl font-semibold border-2 border-x-zinc-500">
          {questions[questionIndex].question}
        </div>
      </div>

      {/* Answer Options */}
      <div className="w-full max-w-5xl grid grid-cols-2 gap-4">
        {questions[questionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            className={`
              p-4 text-white text-lg font-semibold
              ${selectedAnswer === index
                ? "bg-orange-500"
                : "bg-gradient-to-r from-purple-900 to-black"
              }
              rounded-lg border-2 border-x-zinc-500 
              hover:bg-blue-700 transition-colors
              flex items-center
            `}
          >
            <span className="mr-3">{String.fromCharCode(65 + index)}:</span>
            {option}
          </button>
        ))}
      </div>

      {/* Next Question Button */}
      <button
        onClick={nextQuestion}
        className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
      >
        Next Question
      </button>

      {/* Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {/* Menu Content */}
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
              </a>
            </li>
            
          </ul>
        </div>
      </div>

      {/* Game Controls */}
      <div className="absolute top-4 left-4 flex gap-4">
        <button className="text-white bg-blue-800 p-2 rounded-full">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="text-white bg-blue-800 p-2 rounded-full">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
          </svg>
        </button>

        <button
          onClick={toggleDrawer}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Show navigation
        </button>
      </div>
    </div>
  );
};

export default Game;