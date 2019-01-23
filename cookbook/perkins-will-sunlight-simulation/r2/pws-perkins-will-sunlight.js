

let meshes;
let testCase = "e3pm";
let files;
let pngs;
let index = 0;
let playDay = null;
let playYear = null;


const sunPositions = {

	//e7am: { altitude: 0, azimuth: 90 },
	e7am: { altitude: 9.8, azimuth: -81.2 },
	e8am: { altitude: 20.9, azimuth: -70.7 },
	e9am: { altitude: 31.3, azimuth: -58.6 },
	e10am: { altitude: 40.3, azimuth: -43.7 },
	e11am: { altitude: 46.8, azimuth: -25 },
	e12pm: { altitude: 49.6, azimuth: 2.9 },
	e1pm: { altitude: 47.9, azimuth: 19.8 },
	e2pm: { altitude: 42.1, azimuth: 39.5 },
	e3pm: { altitude: 33.7, azimuth: 55.3 },
	e4pm: { altitude: 23.6, azimuth: 67.9 },
	e5pm: { altitude: 12.6, azimuth: 78.7 },

	jan3pm: { altitude: 18.2, azimuth: 41.7 },
	feb3pm: { altitude: 26, azimuth: 46.4 },
	e3pm: { altitude: 33.7, azimuth: 55.3 },
	apr3pm: { altitude: 41, azimuth: 67.4},
	may3pm: { altitude: 46.2, azimuth: 76.8 },
	s3pm: { altitude: 49.1, azimuth: 79.9 },
	jul3pm: { altitude: 48.3, azimuth: 75.5 },
	aug3pm: { altitude: 42.3, azimuth: 67 },
	sep3pm: { altitude: 32, azimuth: 59.1 },
	oct3pm: { altitude: 21.7, azimuth: 52.7 },
	nov3pm: { altitude: 14.8, azimuth: 48.6 },
	w3pm: { altitude: 13.6, azimuth: 42.5 }

};


function getSprite() {

	const spriteMap = new THREE.TextureLoader().load( "phil-512-yellow.png" );
	const spriteMaterial = new THREE.SpriteMaterial( { color: 0xffff00, map: spriteMap, opacity: 1 } );
	sprite = new THREE.Sprite( spriteMaterial );

	return sprite;

}


function fetchGitHubFolderContents( txt ) {

	testCase = txt;

	const url = "https://api.github.com/repos/ladybug-tools/spider-rad-resources/contents/sunlight-sample-files/2019-01-18-perkins-will-test-case/";
	//console.log(url );

	const request = new Request( url );

	fetch( request )
		.then( response => response.json() )
		.then( json => callbackGitHubMenu( json ) );

}



function callbackGitHubMenu ( json ) {

	files = json;

	//console.log( 'files', files );
	toggleSurfacesOff();

	buttsDay = document.querySelectorAll( '.pwsButtDay');

	buttsYear = document.querySelectorAll( '.pwsButtYear');

	buttsDay[ 8 ].click();

	//fetchTestCase( testCase );

	THR.scene.add( sprite );

}



function toggleSurfacesOff() {

	THR.scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.visible = false;
			//child.material.transparent = true;
			//child.material.opacity = 0.3;

		}

	} );

	ground.visible = true;

};



function playTheDay() {

	buttsDay[ index++ ].click();
	index = index >= buttsDay.length ? 0 : index;
	playDay = setTimeout( playTheDay, 1000 );


};



function playTheYear() {

	buttsYear[ index++ ].click();
	index = index >= buttsYear.length ? 0 : index;
	playYear = setTimeout( playTheYear, 1000 );

};



