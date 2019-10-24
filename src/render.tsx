import React, { useEffect, useState, useRef } from 'react'
import { lighten, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { CanvasManager } from './canvas';
import * as THREE from 'three';
import { MeshStandardMaterial, Mesh, AnimationMixer } from 'three'
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { TrackballControls } from './bits/TrackballControls'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

import {D3DModel, RenderConfig, BuiltinLightScheme} from './utils/api';
import PrettoSlider from './bits/pretto-slider';



const BorderLinearProgress = withStyles((theme:Theme)=>({
    root: {
      height: 10,
      backgroundColor: lighten(theme.palette.primary.main, 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: lighten(theme.palette.primary.main, 0.1),
    },
  }))(LinearProgress);


const useStyles =  makeStyles((theme: Theme)=>({
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
    paper: {
        padding: theme.spacing(2, 2),
    },
    progress: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0
    },
    progressOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        filter: 'blur(5px)',
        textAlign: 'center'
    },
    progressStatucOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 12,
        bottom: 0,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    slider: {
        width: '100%'
    }
}))


export type HandleType = ReturnType<typeof RunAll>
interface P {
    model: D3DModel | null
    onBgColor: (color:string)=>any
    frameid: string
    openCtrl: boolean
    onhandle?: (handle:HandleType)=>any
    edit?: boolean // it only matters when first render, change it on runtime won't work!
}


const Render : React.FC<P> = (props)=>{
    const classes = useStyles()
    const [handle, setHandle] = useState<HandleType>()
    const [wireFrame, setWireFrame] = useState(true)
    const [background, setBackground] = useState('radial-gradient(circle, rgba(35,162,244,1) 0%, rgba(26,26,186,1) 96%, rgba(25,18,144,1) 100%)');
    const [progress, setProgress] = useState(0)
    const [hideprogress, setHideprogress] = useState(false)
    const [progressStatus, setProgressStatus] = useState(new Array<string>())
    const [skeleton, setSkeleton] = useState(true)
    const [hidescene, setHidescene] = useState(true)
    const [rotateLights, setRotateLights] = useState(false)
    const sliderRef = useRef<HTMLSpanElement>(null)
    const reportStatus = (what:string) => {
        setProgressStatus([...progressStatus, what]);
    }

    useEffect(()=>{
        if(sliderRef.current) {
            sliderRef.current.onmousedown = ()=>{
                if(handle) handle.detachCamEvent()
            }
            sliderRef.current.onmouseup = ()=>{
                if(handle) handle.retachCamEvent()
            }
        }
    }, [sliderRef.current])
    useEffect(()=>{
        const theHandle = RunAll(props.frameid, Boolean(props.edit))
        setHandle(theHandle)
        if(props.onhandle) props.onhandle(theHandle)
        
        console.log('boostrapped on ', props.frameid)
        props.onBgColor(background)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.frameid])

    useEffect(()=>{
        props.onBgColor(background)
    }, [background])

    
    useEffect(()=>{
        if(handle !== undefined && props.model !== null) { 
            setProgressStatus([])
            setProgress(0)
            setHideprogress(false)
            handle.rerender(props.model, setProgress, reportStatus, setBackground, ()=>{
                setHideprogress(true)
            })
            
            console.log('rerender')
        }
    }, [props.model, handle])

    return (
        <div>
        <div className={classes.progressOverlay} style={{display:hideprogress?'none':''}}>

        </div>
        <div className={classes.progressStatucOverlay} style={{display:hideprogress?'none':''}}>
            {
                progressStatus.map((v, idx)=>{return(
                    <Typography key={idx}>
                        {v}
                    </Typography>
                )})
            }
        </div>
        <BorderLinearProgress variant="determinate" value={progress*100} className={classes.progress} style={{display:hideprogress?'none':''}}/>
        
        <Grow in={props.openCtrl}>
        <div className={classes.root}>
            <Paper className={classes.paper}>
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
                    color='primary'
                />
                }
                label="Wireframe"
            />
            </Grid>
            <Grid item>
            <FormControlLabel
                control={
                <Checkbox
                    checked={!skeleton}
                    onChange={()=>{
                        if(handle) { handle.setSkeleton(skeleton) };
                        setSkeleton(!skeleton); 
                    }}
                    color='primary'
                />
                }
                label="Skeleton"
            />
            </Grid>
            <Grid item>
            <FormControlLabel
                control={
                <Checkbox
                    checked={!hidescene}
                    onChange={()=>{
                        if(handle) { handle.hideObject(hidescene) };
                        setHidescene(!hidescene);
                    }}
                    color='primary'
                />
                }
                label="Hide Model"
            />
            </Grid>
            <Grid item>
            <FormControlLabel
                control={
                <Checkbox
                    checked={!rotateLights}
                    onChange={()=>{
                        if(handle) { handle.setRotateLights(rotateLights) };
                        setRotateLights(!rotateLights);
                    }}
                    color='primary'
                />
                }
                label="Rotate Lights"
            />
            </Grid>
            
                <PrettoSlider
                    ref={sliderRef}
                    valueLabelDisplay="auto"
                    onChange={(e:any, v:any)=>{
                        if(handle) handle.setRotateLightsSpeed(v)
                    }} 
                    defaultValue={1}
                    max={3} min={0} step={0.01}
                    className={classes.slider}
                />
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
        </Grow>
        </div>
    )
}

