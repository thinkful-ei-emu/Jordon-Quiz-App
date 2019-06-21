import Question from './Question';
import TriviaApi from './TriviaApi';
import Model from './lib/Model';

class Quiz extends Model {

  static DEFAULT_QUIZ_LENGTH = 5;

  constructor() {
    //Properties of quiz
    super();
    this.unasked = [];
    this.asked = [];
    this.active = false;
    this.score = 0;
    this.scoreHistory = [];
    this.highestScore = 0;
    this.message = null;
    this.newHighScoreMessage = null;
  }

 
  startGame() {
    //properties for new game
    this.asked = [];
    this.active = true;
    this.score = 0;
    //Creates trivia which is data from api
    const triviaApi = new TriviaApi();
    
    triviaApi.getQuestions()
      .then(res => {
        res.results.forEach(item => {
          let question = new Question(item);
          this.unasked.push(question);
        });
        this.nextQuestion();
      })
      .catch(err => console.log(err.message));
  }

  endGame(){
    this.active = false;
    this.update();
  }

  nextQuestion() {
    this.asked.unshift(this.unasked.shift());
    this.update();
  }

  getCurrentQuestion() {
    return this.asked[0];
  }

  submitAnswer(a){
    this.asked[0].submitAnswer(a);
    this.update();
  }

  updateScore() {
    if(this.asked[0].userAnswer === this.asked[0].correctAnswer){
      this.score++;
      this.update();
    } 
  }

  updateScoreHistory(){
    if(this.asked.length === 5){
      this.scoreHistory.push(this.score);
      this.update();
    }
  }

  updateHighestScore(arr){
    let highest;
    if(arr.length === 0){
      highest = 0;
    } else {
      highest = Math.floor(...arr)
    }
    this.highestScore = highest;
    this.update();
  }

  newHighScore(){
    if(this.score > this.highestScore){
      this.newHighScoreMessage = "THAT'S A NEW HIGH SCORE!";
    } else {
      this.newHighScoreMessage = '';
    }
    this.update();
  }

  updateMessage(){
    if(this.score > 4){
      this.message = 'Well Done!';
    }else {
      this.message = 'Better Luck Next Time.';
    }
    this.update();
  }
}

export default Quiz;
