import React, { useState, useEffect } from "react";

const Game = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timer, setTimer] = useState(60);
  const [questionIndex, setQuestionIndex] = useState(0);

  // Sample question data - this could be expanded into a larger question bank
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
    setTimer(60); // Reset timer
    setSelectedAnswer(null); // Reset answer selection
  };

  // Generate the dots around the timer
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
        <div className="bg-gradient-to-r from-purple-900 to-black text-white p-6 rounded-lg text-center text-xl font-semibold border-2 border-x-zinc-500 ">
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
              ${
                selectedAnswer === index
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
      </div>
    </div>
  );
};

export default Game;
