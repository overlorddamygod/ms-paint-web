let primaryColor = "#000000";
let secondaryColor = "#ffffff";
let color = primaryColor;

let stroke = 1;
let oldPt;
let drawing = false;

// Drawing canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const container = canvas.parentNode;

// Temporary Drawing canvas
const _canvas = document.createElement("canvas");
_ctx = _canvas.getContext("2d");

_canvas.id = "myCanvasTemp";
_canvas.width = canvas.width;
_canvas.height = canvas.height;
container.appendChild(_canvas);
