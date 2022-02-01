import * as PIXI from "pixi.js"
import bullet from "../images/bullet.png"
import { App } from "./App"

export class Bullet {
    private sprite: PIXI.Sprite
    private app:App
    
    constructor(app: App, x:number, y:number) {
        this.app = app
        this.sprite = PIXI.Sprite.from(bullet)
        this.sprite.pivot.x = 30
        this.sprite.pivot.y = 30
        this.sprite.x = x + 20
        this.sprite.y = y + 20
        this.app.pixi.stage.addChild(this.sprite)
    }

    public update() {
        this.sprite.x += 3
        if (this.sprite.x > 900) this.app.removeBullet(this)
    }

    public removeSprite() {
        this.app.pixi.stage.removeChild(this.sprite)
    }

    public getBoundingBox(){
        return this.sprite.getBounds()
    }
}