export default Render;


export class LightManager {
    scheme = ''
    lights = new Array<THREE.Light>()
    rotating = true
    rotateRad = 1.0
    lightsHelper = new Array<THREE.Object3D>()
    listenAmountChange:null|((l:LightManager)=>any) = null

    constructor(
        public scene: THREE.Scene
    ) {}
    
    useScheme(scheme:string) {
        if(scheme === this.scheme) {
            if(scheme.length && scheme[0] === '*') {
                // do nothing
            }
            else {
                return;
            }
        }

        const buitin = BuiltinLightScheme;
        if(buitin[scheme] === undefined) {
            return;
        }

        this.scheme = scheme

        for(let l of this.lights) {
            this.scene.remove(l);
        }
        this.lights = []

        for(let l of buitin[scheme]) {
            // console.log('attaching light', l)
            if(l.type === 'ambient') {
                const light = new THREE.AmbientLight( l.color ); // soft white light
                light.userData = { level: 0 }
                this.scene.add( light );
                this.lights.push(light);
            }
            else if(l.type === 'point') {
                const light = new THREE.PointLight( l.color, l.intensity, l.distance, l.decay ); // soft white light
                const pos = l.position;
                light.position.set(pos[0], pos[1], pos[2])
                light.userData = { level: 1 }
                this.scene.add( light );
                this.lights.push(light);
            }
            else if(l.type === 'spot') {
                const light = new THREE.SpotLight( 
                    l.color, l.intensity, l.distance, l.angle, undefined, l.decay
                )
                light.penumbra = l.penumbra;
                const pos = l.position;
                light.position.set(pos[0], pos[1], pos[2])
                light.userData = { level: 2 }
                this.scene.add(light);
                this.lights.push(light);
            }
        }
        if(this.listenAmountChange) {
            this.listenAmountChange(this);
        }
    }

    private rotateAxis = new THREE.Vector3(0, 1, 0);

    update() {
        if(!this.rotating) {
            return;
        }

        for(let l of this.lights) {
            const dir = l.position.clone();
            dir.applyAxisAngle(this.rotateAxis, this.rotateRad * 0.008);
            l.position.set(dir.x, dir.y, dir.z)
        }
    }

    controlling: null|THREE.Light = null
    lightHelper: null|THREE.Object3D = null
}


function RunAll (frameid: string, enableedit:boolean) {
const frame = document.getElementById(frameid); if(frame === null) return;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias : true, powerPreference:'high-performance', alpha:true, premultipliedAlpha: false});
const canvas = new CanvasManager(frame, renderer.domElement, renderer);
const camera = new THREE.PerspectiveCamera(75, canvas.Aspect(), 0.1, 1000);
// const flatScene = new THREE.Scene()
// const flatCamera = new THREE.PerspectiveCamera(75, canvas.Aspect(), 0.1, 1000);
let objectScene : THREE.Scene | null = null
let rerendersuccess:null|(()=>any) = null
let skeletonHelper:THREE.SkeletonHelper | null  = null
const vertextNormHelper = new Array<THREE.VertexNormalsHelper>()
const lights = new LightManager(scene);
const cubicLoader = new THREE.CubeTextureLoader()
let envMap: THREE.CubeTexture | null = null

