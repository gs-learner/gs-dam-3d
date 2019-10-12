import React, { useEffect } from 'react'
import { CanvasManager } from './canvas'
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Object3D, Box3, Group, Geometry } from 'three'

const Render : React.FC = (props)=>{
    useEffect(()=>{
        RunAll()
    }, [])

    return (
        <div></div>
    )
}

export default Render;



function RunAll () {
const frame = document.getElementById('canvas-frame'); if(frame === null) return;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias : true, powerPreference:'high-performance'});
const canvas = new CanvasManager(frame, renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, canvas.Aspect(), 0.1, 1000);
const flatScene = new THREE.Scene()
const flatCamera = new THREE.PerspectiveCamera(75, canvas.Aspect(), 0.1, 1000);

renderer.setSize(canvas.w, canvas.h);
renderer.setClearColor(0x444444, 1.0);

camera.position.z = 5;
flatCamera.position.z = 5

const control = new TrackballControls(camera, frame)
// const fpControl = new KeyControls(camera, frame)
control.target.set(0, 0, 0)
control.rotateSpeed = 8.0;
control.noPan = false
control.maxDistance = 20
control.keys = []
let lastTm = 0
const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientLight );
var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 20, 20, 20 );
scene.add( light );

var plight = new THREE.PointLight( 0xffffff, 1, 200 );
plight.position.set( -40, 20, 20 );
scene.add( plight );

function render(tm : number) {
    requestAnimationFrame(render);
    renderer.autoClear = true;
    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.render(flatScene, flatCamera)
    // fpControl.update(tm - lastTm)
    control.update()
    lastTm = tm
}
render(0);

const axies = new THREE.Group()
scene.add(axies)

const MakeOne = (x: number, y: number, z: number, color: number, name ?: string)=>{
    const material = new THREE.LineBasicMaterial( { color: color, linewidth: 4 } );
    const geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( x, y, z ),
        new THREE.Vector3( 0, 0, 0 )
    );
    const line = new THREE.Line(geometry, material)
    const matCone = new THREE.ConeGeometry( 0.1, 0.2, 4 );
    const geoCone = new THREE.MeshBasicMaterial( {color: color} );
    line.userData = { name: name, color:color }

    const cone = new THREE.Mesh( matCone, geoCone );
    cone.position.set(x, y, z)
    const n = cone.position.clone().normalize()
    cone.rotation.set(n.z * Math.PI / 2, n.y * Math.PI / 2, -n.x * Math.PI / 2)
    cone.userData = { name: name, color:color }
    
    return [line, cone]
}

{
    const [line, cone] = MakeOne(1, 0, 0, 0xffff00, 'x')
    axies.add(line, cone)
}
{
    const [line, cone] = MakeOne(0, 1, 0, 0xff00ff, 'y')
    axies.add(line, cone)
}
{
    const [line, cone] = MakeOne(0, 0, 1, 0x00aaff, 'z')
    axies.add(line, cone)
}

const orthoAxis = new THREE.Group()

flatScene.add(orthoAxis)
{
    const [line, cone] = MakeOne(1, 0, 0, 0xffff00)
    orthoAxis.add(line, cone)
}
{
    const [line, cone] = MakeOne(0, 1, 0, 0xff00ff)
    orthoAxis.add(line, cone)
}
{
    const [line, cone] = MakeOne(0, 0, 0.5, 0x00aaff)
    orthoAxis.add(line, cone)
}

const axisCaster = new THREE.Raycaster()
let lastAxis : Object3D | null = null
axisCaster.linePrecision = 0.05;
frame.onmousedown = (ev)=>{
    canvas.setPickPosition(ev)
    axisCaster.setFromCamera(canvas.pickPosition, camera);
    const hits = axisCaster.intersectObjects(axies.children)
    if(lastAxis !== null) {
        (lastAxis as any).material.color.setHex(lastAxis.userData.color)
        lastAxis = null
    }
    if(hits.length) {
        control.enabled = false;
        lastAxis = hits[0].object;
        (hits[0].object as any).material.color.setHex( 0xeeeeee )
    }
}

