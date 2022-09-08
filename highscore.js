highScoreList = document.getElementById('highScoreList')
highScores = JSON.parse(localStorage.getItem('highscore'))

highScoreList.innerHTML = highScores
   .map(score => {
      return `<li class='high-scores'> ${score.name} - ${score.score} </li>`}
     ).join('');

