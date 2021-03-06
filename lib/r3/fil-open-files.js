/* Copyright 2018 Ladybug Tools authors. MIT License */

let FIL = {};

FIL.updateLog = true;


FIL.initFileOpen = function() {

	window.addEventListener ( 'hashchange', FIL.onHashChange, false );

};



FIL.onHashChange = function() {

	rad.json = { 'surfaces': [], 'materials': [], 'other': [] };

	rad.url = location.hash.slice( 1 );

	if ( rad.url ) {

		rad.name = rad.url.split( '/' ).pop();
		FIL.requestFile( rad.url );

	}

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

	rad.size = xhr.target.response.length;

	divRadiance.innerText = '';
	divLog.innerHTML = '';
	txtJson.innerHTML = '';

	if ( rad.size < 500000 ) {

		FIL.setLog( xhr.target.response, json, { name: rad.name, size: rad.size } );

	}

};



//////////


FIL.inpOpenFiles = function( fileObj ) {
	//console.log( 'fileObj', fileObj );

	location.hash = '';

	//rad.jsonArrays = { 'surfaces': [], 'materials': [], 'other': [] };

	rad.json = { 'surfaces': [], 'materials': [], 'other': [] };

	divRadiance.innerText = '';
	divLog.innerHTML = '';
	txtJson.value = '';

	for ( let file of fileObj ) {

		const reader = new FileReader();

		reader.onload = function( event ) {

			const json = rad.addDataFile( reader.result, file );

			// replace with a return
			if ( FIL.updateLog === true && reader.result.length < 500000 ) {

				FIL.setLog( reader.result, json, file )

			}

		}

		reader.readAsText( file );

	}

};



FIL.setLog = function( text, json, file ) {

		//console.log( 'file', file );

		const target = document.querySelector( '#divLog' );

		if ( target ) {

			target.innerHTML +=
		`
			<p>
				name: ${ file.name }<br>
				size: ${ file.size.toLocaleString() } bytes<br>
			</p>
		`;
		}

		const tJson = document.querySelector( '#txtJson' );

		if ( tJson ) { tJson.value += JSON.stringify( json, undefined, 1 ); }

		const dRadiance = document.querySelector( '#divRadiance' );

		if ( dRadiance ) { dRadiance.innerText += text + '\n'; }

};