
# Start a Pixi Typescript project from scratch

To start a PixiJS Typescript project from scratch, first create a game folder and run:

```bash
npm init -y
```

Now you can install the libraries:

```bash
npm install pixi.js
npm install typescript -D
npm install parcel -D
```
<br>
<Br>

Now you can create a `src` folder and add a `index.html` and `app.ts` file. ⚠️ You can load the `.ts` file straight into the html!:
```html
<script defer type="module" src="./app.ts"></script>
```


In app.ts you can use PIXI as follows:

```javascript
import * as PIXI from 'pixi.js'
import ship from "./ship.png"

let app = new PIXI.Application({ width: 640, height: 360 })
document.body.appendChild(app.view)

let sprite = PIXI.Sprite.from(ship)
app.stage.addChild(sprite)
```
<br>
<Br>

To make developing easier you can add these `watch` and `build` commands to `package.json`

```json
"scripts": {
    "start": "parcel src/index.html --dist-dir docs",
    "build": "parcel build src/index.html --dist-dir docs --public-url ./"
}
```
Now you can use `npm run start` and `npm run build`.

### 😭 Parcel PNG import Bug

To fix an incorrect error message when importing PNG images you can add `// @ts-ignore` above the PNG import, or you can add a `globals.d.ts` file to the project root, containing: `declare module "*.png"`

