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
  switch (event.nativeEvent.button) {
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