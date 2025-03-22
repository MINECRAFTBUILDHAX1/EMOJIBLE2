document.addEventListener("DOMContentLoaded", async function() {
    const puzzleDisplay = document.getElementById("puzzleDisplay");
    const answerInput = document.getElementById("answerInput");
    const message = document.getElementById("message");

    let today = new Date().toISOString().split("T")[0];
    let completed = localStorage.getItem("completed_" + today);

    if (completed) {
        message.innerHTML = "✅ You already solved today's puzzle!";
        return;
    }

    try {
        let response = await fetch("puzzles.json");
        let puzzles = await response.json();

        if (puzzles[today]) {
            let puzzle = puzzles[today];
            puzzleDisplay.innerHTML = `<span class="emoji">${puzzle.emoji}</span>`;
            window.correctAnswer = puzzle.answer.toLowerCase();
        } else {
            puzzleDisplay.innerHTML = "❌ No puzzle for today!";
        }
    } catch (error) {
        puzzleDisplay.innerHTML = "⚠️ Error loading puzzle.";
        console.error("Error fetching puzzles:", error);
    }
});

function checkAnswer() {
    let userAnswer = document.getElementById("answerInput").value.toLowerCase();
    let today = new Date().toISOString().split("T")[0];

    if (userAnswer === window.correctAnswer) {
        localStorage.setItem("completed_" + today, "true");
        document.getElementById("message").innerHTML = "✅ Correct! You solved today's puzzle!";
    } else {
        alert("❌ Try again!");
    }
}
