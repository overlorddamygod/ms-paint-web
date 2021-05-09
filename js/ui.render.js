const selectColorsArea = document.querySelector(".select-colors");
const colors = [
  "#010006",
  "#828085",
  "#8A0000",
  "#7C8600",
  "#008703",
  "#00817D",
  "#1C007B",
  "#88007E",
  "#7D833B",
  "#003E46",
  "#0571FF",
  "#003C83",
  "#9800FF",
  "#873800",
  "#FEFEFE",
  "#BFBEC1",
  "#FF0000",
  "#FAFF00",
  "#00FF08",
  "#00FFFB",
  "#4000FB",
  "#FF00FF",
  "#FAFF7C",
  "#00FF80",
  "#44FFFF",
  "#8F68FF",
  "#FF0078",
  "#FF732C",
];

colors.forEach((_color) => {
  const colorBoxEl = document.createElement("div");
  colorBoxEl.classList = "border-box";
  colorBoxEl.id = "color-box";
  colorBoxEl.style.backgroundColor = _color;
  colorBoxEl.addEventListener("mousedown", (e) => {
    if (e.button == 0) {
      setSelectedColor(_color, null);
    } else if (e.button == 2) {
      setSelectedColor(null, _color);
    }
  });
  selectColorsArea.appendChild(colorBoxEl);
});

document.querySelector(".selected-color").addEventListener("click", () => {
  let tempColor = primaryColor;
  setSelectedColor(secondaryColor, tempColor);
});
// const colorBoxes = document.querySelectorAll("#color-box")
// colorBoxes.forEach((colorBox)=> {

// })
const tools = document.querySelectorAll("#tool");

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    // stage.removeAllEventListeners();
    _canvas.removeEventListener("click", mouseHandlers.colorPicker.click);
    _canvas.removeEventListener("mousedown", mouseHandlers.fill.click);
    _canvas.removeEventListener("mousedown", mouseHandlers.rect.mouseDown);
    _canvas.removeEventListener("mouseup", mouseHandlers.rect.mouseUp);
    _canvas.removeEventListener("mousedown", mouseHandlers.ellipse.mouseDown);
    _canvas.removeEventListener("mouseup", mouseHandlers.ellipse.mouseUp);
    _canvas.removeEventListener("mousedown", mouseHandlers.pencil.mouseDown);
    _canvas.removeEventListener("mouseup", mouseHandlers.pencil.mouseUp);
    _canvas.removeEventListener("mousedown", mouseHandlers.eraser.mouseDown);
    _canvas.removeEventListener("mouseup", mouseHandlers.eraser.mouseUp);
    _canvas.removeEventListener("mousedown", mouseHandlers.line.mouseDown);
    _canvas.removeEventListener("mouseup", mouseHandlers.line.mouseUp);

    const toolName = tool.dataset.toolName;

    console.log("Clicked", toolName);
    if (toolName != "color-picker") {
      state.recentTool = toolName;
    }

    switch (toolName) {
      case "pencil":
        _canvas.addEventListener("mousedown", mouseHandlers.pencil.mouseDown);
        _canvas.addEventListener("mouseup", mouseHandlers.pencil.mouseUp);
        break;
      case "eraser":
        _canvas.addEventListener("mousedown", mouseHandlers.eraser.mouseDown);
        _canvas.addEventListener("mouseup", mouseHandlers.eraser.mouseUp);
        break;
      case "color-picker":
        _canvas.addEventListener("click", mouseHandlers.colorPicker.click);
        break;
      case "fill":
        _canvas.addEventListener("mousedown", mouseHandlers.fill.click);
        break;
      case "rect":
        _canvas.addEventListener("mousedown", mouseHandlers.rect.mouseDown);
        _canvas.addEventListener("mouseup", mouseHandlers.rect.mouseUp);
        break;
      case "ellipse":
        _canvas.addEventListener("mousedown", mouseHandlers.ellipse.mouseDown);
        _canvas.addEventListener("mouseup", mouseHandlers.ellipse.mouseUp);
        break;
      case "line":
        _canvas.addEventListener("mousedown", mouseHandlers.line.mouseDown);
        _canvas.addEventListener("mouseup", mouseHandlers.line.mouseUp);
        break;
      case "brush":
        break;
      default:
        console.log("UNEMPLEMENTED");
        break;
    }
    tools.forEach((_tool) => {
      if (toolName == _tool.dataset.toolName) {
        tool.classList.remove("selected");
        tool.classList.add("selected");
      } else {
        _tool.classList.remove("selected");
      }
    });
  });
});

// Reference - https://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename
document.querySelectorAll("#menu-item")[1].addEventListener("click", (e) => {
  // Create an input element
  var inputElement = document.createElement("input");

  // Set its type to file
  inputElement.type = "file";

  // set onchange event to call callback when user has selected file
  inputElement.addEventListener("change", (e) => {
    if (confirm(`Are you sure you want to exit ${getOpenFileName()}`)) {
      const file = e.originalTarget.files[0];

      openFile(file);
    }
  });

  // dispatch a click event to open the file dialog
  inputElement.dispatchEvent(new MouseEvent("click"));
});

document.querySelectorAll("#menu-item")[2].addEventListener("click", (e) => {
  saveFile("image/jpeg");
});

const strokeWeights = Array.from({ length: 6 }).map((a, i) => i + 1);
strokeWeights.forEach((strokeWeight) => {
  const div = document.createElement("div");
  div.id = "choice";
  // document.querySelector(".choice-area").forEach((strokeChoice,index) => {
  div.addEventListener("click", (e) => {
    stroke = strokeWeight;
  });
  div.innerHTML = `
    <svg width="100" height="20" >
      <line x1="0" y1="10" x2="100" y2="10" style="stroke:rgb(0, 0, 0);stroke-width:${+strokeWeight}" />
    </svg> 
  `;
  document.querySelector(".choice-area").append(div);
});
