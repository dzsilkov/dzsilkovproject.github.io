(function (window) {
  class Player {
    constructor(options) {
      this.name = options.name;
      this.sprite = options.sprite;
      this.posX = options.posX;
      this.posY = options.posY;
      this.speed = options.speed;
      this.jumpHeight = 0;
      this.width = options.width;
      this.height = options.height;
      this.rightPressed = false;
      this.leftPressed = false;
      this.jumpPressed = false;
      this.shoting = false;
      this.jumpLength = 50;
      this.jumpCount = 0;
      this.dx = 5;
      this.dy = 0;
    }
    move(dt) {
      this.sprite.image = metroidStandImage;
      if (this.rightPressed && this.posX < canvas.width - this.width) {
        this.posX += this.speed;
        this.sprite.image = metroidRightImage;
        this.sprite.update(dt);
      }
      else if (this.leftPressed && this.posX > 0) {
        this.sprite.image = metroidLeftImage;
        this.posX -= this.speed;
        this.sprite.update(dt);
      }
      if (this.jumpPressed) {
        this.jumpCount++;
        this.jumpHeight = 4 * this.jumpLength * Math.sin(Math.PI * this.jumpCount / this.jumpLength);
        this.sprite.update(dt);
      }
      if (this.jumpCount > this.jumpLength) {
        this.jumpCount = 0;
        this.jumpPressed = false;
        this.jumpHeight = 0;
        this.sprite.update(dt);
      }
    };
    shot() {
      if (this.shoting) {
        console.log('shot');
        bullets.push(new Bullet({
          sprite: new Sprite({
            image: bulletImage,
            framePosX: 0,
            framePosY: 0,
            frameWidth: 66,
            frameHeight: 66,
            animationSpeed: 10,
            arrFrames: [0, 1, 2, 3],
            frameIndex: 0,
            animateDirection: 'horizontal',
            once: false,
          }),
          width: 66,
          height: 66,
          posX: this.posX,
          posY: this.posY,
        }))
      }
    }
    update(dt) {
      this.shot();
      this.move(dt);
    };
    render(context,) {
      this.sprite.render(context, this.posX, this.posY - this.jumpHeight, this.width, this.height);
    }
  }

  window.gameJS = window.gameJS || {};
  window.gameJS.Player = Player;
})(window);