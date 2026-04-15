function gradeQuiz() {
    let score = 0;
    let total = 5;
    let output = "";

    let q1 = document.getElementById("q1").value.toLowerCase();
    if (q1.includes("hypertext markup language")) {
        score++;
        output += "<p style='color:green;'>Q1 Correct</p>";
    } else {
        output += "<p style='color:red;'>Q1 Incorrect</p>";
    }

    let q2 = document.querySelector('input[name="q2"]:checked');
    if (q2 && q2.value === "b") score++;

    let q3 = document.querySelector('input[name="q3"]:checked');
    if (q3 && q3.value === "b") score++;

    let q4 = document.querySelector('input[name="q4"]:checked');
    if (q4 && q4.value === "a") score++;

    let q5 = document.querySelectorAll('input[name="q5"]:checked');
    let answers = Array.from(q5).map(el => el.value);
    if (answers.includes("b") && answers.includes("c") && answers.length === 2) score++;

    let result = score >= 3 ? "PASS" : "FAIL";

    document.getElementById("results").innerHTML =
        `<h2>${result}</h2>
         <p>Score: ${score}/${total}</p>
         ${output}`;
}

function resetQuiz() {
    document.getElementById("results").innerHTML = "";
}
