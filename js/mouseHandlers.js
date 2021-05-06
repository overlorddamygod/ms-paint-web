function pencil_handleMouseDown(event) {
  if (!event.primary) {
    return;
  }

  setColorByMouseButton(event);
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

function rect_handleMouseDown(event) {
  if (!event.primary) {
    return;
  }
  setColorByMouseButton(event);

  oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt.clone();
  cloneDrawingCanvas = drawingCanvas.clone();

  // console.log(e)
  // if ( rec )
  // rec.visible =false
  // rec = new createjs.Shape();
  // console.log(event.stageX)
  // rec.graphics.setStrokeStyle(2).beginStroke(color).drawRect(event.stageX, event.stageY, 20,20);
  // rec.x = 100

  // stage.addChild(rec);
  // stage.removeAllChildren()
  // stage.update()
  // stage.addChild(cloneDrawingCanvas)
  stage.addEventListener("stagemousemove", rect_handleMouseMove);
}

function rect_handleMouseMove(event) {
  if (!event.primary) {
    return;
  }
  w = stage.mouseX - oldPt.x;
  h = stage.mouseY - oldPt.y;
  console.log(event);

  // if (a <2) {
  // 	// a++
  // stage.removeChild(rec)

  // console.log(stage.children.length)
  // rec.graphics.clear()
  // if (prevx)
  // drawingCanvas.graphics.setStrokeStyle(1).beginStroke(color).rect(oldMidPt.x, oldMidPt.y, prevx,prevy);
  // stage.update()
  stage.removeAllChildren();
  console.log(stage.children.length);
  stage.autoClear = true;
  stage.update();
  stage.autoClear = false;
  drawingCanvas = cloneDrawingCanvas;
  stage.addChild(drawingCanvas);

  drawingCanvas.graphics
    .setStrokeStyle(1)
    .beginStroke(color)
    .rect(oldMidPt.x, oldMidPt.y, w, h);

  // }
  // console.log(rec.getInstructions())
  // oldPt.x = stage.mouseX;
  // oldPt.y = stage.mouseY;
  // rec.x =
  // oldMidPt.x = midPt.x;
  // oldMidPt.y = midPt.y;
  // stage.addChild(rec)
  prevx = w;
  prevy = h;
  stage.update();
}

function colorPicker_Click(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.layerX - rect.left;
  const y = event.layerY - rect.top;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;

  // console.log(x,y)

  const pickedColor = rgb2hex(
    `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
  );
  // console.log(pickedColor)
  setSelectedColor(pickedColor, null);
}
function rect_handleMouseUp(event) {
  if (!event.primary) {
    return;
  }
  prevx = 0;
  prevy = 0;
  stage.removeEventListener("stagemousemove", rect_handleMouseMove);
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
  colorPicker: {
    click: colorPicker_Click,
  },
};

window.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("keydown", (e) => {
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
});
