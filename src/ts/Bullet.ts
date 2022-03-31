import * as PIXI from "pixi.js"
import bullet from "../images/bullet.png"
import { Game } from "./Game"

export class Bullet {
    private sprite: PIXI.Sprite
    private game:Game
    
    constructor(game: Game, x:number, y:number) {
        this.game = game
        this.sprite = PIXI.Sprite.from(bullet)
        this.sprite.pivot.x = 30
        this.sprite.pivot.y = 30
        this.sprite.x = x + 20
        this.sprite.y = y + 20
        this.game.pixi.stage.addChild(this.sprite)
    }

    public update() {
        this.sprite.x += 3
        if (this.sprite.x > 900) this.game.removeBullet(this)
    }

    public removeSprite() {
        this.game.pixi.stage.removeChild(this.sprite)
    }

    public getBoundingBox(){
        return this.sprite.getBounds()
    }
}
