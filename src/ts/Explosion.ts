import * as PIXI from "pixi.js"

export class Explosion extends PIXI.AnimatedSprite {

    constructor(explosionTextures: PIXI.Texture[], x: number, y: number) {
        super(explosionTextures)

        this.anchor.set(0.5)
        this.x = x
        this.y = y
        // this.rotation = Math.random() * Math.PI
        this.scale.set(0.4 + Math.random() * 0.5)
        this.animationSpeed = 0.5
        this.loop = false

        this.onComplete = () => this.destroy()

        this.play()
    }
}