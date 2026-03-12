export const quizData = [
  {
    id: 1,
    question: "What is the input extraction operator in C++?",
    options: [ ">>","<<", "::", "->"],
    answer: 0,
  },
  {
    id: 2,
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: [ "def", "var", "let","int"],
    answer: 2,
  },
  {
    id: 3,
    question: "What does LLM stand for in Artificial Intelligence?",
    options: [
      "Large Logic Map",
      "Large Language Model",
      "Linear Learning Matrix",
      "Local Language Method"
    ],
    answer: 1,
  },
  {
    id: 4,
    question: "Which logic gate outputs 1 only if all inputs are 1?",
    options: ["OR gate", "XOR gate", "AND gate", "NOT gate"],
    answer: 2,
  },
  {
    id: 4,
    question: "What is an IIFE in JavaScript?",
    options: [
      "Internal Integrated Function Entity",
      "Immediately Invoked Function Expression",
      "Initial Instance Flow Execution",
      "Interactive Interface For Emails",
    ],
    answer: 1,
  },
];

export const fetchData = async () => new Promise(res => setTimeout(() => res(quizData), 300));

export const processQuizData = (data, callback) => callback(data);

export const calculateScore = (currentScore, points) => currentScore + points;