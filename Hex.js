const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const { basename } = require('path')

function main(){
    r = 360
    width = Math.round(r * 2)
    height = Math.round(Math.sqrt(3)*r)

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    waterarray = water(r)
    ctx.beginPath();
    ctx.moveTo(waterarray[0][0],waterarray[0][1])
    for (i=0; i< waterarray.length;i++){
        ctx.lineTo(waterarray[i][0],waterarray[i][1]);
    }
    ctx.lineWidth = 10
    ctx.closePath()
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'blue'
    ctx.stroke()
    ctx.fill()
    //ctx.fillRect(50, 50, 100, 100)
    fs.writeFileSync('tiles/node-tile.jpg', canvas.toBuffer())
}

function water(r){
    width = Math.round(r * 2)
    height = Math.round(Math.sqrt(3)*r)
    waterarray = []
    for (i = 1; i < 7; i++) {
        x = width/2+r*Math.sin(-2*Math.PI/6*i+Math.PI/2)
        y = height/2+r*Math.cos(-2*Math.PI/6*i+Math.PI/2)
        waterarray.push([x, y])
    } 
    return waterarray
}

function land(first_edge, last_edge){
    
}




main()