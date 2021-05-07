function shapeMouseDown(shape, mouseMoveFunc) {
  return function (event) {
    if (!event.primary) {
      return;
    }
    setColorByMouseButton(event.nativeEvent);

    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    // oldMidPt = oldPt.clone()

    state.saveState(canvas);
    state.setState69(canvas);
    // drawingCanvas.cache(0,0, canvas.width, canvas.height);
    stage.addEventListener("stagemousemove", mouseMoveFunc);
  };
}

function shapeMouseMove(shapeType) {
  return function (event) {
    if (!event.primary) {
      return;
    }
    function isBetween(point1, point2, val = 0) {
      return point1.mouseX >= point2.x - val && point1.mouseX <= point2.x + val && point1.mouseY >= point2.y - val && point1.mouseY <= point2.y + val
    }
    w = stage.mouseX - oldPt.x;
    h = stage.mouseY - oldPt.y;
    if ( !oldMidPt ) {
      oldMidPt = new createjs.Point(stage.mouseX, stage.mouseY);
    } 
    if ( !isBetween(stage, oldMidPt, 2) ) {
      renderCanvas(state.getState69(), canvas);
      drawShape(shapeType, oldPt.x, oldPt.y, w, h);
    }
    
    oldMidPt = new createjs.Point(stage.mouseX, stage.mouseY);
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
    oldMidPt = null
    // drawShape(shapeType, oldPt.x, oldPt.y, w, h);

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
    // Red rectangle
    // ctx.beginPath();
    // ctx.lineWidth = `${stroke}`;
    // ctx.strokeStyle = color;
    // ctx.rect(x,y,w,h)
    // ctx.stroke();
  } else if (shape == "ellipse") {
    drawingCanvas.graphics
      .clear()
      .setStrokeStyle(stroke)
      .beginStroke(color)
      .drawEllipse(x, y, w, h);
  }
}
