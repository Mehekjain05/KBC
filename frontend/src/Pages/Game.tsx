import React, { useState, useEffect } from "react";
import chat from '../assets/chat.png'
import { useNavigate } from "react-router-dom";
interface PrizeLevel {
  level: number;
  amount: string;
  isMilestone?: boolean;
}
interface GameProps {
  name: string;
}
interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}


const Game: React.FC<GameProps> = ({ name }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(60);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [finalReward, setFinalReward] = useState(""); // Track final reward


  // const questions = [
  //   {
  //     question: "What was Draco Malfoy's screen name in the film Study?",
  //     options: ["Scorpius", "Draco", "Milli", "Cuthbert"],
  //     correctAnswer: 1,
  //   },
  //   {
  //     question: "Which planet is known as the Red Planet?",
  //     options: ["Earth", "Mars", "Jupiter", "Venus"],
  //     correctAnswer: 1,
  //   },
  //   {
  //     question: "Who wrote 'To Kill a Mockingbird'?",
  //     options: ["J.K. Rowling", "Harper Lee", "Mark Twain", "Ernest Hemingway"],
  //     correctAnswer: 1,
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/generate_questions');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        setQuestions(json.Questions || []);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const prizeLevels: PrizeLevel[] = [
    { level: 1, amount: "1,000" },
    { level: 2, amount: "2,000" },
    { level: 3, amount: "3,000" },
    { level: 4, amount: "5,000" },
    { level: 5, amount: "10,000" },
    { level: 6, amount: "20,000" },
    { level: 7, amount: "40,000", isMilestone: true },
    { level: 8, amount: "80,000" },
    { level: 9, amount: "1,60,000" },
    { level: 10, amount: "3,20,000" },
    { level: 11, amount: "6,40,000" },
    { level: 12, amount: "12,50,000" },
    { level: 13, amount: "25,00,000" },
    { level: 14, amount: "50,00,000" },
    { level: 15, amount: "1 Crore", isMilestone: true },
    { level: 16, amount: "7 Crores", isMilestone: true }
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
    if (selectedAnswer === null) {
      alert("Please select an answer!");
      return;
    }
  
    if (questions[questionIndex].correct_answer === selectedAnswer) {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prev) => prev + 1);
        setTimer(60); // Reset timer
        setSelectedAnswer(null);
      } else {
        alert("Congratulations! You have completed the game!");
      }
    } else {
      // If first question is wrong, final reward should be 0
      if (questionIndex === 0) {
        setFinalReward("0");
      } else {
        // Find the last milestone before current level
        let lastMilestone = "0";
        for (let i = questionIndex; i >= 0; i--) {
          if (prizeLevels[i].isMilestone) {
            lastMilestone = prizeLevels[i].amount;
            break;
          }
        }
        setFinalReward(lastMilestone);
      }
  
      setGameOver(true); // Stop the game
    }
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

  // const userName = async () => {
  //   const response = await fetch('/api/get_username');
  //   const data = await response.json();
  //   setUser(data.username);

  // }

  if (gameOver) {
    return (
      <div className="bg-black w-screen h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold text-red-500">Game Over!</h1>
        <p className="text-2xl mt-4">Your final reward: ₹{finalReward}</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => {
              setGameOver(false); // Restart game
              setQuestionIndex(0);
              setSelectedAnswer(null);
              setTimer(60);
            }}
            className="bg-blue-500 px-6 py-2 rounded-lg text-white font-bold hover:bg-blue-700"
          >
            Play Again
          </button>

          <button
            onClick={() => navigate("/login")} // Reload page for exit
            className="bg-red-500 px-6 py-2 rounded-lg text-white font-bold hover:bg-red-700"
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black to-purple-900 w-screen h-screen flex flex-col items-center justify-center p-8">
      {loading ? (
        <p className="text-white">Loading data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <>
          {/* Timer Circle */}
          <div className="relative flex items-center justify-center mb-10 mt-24">
            <div className="absolute">{generateDots()}</div>
            <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{timer}</span>
            </div>
          </div>

          {/* Question & Answers */}
          <div className="w-full max-w-5xl mb-10 mt-16">
            {questions.length > 0 && questions[questionIndex] ? (
              <div className="bg-gradient-to-r from-purple-900 to-black text-white p-6 rounded-lg text-center text-xl font-semibold border-2 border-x-zinc-500">
                {questions[questionIndex].question}
              </div>
            ) : (
              <p className="text-white">No questions available.</p>
            )}
          </div>

          <div className="w-full max-w-5xl grid grid-cols-2 gap-4">
            {questions[questionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}

                className={`p-4 text-white text-lg font-semibold ${selectedAnswer === index ? "bg-orange-500" : "bg-gradient-to-r from-purple-900 to-black"
                  } rounded-lg border-2 border-x-zinc-500 hover:bg-blue-700 transition-colors flex items-center`}
              >

                <span className="mr-3">{String.fromCharCode(65 + index)}:</span>

                {option}
              </button>
            ))}
          </div>

          <button onClick={nextQuestion} className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition">
            Next Question
          </button>
        </>
      )}

      {/* Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 w-96 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
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
        <div className="max-w-md mx-auto bg-purple-900 p-4 rounded-lg shadow-lg">
          <div className="space-y-2">
            {prizeLevels.map((prize) => (
              <div
                key={prize.level}
                className={`flex items-center justify-between p-2 rounded ${prize.isMilestone
                  ? 'bg-purple-700 text-yellow-400 font-bold'
                  : 'bg-purple-800 text-yellow-200'
                  }`}
              >
                <span className="text-lg w-12">{prize.level}</span>
                <span className="text-lg">₹ {prize.amount}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-white/80 flex items-center justify-center">
                <span className="text-xs">?</span>
              </div>
              <span>Lifeline</span>
            </div>
            <div className="text-center px-4 py-1 border border-white/80 rounded">
              50:50
            </div>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="absolute top-6 left-4 flex gap-16">
        <button className="text-white p-2 rounded-full">
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
        <button className="text-white text-md bg-purple-950 justify-items-center w-64 rounded-full border border-[#FFD700]">
          <b>50 : 50</b>
        </button>

        <button className="text-white bg-purple-950 justify-items-center w-64 rounded-full border border-[#FFD700]">
          <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd" />
          </svg>
        </button>

        <button className="text-white bg-purple-950 justify-items-center w-64 rounded-full border border-[#FFD700]">
          <img src={chat} alt="ai" className="w-8" />
        </button>

        <button className="text-white bg-purple-950 justify-items-center w-64 rounded-full border border-[#FFD700]">
          <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3" />
          </svg>

        </button>

        <button className="text-white">Welcome, {name || 'Player'}!!</button>

        <button
          onClick={toggleDrawer}
          className="text-white font-medium rounded-lg text-sm px-5 py-2.5 "
        >
          <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
          </svg>

        </button>

      </div>
    </div>
  );
};

export default Game;