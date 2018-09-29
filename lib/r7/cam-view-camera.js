/* global THREE * /
/* jshint esversion: 6 */

// Copyright 2018 Ladybug Tools authors. MIT License

const CAM = {};

let camera2Helper;

CAM.getViewCamera = function( target ) {


	let htm =

	`
		<p><button onclick=CAM.updateCameraParameters();>update camera view</button></p>
		<div id="divCameraParameters" >bbb</div>

	`;

	return htm;

}


CAM.updateCameraParameters = function( target = divCameraParameters ) {

	//console.log( '', target );

	const directionVector = THR.controls.target.clone().sub( THR.camera.position ).normalize()

	target.innerHTML =
	`
		<p>
			camera position<br>
			x: ${ THR.camera.position.x }<br>
			y: ${ THR.camera.position.y }<br>
			z: ${ THR.camera.position.z }<br>
		</p>
		<p>
			camera filed of view<br>
			fov: ${ THR.camera.fov }<br>
		</p>
		<p>
			<a href="https://threejs.org/docs/#api/en/cameras/PerspectiveCamera" >Three.js Camera API</a>
		</p>
			controls target<br>
			x: ${ THR.controls.target.x }<br>
			y: ${ THR.controls.target.y }<br>
			z: ${ THR.controls.target.z }<br>
		<p>
			<a href="https://threejs.org/docs/#examples/controls/TrackballControls" >Three.js Trackball Controls API</a>
		</p>
		<p>
			calculated direction vector<br>
			x: ${ directionVector.x }<br>
			y: ${ directionVector.y }<br>
			z: ${ directionVector.z }<br>
		<p>
			suggested <i>rpict</i> options
		</p>
		<p><b>
			-vp ${ THR.camera.position.x.toFixed( 1 ) }	${ THR.camera.position.y.toFixed( 1 ) }	${ THR.camera.position.z.toFixed( 1 ) }
			-vd ${ directionVector.x.toFixed( 3) }	${ directionVector.y.toFixed( 3 ) }	${ directionVector.z.toFixed( 3 ) }
		</b></p>
		<p>
			<a href="http://radsite.lbl.gov/radiance/rpict.1.html" >Rpict man page</a>
		</p>

	`;

}



CAM.getCameraFrustumHtml = function() {

	htm =
	`
		<p>
			<button id=btnCameraObserver onclick=setCamera1(); >camera observer</button>

			<button id=btnCameraView onclick=setCamera2(); >camera view</button>
		</p>

		<p>
			Camera view - near cut-off <output id=outCamera2Near >00</output>
			<input type="range" id="inpCamera2Near" onclick=setCamera2Update(this,"near"); />
		</p>

		<p>
			Camera view - far cut-off <output id=outCamera2Far >00</output>
			<input type="range" id="inpCamera2Far" onclick=setCamera2Update(this,'far'); />
		</p>


		<p>
			Camera view field of view <output id=outCamera2FOV >00</output>
			<input type="range" id="inpCamera2FOV" onclick=setCamera2UpdateFOV(this); />
		</p>

		<p>
			<button onclick=setObjectInFrustumHighlight(); title="Having some issues here" >check inclusion</button>

			<button onclick=setTwoFrustumCameras(); >reset</button>
		</p>

		<p>Data for each plane of the camera frustum to be displayed here</p>
	`;

	return htm;

}



