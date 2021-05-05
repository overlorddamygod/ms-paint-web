var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;
var title;
var color;
var stroke;
var colors;
var index;
let primaryColor,secodaryColor
let _bmd01,_bitmap01
window.addEventListener("contextmenu", e => e.preventDefault());
// function init() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d")



	function pick(event) {
		const rect = canvas.getBoundingClientRect()
		var x = event.layerX - rect.left;
		var y = event.layerY - rect.top;
		var pixel = ctx.getImageData(x, y, 1, 1);
		var data = pixel.data;

		// console.log(x,y)
		
		const pickedColor = rgb2hex(`rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`);
		// console.log(pickedColor)
		primaryColor = pickedColor	
		document.querySelector(".select-color-1").style.backgroundColor = primaryColor
	  }
	let stageW = canvas.width;
	let stageH = canvas.height;
	index = 0;
	colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];
	primaryColor = "#000000"
	color = primaryColor
	secondaryColor = "#ffffff"
	//check to see if we are running in a browser with touch support
	stage = new createjs.Stage(canvas);
	stage.autoClear = false;
	stage.enableDOMEvents(true);
	// stage.canvas.style

	createjs.Touch.enable(stage);
	createjs.Ticker.framerate = 24;
	drawingCanvas = new createjs.Shape();

	stage.addChild(drawingCanvas);

	stage.addEventListener("stagemousedown", pencil_handleMouseDown);
	stage.addEventListener("stagemouseup", pencil_handleMouseUp);
	// title = new createjs.Text("Click and Drag to draw", "36px Arial", "#777777");
	// title.x = 300;
	// title.y = 200;
	// stage.addChild(title);
	// drawingCanvas.cache(0, 0, stageW, stageH);
	// _bmd01 = new createjs.BitmapData(drawingCanvas.cacheCanvas);
	// drawingCanvas.uncache();
	// _bitmap01 = new createjs.Bitmap(_bmd01.canvas);
	// stage.removeAllChildren();

	// stage.addChild(_bitmap01);
	stage.update();
	// createjs.Ticker.setFPS(60);
	// createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	// _bitmap01.addEventListener("click", clickHandler);
// }

// function clickHandler(evt) {
// 	console.log("SADD")
// 	_bmd01.floodFill(evt.stageX, evt.stageY, color);
// 	stage.update();
// }

function pencil_handleMouseDown(event) {
	// console.log(event)
	if (!event.primary) { return; }

	switch ( event.nativeEvent.button ) {
		case 0:
			color = primaryColor
			break
		case 2:
			color = secondaryColor
			break
	}
	stroke = 2
	oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
	oldMidPt = oldPt.clone();
	stage.addEventListener("stagemousemove", pencil_handleMouseMove);
}

function pencil_handleMouseMove(event) {
	if (!event.primary) { return; }
	createPoints(stroke, color)
	stage.update();
}

function createPoints(_stroke, _color) {
	var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

	drawingCanvas.graphics.clear().setStrokeStyle(_stroke, 'round', 'round').beginStroke(_color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

	oldPt.x = stage.mouseX;
	oldPt.y = stage.mouseY;

	oldMidPt.x = midPt.x;
	oldMidPt.y = midPt.y;
}

function pencil_handleMouseUp(event) {
	if (!event.primary) { return; }
	stage.removeEventListener("stagemousemove", pencil_handleMouseMove);
}
function eraser_handleMouseDown(event) {
	// console.log(event)
	if (!event.primary) { return; }

	oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
	oldMidPt = oldPt.clone();
	stage.addEventListener("stagemousemove", eraser_handleMouseMove);
}
function eraser_handleMouseMove(event) {
	if (!event.primary) { return; }

	createPoints(20, "#ffffff")

	stage.update();
}
function eraser_handleMouseUp(event) {
	if (!event.primary) { return; }
	stage.removeEventListener("stagemousemove", eraser_handleMouseMove);
}


// init()



function rgb2hex(rgb){
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" +
	 ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	 ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	 ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
   }