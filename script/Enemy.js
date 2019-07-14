(function (window) {
  'use strict';

  class Alien {
    constructor(options) {
      this.name = options.name;
      this.sprite = options.sprite;
      this.icon = options.icon;
      this.status = options.status;
      this.name = options.name;
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.stand = false;
      this.run = false;
      this.left = false;
      this.right = false;
      this.dx = 0;
      this.speed = 4;
      this.health = 100;
    };

    move() {
      if (this.speed) {
        this.posX += this.dx;
      }
    };

    update() {
      if (this.health > 0) {
        if (this.run) {
          this.dx = this.speed;
        }
        if (this.run && this.left) {
          this.sprite.image = game.images.alienLeft;
          this.dx = -this.speed;
        }
        if (this.run && this.right) {
          this.sprite.image = game.images.alienRight;

          this.dx = this.speed;
        }

        this.move();
        this.sprite.update();
      }
    };

    render(context) {
      if (this.health > 0) {
        this.sprite.render(context, this.posX, this.posY, this.width, this.height);
        this.icon.render(context);
        this.status.render(context, this.health * 3);
      }
    }

  }

  class Arahnid {
    constructor(options) {
      this.name = options.name;
      this.sprite = options.sprite;
      this.icon = options.icon;
      this.status = options.status;
      this.name = options.name;
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.stand = false;
      this.run = false;
      this.left = false;
      this.right = false;
      this.dx = 0;
      this.speed = 6;
      this.health = 100;
    };

    move() {
      if (this.speed) {
        this.posX += this.dx;
      }
    };

    update() {
      if (this.health > 0) {
        if (this.run) {
          this.dx = this.speed;
        }
        if (this.run && this.left) {
          this.sprite.image = game.images.arahnidLeft;
          this.dx = -this.speed;
        }
        if (this.run && this.right) {
          this.sprite.image = game.images.arahnidRight;

          this.dx = this.speed;
        }

        this.move();
        this.sprite.update();
      }
    };

    render(context) {
      if (this.health > 0) {
        this.sprite.render(context, this.posX, this.posY, this.width, this.height);
        this.icon.render(context);
        this.status.render(context, this.health * 3);
      }
    }

  }

  window.gameJS = window.gameJS || {};
  window.gameJS.Alien = Alien;
  window.gameJS.Arahnid = Arahnid;
})(window);