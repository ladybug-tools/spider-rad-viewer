

let meshes;
let testCase = "e3pm";
let files;
let pngs;
let index = 0;
let playDay = null;
let playYear = null;

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
	THRU.toggleSurfaces();

	buttsDay = document.querySelectorAll( '.pwsButtDay');

	buttsYear = document.querySelectorAll( '.pwsButtYear');

	buttsDay[ 8 ].click();

	//fetchTestCase( testCase );

}


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

	divMenuItems.innerHTML =
		`
			<details id = detGallery >

				<summary>Test Case ${ testCase } - List of Files</summary>

				<section id=divGallery ></section>

			</details>
		`;

		h3TestCase.innerHTML = `Test case: ${ testCase }`;
		
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
	meshes.add( new THREE.ArrowHelper( normal, center, 3, 0xff00ff, 1, 1 ) );

	const point = new THREE.Vector3().fromArray( [ items[ 7 ], items[ 8 ], items[ 9 ] ] ).normalize();

	//console.log( 'point', point );
	meshes.add( new THREE.ArrowHelper( point, center, 3, 0x000000 , 1, 1 ) );

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

	const material = new THREE.MeshBasicMaterial( { alphaTest : 0.01, map: texture, opacity: 1, side: 0, transparent: true } );
	const geometry = new THREE.PlaneBufferGeometry( width, height );

	mesh = new THREE.Mesh( geometry, material );

	mesh.position.copy( center );

	normal.add( center )
	mesh.up = point;
	mesh.lookAt( normal );

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

