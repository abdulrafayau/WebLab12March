import { questions, checkAnswer } from "./utils.js";

(function () {
    let currentIdx = 0;
    let score = 0;

    const qElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const scoreElement = document.getElementById("score-display");
    const nextBtn = document.getElementById("submitBtn");

    const renderQuestion = () => {
        const { q, options, answer } = questions[currentIdx];
        qElement.textContent = q;
        optionsElement.innerHTML = "";
        nextBtn.style.display = "none";
        nextBtn.textContent = "Next Question"; 

        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = opt;
            btn.onclick = () => {
                const isCorrect = checkAnswer(opt, answer);
                if (isCorrect) {
                    score++;
                    btn.classList.add("correct");
                } else {
                    btn.classList.add("incorrect");
                }
                scoreElement.textContent = `Score: ${score}`;
                Array.from(optionsElement.children).forEach(b => b.disabled = true);
                nextBtn.style.display = "block";
            };
            optionsElement.appendChild(btn);
        });
    };

    const handleNext = () => {
        currentIdx++;
        if (currentIdx < questions.length) {
            renderQuestion();
        } else {
            qElement.textContent = "Quiz Completed! :)";
            optionsElement.innerHTML = "";
            nextBtn.textContent = "Restart Quiz";
            nextBtn.onclick = handleRestart; 
        }
    };

    const handleRestart = () => {
        currentIdx = 0;
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        nextBtn.onclick = handleNext; 
        renderQuestion();
    };

    nextBtn.onclick = handleNext;

    renderQuestion();
})();