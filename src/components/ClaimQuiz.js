import React, { useState } from 'react';
import './ClaimQuiz.css';

const ClaimQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      text: "Do you feel emotionally drained or mentally exhausted after work?",
      description: "This includes feeling burnt out, overwhelmed, or emotionally depleted due to your work environment."
    },
    {
      id: 2,
      text: "Have you raised issues at work and felt ignored or dismissed?",
      description: "This could be concerns about workload, treatment, safety, or other workplace matters that weren't properly addressed."
    },
    {
      id: 3,
      text: "Has your work environment negatively affected your sleep or mental wellbeing?",
      description: "Including anxiety, depression, insomnia, or other mental health impacts you believe are work-related."
    },
    {
      id: 4,
      text: "Do you feel unsupported or confused about your role expectations?",
      description: "This includes unclear job requirements, lack of training, or insufficient support from management."
    },
    {
      id: 5,
      text: "Are you seeing a doctor or psychologist for work-related stress?",
      description: "This includes any medical professional you're consulting about mental health issues you believe are connected to work."
    },
    {
      id: 6,
      text: "Did your employer fail to act when you first raised concerns?",
      description: "This includes situations where you reported problems but your employer didn't take reasonable steps to address them."
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore(newAnswers);
    }
  };

  const calculateScore = (allAnswers) => {
    let totalScore = 0;
    Object.values(allAnswers).forEach(answer => {
      if (answer === 'yes') totalScore += 2;
      else if (answer === 'unsure') totalScore += 1;
    });
    setScore(totalScore);
    setShowResults(true);
  };

  const getResultMessage = () => {
    if (score >= 6) {
      return {
        title: "You may have a claim",
        message: "Based on your responses, you may have grounds for a psychological injury claim. We strongly recommend speaking with our team to explore your options.",
        color: "#22c55e"
      };
    } else if (score >= 3) {
      return {
        title: "You might have a claim",
        message: "Your situation suggests there could be potential for a claim. Let's discuss your specific circumstances to provide clearer guidance.",
        color: "#f59e0b"
      };
    } else {
      return {
        title: "A claim may not be viable",
        message: "Based on your responses, a psychological injury claim might be challenging. However, every situation is unique - a brief conversation could still be valuable.",
        color: "#ef4444"
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const result = getResultMessage();
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <div className="results-section">
            <div className="results-icon" style={{ color: result.color }}>
              {score >= 6 ? '✓' : score >= 3 ? '?' : '!'}
            </div>
            <h2 className="results-title" style={{ color: result.color }}>
              {result.title}
            </h2>
            <p className="results-message">{result.message}</p>
            <div className="score-display">
              Your score: {score} out of {questions.length * 2}
            </div>
            
            <div className="cta-section">
              <button className="cta-button">
                Book a Free 30-Minute Intake Call
              </button>
              <p className="cta-subtitle">
                No obligation • Completely confidential • Expert guidance
              </p>
            </div>
            
            <button className="retake-button" onClick={resetQuiz}>
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <h1 className="quiz-title">Do I Have a Claim?</h1>
          <p className="quiz-subtitle">
            Quick assessment to understand your potential psychological injury claim
          </p>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        <div className="question-section">
          <h2 className="question-text">
            {questions[currentQuestion].text}
          </h2>
          <p className="question-description">
            {questions[currentQuestion].description}
          </p>

          <div className="answer-buttons">
            <button 
              className="answer-button yes-button"
              onClick={() => handleAnswer('yes')}
            >
              Yes
            </button>
            <button 
              className="answer-button unsure-button"
              onClick={() => handleAnswer('unsure')}
            >
              Unsure
            </button>
            <button 
              className="answer-button no-button"
              onClick={() => handleAnswer('no')}
            >
              No
            </button>
          </div>
        </div>

        {currentQuestion > 0 && (
          <button 
            className="back-button"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  );
};

export default ClaimQuiz; 