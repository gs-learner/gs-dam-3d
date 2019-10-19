import React, { useEffect, useState } from 'react'
import { CanvasManager } from './canvas'
import * as THREE from 'three'
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { TrackballControls } from './bits/TrackballControls'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshStandardMaterial, Mesh, AnimationMixer } from 'three'
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {D3DModel, StaticGetJsonFile, RenderConfig} from './utils/api'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'


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
    model: D3DModel | null
    onBgColor: (color:string)=>any
}

const Render : React.FC<P> = (props)=>{
    const [handle, setHandle] = useState<ReturnType<typeof RunAll>>()
    const [wireFrame, setWireFrame] = useState(true)
    const [background, setBackground] = useState('radial-gradient(circle, rgba(35,162,244,1) 0%, rgba(26,26,186,1) 96%, rgba(25,18,144,1) 100%)');

    useEffect(()=>{
        setHandle(RunAll())
        console.log('boostrapped')
        props.onBgColor(background)
    }, [])

    useEffect(()=>{
        console.log('hi')
        console.log(handle, props.model)
        if(handle !== undefined && props.model !== null) { 
            handle.rerender(props.model, ()=>{}, setBackground)
            console.log('rerender')
        }
    }, [props.model, handle])

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
const renderer = new THREE.WebGLRenderer({antialias : true, powerPreference:'high-performance', alpha:true, premultipliedAlpha: false});
const canvas = new CanvasManager(frame, renderer.domElement, renderer);
const camera = new THREE.PerspectiveCamera(75, canvas.Aspect(), 0.1, 1000);
const flatScene = new THREE.Scene()
const flatCamera = new THREE.PerspectiveCamera(75, canvas.Aspect(), 0.1, 1000);
let objectScene : THREE.Scene | null = null

// const renderScene = new RenderPass(scene, camera);
// const bloomPass = new UnrealBloomPass(new THREE.Vector2(canvas.w, canvas.h), 1.5, 0.4, 0.85);
// const composer = new EffectComposer(renderer);
// composer.addPass(renderScene);
// composer.addPass(bloomPass)
// canvas.listenResize(composer);


renderer.setClearColor(0x222222, 0.0);

camera.position.z = 5;
flatCamera.position.z = 5
const control = new TrackballControls(camera, frame) 
let autoRotate = false
let autoRotateCount = 0
let maxRotateCount = 0

const TriggerStart = ()=>{
    autoRotate = true
    autoRotateCount = 0
    maxRotateCount = 60
    control.zoomDelta(-2)
}

const AutoRotate = ()=>{
    if(autoRotate === false) return;
    if(autoRotateCount === maxRotateCount) {
        autoRotate = false
        return;
    }
    ++autoRotateCount;
    
    control.zoomDelta(0.26 / maxRotateCount)
    control.mockRotateX(0.0101)
}
//TODO(leon): Add render info cache
const fileLoader = new  THREE.FileLoader();
const loader = new GLTFLoader()

const GetJsonFile = (url:string, onprogress: (progress_0_to_1: number)=>any)=>new Promise((resolve, reject)=>{
    fileLoader.load(url, (res)=>{
        resolve(JSON.parse(res as string))
    }, (pro)=>{
        onprogress(pro.loaded / pro.total)
    }, reject)
})

let mixer: AnimationMixer|null = null;
const clock = new THREE.Clock(true)

const ReRender = async (
    minfo : D3DModel, 
    onprogress: (progress_0_to_1: number)=>any, 
    setbackground: (color:string, gradient:boolean)=>any
    )=>{
    
    const renderConfig = await GetJsonFile(minfo.url + '/' + 'render.json', (n)=>onprogress(n*0.05)) as RenderConfig;
    if(renderConfig.renderSky === 'col') {
        setbackground(renderConfig.backgroundColor, renderConfig.backgroundGradient);
        renderer.setClearColor(0x222222, 0.0);
    }
    else{
        renderer.setClearColor(0x222222, 1.0);
        //TODO(leon): not supported yet
    }

    const textureSky = new THREE.CubeTextureLoader().setPath( '/static/skybox/hills2/' ).load( [
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
    ] );

    control.reset()
    scene.children = []

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

    const dlight = new THREE.DirectionalLight(0xe0e0e0, 6);
    dlight.position.set(10, 10, 20);
    scene.add(dlight);

    const dlight2 = new THREE.DirectionalLight(0xe0e0e0, 5);
    dlight2.position.set(-10, -10, 10);
    scene.add(dlight2);

    const dlight4 = new THREE.DirectionalLight(0xe0e0e0, 4);
    dlight4.position.set(-10, 10, 10);
    scene.add(dlight4);
    
    const dlight3 = new THREE.DirectionalLight(0xe0e0e0, 8);
    dlight3.position.set(-10, -10, -10);
    scene.add(dlight3);

    loader.load('/static/test/fortnite-animated/scene.gltf', (m)=>{
        const scale = 0.00020
        m.scene.scale.set(scale, scale, scale)
        m.scene.traverse(obj =>{
            console.log('a', obj);
            if(obj instanceof Mesh) {
                console.log('b', obj);
                obj.frustumCulled = false;
                // (obj.material as MeshStandardMaterial).envMapIntensity = 2;

                (obj.material as MeshStandardMaterial).envMap  = textureSky;
                (obj.material as MeshStandardMaterial).needsUpdate  = true;
            }
        })
        TriggerStart()
        clock.start();
        if(m.animations.length) {
            mixer = new THREE.AnimationMixer(m.scene);
            for(let ani of m.animations) {
                mixer.clipAction(ani).play()
            }
        }
        else {
            mixer = null
        }
        
        scene.add(m.scene)
        objectScene = m.scene
        console.log('load done')
    })
}


// const textureSky = new THREE.CubeTextureLoader().setPath( '/static/skybox/hills2/' ).load( [
//     'px.png',
//     'nx.png',
//     'py.png',
//     'ny.png',
//     'pz.png',
//     'nz.png'
// ] );

// console.log(textureSky)
// 
// control.target.set(0, 0, 0)
// control.rotateSpeed = 10.0;
// control.noPan = false
// control.maxDistance = 20
// control.keys = []
// control.noRoll = true
// 
// const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( ambientLight );
// const light = new THREE.PointLight( 0xffffff, 1, 100 );
// light.position.set( 20, 20, 20 );
// scene.add( light );
// 
// const plight = new THREE.PointLight( 0xffffff, 1, 200 );
// plight.position.set( -40, 20, 20 );
// scene.add( plight );
// 
// 
// 
function render(tm : number) {
    console.log('render')
    requestAnimationFrame(render);
    control.update();
    
    AutoRotate()
    const delta = clock.getDelta()
    if(mixer) {
        mixer.update(delta)
    }
    // composer.render();
    // renderer.autoClear = true;
    renderer.render(scene, camera);
    // renderer.autoClear = false;
    // renderer.render(flatScene, flatCamera);
}
render(0);

// 
// let objectScene : THREE.Scene | null = null
// 
// 
// const loader = new GLTFLoader()
// loader.load('/static/test/scene.gltf', (m)=>{
//     m.scene.scale.set(0.005, 0.005, 0.005)
//     m.scene.traverse(obj =>{
//         if(obj instanceof Mesh) {
//             (obj.material as MeshStandardMaterial).envMap  = textureSky;
//             (obj.material as MeshStandardMaterial).needsUpdate  = true;
//         }
//     })
//     TriggerStart()
// 
//     scene.add(m.scene)
//     objectScene = scene
// })

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
    },
    rerender: ReRender
}


}