const quizData = [               /* Array  */
  {
    question: '1. What is the national bird of the United States?',
    options: ['Eagle', 'Bald Eagle', 'Condor', 'Pigeon'],
    answer: 'Eagle',
  },
  {
    question: '2. What is the highest-grossing film of all time?',
	options: ['Titanic', 'Avatar', 'Avengers: Endgame', 'Star Wars: The Force Awakens'],
    answer: 'Avengers: Endgame',
  },
  {
    question: '3. What does NASA stand for?',
    options: ['North American Satellite Association', 
			  'National Aeronautics and Space Administration',
			  'National Association of Space Astronauts',
			  'National American Space Association'],
    answer: 'National Aeronautics and Space Administration ',
  },
  {
    question: '4. What is the fastest land animal?',
    options: ['Cheetah', 'Ostrich', 'Lion', 'Elephant'],
    answer: 'Cheetah',
  },
  {
    question: '5. Which is the largest ocean on Earth?',
    options: [
      'Pacific Ocean',
      'Indian Ocean',
      'Atlantic Ocean',
      'Arctic Ocean',
    ],
    answer: 'Pacific Ocean',
  },
  {
    question: '6. What is the largest country in the world by area?',
    options: ['Canada', 'United States', 'Australia', 'Russia'],
    answer: 'Russia',
  },
  {
    question: '7. In what year was Facebook founded?',
    options: ['2000','2004','2008','2010'],
    answer: '2004',
  },
  {
    question: '8. Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
    answer: 'Mars',
  },
  {
    question: '9. Who was the first man to walk on the moon?',
    options: [
      'John Glenn',
      'Yuri Gagarin',
      'Buzz Aldrin',
      'Neil Armstrong',
    ],
    answer: 'Neil Armstrong',
  },
  {
    question: '10. Which animal is known as the King of the Jungle?',
    options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
    answer: 'Lion',
  },
];

/* Elements */
const quizContainer = document.getElementById('quiz');        
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

/* variables */
let currentQuestion = 0;        
let score = 0;    //Initialize score at the beginning of the script.
let incorrectAnswers = [];
let timerInterval;
const timeLimit = 20; // Time limit per question in seconds

function startTimer() {
    let timeLeft = timeLimit;

    const timerDisplay = document.getElementById("timer");

    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();		
        }
        timeLeft--;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function loadQuestion() {
    resetTimer();
	const q = quizData[currentQuestion];
    questionElement.innerText = q.question;
    optionsElement.innerHTML = '';
    q.options.forEach((option) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(option)); //Adding an EventListener to each button to handle answer selection.
        optionsElement.appendChild(button);
    });
    startTimer(); // Start timer for the current question
}

function shuffleArray(array)     /*which takes an array as input and shuffles its elements randomly. 
                             This function is used to randomize the order of answer options for each question.*/
  {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
  
function displayQuestion() {
	startTimer();
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }
  
  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
	stopTimer();
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;     // Increment score for Correct answer.
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
	currentQuestion++;      //Incrementing the currentQuestionIndex to advance the quiz to the next question.
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  timer.style.display = 'none';

  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}


function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <p style="color: red;"><strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br></p>
        <p style="color: green;"><U><strong>Correct Answer:</strong></U> ${incorrectAnswers[i].correctAnswer}</p>
      </p>
	  
        <h>========================================</h>
    `;
  }

  resultContainer.innerHTML = `
    <p style="font-size: 26px;">You scored ${score} out of ${quizData.length}!</p>
	<h>---------------------------------------</h>
	
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();