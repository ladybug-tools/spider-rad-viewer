
const FIL = {}

FIL.initFileOpen = function() {

	window.addEventListener ( 'hashchange', FIL.onHashChange, false );

};



FIL.onHashChange = function() {

	rad.json = { 'surfaces': [], 'materials': [], 'other': [] };

	rad.url = location.hash.slice( 1 );

	if ( rad.url ) { FIL.requestFile( rad.url ); }

};



FIL.requestFile = function( url ) {

	const xhr = new XMLHttpRequest();  // unlike fetch handles local files
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded ); }; // or something
	xhr.onload = FIL.callbackRequestFile;
	xhr.send( null );

};



FIL.callbackRequestFile = function( xhr ) {

	const json = rad.addDataFile( xhr.target.response, );

	if ( xhr.target.response.length < 500000 ) {

		FIL.updateLog( xhr.target.response, json,
			{ name: xhr.target.responseURL.split( '/' ).pop(), size: xhr.target.response.length } )

	}

};



//////////


FIL.inpOpenFiles = function( fileObj ) {
	//console.log( 'fileObj', fileObj );

	location.hash = '';

	//rad.jsonArrays = { 'surfaces': [], 'materials': [], 'other': [] };

	rad.json = { 'surfaces': [], 'materials': [], 'other': [] };

	divRadiance.innerText = '';

	for ( let file of fileObj ) {

		const reader = new FileReader();

		reader.onload = function( event ) {

			const json = rad.addDataFile( reader.result, file );

			if ( reader.result.length < 500000 ) {

				FIL.updateLog( reader.result, json, file )

			}

		}

		reader.readAsText( file );

	}

};



FIL.updateLog = function( text, json, file ) {

		divPopUpLog.innerHTML +=
		`
			<p>
				name: ${ file.name }<br>
				size: ${ file.size.toLocaleString() } bytes<br>
			</p>
		`;

		txtJson.value += JSON.stringify( json, undefined, 1 ); // reloads every iteration but does not seem to slow things down much ;-)

		divRadiance.innerText += text + '\n';

};