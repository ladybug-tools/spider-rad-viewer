// Copyright 2018 Ladybug Tools authors. MIT License
// global THREE
// jshint esversion: 6

let THRU = {};



THRU.getSettings = function( target = undefined ) {


	let htm = target ?
	`
		<p>
			<button onclick="THR.controls.autoRotate = !THR.controls.autoRotate;" >rotation</button>
		</p>

		<p>
			<button onclick=THRU.toggleWireframe(); >wireframe</button>

			<button onclick=THRU.toggleEdges(); >toggle edges</button>
		</p>


		<p>
			<button onclick=THRU.toggleSurfaceNormals(); title="Every Three.js triangle has a normal. See them here." > Toggle surface normals </button>

			<button onclick=THRU.toggleAxesHelper(); >Toggle axes</button>

		</p>

		<div title="opacity: 0 to 100%" >Opacity
			<output id=outOpacity class=floatRight >85%</output><br>
			<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput=THRU.updateOpacity(); >
		</div>

		<p><button onclick=THRU.zoomObjectBoundingSphere(RAD.meshes);>zoom all</button></p>

	`
	:
	"";

	return htm;

}



THRU.setHelpers = function() {

	THR.controls.autoRotate = true;

	THRU.axesHelper = new THREE.AxesHelper( 100 );
	THR.scene.add( THRU.axesHelper );

	window.addEventListener( 'keyup', () => THRU.sceneRotation = 0, false );
	THR.renderer.domElement.addEventListener( 'click', () => THR.controls.autoRotate=false, false );

}



THRU.setGeometry = function() {

	// useful debug snippet
	const geometry = new THREE.BoxGeometry( 50, 50, 50 );
	const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh( geometry, material );

	const edgesGeometry = new THREE.EdgesGeometry( geometry );
	const edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const surfaceEdge = new THREE.LineSegments( edgesGeometry, edgesMaterial );

	mesh.add( surfaceEdge );
	THR.scene.add( mesh );

}



THRU.toggleWireframe = function() {

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.material.wireframe = !child.material.wireframe;

		}

	} );

};



THRU.toggleEdges = function() {

	/*
	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Line ) {

			child.visible = !child.visible;

		}

	} );
	*/

	RAD.edges.visible = !RAD.edges.visible
};



THRU.toggleSurfaceNormals = function() {

	helperNormalsFaces = THR.scene.getObjectByName( 'helperNormalsFaces' );

	let material = new THREE.MeshNormalMaterial();

	if ( helperNormalsFaces ) {

		THR.scene.remove( helperNormalsFaces );

	}

	if ( !helperNormalsFaces ) {

		helperNormalsFaces = new THREE.Group();

		//RAD.meshes.children.traverse( function ( child ) {

		for ( child of RAD.meshes.children ) {

			if ( child instanceof THREE.Mesh && child.visible ) {

				if ( child.geometry.type === 'Geometry' ) {

					child.geometry.computeFaceNormals();

					const helperNormalsFace = new THREE.FaceNormalsHelper( child, 2, 0xff00ff, 3 );
					helperNormalsFaces.add( helperNormalsFace );
					helperNormalsFaces.visible = false;
					//console.log( 'helperNormalsFace', helperNormalsFace );

				} else if ( child.geometry.type === 'ShapeBufferGeometry' || child.geometry.type === 'BufferGeometry'  ) {

					//console.log( 'child', child.position, child.rotation );

					const geometry = new THREE.Geometry();
					const geo = geometry.fromBufferGeometry( child.geometry );
					const mesh = new THREE.Mesh( geo, material );
					mesh.rotation.copy( child.rotation );
					mesh.position.copy( child.position );
					const helperNormalsFace = new THREE.FaceNormalsHelper( mesh, 2, 0xff00ff, 3 );

					helperNormalsFaces.add( helperNormalsFace );
					helperNormalsFaces.visible = false;

				} else {

					//console.log( 'child.geometry.type', child.geometry.type );

				}


			}

		}

		helperNormalsFaces.name = 'helperNormalsFaces';
		THR.scene.add( helperNormalsFaces );
		helperNormalsFaces.visible = false;

	}

	helperNormalsFaces.visible = !helperNormalsFaces.visible;

	geometry = new THREE.BoxGeometry( 10, 10, 10, 2, 2, 2 );
	material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	box = new THREE.Mesh( geometry, material );
	helper = new THREE.FaceNormalsHelper( box, 2, 0x00ff00, 1 );
	//THR.scene.add( box );
	//THR.scene.add( helper );
};



