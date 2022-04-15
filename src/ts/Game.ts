import "../css/styles.css"

import shipImage from "../images/ship.png"
import bulletImage from "../images/bullet.png"
import blockImage from "../images/block3.png"
import bgImage from "../images/background.png"

import * as PIXI from "pixi.js"
import { Ship } from "./Ship"
import { Block } from "./Block"
import { Background } from "./Background"
import { Bullet } from "./Bullet"
import { UI } from "./UI"

export class Game {

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

        this.pixi.loader
            .add("ship", shipImage)
            .add("background", bgImage)
            .add("bullet", bulletImage)
            .add("block", blockImage)
        

        this.pixi.loader.onProgress.add((loader) => this.showProgress(loader))
        this.pixi.loader.onComplete.add((loader, resources) => this.doneLoading(loader, resources))
        this.pixi.loader.onError.add((arg) => {console.error(arg)})
        this.pixi.loader.load()
    }

    private showProgress(loader: PIXI.Loader) {
        console.log(`Loading ${loader.progress}%`)
    }


    private doneLoading(loader: PIXI.Loader, resources:PIXI.utils.Dict<PIXI.LoaderResource>){
        console.log(resources)

        // add tiling bg
        this.bg = new Background(resources["background"].texture!, this.pixi.screen.width, this.pixi.screen.height)
        this.pixi.stage.addChild(this.bg)

        // add some blocks
        for (let i = 0; i < 10; i++) {
            let b = new Block(resources["block"].texture!, this)
            this.blocks.push(b)
            this.pixi.stage.addChild(b)
        }

        // create a ship
        this.ship = new Ship(resources["ship"].texture!, this)
        this.pixi.stage.addChild(this.ship)

        // create a UI
        this.ui = new UI(this)

        // start update loop
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    private update(delta:number) {
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
        let b = new Bullet(this.pixi.loader.resources["bullet"].texture!, this, x, y)
        this.bullets.push(b)
        this.pixi.stage.addChild(b)
    }

    public removeBullet(bullet: Bullet) {
        this.pixi.stage.removeChild(bullet)
        this.bullets = this.bullets.filter((b: Bullet) => b != bullet)
    }

    private removeBlock(block: Block) {
        this.pixi.stage.removeChild(block)
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
        const bounds1 = bullet.getBounds()
        const bounds2 = block.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new Game()