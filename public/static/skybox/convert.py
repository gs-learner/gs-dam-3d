from PIL import Image
import os
gmap = {
    'bk': 'nx', 'back': 'nx',  'negx': 'nx',
    'dn': 'ny', 'down': 'ny',  'negy': 'ny',
    'ft': 'px', 'front': 'px', 'posx': 'px',
    'lf': 'nz', 'left': 'nz',  'negz': 'nz',
    'rt': 'pz', 'right': 'pz', 'posz': 'pz',
    'up': 'py',                'posy': 'py',
}

for item in os.listdir('.'):
    if item.endswith('tga') or item.endswith('png') or item.endswith('jpg'):
        img = Image.open(item)
        item = item.lower()
        for k, v in gmap.items():
            if k in item:
                img.save(v + '.png')

        # img.save(item[:-4] + '_' + gmap[item[-6:-4]] + '.png')
        # img.save(gmap[item[-6:-4]] + '.png'