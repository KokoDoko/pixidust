import * as PIXI from "pixi.js"
import { Game } from "./Game"

import shipImage from "../images/ship.png"
import bulletImage from "../images/bullet.png"
import blockImage from "../images/block3.png"
import bgImage from "../images/background.png"

export class AssetLoader extends PIXI.Loader {

    graphics:PIXI.Graphics
    game:Game

    constructor(game:Game) {
        super()

        this.game = game
        this.graphics = new PIXI.Graphics()
        game.pixi.stage.addChild(this.graphics)

        this.add("ship", shipImage)
            .add("background", bgImage)
            .add("bullet", bulletImage)
            .add("block", blockImage)
            .add("spritesheet", "explosion.json")


        this.onProgress.add((loader) => this.showProgress(loader))
        this.onError.add((arg) => { console.error(arg) })
        this.load(() => {
            this.graphics.destroy()
            game.doneLoading()
        })
    }

    private showProgress(loader: PIXI.Loader) {
        console.log(`Loading ${loader.progress}%`)
        let offset = 50
        let barWidth = (this.game.pixi.screen.width - (offset * 2)) * (loader.progress/100)
        this.graphics.clear()
        this.graphics.beginFill(0x32DE49)
        this.graphics.drawRect(offset, this.game.pixi.screen.height/2 - 20, barWidth, 40)
        this.graphics.endFill()
    }
  
}