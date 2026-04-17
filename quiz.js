function gradeQuiz() {
    let score = 0;
    let total = 5;
    let output = "";

    // Question 1
    let q1 = document.getElementById("q1").value.trim().toLowerCase();
    if (q1.includes("hypertext markup language")) {
        score++;
        output += "<p style='color:green;'>Q1 Correct (Answer: HyperText Markup Language)</p>";
    } else {
        let userAnswer = q1 || "No answer";
        output += `<p style='color:red;'>Q1 Incorrect<br>
        Your answer: ${userAnswer}<br>
        Correct answer: HyperText Markup Language</p>`;
    }

    // Question 2
    let q2 = document.querySelector('input[name="q2"]:checked');
    let q2Map = { a: "Structure", b: "Styling", c: "Database" };

    if (q2 && q2.value === "b") {
        score++;
        output += "<p style='color:green;'>Q2 Correct (Answer: Styling)</p>";
    } else {
        let userAnswer = q2 ? q2Map[q2.value] : "No answer";
        output += `<p style='color:red;'>Q2 Incorrect<br>
        Your answer: ${userAnswer}<br>
        Correct answer: Styling</p>`;
    }

    // Question 3
    let q3 = document.querySelector('input[name="q3"]:checked');
    let q3Map = { a: "Styling", b: "Interactivity", c: "Storage" };

    if (q3 && q3.value === "b") {
        score++;
        output += "<p style='color:green;'>Q3 Correct (Answer: Interactivity)</p>";
    } else {
        let userAnswer = q3 ? q3Map[q3.value] : "No answer";
        output += `<p style='color:red;'>Q3 Incorrect<br>
        Your answer: ${userAnswer}<br>
        Correct answer: Interactivity</p>`;
    }

    // Question 4
    let q4 = document.querySelector('input[name="q4"]:checked');
    let q4Map = { a: "querySelector", b: "getAll", c: "findElement" };

    if (q4 && q4.value === "a") {
        score++;
        output += "<p style='color:green;'>Q4 Correct (Answer: querySelector)</p>";
    } else {
        let userAnswer = q4 ? q4Map[q4.value] : "No answer";
        output += `<p style='color:red;'>Q4 Incorrect<br>
        Your answer: ${userAnswer}<br>
        Correct answer: querySelector</p>`;
    }

    // Question 5
    let selected = document.querySelectorAll('input[name="q5"]:checked');
    let values = Array.from(selected).map(el => el.value);

    let q5Map = { a: "HTML", b: "JavaScript", c: "Python" };
    let userAnswer = values.length > 0 ? values.map(v => q5Map[v]).join(", ") : "No answer";

    if (values.length === 2 && values.includes("b") && values.includes("c")) {
        score++;
        output += "<p style='color:green;'>Q5 Correct (Answers: JavaScript and Python)</p>";
    } else {
        output += `<p style='color:red;'>Q5 Incorrect<br>
        Your answer: ${userAnswer}<br>
        Correct answers: JavaScript and Python</p>`;
    }

    // Final Result
    let result = score >= 3 ? "PASS" : "FAIL";

    document.getElementById("results").innerHTML = `
        <h2 style="color:${result === "PASS" ? "green" : "red"};">${result}</h2>
        <p><strong>Score: ${score}/${total}</strong></p>
        ${output}
    `;
}

function resetQuiz() {
    document.getElementById("results").innerHTML = "";
}
