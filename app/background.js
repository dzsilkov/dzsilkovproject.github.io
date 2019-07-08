(function (window) {
  class Background {
    constructor(options) {
      this.name = options.name;
      this.sprite = options.sprite;
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
    }
    update(dt) {
      this.sprite.update(dt);
    }
    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  window.gameJS = window.gameJS || {};
  window.gameJS.Background = Background;
})(window);