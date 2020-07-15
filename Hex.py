from PIL import Image, ImageDraw
import math

r = 360
width = int(r * 2)
height = int(math.sqrt(3)*r)

img = Image.new('RGBA', (width, height), color = (0,0,0,0))
draw = ImageDraw.Draw(img)
# all arrays go clockwise from top centre
# hexoutline
hexarray = [
    (0.5*r+width/2, 0),
    (width, height/2),
    (0.5*r+width/2, height),
    (width/2-0.5*r, height),
    (0, height/2),
    (width/2-0.5*r, 0)
]

#points where a path can enter / leave
r2 = r*math.sqrt(3)/2
patharray = [
    (width/2, 0),
    (width/2+r2*math.sqrt(3)/2,height/2-0.5*r2),
    (width/2+r2*math.sqrt(3)/2,height/2+0.5*r2),
    (width/2, height),
    (width/2-r2*math.sqrt(3)/2,height/2+0.5*r2),
    (width/2-r2*math.sqrt(3)/2,height/2-0.5*r2)
]
#points where rivers, mountains and forests can form.
r3 = (r*math.sqrt(3)/2)/math.cos(math.pi/12)
print(r,r2,r3)
geoarray = [
    (width/2+r3*math.sin(-2*math.pi/24*1+math.pi),height/2+r3*math.cos(-2*math.pi/24*1+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*3+math.pi),height/2+r3*math.cos(-2*math.pi/24*3+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*5+math.pi),height/2+r3*math.cos(-2*math.pi/24*5+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*7+math.pi),height/2+r3*math.cos(-2*math.pi/24*7+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*9+math.pi),height/2+r3*math.cos(-2*math.pi/24*9+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*11+math.pi),height/2+r3*math.cos(-2*math.pi/24*11+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*13+math.pi),height/2+r3*math.cos(-2*math.pi/24*13+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*15+math.pi),height/2+r3*math.cos(-2*math.pi/24*15+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*17+math.pi),height/2+r3*math.cos(-2*math.pi/24*17+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*19+math.pi),height/2+r3*math.cos(-2*math.pi/24*19+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*21+math.pi),height/2+r3*math.cos(-2*math.pi/24*21+math.pi)),
    (width/2+r3*math.sin(-2*math.pi/24*23+math.pi),height/2+r3*math.cos(-2*math.pi/24*23+math.pi))
    ]

draw.polygon(hexarray, fill='green', outline='black')
draw.polygon(patharray, fill='yellow', outline='orange')
draw.polygon(geoarray, fill='blue', outline='blue')

#draw.line((0, 0) + img.size, fill=(125,0,0,255))


#save to file
img.save('tiles/test-tile.png')
