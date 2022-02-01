import "../css/styles.css"
import * as PIXI from "pixi.js"
import { Ship } from "./Ship"
import { Block } from "./Block"
import { Background } from "./Background"
import { Bullet } from "./Bullet"
import { UI } from "./UI"

export class App {

    public pixi: PIXI.Application
    private ship: Ship
    private blocks: Block[] = []
    private bullets: Bullet[] = []
    private bg: Background
    private ui:UI

    constructor() {
        const container = document.getElementById("container")!
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        container.appendChild(this.pixi.view)

        // add tiling bg
        this.bg = new Background(this)

        // add some blocks
        for (let i = 0; i < 10; i++) {
            this.blocks.push(new Block(this))
        }

        // create a ship
        this.ship = new Ship(this)

        // create a UI
        this.ui = new UI(this)

        // start update loop
        this.pixi.ticker.add((delta) => this.update())
    }

    private update() {
        this.bg.update()
        this.ship.update()

        for (let block of this.blocks) {
            block.update()
        }

        for (let bullet of this.bullets) {
            bullet.update()
        }

        this.checkCollisions()
    }

    public addBullet(x: number, y: number) {
        this.bullets.push(new Bullet(this, x, y))
    }

    public removeBullet(bullet: Bullet) {
        bullet.removeSprite()
        this.bullets = this.bullets.filter((b: Bullet) => b != bullet)
    }

    private removeBlock(block: Block) {
        block.removeSprite()
        this.blocks = this.blocks.filter((b: Block) => b != block)
    }

    private checkCollisions() {
        for (let bullet of this.bullets) {
            for (let block of this.blocks) {
                if(this.collision(bullet, block)){
                    this.removeBullet(bullet)
                    this.removeBlock(block)
                    this.ui.updateScore(10)
                    break
                }
            }
        }
    }

    private collision(bullet:Bullet, block:Block) {
        const bounds1 = bullet.getBoundingBox()
        const bounds2 = block.getBoundingBox()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new App()