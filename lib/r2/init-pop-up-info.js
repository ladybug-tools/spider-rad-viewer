
/* Copyright 2018 Ladybug Tools authors. MIT License */

let mouse;
let xDown = null;
let yDown = null;
let intersected = null;


function initPopUp() {

	//window.objects = [];
	mouse= new THREE.Vector2(); // try 2D

	// move to init??
	window.intersected = undefined;
	renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	renderer.domElement.addEventListener( 'touchstart', onDocumentTouchStart, false );

}



function onDocumentMouseMove( event ) {

	event.preventDefault();

	if ( event.buttons > 0 ) { return; }

	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	const raycaster = new THREE.Raycaster();
	raycaster.setFromCamera( mouse, camera );

	const intersects = raycaster.intersectObjects( rad.meshes.children );

	if ( intersects.length > 0 ) {

		if ( intersected != intersects[ 0 ].object ) {

			if ( intersected ) {

				intersected.material.color.setHex( intersected.currentHex );
				intersected.material.opacity = intersected.currentOpacity;
				//intersected.scale.copy( intersected.currentScale );

			}

			intersected = intersects[ 0 ].object;

			intersected.currentHex = intersected.material.color.getHex();
			intersected.material.color.setHex( 0xff00ff );

			intersected.currentOpacity = intersected.material.opacity;
			intersected.material.opacity = 1;

			//intersected.currentScale = intersected.scale.clone();
			//console.log( 'intersected.currentScale', intersected.currentScale );
			//intersected.scale.copy( intersected.currentScale.clone().multiplyScalar( 1.2 ) );

		}

	} else {

		if ( intersected ) {

			intersected.material.color.setHex( intersected.currentHex );
			intersected.material.opacity = intersected.currentOpacity;
			//intersected.scale.copy( intersected.currentScale );

		}

		intersected = undefined;

		divData.innerHTML = 'No item selected';
		//divImage.innerHTML = '';

	}

	setPopUp( event );

}



function setPopUp( event ) {

	if ( intersected === undefined ){

		if ( event.type === 'touchstart' ) {

			popUp.style.display = 'none';

		}

		document.body.style.cursor = 'auto';
		return;

	}

	popUp.style.display = '';

	//console.log( 'intersected.userData', intersected.userData );

	const geometry = JSON.stringify( intersected.userData, null, 2 ).slice( 2, -2 ).replace( /"/g, '' ).replace( /(\D),/g, '$1<br>' );

	const materialName = intersected.userData.modifier;
	let materialText;

	if ( rad.json.materials.length > 0 ) {

		const materialJson = rad.json.materials.find( item => item.name === materialName );
		materialText = JSON.stringify( materialJson, null, 2 ).slice( 2, -2 ).replace( /"/g, '' ).replace( /(\D),/g, '$1<br>' );

	} else {

		materialText = 'color #' + intersected.currentHex;

	}

	const txt =
	`
		<h3>Geometry</h3>
		${ geometry }
		<h3>Material</h3>
		${ materialText}
	`;

	divData.innerHTML = txt;

	document.body.style.cursor = 'pointer';

}



function onDocumentMouseDown( event ) {

	popUp.style.display = 'none';

}



function onDocumentTouchStart( event ) {

	//	event.preventDefault();

	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;

	onDocumentMouseMove( event );

}
