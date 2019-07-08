(function (window) {
  class Bullet {
    constructor(options) {
      this.sprite = options.sprite;
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.speed = 200;
    }
    move(dt) {
      this.posX += this.speed * dt;
      this.posY -= this.speed * dt;
    }
    update(dt) {
      this.move(dt);
      this.sprite.update(dt);
    }
    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  window.gameJS = window.gameJS || {};
  window.gameJS.Bullet = Bullet;
})(window);