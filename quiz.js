function gradeQuiz() {
    let score = 0;
    let total = 5;
    let output = "";

   // Question 1 (Fill in blank)
let q1 = document.getElementById("q1").value.trim();
let q1Lower = q1.toLowerCase();

if (q1Lower.includes("hypertext markup language")) {
    score++;
    output += "<p style='color:green;'>Q1 Correct (Answer: HyperText Markup Language)</p>";
} else {
    let userAnswer = q1 ? q1 : "No answer";
    output += `<p style='color:red;'>Q1 Incorrect<br>
               Your answer: ${userAnswer}<br>
               Correct answer: HyperText Markup Language</p>`;
}
    // Question 2 (Radio)
   let q2 = document.querySelector('input[name="q2"]:checked');

if (q2 && q2.value === "b") {
    score++;
    output += "<p style='color:green;'>Q2 Correct (Answer: Styling)</p>";
} else {
    let userAnswer = q2 ? q2.nextSibling.textContent.trim() : "No answer";
    output += `<p style='color:red;'>Q2 Incorrect<br>
               Your answer: ${userAnswer}<br>
               Correct answer: Styling</p>`;
}

    // Question 3 (Radio)
    let q3 = document.querySelector('input[name="q3"]:checked');

if (q3 && q3.value === "b") {
    score++;
    output += "<p style='color:green;'>Q3 Correct (Answer: Interactivity)</p>";
} else {
    let userAnswer = q3 ? q3.nextSibling.textContent.trim() : "No answer";
    output += `<p style='color:red;'>Q3 Incorrect<br>
               Your answer: ${userAnswer}<br>
               Correct answer: Interactivity</p>`;
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
let answers = Array.from(selected).map(el => el.nextSibling.textContent.trim());

if (answers.includes("JavaScript") && answers.includes("Python") && answers.length === 2) {
    score++;
    output += "<p style='color:green;'>Q5 Correct (Answers: JavaScript and Python)</p>";
} else {
    let userAnswer = answers.length > 0 ? answers.join(", ") : "No answer";
    output += `<p style='color:red;'>Q5 Incorrect<br>
               Your answer: ${userAnswer}<br>
               Correct answers: JavaScript and Python</p>`;

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
