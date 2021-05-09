function pencil_handleMouseMove(e) {
  if ( !drawing ) return
  _ctx.lineTo(e.layerX, e.layerY);
  _ctx.stroke();
}
const pencil_handleMouseDown = createMouseDownEvent("Pencil", e => {
  _ctx.lineCap = "round";
  _ctx.beginPath();
  _ctx.moveTo(e.layerX, e.layerY);
}, pencil_handleMouseMove)

const pencil_handleMouseUp = createMouseUpEvent("Pencil", pencil_handleMouseMove)

function eraser_handleMouseMove(e) {
  if ( !drawing ) return
  _ctx.lineTo(e.layerX, e.layerY);
  _ctx.stroke();
}
const eraser_handleMouseDown = createMouseDownEvent("eraser", e => {
  _ctx.lineCap = "round";
  _ctx.beginPath();
  _ctx.moveTo(e.layerX, e.layerY);
}, eraser_handleMouseMove)
const eraser_handleMouseUp = createMouseUpEvent("eraser", eraser_handleMouseMove)

const rect_handleMouseMove = shapeMouseMove("rect")
const rect_handleMouseDown = shapeMouseDown("rect", rect_handleMouseMove)
const rect_handleMouseUp = shapeMouseUp("rect", rect_handleMouseMove)

const ellipse_handleMouseMove = shapeMouseMove("ellipse")
const ellipse_handleMouseDown = shapeMouseDown("ellipse", ellipse_handleMouseMove)
const ellipse_handleMouseUp = shapeMouseUp("ellipse", ellipse_handleMouseMove)

function line_handleMouseMove(e) {
  if ( !drawing ) return false
    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);

    _ctx.beginPath();
    _ctx.moveTo(oldPt.x, oldPt.y);
    _ctx.lineTo(e.layerX, e.layerY);
    _ctx.stroke();
    _ctx.closePath();
}
const line_handleMouseDown = createMouseDownEvent("line", e => {
  oldPt = createPoint(e.layerX, e.layerY);
}, line_handleMouseMove)

const line_handleMouseUp = createMouseUpEvent("line", line_handleMouseMove)

function colorPicker_Click(event) {
  const x = event.layerX
  const y = event.layerY
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;

  const pickedColor = rgb2hex(
    `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
  );

  setSelectedColor(pickedColor, null);
  document.querySelector(`#tool[data-tool-name=${state.recentTool}]`).click()
}

function fill_Click(event) {
  state.saveState(canvas);

  const x = event.layerX
  const y = event.layerY
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  setColorByMouseButton(event);

  const col = hexToRGB(color)
  floodFill(imageData, col, x, y)
  ctx.putImageData(imageData, 0, 0)
}

const mouseHandlers = {
  pencil: {
    mouseDown: pencil_handleMouseDown,
    mouseMove: pencil_handleMouseMove,
    mouseUp: pencil_handleMouseUp,
  },
  eraser: {
    mouseDown: eraser_handleMouseDown,
    mouseMove: eraser_handleMouseMove,
    mouseUp: eraser_handleMouseUp,
  },
  rect: {
    mouseDown: rect_handleMouseDown,
    mouseMove: rect_handleMouseMove,
    mouseUp: rect_handleMouseUp,
  },
  ellipse: {
    mouseDown: ellipse_handleMouseDown,
    mouseMove: ellipse_handleMouseMove,
    mouseUp: ellipse_handleMouseUp,
  },
  line: {
    mouseDown: line_handleMouseDown,
    mouseMove: line_handleMouseMove,
    mouseUp: line_handleMouseUp,
  },
  colorPicker: {
    click: colorPicker_Click,
  },
  fill: {
    click: fill_Click,
  },
};

window.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("keydown", async (e) => {
  if (
    (e.ctrlKey && e.key === "z" && !isMac) ||
    (e.metaKey && e.key === "z" && !e.shiftKey && isMac)
  ) {
    console.log("UNDO");
    state.undo(canvas, ctx);
  }
  if (
    (e.ctrlKey && e.key === "y" && !isMac) ||
    (e.metaKey && e.shiftKey && e.key === "z" && isMac)
  ) {
    console.log("REDO");
    state.redo(canvas, ctx);
  }
  if (
    (e.ctrlKey && e.key === "v" && !isMac) ||
    (e.metaKey && e.key === "v" && !e.shiftKey && isMac)
  ) {
    console.log("Paste");
    // const text = await navigator.clipboard.readText();
    // console.log(text)
    // state.undo(canvas, ctx);
  }
});

// TODO : Implement image paste
window.addEventListener("paste", async function(e) {
    // e.preventDefault();
    // e.stopPropagation();
    console.log(e)
    let file = e.clipboardData.items[0].getAsFile();
    console.log(file)
    // let objectUrl = URL.createObjectURL(file);
    // do something with url here
});