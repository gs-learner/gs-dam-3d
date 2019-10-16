import React, { useEffect, useState } from 'react'
import { CanvasManager } from './canvas'
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshStandardMaterial, Mesh } from 'three'
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles =  makeStyles((theme: Theme)=>
    createStyles({
        root: {
          padding: theme.spacing(3, 2),
          position: 'absolute',
          left: 0,
          top: 0
        },
      })
)
interface P {
    url?: string
    openCtrl?:boolean
}

const Render : React.FC<P> = (props)=>{
    const [handle, setHandle] = useState<ReturnType<typeof RunAll>>()
    const [wireFrame, setWireFrame] = useState(true)
    useEffect(()=>{
        setHandle(RunAll())
    }, [])
    useEffect(()=>{
        // ...
    }, [props.url])

    return (
        <div style={{
            position: 'absolute'
        }}>
            <Paper>
            <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            >
            <Grid item>
            <FormControlLabel
                control={
                <Checkbox
                    checked={!wireFrame}
                    onChange={()=>{setWireFrame(!wireFrame); 
                        if(handle) {
                            handle.setWireframe(wireFrame)
                        }
                    }}
                />
                }
                label="Wireframe"
            />
            </Grid>
            <Grid item>
            <Button variant="outlined" color="primary" onClick={()=>{
                if(handle) handle.resetCamara()
            }}>
                Reset Camera
            </Button>
            </Grid>
            </Grid>
            </Paper>
        </div>
    )
}

export default Render;


function RunAll () {
const frame = document.getElementById('canvas-frame'); if(frame === null) return;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias : true, powerPreference:'high-performance'});
const canvas = new CanvasManager(frame, renderer.domElement, renderer);
const camera = new THREE.PerspectiveCamera(75, canvas.Aspect(), 0.1, 1000);
const flatScene = new THREE.Scene()
const flatCamera = new THREE.PerspectiveCamera(75, canvas.Aspect(), 0.1, 1000);

renderer.setClearColor(0x222222, 1.0);

camera.position.z = 5;
flatCamera.position.z = 5

const control = new TrackballControls(camera, frame) 
const textureSky = new THREE.CubeTextureLoader().setPath( '/static/skybox/' ).load( [
    'hills2_rt_px.png',
    'hills2_lf_nx.png',
    'hills2_up_py.png',
    'hills2_dn_ny.png',
    'hills2_ft_pz.png',
    'hills2_bk_nz.png'
] );

console.log(textureSky)

control.target.set(0, 0, 0)
control.rotateSpeed = 10.0;
control.noPan = false
control.maxDistance = 20
control.keys = []
control.noRoll = true
const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientLight );
const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 20, 20, 20 );
scene.add( light );

const plight = new THREE.PointLight( 0xffffff, 1, 200 );
plight.position.set( -40, 20, 20 );
scene.add( plight );

function render(tm : number) {
    requestAnimationFrame(render);
    renderer.autoClear = true;
    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.render(flatScene, flatCamera)
    control.update()
}
render(0);

let objectScene : THREE.Scene | null = null


const loader = new GLTFLoader()
loader.load('/static/test/scene.gltf', (m)=>{
    m.scene.scale.set(0.005, 0.005, 0.005)
    m.scene.traverse(obj =>{
        if(obj instanceof Mesh) {
            (obj.material as MeshStandardMaterial).envMap  = textureSky;
            (obj.material as MeshStandardMaterial).needsUpdate  = true;
        }
    })
    console.log(m.scene)
    scene.add(m.scene)
    objectScene = scene
})

return {
    setWireframe: (bool : boolean) =>{
        if(objectScene) {
            objectScene.traverse(obj=>{
                if(obj instanceof Mesh) {
                    (obj.material as MeshStandardMaterial).wireframe = bool;
                    (obj.material as MeshStandardMaterial).needsUpdate  = true;
                }
            })
        }
    },
    resetCamara: ()=>{
        control.reset()
    }
}


}