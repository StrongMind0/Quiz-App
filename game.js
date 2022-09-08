const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progrssText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let availableQuestion = [];
let score = 0;
let questionCounter = 0;

let questions = []

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
.then( res=>{
    return res.json();
})
.then(loadedQuestions =>{
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion =>{
        const formattedQuestion = {
            question: loadedQuestion.question
        };

       const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) +1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);
        
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index +1)] = choice;
        });

        return formattedQuestion;
    });
    startGame();
})
.catch(err => {
    console.error(err)
});

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 8;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
    game.classList.remove('hidden')
    loader.classList.add('hidden')
}

getNewQuestion = () => {
    if(availableQuestion === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/end.html');
   }
   questionCounter++

   progrssText.innerText = `Questions ${questionCounter}/${MAX_QUESTIONS}`
    progressBarFull.style.width = `${questionCounter / MAX_QUESTIONS *100}%`
    
    const questionIndex = Math.floor(Math.random() * availableQuestion.length)
    console.log(questionIndex);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;
    
    
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });
    availableQuestion.splice(questionIndex, 1);
    acceptingAnswers= true;
}    


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        
        acceptingAnswers = false
        selectedChoice = e.target;
        selectedAnswer = selectedChoice.dataset['number'];
        
        const classToApply = (selectedAnswer == currentQuestion.answer) ? 'correct' : 'incorrect';
        console.log(classToApply);

        if (classToApply === 'correct') incrementScore(CORRECT_BONUS);
        
        selectedChoice.parentElement.classList.add(classToApply);
        
        
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
        },500)
        
        setTimeout( () => {
            getNewQuestion();
        },1000)
        
    });
});

incrementScore = num => {
    score += num
    scoreText.innerText = score;
}

const NewT = Math.floor(Math.random() * 3) +1;
console.log(NewT);
