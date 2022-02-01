import * as PIXI from "pixi.js"
import block from "../images/block3.png"
import { App } from "./App"

export class Block {
    private sprite: PIXI.Sprite
    private speed: number = 0
    private app:App
    private rotationSpeed: number = 0.01

    constructor(app: App) {
        this.sprite = PIXI.Sprite.from(block)
        this.sprite.pivot.x = 45 / 2
        this.sprite.pivot.y = 45 / 2
        this.app = app
        this.app.pixi.stage.addChild(this.sprite)
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
        this.app.pixi.stage.removeChild(this.sprite)
    }
}
