/* global THREE * /
/* jshint esversion: 6 */

// Copyright 2018 Ladybug Tools authors. MIT License


const MNU = {};


MNU.urlSourceCode = 'https://github.com/pushme-pullyou/pushme-pullyou.github.io/tree/master/tootoo-templates/threejs-lib';


MNU.getNavHeader = function() {

	const htm  =
	`
		<a href="https://www.ladybug.tools" title=" free computer applications that support environmental design and education" target="_top">ladybug tools</a>
		&raquo;
		<a href="https://www.ladybug.tools/spider/" title="3D interactive analysis in your browser mostly written around the Three.js JavaScript library" target="_top">spider</a>
		&raquo;
		<a href="https://www.ladybug.tools/spider-gbxml-tools/" title="3D interactive analysis in your browser mostly written around the Three.js JavaScript library" >gbxml</a>
		&raquo;

		<h2>
			<a href=${ MNU.urlSourceCode } target="_top" title="Source code on GitHub" >
				<img src="https://status.github.com/images/invertocat.png" height=18 >
			</a>
			<a href="" title="Click to reload this page" >${ document.title }</a>
		</h2>

		<p>
			${ document.head.querySelector( '[ name=description ]' ).content }
		</p>
	`;

	return htm;

};



MNU.getNavFooter = function() {

	// &#x1f578; :: 🕸 / &#x2766; :: ❦

	const htm  =
	`
		<h2 onclick=navMenu.scrollTop=0; style=cursor:pointer;text-align:center;
			title='go to top' >
			❦
		</h2>
	`;

	return htm;

};



MNU.toggleNavLeft = function() {

	const width = navMenu.getBoundingClientRect().width;

	if ( navMenu.style.left === '' || navMenu.style.left === '0px' ) {

		navMenu.style.left = '-' + width + 'px';
		butHamburger.style.left = '10px';

	} else {

		navMenu.style.left = '0px';
		butHamburger.style.left = width + 'px';

	}

};
