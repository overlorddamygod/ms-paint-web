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
  const colorBoxEl = document.createElement("color-box");
  colorBoxEl.setAttribute("color", _color)
  selectColorsArea.appendChild(colorBoxEl);
});

document.querySelector(".selected-color").addEventListener("click", () => {
  let tempColor = primaryColor;
  setSelectedColor(secondaryColor, tempColor);
});

const strokeWeights = Array.from({ length: maxStroke }).map((a, i) => i + 1);
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
