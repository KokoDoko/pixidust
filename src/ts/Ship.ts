import * as PIXI from "pixi.js"
import ship from "../images/ship.png"
import { Game } from "./Game"

export class Ship {
    private xspeed: number = 0
    private yspeed: number = 0
    private sprite: PIXI.Sprite
    private game:Game

    constructor(game:Game) {
        this.game = game
        this.sprite = PIXI.Sprite.from(ship)
        this.game.pixi.stage.addChild(this.sprite)
        this.sprite.x = 100
        this.sprite.y = this.game.pixi.screen.height/2 - 35

        
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }
    
    public update() {
        this.sprite.x += this.xspeed
        this.sprite.y += this.yspeed
    }

    private shoot(){
        this.game.addBullet(this.sprite.x + 80, this.sprite.y + 35)
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                this.shoot()
                break;
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}
