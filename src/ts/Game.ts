import * as PIXI from "pixi.js"
import { Ship } from "./Ship"
import { Block } from "./Block"
import { Background } from "./Background"
import { Bullet } from "./Bullet"
import { UI } from "./UI"
import { Explosion } from "./Explosion"
import { AssetLoader } from "./AssetLoader"

export class Game {

    public pixi: PIXI.Application
    public container : PIXI.Container
    private ship: Ship
    private blocks: Block[] = []
    private bullets: Bullet[] = []
    private bg: Background
    private ui:UI
    private explosionTextures:PIXI.Texture[] = []
    private assetLoader : AssetLoader
    private displacementSprite:PIXI.Sprite

    constructor() {
        const container = document.getElementById("container")!
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        container.appendChild(this.pixi.view)
        
        console.log("starting to load")
        this.assetLoader = new AssetLoader(this)
    }



    public doneLoading(){
        // create the explosion animation frames
        this.createExplosionFrames()
        // build the stage
        this.createScene()
        // crt effect filter on top of scene
        this.createDisplacementFilter()
    }

    private createScene() {
        // container to put a filter on
        this.container = new PIXI.Container
        this.pixi.stage.addChild(this.container)

        // add tiling bg
        this.bg = new Background(this.assetLoader.resources["background"].texture!, this.pixi.screen.width, this.pixi.screen.height)
        this.container.addChild(this.bg)

        // add some blocks
        for (let i = 0; i < 10; i++) {
            let b = new Block(this.assetLoader.resources["block"].texture!, this)
            this.blocks.push(b)
            this.container.addChild(b)
        }

        // create a ship
        this.ship = new Ship(this.assetLoader.resources["ship"].texture!, this)
        this.container.addChild(this.ship)

        // create a UI
        this.ui = new UI(this)

        // scanlines effect outside of the container
        let scans = new PIXI.TilingSprite(this.assetLoader.resources["scanTexture"].texture!, 900, 500)
        this.pixi.stage.addChild(scans)
        scans.blendMode = PIXI.BLEND_MODES.MULTIPLY
        scans.alpha = 0.3
        scans.tileScale.set(0.5)

        // start update loop
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    // filter to create a fake crt monitor effect
    private createDisplacementFilter() {
        this.displacementSprite = PIXI.Sprite.from(this.assetLoader.resources["waveTexture"].texture!)
        this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
        const displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)
        this.container.addChild(this.displacementSprite)
        this.container.filters = [displacementFilter]
        displacementFilter.scale.y = 10
    }

    private update(delta:number) {
        // move filter
        this.displacementSprite.y -= 2
        if (this.displacementSprite.y < -this.displacementSprite.height) { this.displacementSprite.y = 0 }

        // update game elements
        this.bg.update()
        this.ship.update()

        for (let block of this.blocks) {
            block.update()
        }

        for (let bullet of this.bullets) {
            bullet.update()
        }

        // check collisions
        this.checkCollisions()
    }

    public addBullet(x: number, y: number) {
        let b = new Bullet(this.assetLoader.resources["bullet"].texture!, this, x, y)
        this.bullets.push(b)
        this.container.addChild(b)
    }

    private createExplosionFrames() {
        for (let i = 0; i < 26; i++) {
            const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`)
            this.explosionTextures.push(texture)
        }
    }

    public createExplosion(x: number, y: number) {
        const explosion = new Explosion(this.explosionTextures, x, y)
        this.container.addChild(explosion)
    }   

    public removeBullet(bullet: Bullet) {
        this.bullets = this.bullets.filter((b: Bullet) => b != bullet)
        bullet.destroy()
    }

    private checkCollisions() {
        for (let bullet of this.bullets) {
            for (let block of this.blocks) {
                if(this.collision(bullet, block)){
                    this.createExplosion(bullet.x, bullet.y)
                    this.removeBullet(bullet)
                    block.resetPosition()
                    this.ui.updateScore(10)
                    break
                }
            }
        }
    }

    private collision(bullet:Bullet, block:Block) {
        const bounds1 = bullet.getBounds()
        const bounds2 = block.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new Game()