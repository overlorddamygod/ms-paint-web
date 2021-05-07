let stage;
let drawingCanvas;
let oldPt;
let oldMidPt;

let primaryColor = "#000000";
let secondaryColor = "#ffffff";
let color = primaryColor;

let stroke = 1;

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let stageW = canvas.width;
let stageH = canvas.height;


//check to see if we are running in a browser with touch support
stage = new createjs.Stage(canvas);
stage.autoClear = false;
stage.enableDOMEvents(true);

createjs.Touch.enable(stage);
createjs.Ticker.framerate = 40;
// createjs.Ticker.framerate = 40;
drawingCanvas = new createjs.Shape();
drawingCanvas.graphics.beginStroke("#ffffff").beginFill("#ffffff").drawRect(0, 0, stageW, stageH);
stage.addChild(drawingCanvas);
// drawingCanvas.cache(0,0, stageW,stageH)

stage.addEventListener("stagemousedown", pencil_handleMouseDown);
stage.addEventListener("stagemouseup", pencil_handleMouseUp);

stage.update();