let selectedTool = "pencil";

class DrawTools extends HTMLElement {
  get name() {
    return this.getAttribute("name");
  }

  get png() {
    return this.hasAttribute("png");
  }
  get selected() {
    return this.hasAttribute("selected");
  }
  static get observedAttributes() {
    return ["selected"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "selected") {
      this.toggleSelect()
      const handlers = mouseHandlers[selectedTool];

      this.removeAllEventListeners();
      if (handlers) {
        Object.keys(handlers).forEach((handlerName) => {
          _canvas.addEventListener(
            handlerName.toLowerCase(),
            handlers[handlerName]
          );
        });
      }
    }
  }

  toggleSelect() {
    const selector = this.querySelector("div#tool")
    if ( this.selected ) {
      selector?.classList.add("selected")
    } else {
      selector?.classList.remove("selected")
    }
  }

  removeAllEventListeners() {
    Object.keys(mouseHandlers).forEach((tools) => {
      const handlers = mouseHandlers[tools];

      Object.keys(handlers).forEach((handlerName) => {
        _canvas.removeEventListener(
          handlerName.toLowerCase(),
          handlers[handlerName]
        );
      });
    });
  }

  constructor() {
    super();

    this.addEventListener("click", (e) => {
      document.querySelector(`draw-tools[name=${selectedTool}`).removeAttribute("selected")

      selectedTool = this.name;
      console.log(`Selected Tool :${selectedTool}`);

      if ( this.selected ) {
        this.removeAttribute("selected")
      } else {
        this.setAttribute("selected","lol")
      }
    });
  }

  connectedCallback() {
    const name = this.name;
    const imageExt = this.png ? "png" : "svg";
    const selected = this.selected ? "class='selected'" : ""
    
    this.innerHTML = `
      <div id="tool" ${selected}>
          <abbr title="${name.replace("_"," ")}">
            <img src="./icons/tools/${name}.${imageExt}" alt="${name}" />
          </abbr>
      </div>
    `;
  }
}

customElements.define("draw-tools", DrawTools);

class ColorBox extends HTMLElement {
  get color() {
    return this.getAttribute("color");
  }

  constructor() {
    super();

    this.addEventListener("mousedown", (e) => {
      console.log(e.button)
      if (e.button == 0) {
        setSelectedColor(this.color, null);
      } else if (e.button == 2) {
        setSelectedColor(null, this.color);
      }
    });
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="border-box" id="color-box" style="background-color:${this.color};"></div>
    `;
  }
}

customElements.define("color-box", ColorBox);