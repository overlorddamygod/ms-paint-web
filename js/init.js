let primaryColor = "#000000";
let secondaryColor = "#ffffff";
let color = primaryColor;

let stroke = 1;
const maxStroke = 7;
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

_canvas.addEventListener("mousemove", e => {
    const { layerX : x, layerY : y } = e
    coordsArea.textContent = `${x},${y}`
})
_canvas.addEventListener("mouseout", e => {
    coordsArea.textContent = ``
})

let active = false;
let ax,ay;
windowSelector = document.querySelector(".window")
document.querySelector(".title-area").addEventListener("mousedown",e=>{
    active = true
    ax = e.layerX
    ay = e.layerY
})

document.addEventListener("mousemove",e=>{
    if ( active ) {
        let { clientX: mouseX, clientY: mouseY }  = e
        const { innerWidth: wWidth, innerHeight: wHeight } = window;

        const windowSelector = document.querySelector(".window")

        let x = Math.clamp(mouseX - ax, 0, wWidth - windowSelector.offsetWidth);
        let y = Math.clamp(mouseY - ay, 0, wHeight - windowSelector.offsetHeight)

        windowSelector.style.top = `${y}px`
        windowSelector.style.left = `${x}px`
    }
})

document.querySelector(".title-area").addEventListener("mouseup",e=>{
    active = false
    ax = 0;
    ay = 0;
})
// document.addEventListener("mouseout",e=>{
//     active = false
//     ax = 0;
//     ay = 0;
// })

windowSelector.querySelector("#close-button").addEventListener("click",e=> {
    windowSelector.style.display = "none"
})
windowSelector.querySelector("#save").addEventListener("click", e=> {
    const filename = windowSelector.querySelector("input").value
    const filetype = windowSelector.querySelector("select").value

    saveFile(filename, filetype)
    windowSelector.querySelector("#close-button").click()
})
windowSelector.querySelector("#cancel").addEventListener("click", e=> {
    windowSelector.querySelector("#close-button").click()
})