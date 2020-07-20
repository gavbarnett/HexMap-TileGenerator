const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

function main(){
    ctx.fillRect(50, 50, 100, 100)
    fs.writeFileSync('tiles/node-tile.jpg', canvas.toBuffer())
}




main()