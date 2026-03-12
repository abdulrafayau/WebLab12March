import { fetchData, processQuizData, calculateScore } from "./utils.js";

(function () {
  let quizQuestions = [];
  let currentStep = 0;
  let userScore = 0;
  let userSelection = null;

  const qText = document.getElementById("question-text");
  const optList = document.getElementById("options-list");
  const progressSpan = document.getElementById("current-index");
  const scoreSpan = document.getElementById("score-val");
  const nextButton = document.getElementById("next-btn");

  const startup = async function () {
    const data = await fetchData();

    processQuizData(data, function (readyData) {
      quizQuestions = readyData;
      // Update score denominator
      document.querySelector(".score-badge").innerHTML = `Score: <span id="score-val">0</span> / ${quizQuestions.length}`;
      loadQuestion();
    });
  };

  const loadQuestion = function () {
    const current = quizQuestions[currentStep];
    const question = current.question;
    const options = current.options;

    qText.textContent = question;
    optList.innerHTML = "";

    for (let i = 0; i < options.length; i++) {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerHTML =
        "<span class='label'>" +
        String.fromCharCode(65 + i) +
        "</span> " +
        "<span>" + options[i] + "</span>";

      btn.onclick = function () {
        const allBtns = optList.getElementsByTagName("button");
        for (let j = 0; j < allBtns.length; j++) {
          allBtns[j].classList.remove("selected");
        }
        btn.classList.add("selected");
        userSelection = i;
        nextButton.disabled = false; 
      };

      optList.appendChild(btn);
    }

    // Update progress tracker text
    document.querySelector(".progress-badge").innerHTML = `Question <span id="current-index">${currentStep + 1}</span> of ${quizQuestions.length}`;
    
    nextButton.textContent = "Submit Answer";
    nextButton.disabled = true; 
    nextButton.onclick = checkAnswer;
  };

  const checkAnswer = function () {
    if (userSelection === null) return;

    const current = quizQuestions[currentStep];
    const answer = current.answer;
    const buttons = optList.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.add("disabled");
    }

    if (userSelection === answer) {
      buttons[userSelection].classList.add("correct");
      userScore = calculateScore(userScore, 1);
      document.getElementById("score-val").textContent = userScore;
    } else {
      buttons[userSelection].classList.add("incorrect");
      buttons[answer].classList.add("correct");
    }

    nextButton.textContent =
      currentStep < quizQuestions.length - 1 ? "Next Question →" : "View Results";

    nextButton.onclick = moveToNext;
  };

  const moveToNext = function () {
    currentStep++;
    if (currentStep < quizQuestions.length) {
      userSelection = null;
      loadQuestion();
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = function () {
    const mainEl = document.querySelector(".quiz-card");
    // Calculate percentage for a nicer message
    const percentage = Math.round((userScore / quizQuestions.length) * 100);
    let message = percentage >= 80 ? "Outstanding!" : percentage >= 50 ? "Good Job!" : "Keep Practicing!";

    mainEl.innerHTML =
      "<div style='text-align:center; padding:50px 0;'>" +
      "<div style='font-size: 64px; margin-bottom: 20px;'>🎓</div>" +
      "<h2 style='font-size: 28px; color:#1e293b; margin-bottom: 10px;'>" + message + "</h2>" +
      "<p style='color: #64748b; margin-bottom: 40px; font-size:18px;'>You scored <b style='color:#2563eb; font-size: 22px;'>" +
      userScore +
      "</b> out of " +
      quizQuestions.length +
      "</p>" +
      "<button onclick='location.reload()' style='padding:16px 32px; cursor:pointer; background:#2563eb; color:white; border:none; border-radius:14px; font-weight:600; font-size: 16px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3); transition: all 0.2s;'>Retake Quiz</button>" +
      "</div>";
  };

  startup();
})();