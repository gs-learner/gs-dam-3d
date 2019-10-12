// import * as THREE from 'three'

// import { MapColorToDiscrete, BeginingPrime, Integration, ComputeTransformMatrix } from './utils'


export class CanvasManager {
    canvas = null
    w = 0
    h = 0
    pickPosition = {
        x: 0,
        y: 0
    }
    frame = null

    constructor(frame, canvas) {
        this.clearPickPosition()
        this.canvas = canvas
        this.w = frame.clientWidth
        this.h = frame.clientHeight
        frame.appendChild(canvas)
        frame.mouseout = ()=> this.clearPickPosition()
        this.frame = frame
    }
    
    set onmousemove(fn) {
        this.frame.onmousemove = fn
    }

    set onmousedown(fn) {
        this.frame.onmousedown = fn
    }

    set onmouseup(fn) {
        this.frame.onmouseup = fn
    }

    set onclick(fn) {
        this.frame.onclick = fn
    }

    Aspect() {
        return this.w / this.h
    }

    getCanvasRelativePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
    }

    setPickPosition(event) {
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