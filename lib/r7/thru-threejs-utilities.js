// Copyright 2018 Ladybug Tools authors. MIT License
/* global THREE, THR, rngOpacity, outOpacity */
// jshint esversion: 6


let THRU = { release: "2018-10-02" };

THRU.radius = 1;



THRU.getSettings = function() {


	let htm =
	`
		<p>
			<button onclick="THR.controls.autoRotate = !THR.controls.autoRotate;" >toggle rotation</button>

			<button onclick=THRU.toggleAxesHelper(); >toggle axes</button>
		</p>

		<p>

			<button onclick=THRU.toggleSurfaces(); >toggle surfaces</button>

			<button onclick=THRU.toggleEdges(); >toggle edges</button>
		</p>


		<p>

			<button onclick=THRU.toggleWireframe(); >toggle wireframe</button>

			<button onclick=THRU.toggleSurfaceNormals(); title="All Three.js triangles have a normal. See them here." > toggle surface normals </button>

		</p>

		<div title="opacity: 0 to 100%" >opacity
			<output id=outOpacity class=floatRight >85%</output><br>
			<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput=THRU.updateOpacity(); >
		</div>

		<p><button onclick=THRU.zoomObjectBoundingSphere(RAD.meshes);>zoom all</button></p>

	`;

	return htm;

};



THRU.setHelpers = function() {

	THRU.toggleAxesHelper();

	window.addEventListener( 'keyup', () => THRU.sceneRotation = 0, false );
	THR.renderer.domElement.addEventListener( 'click', () => THR.controls.autoRotate=false, false );

	THR.controls.autoRotate = true;

};



THRU.getGeometry = function() {

	// useful debug snippet
	const geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 100, 16 );
	//const geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
	const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh( geometry, material );

	const edgesGeometry = new THREE.EdgesGeometry( geometry );
	const edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const surfaceEdge = new THREE.LineSegments( edgesGeometry, edgesMaterial );

	mesh.add( surfaceEdge );

	return mesh;

};



THRU.toggleAxesHelper = function() {

	if ( !THRU.axesHelper ) {

		THRU.axesHelper = new THREE.AxesHelper( THRU.radius );
		THR.scene.add( THRU.axesHelper );

		return;

	 }

	THRU.axesHelper.visible = !THRU.axesHelper.visible;

};



THRU.toggleSurfaces = function() {

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.visible = !child.visible;

		}

	} );

};




THRU.toggleEdges = function() {

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Line ) {

			child.visible = !child.visible;

		}

	} );

};



THRU.toggleWireframe = function() {

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.material.wireframe = !child.material.wireframe;

		}

	} );

};



THRU.toggleSurfaceNormals = function() {

	let material = new THREE.MeshNormalMaterial();

	const types = [ 'BoxBufferGeometry', 'BufferGeometry', 'ConeBufferGeometry', 'CylinderBufferGeometry',
		'ShapeBufferGeometry', 'SphereBufferGeometry' ];

	if ( THRU.helperNormalsFaces === undefined ) {

		THRU.helperNormalsFaces = new THREE.Group();

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && child.visible ) {

				if ( child.geometry.type === 'Geometry' ) {

					child.geometry.computeFaceNormals();

					const helperNormalsFace = new THREE.FaceNormalsHelper( child, 2, 0xff00ff, 3 );
					THRU.helperNormalsFaces.add( helperNormalsFace );
					THRU.helperNormalsFaces.visible = false;
					//console.log( 'helperNormalsFace', helperNormalsFace );

				} else if ( types.includes( child.geometry.type ) === true ) {

					//console.log( 'child', child.position, child.rotation );

					const geometry = new THREE.Geometry();
					const geo = geometry.fromBufferGeometry( child.geometry );
					const mesh = new THREE.Mesh( geo, material );
					mesh.rotation.copy( child.rotation );
					mesh.position.copy( child.position );
					const helperNormalsFace = new THREE.FaceNormalsHelper( mesh, 0.05 * THRU.radius, 0xff00ff, 3 );

					THRU.helperNormalsFaces.add( helperNormalsFace );
					THRU.helperNormalsFaces.visible = false;

				} else {

					//console.log( 'child.geometry.type', child.geometry.type );

				}

			}

		} );

		THRU.helperNormalsFaces.name = 'helperNormalsFaces';
		THR.scene.add( THRU.helperNormalsFaces );
		THRU.helperNormalsFaces.visible = false;

	}

	THRU.helperNormalsFaces.visible = !THRU.helperNormalsFaces.visible;

};



