'use strict';

import Renderer from './lib/Renderer'

class QuizStatus extends Renderer{
    template(){
        return `
        <div>
        <p>Score: ${this.model.score}</p>
        </div>
        <div>
        <p>High Score: ${this.model.highestScore}</p>
        </div>
        <div>
        <p>Progress: ${this.generateProgress()}</p>
        </div>
        `;
    }

    generateProgress(){
        let progressHtml;
        if (this.model.asked.length === 0){
            progressHtml = "Start A New Game"
        } else {
            progressHtml = `${this.model.asked.length} of 5`;
        }
        return progressHtml;
    }

}

export default QuizStatus;