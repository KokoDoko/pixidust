import * as PIXI from "pixi.js"
import block from "../images/block3.png"
import { App } from "./Game"

export class UI {
    private scoreField: PIXI.Text
    private app:App
    private score:number = 0

    constructor(app: App) { 
        this.app = app

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 26,
            fontWeight: 'bold',
            fill: ['#ffffff']
        })
    
        this.scoreField = new PIXI.Text('Score : 0', style)
        this.scoreField.x = 20
        this.scoreField.y = 20

        this.app.pixi.stage.addChild(this.scoreField)
    }

    public updateScore(s:number) {
        this.score += s
        this.scoreField.text = `Score : ${this.score}`
    }
}
