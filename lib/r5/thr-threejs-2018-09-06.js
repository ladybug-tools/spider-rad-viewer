	/*global THREE, GBX*/
	/* jshint esversion: 6 */

	// Copyright 2018 Ladybug Tools authors. MIT License
	// to do: add render info button somewhere?

	var THR = { release: ' THR 14.1'};

THR.sceneRotation = 1;
	THR.cameraHelper = null;


THR.getThreejs = function( target ) {

	THR.renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
	THR.renderer.setPixelRatio( window.devicePixelRatio );
	THR.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( THR.renderer.domElement );

	THR.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	THR.camera.position.set( - 100, - 100, 100 );
	THR.camera.up.set( 0, 0, 1 );

	THR.controls = new THREE.TrackballControls( THR.camera, THR.renderer.domElement );

	THR.scene = new THREE.Scene();

	window.addEventListener( 'resize', THR.onWindowResize, false );
	window.addEventListener( 'orientationchange', THR.onWindowResize, false );

	window.addEventListener( 'keyup', () => THR.sceneRotation = 0, false );
	THR.renderer.domElement.addEventListener( 'click', () => THR.sceneRotation = 0, false );

	THR.setHelpers();


}


THR.setHelpers = function() {

	THR.axesHelper = new THREE.AxesHelper( 100 );
	THR.scene.add( THR.axesHelper );

	// useful debug snippet
	//const geometry = new THREE.BoxGeometry( 50, 50, 50 );
	//const material = new THREE.MeshNormalMaterial();
	//const mesh = new THREE.Mesh( geometry, material );
	//scene.add( mesh );

}



THR.toggleWireframe = function() {

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.material.wireframe = !child.material.wireframe;

		}

	} );

};



THR.updateOpacity = function() {

	const opacity = parseInt( rngOpacity.value, 10 );
	outOpacity.value = opacity + '%';

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.material.opacity = opacity / 100;

		}

	} );

}



THR.onWindowResize = function() {

	THR.camera.aspect = window.innerWidth / window.innerHeight;
	THR.camera.updateProjectionMatrix();

	THR.renderer.setSize( window.innerWidth, window.innerHeight );

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

};



THR.zoomObjectBoundingSphere = function( obj ) {
	//console.log( 'obj', obj );

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( 'bbox', bbox );

	if ( isNaN( bbox.max.x - bbox.min.x ) ) { console.log( 'zoom fail', {obj},{bbox} ); return; } // is there a better way of seeing if we have a good bbox?

	const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	const center = sphere.center;
	const radius = sphere.radius;

	THR.controls.reset();
	THR.controls.target.copy( center );
	THR.controls.maxDistance = 5 * radius;

	THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );
	THR.camera.near = 0.1 * radius; //2 * camera.position.length();
	THR.camera.far = 10 * radius; //2 * camera.position.length();
	THR.camera.updateProjectionMatrix();

	//lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
	//lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
	//lightDirectional.target = axesHelper;

	THR.axesHelper.scale.set( radius, radius, radius );
	//THR.axesHelper.position.copy( center );
	//scene.position.copy( center );

	obj.userData.center = center;
	obj.userData.radius = radius;

	//		scene.remove( cameraHelper );
	//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
	//		scene.add( cameraHelper );

};



THR.animate = function() {

	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();
	THR.scene.rotation.z += THR.sceneRotation / 1000;

};
