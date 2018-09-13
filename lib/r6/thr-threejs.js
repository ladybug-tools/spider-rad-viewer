/* global THREE * /
/* jshint esversion: 6 */

// Copyright 2018 Ladybug Tools authors. MIT License

var THR = { release: ' THR 6.0'};

//THR.sceneRotation = 1;



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

	//window.addEventListener( 'keyup', () => THR.sceneRotation = 0, false );
	//THR.renderer.domElement.addEventListener( 'click', () => THR.sceneRotation = 0, false );

}



THR.onWindowResize = function() {

	THR.camera.aspect = window.innerWidth / window.innerHeight;
	THR.camera.updateProjectionMatrix();

	THR.renderer.setSize( window.innerWidth, window.innerHeight );

	THR.controls.handleResize();

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

};



THR.animate = function() {

	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();
	//THR.scene.rotation.z += THR.sceneRotation / 1000;

};
