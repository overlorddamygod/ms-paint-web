let selectedTool = "pencil";

const tools = [
  "fill",
  "word",
  "eraser",
  "fill",
  "color_picker",
  "magnify",
  "pencil",
  "brush",
  "polygon",
  "word",
  "line",
  "curve",
  "rect",
  "polygon",
  "ellipse",
  "rounded_rect",
];

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

    // Setup a click listener on <app-drawer> itself.
    this.addEventListener("click", (e) => {
      selectedTool = this.name;
      console.log(`Selected Tool :${selectedTool}`);
    });
  }

  connectedCallback() {
    this.innerHTML = `
            <div id="tool" ${this.selected ? "class='selected'" : ""}>
                <abbr title="${this.name}">
                <img src="./icons/tools/${this.name}.${
      this.png ? "png" : "svg"
    }" alt="${this.name}" />
                </abbr>
            </div>
        `;
  }
}

customElements.define("draw-tools", DrawTools);

class ToolsArea extends HTMLElement {
  get selected() {
    return this.hasAttribute("selected");
  }

  // static get observedAttributes() {
  //     return ['selected'];
  // }

  constructor() {
    super();

    // Setup a click listener on <app-drawer> itself.
    this.addEventListener("click", (e) => {
      this.connectedCallback();
    });
  }

  connectedCallback() {
    this.id = "tools";
    this.innerHTML = `
            ${tools
              .map(
                (tool) => `
                <draw-tools name=${tool} ${
                  selectedTool == tool ? "selected" : ""
                } ${tool == "magnify" ? "png" : ""}></draw-tools>
            `
              )
              .join("")}
        `;
  }
}
customElements.define("tools-area", ToolsArea);