THRU.updateOpacity = function() {

	const opacity = parseInt( rngOpacity.value, 10 );
	outOpacity.value = opacity + '%';

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.material.opacity = opacity / 100;

		}

	} );

};



THRU.zoomObjectBoundingSphere = function( obj = THR.scene ) {
	//console.log( 'obj', obj );

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( 'bbox', bbox );

	if ( bbox.isEmpty() === true ) { return; }

	//if ( isNaN( bbox.max.x - bbox.min.x ) ) { console.log( 'zoom fail', {obj},{bbox} ); return; } // is there a better way of seeing if we have a good bbox?

	const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	const center = sphere.center;
	const radius = sphere.radius;

	//THR.controls.reset();
	THR.controls.target.copy( center ); // needed because model may be far from origin
	THR.controls.maxDistance = 5 * radius;

	THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, 1.5 * radius, 1.5 * radius ) ) );
	THR.camera.near = 0.1 * radius; //2 * camera.position.length();
	THR.camera.far = 10 * radius; //2 * camera.position.length();
	THR.camera.updateProjectionMatrix();

	if ( THRU.axesHelper ) {

		THRU.axesHelper.scale.set( radius, radius, radius );
		THRU.axesHelper.position.copy( center);

	}

	if ( THRU.lightDirectional ) {

		THRU.lightDirectional.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
		THRU.lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );

		THRU.targetObject.position.copy( center );

		//THR.scene.remove( THRU.cameraHelper );
		//THRU.cameraHelper = new THREE.CameraHelper( THRU.lightDirectional.shadow.camera );
		//THR.scene.add( THRU.cameraHelper );

	}

	THRU.center = center;
	THRU.radius = radius;

	THRU.onThreejsSceneLoaded();

};



THRU.onThreejsSceneLoaded = function() { return THR.scene; };




THRU.setSceneDispose = function( obj = THR.scene.children ) {
	//console.log( 'THR.scene', THR.scene );

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.geometry.dispose();
			child.material.dispose();

			//THR.scene.remove( child );

		} else if ( child instanceof THREE.LineSegments ) {

			child.geometry.dispose();
			child.material.dispose();

		}

	} );

	if ( Array.isArray( obj ) ) {

		THR.scene.remove( ...obj );

	} else {

		THR.scene.remove( obj );

	}


	THR.axesHelper = undefined;
	THRU.helperNormalsFaces = undefined;

	//divRendererInfo.innerHTML = THRU.getRendererInfo();

};



THRU.getRendererInfo = function() {
	//console.log( 'THR.renderer.info', THR.renderer.info );

	const htm =
	`
		<p>
			memory:<br>
			geometries: ${ THR.renderer.info.memory.geometries.toLocaleString() }
		</p>
		<p>
			renderer:<br>
			triangles: ${ THR.renderer.info.render.triangles.toLocaleString() } <br>
			lines: ${ THR.renderer.info.render.lines.toLocaleString() } <br>
		</p>
		<p>
			<button onclick=divRendererInfo.innerHTML=THRU.getRendererInfo(); >update info</button>

			<a href="https://threejs.org/docs/#api/en/renderers/WebGLRenderer.info" target="_blank">?</a>

			<button onclick=THRU.setStats(); >stats</button>

			<a href="https://github.com/mrdoob/stats.js/" target="_blank">?</a>

		</p>

	`;

	return htm;

};



THRU.setStats = function() {

	var script=document.createElement('script');
	script.onload =function(){
		var stats=new Stats();
		document.body.appendChild(stats.dom);

		requestAnimationFrame( function loop(){
			stats.update();
			requestAnimationFrame(loop);
		});
	};
	script.src='https://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
	document.head.appendChild(script);

};



THRU.addSomeLights = function() {

	THRU.lightAmbient = new THREE.AmbientLight( 0x888888 );
	THRU.lightAmbient.name = 'lightAmbient';
	THR.scene.add( THRU.lightAmbient );

	THRU.light1 = new THREE.DirectionalLight( 0xffffff, 2 );
	THRU.light1.position.set( 1, 1, 1 );
	THR.scene.add( THRU.light1 );

	THRU.light2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	THRU.light2.position.set( 0, 0, -1 );
	THR.scene.add( THRU.light2 );

};



