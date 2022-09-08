const saveScoreBtn = document.getElementById('saveScoreBtn');
const username = document.getElementById('username');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highscore')) || [];
console.log(highScores);

username.addEventListener('keyup', ()=> {
    saveScoreBtn.disabled = !username.value;
});

finalScore.innerText = mostRecentScore;


saveHighScore = e => {
    console.log('this button has been clicked');
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value 
    }
     
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score)

    localStorage.setItem('highscore', JSON.stringify(highScores))
    highScores.splice(5)
    window.location.assign('/')
    console.log(highScores);
}
let person = {
    name: 'john',
    age: 24
};

newPerson = {
    ...person
};

person.name = 'max'

console.log(newPerson)