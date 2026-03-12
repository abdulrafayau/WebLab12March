export const quizData = [
  {
    id: 1,
    question: "What is the input extraction operator in C++?",
    options: ["<<", ">>", "::", "->"],
    answer: 1,
  },
  {
    id: 2,
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: ["var", "let", "def", "int"],
    answer: 1,
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
    options: ["OR gate", "AND gate", "XOR gate", "NOT gate"],
    answer: 1,
  }
];

export const fetchData = async () => new Promise(res => setTimeout(() => res(quizData), 300));

export const processQuizData = (data, callback) => callback(data);

export const calculateScore = (currentScore, points) => currentScore + points;