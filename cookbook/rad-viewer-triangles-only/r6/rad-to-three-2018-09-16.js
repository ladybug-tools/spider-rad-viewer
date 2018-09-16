

let rad = {};

rad.json = null;
rad.meshes = null;
rad.edges = null;
rad.materials = null;
rad.opacity = 0.85;

rad.colors = {

	InteriorWall: 0x008000,
	ExteriorWall: 0xFFB400,
	Roof: 0x800000,
	InteriorFloor: 0x80FFFF,
	ExposedFloor: 0x40B4FF,
	Shade: 0xFFCE9D,
	UndergroundWall: 0xA55200,
	UndergroundSlab: 0x804000,
	Ceiling: 0xFF8080,
	Air: 0xFFFF00,
	UndergroundCeiling: 0x408080,
	RaisedFloor: 0x4B417D,
	SlabOnGrade: 0x804000,
	FreestandingColumn: 0x808080,
	EmbeddedColumn: 0x80806E,

	generic_glass: 'black',
	generic_wall: 'gray',
	generic_floor: 'brown',
	generic_roof: 'maroon',

	Exterior_Window: 0x000000, //'black',
	Exterior_Wall: 0xFFB400, //'gray',
	Exterior_Floor: 0x40B4FF, // 'brown',
	Exterior_Roof: 0x800000, // 'maroon',

	Dark_Wood: 'brown',
	Ceiling: 'azure',
	Ext_wall: 'gray',
	Ext_glaz: 'black',
	Floor: 'brown',
	Int_wall: 'navajowhite',
	Int_glaz: 'darkgray',
	Light_Wood: 'burlywood'

};

rad.colorKeys = Object.keys( rad.colors );


let mesh;
const color = new THREE.Color();

let material = new THREE.MeshBasicMaterial( { color: 'gray', opacity: rad.opacity, side: 2, transparent: true, vertexColors: THREE.VertexColors } );



// called by FIL.callbackRequestFile and FIL.inpOpenFiles


rad.addDataFile = function( text ) {

	//THR.scene.remove( mesh );

	rad.json = rad.radToJson( text );

	mods = rad.json.surfaces.filter( item => rad.colorKeys.indexOf( item.modifier ) === -1 );

	for ( surface of rad.json.surfaces ) {

		if ( rad.colorKeys.indexOf( surface.modifier ) === -1 ) {

			rad.colors[ surface.modifier ] = Math.random() * 0xffffff;
			rad.colorKeys.push( surface.modifier );
			console.log( 'mods', surface.modifier );

		}

	}


	rad.setThreeJsWindowUpdate();

	return rad.json;

}



//////////

rad.radToJson = function( radText ) {
	//console.log( 'radText', radText );

	const parseRadRe = /^\s*([^0-9].*(\s*[\d.-]+.*)*)/gm; // how does this work? ;-)

	// separate input radiance objects
	const rawObjects = radText.match( parseRadRe ).filter( word => word.trim().length > 0 && !word.trim().startsWith( '#' ) );
	//console.log( 'rawObjects', rawObjects ); // 'void' trimmed o

	const rawObjectsRe = rawObjects.map( item => item.trim().replace(/\r\n|\n/g, " " ).replace(/\t/g, " " ).replace(/ {2,}/g, " " )  );
	//console.log( 'rawObjectsRe', rawObjectsRe );

	jsonData = rawObjectsRe.map( line => converterObjectToJson(line));

	jsonData = jsonData.filter( result => result ); // drop empties // needed?

	jsonData.forEach( result => rad.json[ result[ 0 ] ].push( result[ 1 ] ) );

	return rad.json;

};



