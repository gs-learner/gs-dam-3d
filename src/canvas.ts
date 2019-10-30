import { WebGLRenderer } from "three"

// import * as THREE from 'three'

// import { MapColorToDiscrete, BeginingPrime, Integration, ComputeTransformMatrix } from './utils'

interface Resizable {
    setSize: (w:number,h:number)=>any
}

export class CanvasManager {
    w = 0
    h = 0
    pickPosition = {
        x: 0,
        y: 0
    }
    canvas: HTMLCanvasElement
    frame : HTMLElement
    renderer ?: WebGLRenderer
    resizables = new Array<Resizable>()

    constructor(frame : HTMLElement, canvas : HTMLCanvasElement, renderer?: WebGLRenderer) {
        this.clearPickPosition()
        this.canvas = canvas
        this.w = frame.clientWidth
        this.h = frame.clientHeight
        // frame.appendChild(canvas)
        frame.prepend(canvas)
        frame.onmouseout = ()=> this.clearPickPosition()
        this.frame = frame
        this.renderer = renderer
        if(renderer) {
            renderer.setSize(this.w, this.h)
        }
        window.addEventListener('resize', ()=>{
            this.w = frame.clientWidth
            this.h = frame.clientHeight
            if(renderer) {
                renderer.setSize(this.w, this.h)
            }
            for(let item of this.resizables) {
                item.setSize(this.w, this.h)
            }
        }, false)
    }

    resize(w:number, h:number) {
        this.canvas.width = w
        this.canvas.height = h
        if(this.renderer) {
            this.renderer.setSize(w, h)
        }
        this.w = w
        this.h = h
    }

    listenResize(target : Resizable) {
        this.resizables.push(target)
    }
    
    set onmousemove(fn : any) {
        this.frame.onmousemove = fn
    }

    
    set onmousedown(fn : any) {
        this.frame.onmousedown = fn
    }

    set onmouseup(fn : any) {
        this.frame.onmouseup = fn
    }

    set onclick(fn : any) {
        this.frame.onclick = fn
    }

    Aspect() {
        return this.w / this.h
    }

    getCanvasRelativePosition(event : any) {
        const rect = this.canvas.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
    }

    setPickPosition(event : any) {
        let pickPosition = this.pickPosition
        const pos = this.getCanvasRelativePosition(event);
        pickPosition.x = (pos.x / this.w) *  2 - 1;
        pickPosition.y = (pos.y / this.h) * -2 + 1;  // note we flip Y
    }

    clearPickPosition() {
        let pickPosition = this.pickPosition
        pickPosition.x = -100000;
        pickPosition.y = -100000;
    }
}