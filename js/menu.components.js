class Menu extends HTMLElement {
  get name() {
    return this.getAttribute("name");
  }
  get active() {
    return this.hasAttribute("active");
  }

  static get observedAttributes() {
    return ["active"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "active") {
      this.toggleSelect()
    }
  }

  toggleSelect() {
    const selector = this.shadowRoot.querySelector("div.dropdown-content")
    if ( this.active ) {
      selector?.classList.add("show")
    } else {
      selector?.classList.remove("show")
    }
  }

  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
            .dropdown {
                position: relative;
                user-select: none;
            }
            .menu-item {
                margin: 0 0.5rem;
                cursor: pointer;
                z-index: 99;
                cursor: pointer;
            }
            
            .dropdown-content {
                display: none;
                position: absolute;
                background-color: var(--creme);
                min-width: 200px;
                overflow: auto;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1;
                margin-top: 0.5rem;
                padding: 0 0.3rem;
                border: 1px solid #fefff5;
                outline: 1px solid #b1b1a9;
            }
            
            .show {display: block;}
        </style>  
        <div class="dropdown">
            <div class="menu-item">${this.name}</div>
            <div id="myDropdown" class="dropdown-content">
                <slot name="menu-item-group"></slot>
            </div>
        </div>
          
      `;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot
      .querySelector(".menu-item")
      .addEventListener("click", (e) => {
            this.toggleHelper();
      });
    this.shadowRoot
      .querySelector(".menu-item")
      .addEventListener("mouseover", (e) => {
          if ( state.openMenu && state.openMenu != this.name) this.toggleHelper();
      });
  }

  toggleHelper() {
    if( state.openMenu ) {
        document.querySelector(`main-menu[name=${state.openMenu}`).removeAttribute("active")
    }

    if ( state.openMenu == this.name ) {
        this.removeAttribute("active")
        state.setMenu(null);
    } else {
        state.setMenu(this.name);
        if ( this.active ) {
            this.removeAttribute("active")
        } else {
            this.setAttribute("active","lol")
        }
    }
  }
}

customElements.define("main-menu", Menu);

class MenuGroup extends HTMLElement {
  get sep() {
    return this.hasAttribute("sep");
  }

  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
            .group {
                ${
                  this.sep
                    ? "border-bottom: 1px solid #fefff5;outline-bottom: 1px solid #b1b1a9;"
                    : ""
                }
                padding: 0.2rem 0 ;
            }
        </style>  
        <div class="group">
            <slot name="menu-item"></slot>
        </div>   
      `;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.setAttribute("slot","menu-item-group")
  }
}

customElements.define("menu-group", MenuGroup);
class MenuItem extends HTMLElement {
  get name() {
    return this.getAttribute("name");
  }
  get href() {
    return this.getAttribute("href");
  }
  get hotkey() {
    return this.getAttribute("hotkey");
  }
  get active() {
    return this.hasAttribute("active");
  }
  get toggle() {
    return this.hasAttribute("toggle");
  }
  get helpText() {
    return this.getAttribute("helpText");
  }
  static get observedAttributes() {
    return ["active"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "active" && this.toggle) {
      if ( this.active ) {
        this.shadowRoot.querySelector("span").innerHTML = "✓"
      } else {
        this.shadowRoot.querySelector("span").innerHTML = ""
      }
    }
  }
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
            .item-menu {
                display: flex;
                justify-content: space-between;
                padding-right: 0.2rem;
            }
            .item-menu:hover {
                background-color: #ddd;
            }
            .hotkey {
                color: grey;
                font-size: smaller;
            }

            .name {
                flex: 1;
            }

            .tick {
                min-width: 1rem;
            }

            a {
                color: black;
                text-decoration:none;
            }
        </style>  
        <a class="item-menu" ${this.href ? 'href="' + this.href + '"target=`_blank`' : ""}>
            <div class="tick">${this.toggle ? `<span>${this.active ? "✓" : ""}</span>` : ""}</div>
            <div class="name">${this.name}</div>
            <div class="hotkey">${this.hotkey || ""}</div>
        </a>
      `;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.setAttribute("slot","menu-item")

    if ( this.toggle ) {
        // this.onclick()
        this.addEventListener("click", (e) => {
            if ( this.active ) {
                this.removeAttribute("active")
            } else {
                this.setAttribute("active","lol")
            }
        })
    }
    this.addEventListener("mouseover", e => {
      infoArea.textContent = this.helpText
    })
    this.addEventListener("mouseout", e => {
      infoArea.textContent = defaultInfo
    })
  }
}

customElements.define("menu-item", MenuItem);
