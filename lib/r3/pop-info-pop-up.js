
/* Copyright 2018 Ladybug Tools authors. MIT License */

const POP = {}


function initPopUp() {

	POP.mouse = new THREE.Vector2();

	POP.intersected = undefined;
	renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	renderer.domElement.addEventListener( 'touchstart', onDocumentTouchStart, false );

}



function onDocumentMouseMove( event ) {

	event.preventDefault();

	if ( event.buttons > 0 ) { return; }

	POP.mouse.x = ( event.clientX / THR.renderer.domElement.clientWidth ) * 2 - 1;
	POP.mouse.y = - ( event.clientY / THR.renderer.domElement.clientHeight ) * 2 + 1;

	const raycaster = new THREE.Raycaster();
	raycaster.setFromCamera( POP.mouse, THR.camera );

	const intersects = raycaster.intersectObjects( rad.meshes.children );

	if ( intersects.length > 0 ) {

		if ( POP.intersected != intersects[ 0 ].object ) {

			if ( POP.intersected ) {

				POP.intersected.material.color.setHex( POP.intersected.currentHex );
				POP.intersected.material.opacity = POP.intersected.currentOpacity;
				//POP.intersected.scale.copy( POP.intersected.currentScale );

			}

			POP.intersected = intersects[ 0 ].object;

			POP.intersected.currentHex = POP.intersected.material.color.getHex();
			POP.intersected.material.color.setHex( 0xff00ff );

			POP.intersected.currentOpacity = POP.intersected.material.opacity;
			POP.intersected.material.opacity = 1;

			//POP.intersected.currentScale = POP.intersected.scale.clone();
			//console.log( 'POP.intersected.currentScale', POP.intersected.currentScale );
			//POP.intersected.scale.copy( POP.intersected.currentScale.clone().multiplyScalar( 1.2 ) );

		}

	} else {

		if ( POP.intersected ) {

			POP.intersected.material.color.setHex( POP.intersected.currentHex );
			POP.intersected.material.opacity = POP.intersected.currentOpacity;
			//POP.intersected.scale.copy( POP.intersected.currentScale );

		}

		POP.intersected = undefined;

		divData.innerHTML = 'No item selected';
		//divImage.innerHTML = '';

	}

	setPopUp( event );

}



function setPopUp( event ) {

	if ( POP.intersected === undefined ){

		if ( event.type === 'touchstart' ) {

			popUp.style.display = 'none';

		}

		document.body.style.cursor = 'auto';
		return;

	}

	popUp.style.display = '';

	//console.log( 'POP.intersected.userData', POP.intersected.userData );

	const geometry = JSON.stringify( POP.intersected.userData, null, 2 ).slice( 2, -2 ).replace( /"/g, '' ).replace( /(\D),/g, '$1<br>' );

	const materialName = POP.intersected.userData.modifier;
	let materialText;

	if ( rad.json.materials.length > 0 ) {

		const materialJson = rad.json.materials.find( item => item.name === materialName );
		materialText = JSON.stringify( materialJson, null, 2 ).slice( 2, -2 ).replace( /"/g, '' ).replace( /(\D),/g, '$1<br>' );

	} else {

		materialText = 'color #' + POP.intersected.currentHex;

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
