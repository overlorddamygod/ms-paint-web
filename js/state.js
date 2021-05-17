const isMac = window.navigator.userAgent.toLowerCase().indexOf("mac") != -1;
const infoArea = document.querySelector("#help-text")
const coordsArea = document.querySelector("#coords")
const defaultInfo = infoArea.textContent

const state = {
  zoomed: false,
  shift: false,
  redo_list: [],
  undo_list: [],
  state69: null,
  recentTool: "pencil",
  openMenu: null,
  saveState: function (_canvas, list, keep_redo) {
    keep_redo = keep_redo || false;
    if (!keep_redo) {
      this.redo_list = [];
    }

    const l = list || this.undo_list;
    if (l.length > 20) {
      console.log("Cleaning garbagessss");
      for (let i = 0; i < 6; i++) l.shift();
    }
    l.push(_canvas.toDataURL());
  },
  undo: function (_canvas, ctx) {
    this.restoreState(_canvas, ctx, this.undo_list, this.redo_list);
  },
  redo: function (_canvas, ctx) {
    this.restoreState(_canvas, ctx, this.redo_list, this.undo_list);
  },
  restoreState: function (_canvas, ctx, pop, push) {
    if (pop.length) {
      this.saveState(_canvas, push, true);
      const restore_state = pop.pop();
      const img = new Image();
      img.src = restore_state;
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
    }
  },
  getRecentState() {
    return this.undo_list[this.undo_list.length - 1];
  },
  getState69() {
    return this.state69;
  },
  setState69(canvas) {
    this.state69 = canvas ? canvas.toDataURL() : null;
  },
  setMenu(menuName){
    this.openMenu = menuName
  },
  getMenu(menuName){
    return this.openMenu
  },
 };


//  [
//   {
//     "name": "Free-Form Select",
//     "description": "Selects a free-form part of the picture to move, copy, or edit."
//   },
//   {
//     "name": "Select",
//     "description": "Selects a rectangular part of the picture to move, copy, or edit."
//   },
//   {
//     "name": "Eraser/Color Eraser",
//     "description": "Erases a portion of the picture, using the selected eraser shape."
//   },
//   {
//     "name": "Fill With Color",
//     "description": "Fills an area with the selected drawing color."
//   },
//   {
//     "name": "Pick Color",
//     "description": "Picks up a color from the picture for drawing."
//   },
//   {
//     "name": "Magnifier",
//     "description": "Changes the magnification."
//   },
//   {
//     "name": "Pencil",
//     "description": "Draws a free-form line one pixel wide."
//   },
//   {
//     "name": "Brush",
//     "description": "Draws using a brush with the selected shape and size."
//   },
//   {
//     "name": "Airbrush",
//     "description": "Draws using an airbrush of the selected size."
//   },
//   {
//     "name": "Text",
//     "description": "Inserts text into the picture."
//   },
//   {
//     "name": "Line",
//     "description": "Draws a straight line with the selected line width."
//   },
//   {
//     "name": "Curve",
//     "description": "Draws a curved line with the selected line width."
//   },
//   {
//     "name": "Rectangle",
//     "description": "Draws a rectangle with the selected fill style."
//   },
//   {
//     "name": "Polygon",
//     "description": "Draws a polygon with the selected fill style."
//   },
//   {
//     "name": "Ellipse",
//     "description": "Draws an ellipse with the selected fill style."
//   },
//   {
//     "name": "Rounded Rectangle",
//     "description": "Draws a rounded rectangle with the selected fill style."
//   }
// ]