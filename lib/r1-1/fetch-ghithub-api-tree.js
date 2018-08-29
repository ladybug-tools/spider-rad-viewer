
// Fetch a all the files in a github repo
// Build a categorized menu with links:
// to source on GitHub, or to embed in target or to display full screen

//const urlDefaultFile = 'https://rawgit.com/ladybug-tools/spider/master/radiance-sample-files/sample-file.rad';

//const urlGitHubAPITree = 'https://api.github.com/repos/ladybug-tools/spider/git/trees/master?recursive=1';
//const urlGitHubSource = 'https://github.com/ladybug-tools/spider/blob/master/';
//const urlGitHubPage = 'https://rawgit.com/ladybug-tools/spider/master/';

const iconGitHubMark = '<img src = "https://status.github.com/images/invertocat.png" height=14 style=vertical-align:middle>';



function fetchGitHubApiTree( user = 'ladybug-tools', repo = 'spider', target = divSampleFiles ) {

	// https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-html/examples/fetch/fetch-github-api-tree

	const url = `https://api.github.com/repos/${user}/${repo}/git/trees/master?recursive=1`;

	const request = new Request( url );

	fetch( request )
		.then( response => response.json() )
		.then( json => callbackGitHubApiTree( json, user, repo, target ) );

}



function callbackGitHubApiTree ( results, user, repo, target ) {

	console.log( 'results', results.tree );
	console.log( '??', user, repo );

	files = [];
	const folders = [];

	let txt = '';

	for ( let file of results.tree ) {

		if ( !file.path.endsWith( '.rad' ) || file.path.includes( 'zip-files') || file.path.includes( 'rad-tutorial-files' ) ) { continue; }

		files.push( file );

	}
	//console.log( 'files', files );

	urlGitHubSource = `https://github.com/${user}/${repo}/blob/master/`;
	urlGitHubPage = `https://rawgit.com/${user}/${repo}/master/`;

	for ( let file of files ) {

		const arrFile = file.path.split( '/' )
		const fileName = arrFile.pop();
		const folder = arrFile.pop();
		//console.log( 'folder', folder );

		if ( folder === 'radiance-sample-files' ) { continue; }

		if ( folders.indexOf( folder ) === -1 ) {

			folders.push( folder );
			txt += `<h4 style=margin:0; >${ folder }</h4>`;

		}


		txt +=

		`<div style=margin:10px; >

			<a href=${ urlGitHubSource + file.path } title="Edit me on GitHub" >${ iconGitHubMark }</a>

			<a href=#${ urlGitHubPage + file.path } onclick=setDivLog(this); title="${ file.size.toLocaleString() } bytes" >${ fileName}</a>

			<a href=${ urlGitHubPage +  file.path  } title="Link to just this file" >&#x2750;</a>

		</div>`;

	}

	target.innerHTML = `<p>files: ${ files.length } </p> ${ txt } <hr>`;

	// needs fixing??
	setDivLog = function( that ) {

		divLog.innerHTML = `loaded: ${that.innerText} <br> ${that.title}`;

	}

}
