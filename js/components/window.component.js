class DialogWindow extends HTMLElement {
  get title() {
    return this.getAttribute("title");
  }

  constructor() {
    super();

    this.active = false;
    this.offset = {
      x: 0,
      y: 0,
    };

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
            .window {
                position: absolute;
                top: 40%;
                left: 30%;
                background-color: var(--creme);
                /* padding: 2px; */
                min-width: 30rem;
                border-radius: 2px;
                border: 2px solid #2935EC;
                user-select: none;
                z-index: 100;
            }
            
            .title-area {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #2935EC;
                color: whitesmoke;
                padding: 0.2rem 0.2rem 0.2rem 0.5rem;
            }
            
            #close-button {
                width: 1.3rem;
                height: 1.3rem;
                border: 1px solid white;
                border-radius: 3px;
                background-color: #E43126;
                text-align: center;
                cursor: pointer;
                color: whitesmoke;
            }
            
            #close-button:hover {
                opacity: 0.8;
            }
            
            .window-main {
                padding: 0.5rem;
            }
        </style>
        <div class="window">
            <div class="title-area">
                <div id="title">${this.title}</div>
                <abbr title="Close"><button id="close-button">✕</button></abbr>
            </div>
            <div class="window-main">
                <slot name="main">
            </div>
        </div>
    `;
    this.style.display = "none"
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot
      .querySelector("#close-button")
      .addEventListener("click", (e) => {
        this.style.display = "none";
      });

    this.shadowRoot
      .querySelector(".title-area")
      .addEventListener("mousedown", (e) => {
        this.active = true;
        this.offset = {
          x: e.layerX,
          y: e.layerY,
        };
      });

    function move(e) {
      if (this.active) {
        let { clientX: mouseX, clientY: mouseY } = e;
        const { innerWidth: wWidth, innerHeight: wHeight } = window;

        const windowSelector = this.shadowRoot.querySelector(".window");

        let x = Math.clamp(
          mouseX - this.offset.x,
          0,
          wWidth - windowSelector.offsetWidth
        );
        let y = Math.clamp(
          mouseY - this.offset.y,
          0,
          wHeight - windowSelector.offsetHeight
        );

        windowSelector.style.top = `${y}px`;
        windowSelector.style.left = `${x}px`;
      }
    }
    document.addEventListener("mousemove", move.bind(this));

    this.shadowRoot
      .querySelector(".title-area")
      .addEventListener("mouseup", (e) => {
        this.active = false;
        this.offset = {
          x: 0,
          y: 0,
        };
      });
  }
}

customElements.define("dialog-window", DialogWindow);

class SaveDialog extends HTMLElement {
  get title() {
    return this.getAttribute("title");
  }

  constructor() {
    super();

    // const template = document.createElement("template");
    
    this.innerHTML = `
          <dialog-window title="Save As">
            <form onsubmit="return false;" slot="main">
                    <div class="row">
                        <div>Filename</div>
                        <input type="text" id="input"></input>
                        <button class="action-button" id="save" type="submit">Save</button>
                    </div>
                    <div class="row">
                        <div>Save type as</div>
                        <select name="image-type" id="input">
                            <option value="image/png">.png</option>
                            <option value="image/jpeg">.jpg</option>
                        </select>
                        <button class="action-button" id="cancel">Cancel</button>
                    </div>
                </form>
            </dialog-window>
      `;
    

    let filename = getOpenFileName().split(".")
    filename = filename.slice(0, filename.length - 1).join(".")
    this.querySelector("input").value = filename
    this.querySelector("input").focus()

    this.querySelector("#save").addEventListener("click", e=> {
        const filename = this.querySelector("input").value
        const filetype = this.querySelector("select").value
    
        saveFile(filename, filetype)
        this.querySelector("dialog-window").shadowRoot.querySelector("#close-button").click()
    })
    this.querySelector("#cancel").addEventListener("click", e=> {
        this.querySelector("dialog-window").shadowRoot.querySelector("#close-button").click()
    })
  }
}

customElements.define("save-dialog", SaveDialog);