// const renderScene = new RenderPass(scene, camera);
// const bloomPass = new UnrealBloomPass(new THREE.Vector2(canvas.w, canvas.h), 1.5, 0.4, 0.85);
// const composer = new EffectComposer(renderer);
// composer.addPass(renderScene);
// composer.addPass(bloomPass)
// canvas.listenResize(composer);



renderer.setClearColor(0x222222, 0.0);

camera.position.z = 5;
// camera.position.y = 2;
// camera.position.x = 2;

// flatCamera.position.z = 5
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
const setEnvMap = (path:string, scene:THREE.Object3D|null)=>{
    if(!scene) return;

    if(path.length) {
        envMap = cubicLoader.setPath(path).load( [
            'px.png',
            'nx.png',
            'py.png',
            'ny.png',
            'pz.png',
            'nz.png'
        ] );
    }
    else {
        envMap = null
    }
    
    scene.traverse(obj =>{
        // console.log('a', obj);
        if(obj instanceof Mesh) {
            // console.log('b', obj);
            obj.frustumCulled = false;
            // (obj.material as MeshStandardMaterial).envMapIntensity = 2;

            (obj.material as MeshStandardMaterial).envMap  = envMap;
            (obj.material as MeshStandardMaterial).needsUpdate  = true;
        }
    })
}


const ReRender = async (
    minfo : D3DModel, 
    onprogress: (progress_0_to_1: number)=>any, 
    reportstatus: (status:string)=>any,
    setbackground: (color:string, gradient:boolean)=>any,
    ondone: ()=>any
    )=>{
    
    reportstatus('Loading render config')
    const renderConfig = await GetJsonFile(minfo.url + '/render.json', (n)=>onprogress(n*0.05)) as RenderConfig;
    if(renderConfig.renderSky === 'col') {
        setbackground(renderConfig.backgroundColor, renderConfig.backgroundGradient);
        renderer.setClearColor(0x222222, 0.0);
    }
    else{
        renderer.setClearColor(0x222222, 1.0);
        //TODO(leon): not supported yet
    }
    onprogress(0.06)

    control.reset()
    scene.children = []

    control.target.set(0, 0, 0)
    control.rotateSpeed = 10.0;
    control.noPan = false
    control.maxDistance = 20
    control.keys = []
    control.noRoll = true
    
    reportstatus('Setting up lights')
    lights.useScheme(renderConfig.lights[0]);
    onprogress(0.08);

    reportstatus('Downloading models & assets');
    loader.load(minfo.url + '/scene.gltf', (m)=>{

        reportstatus('Piping data to GPU & Updating scene');
        const scale = 0.00020
        m.scene.scale.set(scale, scale, scale)
        setEnvMap(renderConfig.skybox, m.scene)
        
        if(skeletonHelper) {
            scene.remove(skeletonHelper)
            skeletonHelper = null
        }
        
        
        onprogress(0.99)
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
        onprogress(1)
        rerendersuccess = ondone

    }, (pro)=>{
        onprogress(pro.loaded / pro.total * 0.9 + 0.08)
    })
}



function render(tm : number) {
    // console.log('render')
    requestAnimationFrame(render);
    control.update();
    
    AutoRotate()
    const delta = clock.getDelta()
    if(mixer) {
        mixer.update(delta)
    }
    for(let vnh of vertextNormHelper) {
        vnh.update()
    }
    lights.update();
    // composer.render();
    // renderer.autoClear = true;
    renderer.render(scene, camera);
    if(rerendersuccess) {
        rerendersuccess()
        rerendersuccess = null
    }
    // renderer.autoClear = false;
    // renderer.render(flatScene, flatCamera);
}
render(0);



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
    rerender: ReRender,
    setSkeleton: (bool : boolean)=>{
        if(!objectScene) return;
        if(bool) {
            if(skeletonHelper) skeletonHelper.visible = true
            else { 
                skeletonHelper = new THREE.SkeletonHelper(objectScene)
                scene.add(skeletonHelper)
            }
        }
        else {
            if(skeletonHelper) skeletonHelper.visible = false
        }
    },
    hideObject: (bool: boolean)=>{
        if(!objectScene) return
        objectScene.visible = !bool
    },
    setRotateLights: (bool: boolean)=> lights.rotating = bool,
    setRotateLightsSpeed: (speed: number)=> { lights.rotateRad = speed },
    detachCamEvent: ()=>{ control.dispose() },
    retachCamEvent: ()=>{ control.reregister() },
    lights: lights
}


}