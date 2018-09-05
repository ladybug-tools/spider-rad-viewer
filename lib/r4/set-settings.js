

let SET = {};


SET.getSettings = function() {

	let htm =
	`
		<p>
			<button onclick="THR.sceneRotation=THR.sceneRotation === 1 ? 0 : 1;" >rotation</button>
		</p>

		<p>
			<button onclick=THR.toggleWireframe(); >wireframe</button>

			<button onclick=rad.edges.visible=!rad.edges.visible; >toggle edges</button>
		</p>

		<div title="building opacity: 0 to 100%" >Opacity
			<output id=outOpacity class=floatRight >85%</output><br>
			<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput=THR.updateOpacity(); >
		</div>

		<p><button onclick=THR.zoomObjectBoundingSphere(rad.edges);>zoom all</button></p>
	`;

	return htm;

}

