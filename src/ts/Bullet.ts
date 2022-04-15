import * as PIXI from "pixi.js"
import { Game } from "./Game"

export class Bullet extends PIXI.Sprite {
    private game:Game
    
    constructor(texture: PIXI.Texture, game: Game , x: number, y: number) {
        super(texture)
        this.game = game
        this.pivot.x = 30
        this.pivot.y = 30
        this.x = x + 20
        this.y = y + 20
    }

    public update() {
        this.x += 3
        if (this.x > 900) this.game.removeBullet(this)
    }
}