function setTwoFrustumCameras() {

	camera1 = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera1.position.set( - 100, - 100, 100 );
	camera1.up.set( 0, 0, 1 );

	controls1 = new THREE.TrackballControls( camera1, THR.renderer.domElement );

	camera2 = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera2.position.set( 0, - 2 * THRU.radius , 0 );
	camera2.up.set( 0, 0, 1 );

	camera2.userData.currentPosition = camera2.position.clone();
	camera2.userData.currentTarget = THRU.center;
	camera2.near = 1 + Math.floor( 0.1 * THRU.radius );
	camera2.far = parseInt( 5 * THRU.radius, 10 );

	camera2.updateProjectionMatrix();
	camera2.updateMatrix();
	camera2.updateMatrixWorld();

	controls2 = new THREE.TrackballControls( camera2, THR.renderer.domElement );
	controls2.target.copy( THRU.center );

	THR.scene.remove( camera2Helper );
	camera2Helper = new THREE.CameraHelper( camera2 );
	THR.scene.add( camera2Helper );

	setCamera1();

	inpCamera2Far.max = inpCamera2Near.max = parseInt( camera2.far, 10 ) + 10;
	outCamera2Near.value = inpCamera2Near.value = parseInt( camera2.near, 10 );
	outCamera2Far.value = inpCamera2Far.value = parseInt( camera2.far, 10 );
	outCamera2FOV.value = inpCamera2FOV.value = parseInt( camera2.fov, 10 );

}



function setCamera1() {

	btnCameraObserver.classList.add( "active" );
	btnCameraView.classList.remove( "active" );

	camera2.userData.currentPosition = camera2.position.clone();
	camera2.userData.currentTarget = controls2.target;

	camera2.updateProjectionMatrix();
	camera2.updateMatrix();
	camera2.updateMatrixWorld();

	THR.camera = camera1;
	THR.controls = controls1;

}



function setCamera2() {

	console.log( '', 23 );
	btnCameraView.classList.add( "active" );
	btnCameraObserver.classList.remove( "active" );

	camera2.position.copy( camera2.userData.currentPosition );

	camera2.updateProjectionMatrix();
	camera2.updateMatrix(); // make sure camera's local matrix is updated
	camera2.updateMatrixWorld(); // make sure camera's world matrix is updated

	THR.camera = camera2;

	controls2.target.copy( camera2.userData.currentTarget );
	THR.controls = controls2;

}




function setCamera2Update( that, type ) {

	camera2[ type ] = parseInt( that.value, 10 ) + 1;

	camera2.updateMatrix(); // make sure camera's local matrix is updated
	camera2.updateMatrixWorld(); // make sure camera's world matrix is updated
	camera2.matrixWorldInverse.getInverse( camera2.matrixWorld );

	THR.scene.remove( camera2Helper );
	camera2Helper = new THREE.CameraHelper( camera2 );
	THR.scene.add( camera2Helper );

	outCamera2Near.value = inpCamera2Near.value = camera2.near;
	outCamera2Far.value = inpCamera2Far.value = camera2.far;

}




function setCamera2UpdateFOV( that ) {

	camera2.fov = parseInt( that.value, 10 );
	camera2.updateProjectionMatrix();

	outCamera2FOV.value = camera2.fov;

	camera2.updateMatrix();
	camera2.updateMatrixWorld();
	camera2.matrixWorldInverse.getInverse( camera2.matrixWorld );

	THR.scene.remove( camera2Helper );
	camera2Helper = new THREE.CameraHelper( camera2 );
	THR.scene.add( camera2Helper );
}



function setObjectInFrustumHighlight() {

	// https://stackoverflow.com/questions/24877880/three-js-check-if-object-is-in-frustum
	// https://stackoverflow.com/questions/10858599/how-to-determine-if-plane-is-in-three-js-camera-frustum
	// https://github.com/mrdoob/three.js/issues/1209

	camera2.updateProjectionMatrix();
	camera2.updateMatrix(); // make sure camera's local matrix is updated
	camera2.updateMatrixWorld(); // make sure camera's world matrix is updated
	//camera2.matrixWorldInverse.getInverse( camera2.matrixWorld );

	//plane.updateMatrix(); // make sure plane's local matrix is updated
	//plane.updateMatrixWorld(); // make sure plane's world matrix is updated

	frustum = new THREE.Frustum();
	frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( camera2.projectionMatrix, camera2.matrixWorldInverse ) );

	for ( let box of RAD.meshes.children ) {

		box.material.opacity = frustum.intersectsObject( box ) === true ? 1 : 0.2;

	}

}


