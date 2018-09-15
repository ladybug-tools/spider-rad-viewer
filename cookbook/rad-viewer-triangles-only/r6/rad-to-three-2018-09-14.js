

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

	Exterior_Window: 'black',
	Exterior_Wall: 'gray',
	Exterior_Floor: 'brown',
	Exterior_Roof: 'maroon',

	Dark_Wood: 'brown',
	Ceiling: 'azure',
	Ext_wall: 'gray',
	Ext_glaz: 'black',
	Floor: 'brown',
	Int_wall: 'navajowhite',
	Int_glaz: 'darkgray',
	Light_Wood: 'burlywood'

};

let material = new THREE.MeshBasicMaterial( { color: 'gray', opacity: rad.opacity, side: 2, transparent: true, vertexColors: THREE.VertexColors } );

// called by FIL.callbackRequestFile and FIL.inpOpenFiles

rad.addDataFile = function( text ) {

	json = rad.radToJson( text );

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



rad.setThreeJsWindowUpdate = function( target = undefined ) {

	THR.scene.remove( rad.meshes, rad.edges );
	rad.meshes = new THREE.Group();
	rad.edges = new THREE.Group();

	if ( ! rad.json.surfaces.length ) {

		if ( target ) { target.innerHTML += 'no surfaces'; }

		return;

	}

	rad.geom = new THREE.Geometry();
	rad.count3 = 0
	rad.count4 = 0;

	for ( let geometry of rad.json.surfaces ) {

		switch ( geometry.type ) {

			case 'polygon':

				rad.drawPolygon( geometry );
				break;

			default:

				console.log( 'oops', geometry );

		}

	}


	rad.geom.computeFaceNormals();
	rad.geom.computeVertexNormals();

	rad.geom.colorsNeedUpdate = true;

	rad.geomMaterial = new THREE.MeshBasicMaterial( { color: 'darkgray', opacity: rad.opacity, side: 2, transparent: true } );

	mesh = new THREE.Mesh( rad.geom, rad.geomMaterial );
	rad.meshes.add( mesh );

	THR.scene.add( rad.meshes, rad.edges );

	THRU.zoomObjectBoundingSphere( rad.meshes );

	//console.log( 'rad.count4', rad.count4 );
	//console.log( 'rad.count3', rad.count3 );

};



//////////

rad.drawPolygon = function( polygon ) {
	//console.log( 'polygon', polygon );

	let points = polygon.vertices.map( item => new THREE.Vector3().fromArray( item ) );
	//console.log( 'points', points );


	//console.log( 'color', color );



	//const material = new THREE.MeshNormalMaterial( {  opacity: rad.opacity, side: 2, transparent: true } );


	if ( points.length < 2 ) {

		console.log( {polygon} );

		return;

	} else if ( points.length < 3 ) {

		console.log( 'draw line', {polygon} );

		return;

	} else if ( points.length < 4 ) {

		rad.count3 ++;

		geometry = new THREE.Geometry();
		geometry.vertices = points;
		let color = new THREE.Color( rad.getColor( polygon ) );
		var normal = new THREE.Vector3( 0, 0, 1 );
		geometry.faces = [ new THREE.Face3( 2, 1, 0, normal, color ) ];
		//geometry.colors = [ color, color, color ];


		//geometry.faces[ 0 ].vertexColors[ 0 ] = new THREE.Color( 0xffffff * Math.random());
		//geometry.faces[ 1 ].vertexColors[ 1 ] = new THREE.Color( 0xffffff * Math.random());
		//geometry.faces[ 2 ].vertexColors[ 2 ] = new THREE.Color( 0xffffff * Math.random());

		rad.geom.merge( geometry );

	} else {

		rad.count4 ++;
		//console.log( {polygon} );

		const geometry = new THREE.Geometry();
		geometry.vertices = points;
		geometry.faces = [ new THREE.Face3( 2, 1, 0 ), new THREE.Face3( 0, 2, 3 ) ];

		rad.geom.merge( geometry );

		//mesh = rad.drawShape( points, material );
		//mesh.userData = polygon;
		//rad.meshes.add( mesh );
		//rad.setEdges( mesh );

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

		color = rad.colors[ colorText ] || 'darkgray';
		//console.log( 'x', color );

	}

	color = color ? color : 'darkgray';

	return color;

};

