/* ============================================================
   quiz.js — Rewired Realities Quiz Application
   IT 3203 Web Development — Milestone 3

   Description:
   Handles grading, feedback display, progress bar updates,
   and quiz reset for the 10-question web development quiz.

   Quiz question types supported:
     - Fill in the blank (text input)
     - Multiple choice (radio buttons)
     - Select all that apply (checkboxes)
   ============================================================ */

/* ── Answer Key ──────────────────────────────────────────────
   Each entry maps a question ID to its correct answer.
   For checkboxes (q9), the answer is a sorted array of values.
   ──────────────────────────────────────────────────────── */
const ANSWER_KEY = {
  q1:  "markup language",
  q2:  "b",
  q3:  "c",
  q4:  "b",
  q5:  "b",
  q6:  "c",
  q7:  "b",
  q8:  "c",
  q9:  ["article", "nav", "footer"],
  q10: "b",
};

/* Total number of questions */
const TOTAL = 10;

/* ── gradeQuiz() ─────────────────────────────────────────────
   Called when the user clicks "Submit Quiz".
   - Reads each answer from the form
   - Compares against the answer key
   - Highlights correct/incorrect labels
   - Updates the progress bar to 100%
   - Displays the results panel with score and feedback
   ──────────────────────────────────────────────────────── */
function gradeQuiz() {
  let score = 0;

  /* ── Q1: Fill-in-the-blank (text input) ── */
  const q1El    = document.getElementById("q1");
  const q1Input = q1El ? q1El.value.trim().toLowerCase() : "";

  // Accept common variations of the correct answer
  const q1Correct = q1Input === "markup language" ||
                    q1Input === "hypertext markup language" ||
                    q1Input === "markup";

  if (q1Correct) {
    score++;
    q1El.style.borderColor = "var(--color-correct)";
    q1El.style.background  = "#f0fdf4";
  } else {
    q1El.style.borderColor = "var(--color-wrong)";
    q1El.style.background  = "#fef2f2";
  }

  /* ── Q2–Q8 and Q10: Multiple choice (radio buttons) ── */
  const radioQuestions = ["q2", "q3", "q4", "q5", "q6", "q7", "q8", "q10"];

  radioQuestions.forEach(qId => {
    const container    = document.getElementById(`opts-${qId}`);
    const selected     = document.querySelector(`input[name="${qId}"]:checked`);
    const correctValue = ANSWER_KEY[qId];

    if (!container) return;

    // Highlight each label as correct (green) or incorrect (red)
    container.querySelectorAll("label").forEach(label => {
      const input = label.querySelector("input");
      if (!input) return;

      if (input.value === correctValue) {
        // Always highlight the correct answer
        label.classList.add("correct");
      } else if (selected && input.value === selected.value) {
        // Highlight the wrong selected answer
        label.classList.add("incorrect");
      }
    });

    // Award point if selected answer matches key
    if (selected && selected.value === correctValue) {
      score++;
    }
  });

  /* ── Q9: Select all that apply (checkboxes) ── */
  const q9Container = document.getElementById("opts-q9");
  if (q9Container) {
    const correctSet  = new Set(ANSWER_KEY.q9);
    const checkedVals = [];

    q9Container.querySelectorAll("input[type='checkbox']").forEach(cb => {
      if (cb.checked) checkedVals.push(cb.value);
    });

    // Sort both arrays and compare as strings for equality
    const checkedSorted = [...checkedVals].sort().join(",");
    const correctSorted = [...ANSWER_KEY.q9].sort().join(",");
    const q9Correct     = checkedSorted === correctSorted;

    if (q9Correct) score++;

    // Highlight checkbox labels
    q9Container.querySelectorAll("label").forEach(label => {
      const cb = label.querySelector("input");
      if (!cb) return;

      if (correctSet.has(cb.value)) {
        label.classList.add("correct");
      } else if (cb.checked) {
        label.classList.add("incorrect");
      }
    });
  }

  /* ── Update progress bar to 100% ── */
  updateProgress(TOTAL);

  /* ── Hide form, show results ── */
  document.getElementById("quizForm").style.display = "none";
  const resultsPanel = document.getElementById("quiz-results");
  resultsPanel.style.display = "block";

  /* ── Display score ── */
  document.getElementById("scoreDisplay").textContent = `${score} / ${TOTAL}`;

  /* ── Generate feedback message based on score ── */
  document.getElementById("scoreMsg").textContent = getScoreMessage(score);

  /* ── Scroll to results smoothly ── */
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}


/* ── getScoreMessage() ───────────────────────────────────────
   Returns a feedback string based on how many questions
   the user answered correctly.
   ──────────────────────────────────────────────────────── */
function getScoreMessage(score) {
  if (score === TOTAL) {
    return "Perfect score! Outstanding knowledge of web development fundamentals.";
  } else if (score >= 8) {
    return "Excellent work! You have a strong grasp of the core concepts.";
  } else if (score >= 6) {
    return "Good job! Review the highlighted questions and check the topic pages for details.";
  } else if (score >= 4) {
    return "Keep going — revisit the HTML and CSS pages, then try again!";
  } else {
    return "Don't give up! Start with the HTML page and work through each topic.";
  }
}


/* ── updateProgress() ────────────────────────────────────────
   Updates the visual progress bar.
   Called on answer changes and on submission.

   @param {number} answered — number of answered questions
   ──────────────────────────────────────────────────────── */
function updateProgress(answered) {
  const bar = document.getElementById("progressBar");
  if (!bar) return;

  const pct = Math.round((answered / TOTAL) * 100);
  bar.style.width = `${pct}%`;

  // Update ARIA attribute for accessibility
  const container = bar.parentElement;
  if (container) container.setAttribute("aria-valuenow", answered);
}


/* ── resetQuiz() ─────────────────────────────────────────────
   Resets the form to its initial state:
   - Clears all inputs and selections
   - Removes correct/incorrect CSS classes
   - Hides results panel, shows form
   - Resets progress bar to 0%
   ──────────────────────────────────────────────────────── */
function resetQuiz() {
  const form = document.getElementById("quizForm");

  // Reset all form inputs
  form.reset();

  // Remove highlight classes from all labels
  form.querySelectorAll("label").forEach(label => {
    label.classList.remove("correct", "incorrect");
  });

  // Reset text input styling for Q1
  const q1El = document.getElementById("q1");
  if (q1El) {
    q1El.style.borderColor = "";
    q1El.style.background  = "";
  }

  // Reset progress bar
  updateProgress(0);

  // Show form, hide results
  form.style.display = "block";
  document.getElementById("quiz-results").style.display = "none";

  // Scroll back to top of quiz
  document.querySelector(".quiz-wrapper").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ── Live progress tracking ──────────────────────────────────
   Updates the progress bar as the user answers questions,
   giving real-time visual feedback before submission.
   ──────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");
  if (!form) return;

  form.addEventListener("change", () => {
    let answered = 0;

    // Count text input (Q1) as answered if non-empty
    const q1 = document.getElementById("q1");
    if (q1 && q1.value.trim().length > 0) answered++;

    // Count radio groups: answered if any radio in the group is checked
    const radioGroups = new Set();
    form.querySelectorAll("input[type='radio']").forEach(r => {
      radioGroups.add(r.name);
    });
    radioGroups.forEach(name => {
      if (document.querySelector(`input[name="${name}"]:checked`)) {
        answered++;
      }
    });

    // Count checkbox group (Q9): answered if at least one is checked
    const q9Checks = form.querySelectorAll("input[name='q9']:checked");
    if (q9Checks.length > 0) answered++;

    updateProgress(answered);
  });
});
