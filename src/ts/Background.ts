import * as PIXI from "pixi.js"
import background from "../images/background.png"
import { Game } from "./Game"

export class Background {
  private tiles: PIXI.TilingSprite

  constructor(game: Game) {
    const texture = PIXI.Texture.from(background)

    this.tiles = new PIXI.TilingSprite(
      texture,
      game.pixi.screen.width,
      game.pixi.screen.height
    )
    game.pixi.stage.addChild(this.tiles)
  }

  public update() {
    this.tiles.tilePosition.x -= 3
  }
}
