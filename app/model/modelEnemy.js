(function (window) {
  'use strict';

  class Alien {
    constructor(options) {
      this.name = options.name;
      this.sprite = new gameJS.Sprite({
        image: alienRight,
        framePosX: 0,
        framePosY: 0,
        frameWidth: 151,
        frameHeight: 75,
        animationSpeed: 0.2,
        arrFrames: [0, 1, 2, 3, 4, 5, 6, 7],
        frameIndex: 0,
        animateDirection: 'horizontal',
        once: false,
      });
      this.icon = new gameJS.Picture({
        image: alienIconImage,
        posX: 0,
        posY: 0,
        width: 96,
        height: 128,
        drawPosX: canvas.width - 100,
        drawPosY: 80,
        drawWidth: 65,
        drawHeight: 50,
      });
      this.status = new gameJS.Status({
        posX: this.icon.drawPosX - this.icon.drawWidth * 0.5 - canvas.width / 3,
        posY: this.icon.drawPosY + this.icon.drawHeight / 3,
        width: canvas.width / 3,
        height: this.icon.drawHeight / 3,
        strokeStyle: '#0eb26d',
        fillStyle: '#ff6347',
        lineWidth: this.icon.drawHeight / 25,
      });
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

        if (this.run && this.left) {
          this.sprite.image = alienLeft;
          this.dx = -this.speed;
        }
        if (this.run && this.right) {
          this.sprite.image = alienRight;

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
      this.sprite = new gameJS.Sprite({
        image: arahnidRight,
        framePosX: 0,
        framePosY: 0,
        frameWidth: 320,
        frameHeight: 140,
        animationSpeed: 0.2,
        arrFrames: [0, 1, 2, 3, 4, 5],
        frameIndex: 0,
        animateDirection: 'horizontal',
        once: false,
      });
      this.icon = new gameJS.Picture({
        image: arahnidIconImage,
        posX: 0,
        posY: 0,
        width: 126,
        height: 70,
        drawPosX: canvas.width - 100,
        drawPosY: 30,
        drawWidth: 65,
        drawHeight: 50,
      });

      this.status = new gameJS.Status({
        posX: this.icon.drawPosX - this.icon.drawWidth * 0.5 - canvas.width / 3,
        posY: this.icon.drawPosY + this.icon.drawHeight / 3,
        width: canvas.width / 3,
        height: this.icon.drawHeight / 3,
        strokeStyle: '#0eb26d',
        fillStyle: '#ff6347',
        lineWidth: this.icon.drawHeight / 25,
      });
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

        if (this.run && this.left) {
          this.sprite.image = arahnidLeft;
          this.dx = -this.speed;
        }
        if (this.run && this.right) {
          this.sprite.image = arahnidRight;

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