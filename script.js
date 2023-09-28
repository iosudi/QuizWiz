const questions = [
  {
    question: "What does 'WWW' stand for in a website's URL",
    answers: [
      {
        answer: "World Wide Web",
        correct: true,
      },
      { answer: "Website Webpage Widget", correct: false },
      { answer: "Website Webpage Widget", correct: false },
      { answer: "Webpage World Watch", correct: false },
    ],
  },
  {
    question:
      "Which government department is responsible for handling passports in the United States",
    answers: [
      {
        answer: "Department of Transportation",
        correct: false,
      },
      { answer: "Department of State", correct: true },
      { answer: "Department of Defense", correct: false },
      { answer: "Department of Homeland Security", correct: false },
    ],
  },
  {
    question: "Which is largest country in the world?",
    answers: [
      {
        answer: "United States",
        correct: false,
      },
      { answer: "India", correct: false },
      { answer: "Australia", correct: false },
      { answer: "Russia", correct: true },
    ],
  },
  {
    question: "What does HTML stand for?",
    answers: [
      {
        answer: "Hyper Text Preprocessor",
        correct: false,
      },
      { answer: "Hyper Text Markup Language", correct: true },
      { answer: "Hyper Text Multiple Language", correct: false },
      { answer: "Hyper Tool Multi Language", correct: false },
      ,
    ],
  },
  {
    question:
      "In which year did the World Wide Web (WWW) become publicly accessible",
    answers: [
      { answer: "1985", correct: false },
      { answer: "2005", correct: false },
      { answer: "1993", correct: true },
      { answer: "2015", correct: false },
    ],
  },
  {
    question: "Which of the following is a widely used social media platform",
    answers: [
      { answer: "Facebook", correct: true },
      { answer: "Twitter", correct: false },
      { answer: "Instagram", correct: false },
      { answer: "LinkedIn", correct: false },
    ],
  },
  {
    question:
      "What is the name of Luffy's signature attack, where he stretches his arm and punches his enemies",
    answers: [
      { answer: "Gomu Gomu no Gatling", correct: false },
      { answer: "Gomu Gomu no Pistol", correct: true },
      { answer: "Gomu Gomu no Bazooka", correct: false },
      { answer: "Gomu Gomu no Red Hawk", correct: false },
    ],
  },
  {
    question:
      "Who is the main protagonist of 'One Piece' and the captain of the Straw Hat Pirates?",
    answers: [
      { answer: "Roronoa Zoro", correct: false },
      { answer: "Sanji", correct: false },
      { answer: "Nami", correct: false },
      { answer: " Monkey D. Luffy", correct: true },
    ],
  },
  {
    question: "Who is the main character in the anime 'Naruto'",
    answers: [
      { answer: "Luffy", correct: false },
      { answer: "Naruto", correct: true },
      { answer: "Goku", correct: false },
      { answer: "Ichigo", correct: false },
    ],
  },
  {
    question: "In programming, what does the acronym 'CSS' stand for",
    answers: [
      { answer: " Cascading Style Sheet", correct: true },
      { answer: "Computer Style Sheet", correct: false },
      { answer: "Creative Style Sheet", correct: false },
      { answer: "Control Style Sheet", correct: false },
    ],
  },
  {
    question: "Which planet is closest to the Sun?",
    answers: [
      { answer: "Venus", correct: false },
      { answer: "Mercury", correct: true },
      { answer: "Earth", correct: false },
      { answer: "Mars", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { answer: "London", correct: false },
      { answer: "Berlin", correct: false },
      { answer: "Paris", correct: true },
      { answer: "Rome", correct: false },
    ],
  },
];
const quizContainer = $(".quiz");
const questionEl = $(".quiz #question");
const answerButtons = $(".answer-buttons");
const nextButton = $(".next");
const currentQue = $(".currentQue");
const totalQue = $(".totalQue");
const counter = $(".counter");

let questionsRemaining = [];
let score = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  questionsRemaining = [...questions];
  shuffle(questionsRemaining);

  score = 0;
  nextButton.text("Next Que.");
  nextButton.prop("disabled", true);
  questionsShown = 0;
  showQuestion();

  nextButton.off("click");
  nextButton.on("click", handleNextButton);
  quizContainer.css("border-bottom", " 1px solid #bebebe");
  counter.css("scale", "1");
}

function showQuestion() {
  const currentQuestion = questionsRemaining.pop();
  const QueNo = questionsShown + 1;
  questionEl.html(QueNo + ". " + currentQuestion.question);

  answerButtons.empty();

  currentQuestion.answers.forEach((answer) => {
    const button = $("<button>").text(answer.answer).addClass("btn");

    button.on("click", () => checkAnswer(button));

    answerButtons.append(button);

    if (answer.correct) {
      button.data("correct", true);
    }
  });

  currentQue.text(QueNo);
  totalQue.text(6);
  questionsShown++;
}

function checkAnswer(selectedButton) {
  const isCorrect = selectedButton.data("correct") === true;

  if (isCorrect) {
    score++;
  } else {
    selectedButton.addClass("incorrect");
    const span = $("<span>").addClass("fa-regular fa-circle-xmark");
    selectedButton.append(span);
  }

  Array.from(answerButtons.children()).forEach((button) => {
    const $button = $(button);
    if ($button.data("correct") === true) {
      $button.addClass("correct");
      const span = $("<span>").addClass("fa-regular fa-circle-check");
      $button.append(span);
    }
    $button.prop("disabled", true);
  });
  nextButton.prop("disabled", false);
}

function handleNextButton() {
  nextButton.prop("disabled", true);

  if (questionsShown === 6) {
    showScore();
  } else {
    showQuestion();
  }
}

function showScore() {
  answerButtons.empty();
  questionEl.html(`You scored ${score} out of 6!`);
  quizContainer.css("border-bottom", "none");
  nextButton.text("Try Again");
  nextButton.prop("disabled", false);
  nextButton.off("click");
  nextButton.on("click", startQuiz);
  counter.css("scale", "0");
}

nextButton.on("click", () => {
  nextButton.prop("disabled", true);
  handleNextButton();
});

startQuiz();
