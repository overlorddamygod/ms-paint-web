let typing = true;

const area = document.querySelector(".draw-area").querySelector(".text")

function text_handleMouseDown(event) {
    setColorByMouseButton(event);
    oldPt = createPoint(event.layerX, event.layerY);
  
    state.saveState(canvas);
    drawing = true;

    area.style.display = "block";
    area.style.left = `${event.layerX}px`
    area.style.top = `${event.layerY}px`

    area.value = ""
    area.focus();

    _ctx.fillStyle = color;
    _ctx.strokeStyle = color;
    _ctx.textBaseline = "top"
    _ctx.font = `${stroke * 10}px Arial`;

    area.style.color = color;
    area.style.fontSize = `${stroke * 10}px`
    _canvas.removeEventListener("mousedown", text_handleMouseDown);
};
  
function text_handleMouseMove(event) {
    if (!drawing) return;

    // const x = Math.min(event.layerX, oldPt.x);
    // const y = Math.min(event.layerY, oldPt.y);
    // const w = Math.abs(event.layerX - oldPt.x);
    // const h = Math.abs(event.layerY - oldPt.y);

    // if (!w || !h) {
    //     return;
    // }

    // const area = document.querySelector(".draw-area").querySelector(".text")

    // area.style.left = `${x}px`
    // area.style.top = `${y}px`
    // area.style.width = `${w}px`;
    // area.style.height = `${h}px`;
};

function text_handleMouseUp(event) {
    if (!drawing) return;
    area.focus();
    typing = true;
    drawing = false;
    // _canvas.removeEventListener("mousemove", text_handleMouseMove);
    // _canvas.removeEventListener("mousedown", text_handleMouseDown);
    area.addEventListener("focusout", handleText)
}

function handleText(e) {
    if ( typing && area.style.display != "none") {
        console.log("HEHHEHE")
        console.log(this)
        const texts = area.value.split("\n")
        texts.forEach((t, i)=> {
            _ctx.fillText(t, this.offsetLeft + 1, this.offsetTop + (i) * (stroke*10) +  (stroke-i-3 ) ); 
        })
        updateOriginalCanvas();
        
        typing = false
        area.removeEventListener("focusout", handleText)
        area.style.display = "none";
        _canvas.addEventListener("mousedown", text_handleMouseDown);
    }
}

// 7 : 8
// 6 : 8
// 5 : 7
// 4 : 5
// 3 : 4
// 2 : 3
// 1 : 3