function fetchTestCase( testCase ) {

	let txt = '';
	pngs = []; // global

	position = sunPositions[ testCase ];
	//console.log( 'position', position );

	const pos = convertPosition( position.altitude, position.azimuth, 30 );
	//console.log( 'pos', pos );
	ground.position.set( THRU.center.x, THRU.center.y, -0.5 );

	sprite.position.copy( THRU.center.clone().add( pos ) );

	THRU.lightDirectional.position.copy( sprite.position );


	divMenuItems.innerHTML =
		`
			<details id = detGallery >

				<summary>Test Case ${ testCase } - List of Files</summary>

				<section id=divGallery ></section>

			</details>
		`;

	h3TestCase.innerHTML =
		`
			Test case: ${ testCase }<br>
			Altitude: ${ position.altitude }<br>
			Azimuth: ${ position.azimuth}
			`;

	for ( let file of files) {

		if ( !file.name.endsWith( '.png' ) ) { continue; }

		if ( !file.name.startsWith( testCase ) ) { continue; }

		//if( file.name.includes( 'sw' ) || file.name.includes( 'legend' ) ) { continue; }

		const fileName = encodeURI( file.name );

		txt +=

		`<div style="padding:0px 0;" >

			<a href=${ urlGitHubSourcePng + fileName } title="Edit me" >${ MNU.urlSourceCodeIcon }</a>

			<a href=#${ fileName } title="${ file.size.toLocaleString() } bytes" >${ file.name }</a>

			<!-- <a href=${ fileName } title="Link to just this file" >&#x2750;</a> -->

		</div>`;

		pngs.push( file.name );

	}

	divGallery.innerHTML =
	`<div style=padding:0px; >${ pngs.length } PNG files found</div>` + txt;

	loadTestCase( testCase );


}



function convertPosition( lat, lon, radius ) {

	lon = lon - 90;
	const d2r = Math.PI / 180
	var rc = radius * Math.cos( lat * d2r );
	return new THREE.Vector3( - rc * Math.cos( lon * d2r ), rc * Math.sin( lon * d2r), radius * Math.sin( lat * d2r ) );
}



function calcPosFromLatLonRad( radius, lat, lon ) {

	// https://stackoverflow.com/questions/28365948/javascript-latitude-longitude-to-xyz-position-on-earth-threejs

	//l2 = -20
	const spherical = new THREE.Spherical(
		radius,
		THREE.Math.degToRad( 90 - lon ),
		THREE.Math.degToRad( 90 - lat )
	);

	var vector = new THREE.Vector3();
	vector.setFromSpherical( spherical );
	console.log( vector.x, vector.y, vector.z );

	return vector;

}



function loadTestCase( index ) {

	THR.scene.remove( meshes );

	meshes = new THREE.Group();

	if ( !pngs.length ) { alert("No PNG files found. \n\n ;-(" ); return; }

	for ( fileName of pngs ) {

		loadPNG( fileName, index );

	}

	THR.scene.add( meshes );

}



function loadPNG( fileName, index ) {

	const items = fileName.slice( 0, -4).split( '_' ).map( item => parseFloat( item ) );
	//console.log( 'items', items );

	const center = new THREE.Vector3().fromArray( items.slice( 1, 4 ) );
	//console.log( 'center', center );

	const normal = new THREE.Vector3().fromArray( [ items[ 4 ], items[ 5 ], items[ 6 ] ] ).normalize();

	//console.log( 'normal', normal );
	//meshes.add( new THREE.ArrowHelper( normal, center, 3, 0xff00ff, 1, 1 ) );

	const point = new THREE.Vector3().fromArray( [ items[ 7 ], items[ 8 ], items[ 9 ] ] ).normalize();

	//console.log( 'point', point );
	//meshes.add( new THREE.ArrowHelper( point, center, 3, 0x000000 , 1, 1 ) );

	const width = items[ 10 ];
	const height = items[ 11 ];
	//console.log( 'w',width, 'h', height );

	const loader = new THREE.TextureLoader();

	//const texture = loader.load ( urlGitHubPage + index + '/' + fileName );

	//name = urlGitHubPage + fileName;

	const name = urlGitHubSourcePng + fileName;
	//console.log( 'name', name );

	const texture = loader.load ( name );
	//console.log( 'tex', texture );

	texture.minFilter = THREE.LinearFilter;

	const material = new THREE.MeshBasicMaterial( { alphaTest : 0.01, map: texture, opacity: 1, side: 2, transparent: true } );
	const geometry = new THREE.PlaneBufferGeometry( width, height );

	mesh = new THREE.Mesh( geometry, material );

	mesh.position.copy( center );

	normal.add( center )
	mesh.up = point;
	mesh.lookAt( normal );
	mesh.castShadow = true;

	if ( items[ 0 ] === 0 && items[ 1 ] === 0 ) {

		//console.log( 'items', items );

	} else {

		edgesGeometry = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
		edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
		edges = new THREE.LineSegments( edgesGeometry, edgesMaterial );
		mesh.add( edges );

	}

	meshes.add( mesh );



}

