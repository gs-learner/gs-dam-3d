from PIL import Image
import os
gmap = {
    'bk': 'nz',
    'dn': 'ny',
    'ft': 'pz',
    'lf': 'nx',
    'rt': 'px',
    'up': 'py'
}

for item in os.listdir('.'):
    if item.endswith('tga'):
        img = Image.open(item)
        
        img.save(item[:-4] + '_' + gmap[item[-6:-4]] + '.png')