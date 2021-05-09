function createMouseDownEvent(toolName, mouseDownEvent, mouseMove) {
  // console.log(toolName)
  return async function (e) {
    drawing = true;
    state.saveState(canvas);
    setColorByMouseButton(e);

    if (toolName == "eraser") {
      _ctx.strokeStyle = "#ffffff";
      _ctx.lineWidth = `${stroke * 4}`;
    } else {
      _ctx.strokeStyle = color;
      _ctx.lineWidth = `${stroke}`;
    }
    mouseDownEvent(e);

    _canvas.addEventListener("mousemove", mouseMove);
  };
}

function createMouseUpEvent(toolName, mouseMove) {
  return function (e) {
    if (!drawing) return;

    mouseMove(e);
    _ctx.closePath();

    updateOriginalCanvas();
    drawing = false;
    _canvas.removeEventListener("mousemove", mouseMove);
  };
}

function updateOriginalCanvas() {
  ctx.drawImage(_canvas, 0, 0);
  _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
}
