import * as PIXI from "pixi.js"
import block from "../images/block3.png"
import { Game } from "./Game"

export class Block {
    private sprite: PIXI.Sprite
    private speed: number = 0
    private game:Game
    private rotationSpeed: number = 0.01

    constructor(game: Game) {
        this.sprite = PIXI.Sprite.from(block)
        this.sprite.pivot.x = 45 / 2
        this.sprite.pivot.y = 45 / 2
        this.game = game
        this.game.pixi.stage.addChild(this.sprite)
        this.resetPosition()
    }

    public update() {
        this.sprite.rotation += this.rotationSpeed
        this.sprite.x -= this.speed
        if (this.sprite.x < -100) this.resetPosition()
    }

    private resetPosition() {
        this.rotationSpeed = Math.random() / 100
        this.speed = 1 + Math.random()
        this.sprite.x = 940 + Math.random() * 120
        this.sprite.y = Math.random() * 570
    }

    public getBoundingBox() {
        return this.sprite.getBounds()
    }

    public removeSprite(){
        this.game.pixi.stage.removeChild(this.sprite)
    }
}