THRU.addSomeLights2 = function() {

	THR.renderer.shadowMap.enabled = true;
	THR.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	THRU.lightAmbient = new THREE.AmbientLight( 0x444444 );
	THRU.lightAmbient.name = 'lightAmbient';
	THR.scene.add( THRU.lightAmbient );

	THRU.lightDirectional = new THREE.DirectionalLight( 0xffffff, 1 );
	THRU.lightDirectional.shadow.mapSize.width = 2048;  // default 512
	THRU.lightDirectional.shadow.mapSize.height = 2048;
	THRU.lightDirectional.castShadow = true;
	THR.scene.add( THRU.lightDirectional );

	THRU.targetObject = new THREE.Object3D();
	THR.scene.add( THRU.targetObject );

	THRU.lightDirectional.target = THRU.targetObject;

	THRU.lightPoint = new THREE.PointLight( 0xffffff, 0.5 );
	THRU.lightPoint.position = new THREE.Vector3( 0, 0, 1 );
	THR.camera.add( THRU.lightPoint );
	THR.scene.add( THR.camera );

};




THRU.getSomeBoxes = function( count = 500, size = 10, material = new THREE.MeshNormalMaterial() ) {

	const geometry = new THREE.BoxBufferGeometry( size, size, size );

	const boxes = new THREE.Group();

	for ( let i = 0; i < count; i++ ) {

		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 100 * Math.random() - 50, 100 * Math.random() - 50, 100 * Math.random() - 50 );
		mesh.rotation.set( 2 * Math.random(), 2 * Math.random(), 2 * Math.random() );

		const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
		const edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
		const surfaceEdge = new THREE.LineSegments( edgesGeometry, edgesMaterial );

		const placard = THRU.drawPlacard( 'box ' + i );

		mesh.add( surfaceEdge, placard );

		boxes.add( mesh );

	}

	return boxes;

};



THRU.drawPlacard = function( text = 'abc', scale = 0.05, color = Math.floor( Math.random() * 255 ), x = 0, y = 0, z = 10 ) {

	// add update
	// 2016-02-27 ~ https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/placards

	var placard = new THREE.Object3D();
	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var texture = canvasMultilineText( text, { backgroundColor: color }   );
	var spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.position.set( x, y, z ) ;
	sprite.scale.set( scale * texture.image.width, scale * texture.image.height );

	var geometry = new THREE.Geometry();
	geometry.vertices = [ v( 0, 0, 0 ),  v( x, y, z ) ];
	var material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
	var line = new THREE.Line( geometry, material );

	//placard.add( sprite, line );
	placard.add( sprite );
	return placard;


	function canvasMultilineText( textArray, parameters ) {

		parameters = parameters || {} ;

		var canvas = document.createElement( 'canvas' );
		var context = canvas.getContext( '2d' );
		var width = parameters.width ? parameters.width : 0;
		var font = parameters.font ? parameters.font : '48px monospace';
		var color = parameters.backgroundColor ? parameters.backgroundColor : 120 ;

		if ( typeof textArray === 'string' ) textArray = [ textArray ];

		context.font = font;

		for ( var i = 0; i < textArray.length; i++) {

			width = context.measureText( textArray[ i ] ).width > width ? context.measureText( textArray[ i ] ).width : width;

		}

		canvas.width = width + 20;
		canvas.height =  parameters.height ? parameters.height : textArray.length * 60;

		context.fillStyle = 'hsl( ' + color + ', 80%, 50% )' ;
		context.fillRect( 0, 0, canvas.width, canvas.height);

		context.lineWidth = 1 ;
		context.strokeStyle = '#000';
		context.strokeRect( 0, 0, canvas.width, canvas.height );

		context.fillStyle = '#000' ;
		context.font = font;

		for ( i = 0; i < textArray.length; i++) {

			context.fillText( textArray[ i ], 10, 48  + i * 60 );

		}

		var texture = new THREE.Texture( canvas );
		texture.minFilter = texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true;

		return texture;

	}

};

