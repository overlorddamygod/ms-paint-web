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
    a: 255
  }
}

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

function getOpenFileName() {
    return window.document.title.replace("- Paint","").trim()
}

function setFileName(filename) {
    window.document.title = `${filename} - Paint`
}

function openFile(file) {
    setFileName(file.name)
    const img = new Image();

    var reader = new FileReader();
    reader.onloadend = function() {
        img.src = reader.result;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);  
        }
    }
    reader.readAsDataURL(file);
}

function saveFile(type = "image/png") {
    var link = document.createElement("a")
    link.setAttribute('download', getOpenFileName());
    link.setAttribute('href', canvas.toDataURL(type).replace(type, "image/octet-stream"));
    link.click();
}



// Flood Fill 
// Reference - https://codepen.io/Geeyoam/pen/vLGZzG
function getColorAtPixel(imageData, x, y) {
  const {width, data} = imageData

  return {
    r: data[4 * (width * y + x) + 0],
    g: data[4 * (width * y + x) + 1],
    b: data[4 * (width * y + x) + 2],
    a: data[4 * (width * y + x) + 3]
  }
}

function setColorAtPixel(imageData, color, x, y) {
  const {width, data} = imageData

  data[4 * (width * y + x) + 0] = color.r & 0xff
  data[4 * (width * y + x) + 1] = color.g & 0xff
  data[4 * (width * y + x) + 2] = color.b & 0xff
  data[4 * (width * y + x) + 3] = color.a & 0xff
}

function colorMatch(a, b) {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a
}

function floodFill(imageData, newColor, x, y) {
  const {width, height, data} = imageData
  const stack = []
  const baseColor = getColorAtPixel(imageData, x, y)
  let operator = {x, y}

  console.log(baseColor,newColor)
  // Check if base color and new color are the same
  if (colorMatch(baseColor, newColor)) {
    return
  }

  // Add the clicked location to stack
  stack.push({x: operator.x, y: operator.y})

  while (stack.length) {
    operator = stack.pop()
    let contiguousDown = true // Vertical is assumed to be true
    let contiguousUp = true // Vertical is assumed to be true
    let contiguousLeft = false
    let contiguousRight = false

    // Move to top most contiguousDown pixel
    while (contiguousUp && operator.y >= 0) {
      operator.y--
      contiguousUp = colorMatch(getColorAtPixel(imageData, operator.x, operator.y), baseColor)
    }

    // Move downward
    while (contiguousDown && operator.y < height) {
      setColorAtPixel(imageData, newColor, operator.x, operator.y)

      // Check left
      if (operator.x - 1 >= 0 && colorMatch(getColorAtPixel(imageData, operator.x - 1, operator.y), baseColor)) {
        if (!contiguousLeft) {
          contiguousLeft = true
          stack.push({x: operator.x - 1, y: operator.y})
        }
      } else {
        contiguousLeft = false
      }

      // Check right
      if (operator.x + 1 < width && colorMatch(getColorAtPixel(imageData, operator.x + 1, operator.y), baseColor)) {
        if (!contiguousRight) {
          stack.push({x: operator.x + 1, y: operator.y})
          contiguousRight = true
        }
      } else {
        contiguousRight = false
      }

      operator.y++
      contiguousDown = colorMatch(getColorAtPixel(imageData, operator.x, operator.y), baseColor)
    }
  }
}