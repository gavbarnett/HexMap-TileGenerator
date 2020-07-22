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
    //ctx.lineWidth = 10
    ctx.closePath()
    //ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'blue'
    ctx.stroke()
    ctx.fill()

    landarray = land(r,0,5,0.3)
    ctx.beginPath();
    ctx.moveTo(landarray[0][0],landarray[0][1])
    for (i=0; i< landarray.length;i++){
        ctx.lineTo(landarray[i][0],landarray[i][1]);
    }
    ctx.lineWidth = 1
    ctx.closePath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'green'
    ctx.stroke()
    ctx.fill()

    landarray = land(r,6,11,0.3)
    ctx.beginPath();
    ctx.moveTo(landarray[0][0],landarray[0][1])
    for (i=0; i< landarray.length;i++){
        ctx.lineTo(landarray[i][0],landarray[i][1]);
    }
    ctx.lineWidth = 1
    ctx.closePath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'green'
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

function land(r, first_point, last_point, wiggle_factor){
    width = Math.round(r * 2)
    height = Math.round(Math.sqrt(3)*r)
    r3 = (r*Math.sqrt(3)/2)/Math.cos(Math.PI/12)
    landarray = []
    x = width/2+r3*Math.sin(-2*Math.PI/12*first_point+Math.PI/4)
    y = height/2+r3*Math.cos(-2*Math.PI/12*first_point+Math.PI/4)
    landarray.push([x, y])
    for (i = Math.floor(first_point/2)+1; i < last_point/2+1; i++) {
        x = width/2+r*Math.sin(-2*Math.PI/6*i+Math.PI/2)
        y = height/2+r*Math.cos(-2*Math.PI/6*i+Math.PI/2)
        landarray.push([x, y])
    }
    x = width/2+r3*Math.sin(-2*Math.PI/12*last_point+Math.PI/4)
    y = height/2+r3*Math.cos(-2*Math.PI/12*last_point+Math.PI/4)
    landarray.push([x, y])
    w = wiggle(landarray[landarray.length-1],landarray[0],wiggle_factor)
    landarray = landarray.concat(w)
    return landarray
}

function wiggle(start, end, w_factor){
    wpoly = [start, end]
    for (m=1; m<6; m++){
        l = wpoly.length-1
        temppoly = []
        for (n=0; n<l; n += 1){
            hyp = Math.pow(Math.pow(wpoly[n][0] - wpoly[n+1][0],2) + Math.pow(wpoly[n][1] - wpoly[n+1][1],2),0.5)
            ang = Math.atan2((wpoly[n][0] - wpoly[n+1][0]),(wpoly[n][1] - wpoly[n+1][1]))+Math.PI/2
            rnd = Math.min(hyp*w_factor,360/10)
            rnd = Math.random() * (rnd - (-rnd)) + (-rnd)
            x = mean([wpoly[n][0], wpoly[n+1][0]])+rnd*Math.sin(ang)
            y = mean([wpoly[n][1], wpoly[n+1][1]])+rnd*Math.cos(ang)
            new_point = [x,y]
            temppoly.push(wpoly[n], new_point)
        }
        temppoly.push(wpoly[l])
        wpoly = JSON.parse(JSON.stringify(temppoly));
    }
    wpoly.push()
    wpoly.pop()
    return wpoly
}

function mean(numbers) {
    var total = 0, i;
    for (i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return (total / numbers.length)
}

main()