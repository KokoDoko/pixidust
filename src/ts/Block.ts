import * as PIXI from "pixi.js"
import { Game } from "./Game"

export class Block extends PIXI.Sprite {

    private speed: number = 0
    private game:Game
    private rotationSpeed: number = 0.01

    constructor(texture: PIXI.Texture, game:Game) {
        super(texture)
        this.pivot.x = 45 / 2
        this.pivot.y = 45 / 2
        this.game = game
        this.resetPosition()
    }

    public update() {
        this.rotation += this.rotationSpeed
        this.x -= this.speed
        if (this.x < -100) this.resetPosition()
    }

    public resetPosition() {
        this.rotationSpeed = Math.random() / 100
        this.speed = 1 + Math.random()
        this.x = 940 + Math.random() * 120
        this.y = Math.random() * 570
    }
}
