/* Copyright 2018 Ladybug Tools authors. MIT License */

let FIL = {};

FIL.getFileOpen = function( target ) {

	FIL.divFileData = target;

	window.addEventListener ( 'hashchange', FIL.onHashChange, false );

	divFileOpen.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
	divFileOpen.addEventListener( 'drop', FIL.drop, false );


	const htm =
	`
		<p id=pFileOpen>
			Open RAD and MAT files:
			<input type=file id=inpOpenFile onchange=FIL.inpOpenFiles(this.files); multiple accept=".rad,.mat" >
		</p>
	`;

	return htm;

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

	FIL.htmLog = '';
	FIL.txtRadiance = '';
	FIL.txtJson = '';

	FIL.htmLog =
	`
		<p>
			name: ${ rad.name }<br>
			size: ${ rad.size.toLocaleString() } bytes<br>
		</p>
	`;

	FIL.txtRadiance = xhr.target.response;
	FIL.txtJson = JSON.stringify( json, undefined, 1 );

	FIL.setLog();

	//}

};



//////////


FIL.inpOpenFiles = function( fileObj ) {
	//console.log( 'fileObj', fileObj );

	location.hash = '';

	rad.json = { 'surfaces': [], 'materials': [], 'other': [] };

	FIL.htmLog = '';
	FIL.txtRadiance = '';
	FIL.txtJson = '';

	let count = 0;

	for ( let file of fileObj ) {

		const reader = new FileReader();

		reader.onload = function( event ) {

			const json = rad.addDataFile( reader.result, file );

			FIL.htmLog +=
			`
				<p>
					name: ${ file.name }<br>
					size: ${ file.size.toLocaleString() } bytes<br>
				</p>
			`;

			FIL.txtRadiance += reader.result;
			FIL.txtJson += JSON.stringify( json, undefined, 1 );

			count++;

			if ( count === fileObj.length ) { FIL.setLog( file ); }

		}

		reader.readAsText( file );

	}

};



////////// handle drag and drop events

FIL.drop = function( event ) {

	const dropUrl = event.dataTransfer.getData( 'URL' );
	console.log( 'dropUrl', dropUrl );
	console.log( 'event', event );

	if ( dropUrl ) {

		location.hash = dropUrl;

	} else {

		FIL.inpOpenFiles( event.dataTransfer );

		console.log( 'got here', event.dataTransfer );

	}

	event.preventDefault();

};


FIL.openRadFile = function( files ) {

	console.log( 'files', files );
	//rad.addDataFile( event.dataTransfer );

	/*
	const reader = new FileReader();
	reader.onprogress = onRequestFileProgress;
	reader.onload = function( event ) {

		console.log( '', 23 );
			//FIL.inpOpenFiles( event.dataTransfer  )

		}

		reader.readAsText( files.files[ 0 ] );


		function onRequestFileProgress( event ) {

			CORdivLog.innerHTML =
				COR.fileAttributes.name + ' bytes loaded: ' + event.loaded.toLocaleString() +
				//( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			'';

		}
		*/
}

//////////

FIL.setLog = function() {

	const htmPlus = rad.size < 500000 ?
	`
		<!-- div and text area show errors differently -->
		<!--
			<p>JSON div </p>
			<div id = "divJson" ></div>
		-->

		<p>
			JSON textarea
			<textarea id = "txtJson" >${ FIL.txtJson }</textarea>
		</p>

		<p>
			Radiance textarea
			<textarea id = "divRadiance" >${ FIL.txtRadiance }</textarea>
		</p>
	`
	:
	`
		<p>Shows data only for files under 500 KB </p>
	`;

	const htm =
	`
		<div id = "divLog" >${ FIL.htmLog }</div>
		${ htmPlus }
	`;

	FIL.divFileData.innerHTML = htm;

};