
const CAM = {};

CAM.getViewCamera = function( target ) {


	THR.getViewCamera

	let htm =

	`
		<p><button onclick=CAM.updateCameraParameters();>update camera view</button></p>
		<div id="divCameraParameters" >bbb</div>

	`;

	return htm;

}


CAM.updateCameraParameters = function( target = divCameraParameters ) {

	//console.log( '', target );

	const directionVector = THR.controls.target.clone().sub( THR.camera.position ).normalize()

	target.innerHTML =
	`
		<p>
			camera position<br>
			x: ${ THR.camera.position.x }<br>
			y: ${ THR.camera.position.y }<br>
			z: ${ THR.camera.position.z }<br>
		</p>
		<p>
			camera filed of view<br>
			fov: ${ THR.camera.fov }<br>
		</p>
		<p>
			<a href="https://threejs.org/docs/#api/en/cameras/PerspectiveCamera" >Three.js Camera API</a>
		</p>
			controls target<br>
			x: ${ THR.controls.target.x }<br>
			y: ${ THR.controls.target.y }<br>
			z: ${ THR.controls.target.z }<br>
		<p>
			<a href="https://threejs.org/docs/#examples/controls/OrbitControls" >Three.js Orbit Controls API</a>
		</p>
		<p>
			calculated direction vector<br>
			x: ${ directionVector.x }<br>
			y: ${ directionVector.y }<br>
			z: ${ directionVector.z }<br>
		<p>
			suggested <i>rpict</i> options
		</p>
		<p><b>
			-vp ${ THR.camera.position.x.toFixed( 1 ) } ${ THR.camera.position.y.toFixed( 1 ) } ${ THR.camera.position.z.toFixed( 1 ) }
			-vd ${ directionVector.x.toFixed( 3) } ${ directionVector.y.toFixed( 3 ) } ${ directionVector.z.toFixed( 3 ) }
		</b></p>
		<p>
			<a href="http://radsite.lbl.gov/radiance/rpict.1.html" >Rpict man page</a>
		</p>

	`;

}