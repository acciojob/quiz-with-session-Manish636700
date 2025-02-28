document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
        { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
        { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
        { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" }
    ];

    const questionsContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");

    function loadProgress() {
        return JSON.parse(sessionStorage.getItem("progress")) || {};
    }

    function saveProgress(progress) {
        sessionStorage.setItem("progress", JSON.stringify(progress));
    }

    function loadScore() {
        const savedScore = localStorage.getItem("score");
        if (savedScore) {
            scoreDisplay.textContent = `Your last score was ${savedScore} out of 5.`;
        }
    }

    function renderQuestions() {
        const progress = loadProgress();
        questionsContainer.innerHTML = "";
        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `<p>${q.question}</p>`;
            q.choices.forEach(choice => {
                const label = document.createElement("label");
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `question${index}`;
                radio.value = choice;
                radio.checked = progress[index] === choice ? true : false;
                radio.addEventListener("change", () => {
                    progress[index] = choice;
                    saveProgress(progress);
                });
                label.appendChild(radio);
                label.appendChild(document.createTextNode(choice));
                questionDiv.appendChild(label);
            });
            questionsContainer.appendChild(questionDiv);
        });
    }

    function calculateScore() {
        const progress = loadProgress();
        let score = 0;
        questions.forEach((q, index) => {
            if (progress[index] === q.answer) {
                score++;
            }
        });
        localStorage.setItem("score", score);
        scoreDisplay.textContent = `Your score is ${score} out of 5.`;
    }

    submitButton.addEventListener("click", calculateScore);

    loadScore();
    renderQuestions();
});