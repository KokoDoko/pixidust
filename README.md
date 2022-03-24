# Ruimtegruis

Game demo using PixiJS, Typescript and OOP. The project is compiled using Parcel. 

Check source code in [SRC/TS](https://github.com/KokoDoko/pixidust/tree/main/src/ts), [play the demo here](https://kokodoko.github.io/pixidust/)

- Classes
- Animation with Game Loop
- Repeating scrolling background 
- Keyboard controls
- Spawn bullets
- Checking Collisions
- Text

## Installing

First install [NodeJS](https://nodejs.org/en/). Then you can use `npm` to install all required libraries in one go: parcel, pixi and typescript:

```
npm install
```

Run the project in a live server
```
npm run start
```
Build the project for publication
```
npm run build
```


<br>
<br>
<br>

# Start project from scratch

To start a PixiJS Typescript project from scratch, first create a game folder and run:

```bash
npm init -y
```

Now you can install the libraries:

```bash
npm install pixi.js
npm install typescript -D
npm install parcel -D
npm install @types/pixi.js
```

To make developing easier you can add these `watch` and `build` commands to `package.json`

```json
"scripts": {
    "start": "parcel src/index.html --dist-dir docs",
    "build": "parcel build src/index.html --dist-dir docs --public-url ./"
}
```
Now you can use `npm run start` and `npm run build`.

### 😭 Parcel Bug

To fix a temporary parcel bug with loading PNG images you have to add a `globals.d.ts` file to the project root, containing: `declare module "*.png"`



<br>
<br>
<br>

# Links

- [PixiJS install instructions](https://github.com/pixijs/pixijs)
- [PixiJS getting started](https://pixijs.io/guides/basics/getting-started.html)
- [NodeJS](https://nodejs.org/en/)
