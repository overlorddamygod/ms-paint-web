const isMac = window.navigator.userAgent.indexOf("Mac") != -1;

const state = {
  zoomed: false,
  shift: false,
  redo_list: [],
  undo_list: [],
  state69: null,
  recentTool: "pencil",
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
};
