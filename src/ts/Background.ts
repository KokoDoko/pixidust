import * as PIXI from "pixi.js"
import background from "../images/background.png"
import { App } from "./Game"

export class Background {
  private tiles: PIXI.TilingSprite

  constructor(app: App) {
    const texture = PIXI.Texture.from(background)

    this.tiles = new PIXI.TilingSprite(
      texture,
      app.pixi.screen.width,
      app.pixi.screen.height
    )
    app.pixi.stage.addChild(this.tiles)
  }

  public update() {
    this.tiles.tilePosition.x -= 3
  }
}