frame.onmouseup = (ev)=>{
    control.enabled = true
    if(lastAxis !== null) {
        (lastAxis as any).material.color.setHex(lastAxis.userData.color)
        lastAxis = null
    }
}


orthoAxis.position.set(-6 * canvas.Aspect(), -6 , -4.6)

function productRange(a:number, b:number) {
    let prd = a, i = a;
    while(i++ < b) {
        prd *= i
    }
    return prd
}

function C(n:number, k:number) {
    if(n === k) return 1;
    k = (k < n-k) ? n-k : k
    return productRange(k+1, n) / productRange(1, n-k)
}



function ffdOnce(l:number, m:number, n:number, s:number, t:number, u:number, P:THREE.Vector3[][][] /*ctrl point*/ ) {
    const pow = Math.pow
    const X = new THREE.Vector3()
    for(let i = 0; i < l; ++i) {
        for(let j = 0; j < m; ++j) {
            for(let k = 0; k < n; ++k) {
                const coeff = C(l, i)*pow(1-s,l-i)*pow(s,i)*C(m-1,j)*pow(1-t,m-j)*pow(t,j)*C(n,k)*pow(1-u,n-k)*pow(u,k)
                X.add(P[i][j][k].clone().multiplyScalar(coeff))
            }
        }
    }
    return X
}

function MakeCtrlPoint(dims : THREE.Vector3, box : THREE.Box3, fn: (v:THREE.Vector3)=>any) {
    const gap = box.max.clone().sub(box.min)
    const arr = new Array<Array<Array<THREE.Vector3>>>()
    for(let i = 0; i < dims.x; ++i) {
        arr[i] = new Array<Array<THREE.Vector3>>()
        for(let j = 0; j < dims.y; ++j) {
            arr[i][j] = new Array<THREE.Vector3>()
            for(let k = 0; k < dims.z; ++k) {
                arr[i][j][k] = new THREE.Vector3(
                    gap.x / dims.x * i,
                    gap.y / dims.y * j,
                    gap.z / dims.z * k,
                )
                arr[i][j][k].add(box.min)
                fn(arr[i][j][k])
            }
        }
    }
    return arr
}

let ctrlPoints = new Array<Array<Array<THREE.Vector3>>>()
let objectScene : THREE.Scene | null = null
let lastDims = new THREE.Vector3(4, 4, 4)
let ctrlPointsGroup = new Group()
scene.add(ctrlPointsGroup)

function UpdateCtrlPoints(dims : THREE.Vector3) {
    if(objectScene === null) {
        return
    }

    lastDims = dims
    ctrlPointsGroup.children = []
    let box = new Box3().setFromObject(objectScene)
    ctrlPoints = MakeCtrlPoint(dims, box, (v)=>{
        let geometry = new THREE.SphereGeometry(0.04, 6, 6)
        let material = new THREE.MeshLambertMaterial({color:0xeeeeee});
        let dot = new THREE.Mesh(geometry, material)
        dot.position.set(v.x, v.y, v.z)
        ctrlPointsGroup.add(dot)
    })
}

let vertices = new Array<THREE.Vector3>()
function TraverseVertices(obj : Object3D) {

    for(let v in obj) {

    }
}

function ffd() {
    
}


interface PossibleGeo extends Object3D {
    geometry?: Geometry
}
const loader = new GLTFLoader()
loader.load('/static/test/scene.gltf', (m)=>{
    m.scene.scale.set(0.005, 0.005, 0.005)
    scene.add(m.scene)
    objectScene = scene
    // UpdateCtrlPoints(lastDims)
    // scene.traverse(object=>{
    //     let obj = object as PossibleGeo
    //     if(!obj.geometry) return
    //     console.log(obj.geometry)
    // })
})


}