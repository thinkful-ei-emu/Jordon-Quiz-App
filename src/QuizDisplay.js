'use strict';
import Renderer from './lib/Renderer';
import $ from 'jquery';
import Question from './Question';

class QuizDisplay extends Renderer {
    getEvents(){
        return {
            'click .start-quiz': 'handleStart',
            'submit .submit-answer': 'handleSubmit',
            'click .continue': 'handleContinue',
        };
    }

    _generateIntro(){
        return `
        <div>
        <p>
            Welcome to the Trivia Quiz
        </p>
        <p>
            Test your smarts and see how high you can score!
        </p>
        </div>
        <div class="buttons">
            <button class="start-quiz">Start Quiz</button>
        </div>
        `;
    }

    _generateQuiz(){
        return `
        <div>
          <p>
            ${this.model.asked[0].text}
          </p>
          <p class="answer-list">
          <form class="submit-answer">
            ${this.generateAnswer()}
            <input type="submit" value="Submit"/>
          </form>
          </p>
        </div>
      `;
    }
    
    generateAnswer(){
        let answerHtml = this.model.asked[0].answers.map(answer => {
            return `
            <div>
            <input class="answer" type="radio" name="answer" value="${answer}">${answer}
            </div>
            `
        });
        return answerHtml.join('');
    }

    _generateCorrect() {
        return `
        <div>
          <p>
            ${this.model.asked[0].text}
          </p>
          <p class="correct-answer">
          You Got it!
          </p>
          <div>
          <p>The correct answer was</p>
          </div>
          <p>${this.model.asked[0].correctAnswer}</p>
          <button type="submit" class="continue" value="Continue">Continue</Button>
        </div>
      `;
      }

    _generateIncorrect(){
        return `
        <div>
        <p>${this.model.asked[0].text}</p>
        <p class="correct-answer">Sorry, that's incorrect</p>
        <div>
        <p>You answered: </p>
        </div>
        <div>
        <p>${this.model.asked[0].userAnswer}</p>
        </div>
        <div>
        <p>The correct answer was</p>
        </div>
        <p>${this.model.asked[0].correctAnswer}</p>
        <button type="submit" class="continue" value="Continue">Continue</Button>
        </div>
        `;
    }

    _generateEndgame(){
        return `
      <div>
        <p>
          ${this.model.message}
        </p>
        <p>
          Your final score was ${this.model.score} out of 5.
        </p>
        <p>${this.model.newHighScoreMessage}
        </p>
      </div>
      <div class="buttons">
        <button class="start-quiz">Play Again</button>
      </div>
    `;
    }

    template() {
        let html = '';
    
         if ((this.model.active === false) && (this.model.asked.length === 5)){
          html = this._generateEndgame();
        }
        else if (this.model.asked.length === 0) {
          html = this._generateIntro();
        }
        else {
          if (this.model.asked[0].answerStatus() === 1) {
            html = this._generateCorrect();
          }
          else if (this.model.asked[0].answerStatus() === 0) {
            html = this._generateIncorrect();
          }
          else{
          html = this._generateQuiz();
          }
        }
        return html;
      }

    handleStart(){
        this.model.startGame();
    }

    handleSubmit(event){
        event.preventDefault();
        const answer = event.target.answer.value;
        if (answer === ""){
            throw ('Must select an answer');
        } else{
            this.model.submitAnswer(answer);
            this.model.updateScore();
        }
    }

    handleContinue(event){
        event.preventDefault();
        if (this.model.unasked.length === 0){
            this.model.updateScoreHistory();
            this.model.newHighScore();
            this.model.updateHighestScore(this.model.scoreHistory);
            this.model.updateMessage();
            this.model.endGame();
        } else {
            this.model.nextQuestion();
        }
    }
}

export default QuizDisplay;