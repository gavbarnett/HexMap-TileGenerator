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

#points were a path can enter / leave
patharray = [
    (0.5*r+width/2-, 0),
    ()
]
#points were rivers, mountains and forests can form.
geoarray = []

draw.polygon(hexarray, fill='green', outline='black')
#draw.line((0, 0) + img.size, fill=(125,0,0,255))


#save to file
img.save('tiles/test-tile.png')
