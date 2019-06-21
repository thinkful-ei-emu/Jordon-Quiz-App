import Model from './lib/Model';

class Question extends Model{
  constructor(questionData) {
    super();
    this.text = questionData.question;
    this.answers = [questionData.correct_answer, ...questionData.incorrect_answers];
    this.correctAnswer = questionData.correct_answer;
    this.userAnswer = null;
    this._shuffle(this.answers); 
  }

  _shuffle(arr) {
    let currentIndex = arr.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      //The Math.floor() function returns the largest integer less than or equal to a given number,
      //Math.random() * our array length
      randomIndex = Math.floor(Math.random() * currentIndex);
      //	x = x - y Decrementing
      currentIndex -= 1;
      //temp val = current index of array
      temporaryValue = arr[currentIndex];
      //current index of array = random index variable
      arr[currentIndex] = arr[randomIndex];
      //random index of array = temporary value
      arr[randomIndex] = temporaryValue;
    }
    //return new shuffled/Randomized array
    return arr;
  }

  submitAnswer(answer) {
    this.userAnswer = answer;
  }

  /**
   * Returns integer for question status:
   * -1 = unanswered
   *  0 = answered, incorrect
   *  1 = answered, correct
   */
  answerStatus() {
    if (this.userAnswer === null) {
      return -1;
    } else if (this.userAnswer === this.correctAnswer) {
      return 1;
    } else {
      return 0;
    }
  }  
}

export default Question;
