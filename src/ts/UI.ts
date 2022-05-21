import * as PIXI from "pixi.js"
import { Game } from "./Game"

export class UI {
    private scoreField: PIXI.Text
    private game:Game
    private score:number = 0

    constructor(game: Game) { 
        this.game = game

        const style = new PIXI.TextStyle({
            fontFamily: 'ArcadeFont',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#ffffff']
        })
    
        this.scoreField = new PIXI.Text('Score : 0', style)
        this.scoreField.x = 20
        this.scoreField.y = 20

        this.game.container.addChild(this.scoreField)
    }

    public updateScore(s:number) {
        this.score += s
        this.scoreField.text = `Score : ${this.score}`
    }
}
