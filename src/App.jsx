import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "What are the Moai statues made from?",
    options: ["Marble", "Volcanic rock", "Granite", "Sandstone"],
    answer: "Volcanic rock",
  },
  {
    question: "How many moai statues are there on Rapa Nui",
    options: ["90", "500", "900", "1500"],
    answer: "900",
  },
  {
    question: "How tall is the average Moai statue?",
    options: ["5 feet", "8 feet", "13 feet", "25 feet"],
    answer: "13 feet",
  },
  {
    question: "What tool was used to carve the Moai statues",
    options: ["Chisel", "Pickaxe", "toki", "Hammer"],
    answer: "toki",
  },
  {
    question: "Where are the Moai located?",
    options: ["Hawaii", "Rapa Nui", "Peru", "Australia"],
    answer: "Rapa Nui",
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (selected) return;

    setSelected(option);

    if (option === questions[current].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="quiz-container">
        <h1>🎉 Quiz Finished!</h1>
        <h2>
          You got {score} out of {questions.length} correct!
        </h2>

        {score === 5 ? (
          <>
            <p>🔥 PERFECT SCORE! Watch your reward 👇</p>

            <div className="video-wrapper">
              <video
                className="reward-video"
                src="/reward.mp4"
                autoPlay
                controls
                playsInline
              />
            </div>
          </>
        ) : (
          <p>Good job! Try again to unlock the secret video 😉</p>
        )}
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>
        Question {current + 1} / {questions.length}
      </h2>
      <h1>{questions[current].question}</h1>

      <div className="options">
        {questions[current].options.map((option, index) => {
          let className = "option";

          if (selected) {
            if (option === questions[current].answer) {
              className += " correct";
            } else if (option === selected) {
              className += " wrong";
            }
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
