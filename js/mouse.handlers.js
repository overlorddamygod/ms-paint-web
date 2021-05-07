function pencil_handleMouseDown(event) {
  if (!event.primary) {
    return;
  }

  setColorByMouseButton(event.nativeEvent);
  state.saveState(canvas);

  oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt.clone();
  stage.addEventListener("stagemousemove", pencil_handleMouseMove);
}

function pencil_handleMouseMove(event) {
  if (!event.primary) {
    return;
  }
  
  createPoints(stroke, color);
  stage.update();
}

function createPoints(_stroke, _color) {
  const midPt = new createjs.Point(
    (oldPt.x + stage.mouseX) >> 1,
    (oldPt.y + stage.mouseY) >> 1
  );

  drawingCanvas.graphics
    .clear()
    .setStrokeStyle(_stroke, "round", "round")
    .beginStroke(_color)
    .moveTo(midPt.x, midPt.y)
    .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

  oldPt.x = stage.mouseX;
  oldPt.y = stage.mouseY;

  oldMidPt.x = midPt.x;
  oldMidPt.y = midPt.y;
}

function pencil_handleMouseUp(event) {
  if (!event.primary) {
    return;
  }
  stage.removeEventListener("stagemousemove", pencil_handleMouseMove);
}
function eraser_handleMouseDown(event) {
  // console.log(event)
  if (!event.primary) {
    return;
  }
  state.saveState(canvas);

  oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt.clone();
  stage.addEventListener("stagemousemove", eraser_handleMouseMove);
}
function eraser_handleMouseMove(event) {
  if (!event.primary) {
    return;
  }

  createPoints(stroke * 3.5, "#ffffff");

  stage.update();
}
function eraser_handleMouseUp(event) {
  if (!event.primary) {
    return;
  }
  stage.removeEventListener("stagemousemove", eraser_handleMouseMove);
}

const rect_handleMouseMove = shapeMouseMove("rect")
const rect_handleMouseDown = shapeMouseDown("rect", rect_handleMouseMove)
const rect_handleMouseUp = shapeMouseUp("rect", rect_handleMouseMove)

const ellipse_handleMouseMove = shapeMouseMove("ellipse")
const ellipse_handleMouseDown = shapeMouseDown("ellipse", ellipse_handleMouseMove)
const ellipse_handleMouseUp = shapeMouseUp("ellipse", ellipse_handleMouseMove)

function line_handleMouseDown(event) {
    if (!event.primary) {
      return;
    }
    setColorByMouseButton(event.nativeEvent);

    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);

    state.saveState(canvas);
    state.setState69(canvas);

    stage.addEventListener("stagemousemove", line_handleMouseMove);
};


function line_handleMouseMove(event) {
  if (!event.primary) {
    return;
  }

  drawingCanvas.graphics
  .clear()
  .setStrokeStyle(stroke)
  .beginStroke(color)
  .moveTo(oldPt.x,oldPt.y)
  .lineTo(stage.mouseX, stage.mouseY)

  renderCanvas(state.getState69(), canvas);
  stage.update();
}

function line_handleMouseUp(event) {
  if (!event.primary) {
    return;
  }
  state.setState69(null);

  drawingCanvas.graphics
  .clear()
  .setStrokeStyle(stroke)
  .beginStroke(color)
  .moveTo(oldPt.x,oldPt.y)
  .lineTo(stage.mouseX, stage.mouseY)

  stage.update();
  stage.removeEventListener("stagemousemove", line_handleMouseMove);
}


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