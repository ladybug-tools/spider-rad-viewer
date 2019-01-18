
// Fetch a all the files in a github repo
// Build a categorized menu with links:
// to source on GitHub, or to embed in target or to display full screen

const FGAT = {};

FGAT.iconGitHubMark = '<img src = "https://status.github.com/images/invertocat.png" height=14 style=vertical-align:middle>';



FGAT.fetchGitHubApiTree = function( user = 'ladybug-tools', repo = 'spider-rad-resources', target = divSampleFiles ) {

	// https://developer.github.com/v3/git/trees/

	const url = `https://api.github.com/repos/${user}/${repo}/git/trees/master?recursive=1`;

	const request = new Request( url );

	fetch( request )
		.then( response => response.json() )
		.then( json => FGAT.callbackGitHubApiTree( json, user, repo, target ) );

}



FGAT.callbackGitHubApiTree = function( results, user, repo, target ) {

	//console.log( 'results', results.tree );
	//console.log( {user}, {repo} );

	const files = [];
	const folders = [];

	for ( let file of results.tree ) {

		if ( !file.path.endsWith( '.rad' ) || file.path.includes( 'zip-files') || file.path.includes( 'rad-tutorial-files' ) ) { continue; }

		files.push( file );

	}
	//console.log( 'files', files );

	urlGitHubSource = `https://github.com/${user}/${repo}/blob/master/`;
	urlGitHubPage = `https://rawgit.com/${user}/${repo}/master/`;

	let sections = '';

	for ( let file of files ) {

		const arrFile = file.path.split( '/' );
		const fileName = arrFile.pop();
		const folder = arrFile.pop();

		if ( folders.indexOf( folder ) === -1 ) {

			const folderTxt = "div" + folder;
			folders.push( folder );

			sections +=
			`
				<details>
					<summary>${ folder }</summary>
					<div id="${ folderTxt }"></div>
				</details>
			`;

		}

	}

	target.innerHTML = `<p>files: ${ files.length } </p> ${ sections } <hr>`;

	for ( let file of files ) {

		const arrFile = file.path.split( '/' );
		const fileName = arrFile.pop();
		const folder = arrFile.pop();
		const folderId = document.getElementById( 'div' + folder );

		folderId.innerHTML +=

		`<div style=margin:10px; >

			<a href=${ urlGitHubSource + file.path } title="Edit me on GitHub" >${ FGAT.iconGitHubMark }</a>

			<a href=#${ urlGitHubPage + file.path } title="${ file.size.toLocaleString() } bytes" >${ fileName}</a>

			<a href=${ urlGitHubPage +  file.path  } title="Link to just this file" >&#x2750;</a>

		</div>`;

	}

}
