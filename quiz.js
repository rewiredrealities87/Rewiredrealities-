function gradeQuiz() {
    let score = 0;
    let total = 5;
    let output = "";

    // Question 1 (Fill in blank)
    let q1 = document.getElementById("q1").value.toLowerCase().trim();
    if (q1.includes("hypertext markup language")) {
        score++;
        output += "<p style='color:green;'>Q1 Correct</p>";
    } else {
        output += "<p style='color:red;'>Q1 Incorrect (Correct answer: HyperText Markup Language)</p>";
    }

    // Question 2 (Radio)
    let q2 = document.querySelector('input[name="q2"]:checked');
    if (q2 && q2.value === "b") {
        score++;
        output += "<p style='color:green;'>Q2 Correct</p>";
    } else {
        output += "<p style='color:red;'>Q2 Incorrect (Correct answer: Styling)</p>";
    }

    // Question 3 (Radio)
    let q3 = document.querySelector('input[name="q3"]:checked');
    if (q3 && q3.value === "b") {
        score++;
        output += "<p style='color:green;'>Q3 Correct</p>";
    } else {
        output += "<p style='color:red;'>Q3 Incorrect (Correct answer: Interactivity)</p>";
    }

    // Question 4 (Radio)
    let q4 = document.querySelector('input[name="q4"]:checked');
    if (q4 && q4.value === "a") {
        score++;
        output += "<p style='color:green;'>Q4 Correct</p>";
    } else {
        output += "<p style='color:red;'>Q4 Incorrect (Correct answer: querySelector)</p>";
    }

    // Question 5 (Checkbox / Multi-select)
    let selected = document.querySelectorAll('input[name="q5"]:checked');
    let answers = Array.from(selected).map(el => el.value);

    // Correct = ONLY b and c selected
    if (answers.length === 2 && answers.includes("b") && answers.includes("c")) {
        score++;
        output += "<p style='color:green;'>Q5 Correct</p>";
    } else {
        output += "<p style='color:red;'>Q5 Incorrect (Correct answers: JavaScript and Python)</p>";
    }

    // Final Result
    let result = score >= 3 ? "PASS" : "FAIL";

    document.getElementById("results").innerHTML = `
        <h2 style="color:${result === "PASS" ? "green" : "red"};">${result}</h2>
        <p><strong>Score: ${score}/${total}</strong></p>
        ${output}
    `;
}

// Reset button
function resetQuiz() {
    document.getElementById("results").innerHTML = "";
}