rad.setThreeJsWindowUpdate = function( target = divMsg ) {

	//console.log( 'rad.meshes', rad.meshes );

	if ( ! rad.json.surfaces.length ) {

		if ( target ) { target.innerHTML += 'no surfaces'; }

		return;

	}

	rad.vertices = [];
	rad.surfaceColors = [];
	//rad.geom = new THREE.Geometry();
	rad.count3 = 0;
	rad.count4 = 0;
	rad.countGeo = 0;

	const color = new THREE.Color();

	for ( let geometry of rad.json.surfaces ) {

		switch ( geometry.type ) {

			case 'polygon':

				rad.drawPolygon( geometry );
				break;

			default:

				rad.countGeo++;
				//console.log( 'oops', geometry );

		}

	}


	/*
	rad.geom.computeFaceNormals();
	rad.geom.computeVertexNormals();
	rad.geom.colorsNeedUpdate = true;
	rad.geomMaterial = new THREE.MeshBasicMaterial( { color: 'darkgray', opacity: rad.opacity, side: 2, transparent: true } );
	*/


	const geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( rad.vertices, 3 ) );
	geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( rad.surfaceColors, 3 ) );
	geometry.computeVertexNormals();

	THR.scene.remove( rad.meshes );

	material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, side: 2, vertexColors: THREE.VertexColors } );
	rad.meshes = new THREE.Mesh( geometry, material );
	rad.meshes.name = rad.name;

	THR.scene.add( rad.meshes );

	THRU.zoomObjectBoundingSphere( rad.meshes );

	console.log( 'rad.count4', rad.count4 );
	console.log( 'rad.count3', rad.count3 );
	console.log( 'rad.countGeo', rad.countGeo);

};



//////////

rad.drawPolygon = function( polygon ) {
	//console.log( 'polygon', polygon );

	if ( polygon.vertices.length < 2 ) {

		console.log( 'draw point', {polygon} );

	} else if ( polygon.vertices.length < 3 ) {

		console.log( 'draw line', {polygon} );

	} else if ( polygon.vertices.length < 4 ) {

		rad.count3++;

		for ( vertex of polygon.vertices ) {

			for ( coordinate of vertex ) {

				rad.vertices.push( coordinate );

			}

		}

		color.setStyle( rad.getColor( polygon ) );

		rad.surfaceColors.push( color.r, color.g, color.b );
		rad.surfaceColors.push( color.r, color.g, color.b );
		rad.surfaceColors.push( color.r, color.g, color.b );

	} else {

		rad.count4 ++;

		for ( let vertex of polygon.vertices.slice( 0, 3 ) ) {

			for ( let coordinate of vertex ) {

				rad.vertices.push( coordinate );

			}

		}

		const vertices = [ polygon.vertices[ 3 ], polygon.vertices[ 2 ], polygon.vertices[ 0 ] ];

		for ( let vertex of vertices ) {

			for ( let coordinate of vertex ) {

				rad.vertices.push( coordinate );

			}

		}

		//color.setStyle( rad.getColor( polygon ) );

		let color = new THREE.Color( rad.getColor( polygon ) );
		//console.log( 'rad.getColor( polygon ) ', color  );

		for ( var i = 0; i < 6; i++ ) {

			rad.surfaceColors.push( color.r, color.g, color.b );

		}

	}

};





//////////


rad.getColor = function( geometry ){

	let color;

	if ( rad.json.materials.length > 0 ) {

		const colorText = rad.json.materials.find( material => material.name === geometry.modifier );
		//console.log( 'colorText', geometry, colorText);

		if ( colorText ) {

			const keys = Object.keys( colorText );

			const red = colorText[ keys.find( item => item.startsWith( 'r_' ) ) ];
			const green = colorText[ keys.find( item => item.startsWith( 'g_' ) ) ];
			const blue = colorText[ keys.find( item => item.startsWith( 'b_' ) ) ];

			color = new THREE.Color().setRGB( red, green, blue );

		}

	} else {

		const colorText = geometry.modifier;
		//console.log( 'colorText', colorText );

		color = rad.colors[ colorText ] || 0x444444; // 'darkgray';
		//console.log( 'x', color );

	}

	color = color ? color : 0x888888; // 'darkgray';

	return color;

};

