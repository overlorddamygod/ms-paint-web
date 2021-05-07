function shapeMouseDown(shape, mouseMoveFunc) {
  return function (event) {
    if (!event.primary) {
      return;
    }
    setColorByMouseButton(event.nativeEvent);

    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);

    state.saveState(canvas);
    state.setState69(canvas);

    stage.addEventListener("stagemousemove", mouseMoveFunc);
  };
}

function shapeMouseMove(shapeType) {
  return function (event) {
    if (!event.primary) {
      return;
    }
    w = stage.mouseX - oldPt.x;
    h = stage.mouseY - oldPt.y;

    drawShape(shapeType, oldPt.x, oldPt.y, w, h);

    renderCanvas(state.getState69(), canvas);
    stage.update();
  };
}
function shapeMouseUp(shapeType, mouseMoveFunc) {
  return function (event) {
    if (!event.primary) {
      return;
    }
    w = stage.mouseX - oldPt.x;
    h = stage.mouseY - oldPt.y;

    state.setState69(null);

    drawShape(shapeType, oldPt.x, oldPt.y, w, h);

    stage.update();
    stage.removeEventListener("stagemousemove", mouseMoveFunc);
  };
}

function drawShape(shape, x, y, w, h) {
  if (shape == "rect") {
    drawingCanvas.graphics
      .clear()
      .setStrokeStyle(stroke)
      .beginStroke(color)
      .drawRect(x, y, w, h);
  } else if (shape == "ellipse") {
    drawingCanvas.graphics
      .clear()
      .setStrokeStyle(stroke)
      .beginStroke(color)
      .drawEllipse(x, y, w, h);
  }
}
