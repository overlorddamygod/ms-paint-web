function createPoint(x, y) {
  return { x, y };
}

// Reference - https://jsfiddle.net/Mottie/xcqpF/1/light/
function rgb2hex(rgb) {
  rgb = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgb && rgb.length === 4
    ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : "";
}

function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return {
    r,
    g,
    b,
    a: 255,
  };
}

Math.clamp = (a,b,c) => Math.max(b,Math.min(c,a))

function setSelectedColor(primaryCol, secondaryCol) {
  if (primaryCol) {
    primaryColor = primaryCol;
    document.querySelector(
      ".select-color-1"
    ).style.backgroundColor = primaryColor;
  }
  if (secondaryCol) {
    secondaryColor = secondaryCol;
    document.querySelector(
      ".select-color-2"
    ).style.backgroundColor = secondaryColor;
  }
}

function setColorByMouseButton(event) {
  // console.log(event)
  // const _button = event.nativeEvent ? || event.button
  switch (event.button) {
    case 0:
      color = primaryColor;
      break;
    case 2:
      color = secondaryColor;
      break;
  }
}

function renderCanvas(_state, _canvas) {
  // if ( _state ) {
  const img = new Image();
  img.src = _state;
  img.onload = function () {
    ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      _canvas.width,
      _canvas.height,
      0,
      0,
      _canvas.width,
      _canvas.height
    );
  };
  // }
}

function getOpenFileName() {
  return window.document.title.replace("- Paint", "").trim();
}

function setFileName(filename) {
  window.document.title = `${filename} - Paint`;
}

function openFile(file) {
  
  setFileName(file.name);
  const img = new Image();

  var reader = new FileReader();
  reader.onloadend = function () {
    resetState();
    img.src = reader.result;
    console.log(img.src);
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      _canvas.width = canvas.width;
      _canvas.height = canvas.height;

      _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    };
  };
  reader.readAsDataURL(file);
}
function newFile() {
  if (confirm(`Are you sure you want to create a new document?`)) {
    setFileName("Untitled.png");

    resetState();

    canvas.width = 960;
    canvas.height = 500;
    _canvas.width = 960;
    _canvas.height = 500;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    _ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Reference - https://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename
function openFileWrapper() {
    // Create an input element
    var inputElement = document.createElement("input");

    // Set its type to file
    inputElement.type = "file";
  
    // set onchange event to call callback when user has selected file
    inputElement.addEventListener("change", (e) => {
      if (confirm(`Are you sure you want to exit ${getOpenFileName()}`)) {
        const file = e.target.files[0];
  
        openFile(file);
      }
    });
  
    // dispatch a click event to open the file dialog
    inputElement.dispatchEvent(new MouseEvent("click"));
}

function saveFile(filename,type = "image/png") {
  var link = document.createElement("a");
  link.setAttribute("download", filename);
  link.setAttribute(
    "href",
    canvas.toDataURL(type)
  );
  link.click();
}

// Flood Fill
// Reference - https://codepen.io/Geeyoam/pen/vLGZzG
function getColorAtPixel(imageData, x, y) {
  const { width, data } = imageData;

  return {
    r: data[4 * (width * y + x) + 0],
    g: data[4 * (width * y + x) + 1],
    b: data[4 * (width * y + x) + 2],
    a: data[4 * (width * y + x) + 3],
  };
}

function setColorAtPixel(imageData, color, x, y) {
  const { width, data } = imageData;

  data[4 * (width * y + x) + 0] = color.r & 0xff;
  data[4 * (width * y + x) + 1] = color.g & 0xff;
  data[4 * (width * y + x) + 2] = color.b & 0xff;
  data[4 * (width * y + x) + 3] = color.a & 0xff;
}

function colorMatch(a, b) {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}

function floodFill(imageData, newColor, x, y) {
  const { width, height, data } = imageData;
  const stack = [];
  const baseColor = getColorAtPixel(imageData, x, y);
  let operator = { x, y };

  console.log(baseColor, newColor);
  // Check if base color and new color are the same
  if (colorMatch(baseColor, newColor)) {
    return;
  }

  // Add the clicked location to stack
  stack.push({ x: operator.x, y: operator.y });

  while (stack.length) {
    operator = stack.pop();
    let contiguousDown = true; // Vertical is assumed to be true
    let contiguousUp = true; // Vertical is assumed to be true
    let contiguousLeft = false;
    let contiguousRight = false;

    // Move to top most contiguousDown pixel
    while (contiguousUp && operator.y >= 0) {
      operator.y--;
      contiguousUp = colorMatch(
        getColorAtPixel(imageData, operator.x, operator.y),
        baseColor
      );
    }

    // Move downward
    while (contiguousDown && operator.y < height) {
      setColorAtPixel(imageData, newColor, operator.x, operator.y);

      // Check left
      if (
        operator.x - 1 >= 0 &&
        colorMatch(
          getColorAtPixel(imageData, operator.x - 1, operator.y),
          baseColor
        )
      ) {
        if (!contiguousLeft) {
          contiguousLeft = true;
          stack.push({ x: operator.x - 1, y: operator.y });
        }
      } else {
        contiguousLeft = false;
      }

      // Check right
      if (
        operator.x + 1 < width &&
        colorMatch(
          getColorAtPixel(imageData, operator.x + 1, operator.y),
          baseColor
        )
      ) {
        if (!contiguousRight) {
          stack.push({ x: operator.x + 1, y: operator.y });
          contiguousRight = true;
        }
      } else {
        contiguousRight = false;
      }

      operator.y++;
      contiguousDown = colorMatch(
        getColorAtPixel(imageData, operator.x, operator.y),
        baseColor
      );
    }
  }
}


// MENU ITEMS

function toggleArea(selector) {
  selector = document.querySelector(selector)
  selector.style.display = selector.style.display == "none" ? "flex" : "none";
}

function openSaveDialogue() {
  const saveDialog = document.querySelector("save-dialog")
  saveDialog.children[0].style.display = "block"
  saveDialog.children[0].shadowRoot.querySelector(".window").style.top = "40%"
  saveDialog.children[0].shadowRoot.querySelector(".window").style.left = "30%"

  let filename = getOpenFileName().split(".")
  filename = filename.slice(0, filename.length - 1).join(".")
  saveDialog.querySelector("input").value = filename
  saveDialog.querySelector("input").focus()
}