THRU.toggleAxesHelper = function() {

	THRU.axesHelper.visible = !THRU.axesHelper.visible;

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



THRU.zoomObjectBoundingSphere = function( obj = undefined ) {
	//console.log( 'obj', obj );

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( 'bbox', bbox );

	if ( bbox.isEmpty() === true ) { return; }

	//if ( isNaN( bbox.max.x - bbox.min.x ) ) { console.log( 'zoom fail', {obj},{bbox} ); return; } // is there a better way of seeing if we have a good bbox?

	const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	const center = sphere.center;
	const radius = sphere.radius;

	THR.controls.reset();
	THR.controls.target.copy( center );
	THR.controls.maxDistance = 5 * radius;

	THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, 1.5 * radius, 1.5 * radius ) ) );
	THR.camera.near = 0.1 * radius; //2 * camera.position.length();
	THR.camera.far = 10 * radius; //2 * camera.position.length();
	THR.camera.updateProjectionMatrix();

	//lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
	//lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
	//lightDirectional.target = axesHelper;

	if ( THRU.axesHelper ) {

		THRU.axesHelper.scale.set( radius, radius, radius );
		//THR.axesHelper.position.copy( center );

	}
	//scene.position.copy( center );

	obj.userData.center = center;
	obj.userData.radius = radius;

	//		scene.remove( cameraHelper );
	//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
	//		scene.add( cameraHelper );

};





THRU.setSceneDispose = function( objArray = [] ) {

	//console.log( 'THR.scene', THR.scene );

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.geometry.dispose();
			child.material.dispose();

			THR.scene.remove( child );

		} else if( child instanceof THREE.LineSegments ) {

			child.geometry.dispose();
			child.material.dispose();

		}

	} );


	THR.scene.remove( ...objArray );

	THR.axesHelper = undefined;

	//getRenderInfo();

};



THRU.getRenderInfo = function( target ) {

	console.log( 'renderer.info.memory.geometries', THR.renderer.info.memory.geometries );
	console.log( 'renderer.info.render', THR.renderer.info.render );

	/*
	const htm =
	`
	geometries: ${ renderer.info.memory.geometries.toLocaleString() }<br>
	triangles: ${ renderer.info.render.triangles.toLocaleString() } <br>
	lines: ${ renderer.info.render.lines.toLocaleString() } <br>
	`;

	return htm;

	*/
};



THRU.addSomeLights = function() {

	THR.lightAmbient = new THREE.AmbientLight( 0x888888 );
	THR.lightAmbient.name = 'lightAmbient';
	THR.scene.add( THR.lightAmbient );

	THRU.light1 = new THREE.DirectionalLight( 0xffffff, 2 );
	THRU.light1.position.set( 1, 1, 1 );
	THR.scene.add( THRU.light1 );

	THRU.light2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	THRU.light2.position.set( 0, 0, -1 );
	THR.scene.add( THRU.light2 );

};



THRU.getSomeBoxes = function( count = 50 ) {

	const geometry = new THREE.BoxGeometry( 5, 5, 5 );
	const material = new THREE.MeshNormalMaterial();

	for ( let i = 0; i < count; i++ ) {

		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 100 * Math.random() - 50, 100 * Math.random() - 50, 100 * Math.random() - 50 );
		mesh.rotation.set( 2 * Math.random(), 2 * Math.random(), 2 * Math.random() );

		const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
		const edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
		const surfaceEdge = new THREE.LineSegments( edgesGeometry, edgesMaterial );

		mesh.add( surfaceEdge );
		THR.scene.add( mesh );

	}

};



THRU.drawPlacard = function( text, scale, color, x, y, z ) {

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

