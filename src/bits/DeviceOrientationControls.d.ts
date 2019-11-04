import {
	Camera
} from 'three';

export class DeviceOrientationControls {

	constructor( object: Camera );

	object: Camera;

	// API

	alphaOffset: number;
	betaOffset: number;
	gammaOffset: number;
	deviceOrientation: any;
	enabled: boolean;
	screenOrientation: number;

	connect(): void;
	disconnect(): void;
	dispose(): void;
	update(): void;

}
