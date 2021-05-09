function shapeMouseDown(shape, mouseMoveFunc) {
  return function (event) {
    setColorByMouseButton(event);
    oldPt = createPoint(event.layerX, event.layerY);

    state.saveState(canvas);
    drawing = true;
    _ctx.lineWidth = `${stroke}`;
    _ctx.strokeStyle = color;
    _canvas.addEventListener("mousemove", mouseMoveFunc);
  };
}

function shapeMouseMove(shapeType) {
  return function (event) {
    if ( !drawing ) return

    const x = Math.min(event.layerX,  oldPt.x)
    const y = Math.min(event.layerY,  oldPt.y)
    const w = Math.abs(event.layerX - oldPt.x)
    const h = Math.abs(event.layerY - oldPt.y)

    if (!w || !h) {
      return;
    } 

    drawShape(shapeType,x,y,w,h)
  };
}
function shapeMouseUp(shapeType, mouseMoveFunc) {
  return function (event) {
      if ( !drawing ) return
      mouseMoveFunc(event)
      updateOriginalCanvas()

      drawing = false;
      _canvas.removeEventListener("mousemove", mouseMoveFunc);
    // }
  };
}

function drawShape(shape, x, y, w, h) {
  _ctx.clearRect(0, 0, _canvas.width, _canvas.height);

  if (shape == "rect") {
    _ctx.strokeRect(x, y, w, h);
  } else if (shape == "ellipse") {
    _ctx.ellipse(x, y, w, h,0,0,360);
    _ctx.stroke()
  }
}
