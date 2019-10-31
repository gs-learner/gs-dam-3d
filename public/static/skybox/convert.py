from PIL import Image
import os
gmap = {
    'nx': [ '-x',  'negx', 'bk' ],
    'ny': [ '-y',  'negy', 'dn' ],
    'px': [ '+x',  'posx', 'ft' ],
    'nz': [ '-z',  'negz', 'lf' ],
    'pz': [ '+z',  'posz', 'rt' ],
    'py': [ '+y',          'posy', 'up' ]
}
'''
'back', 
'down', 
'front',
'left', 
'right',
'''

root = './5/'
for item in os.listdir(root):
    if item.endswith('tga') or item.endswith('png') or item.endswith('jpg'):
        img = Image.open(root + item)
        item = item.lower()
        gotcha = False
        for k, v in gmap.items():
            for key in v:
                if key in item:
                    print('{} --> {} (key: {})'.format(item, k, key))
                    img.save(root + k + '.png')
                    gotcha = True
                    break
            if gotcha:
                break
            
        # img.save(item[:-4] + '_' + gmap[item[-6:-4]] + '.png')
        # img.save(gmap[item[-6:-4]] + '.png'