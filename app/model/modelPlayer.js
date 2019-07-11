(function (window) {
  'use strict';

  class Player {
    constructor(options) {

      this.name = options.name;
      this.sprite = new gameJS.Sprite({
        image: metroidStandImage,
        framePosX: 0,
        framePosY: 0,
        frameWidth: 97.5,
        frameHeight: 80,
        animationSpeed: 0.3,
        arrFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        frameIndex: 0,
        animateDirection: 'horizontal',
        once: false,
      });
      this.icon = new gameJS.Picture({
        image: metroidIconImage,
        posX: 0,
        posY: 0,
        width: 97,
        height: 80,
        drawPosX: 20,
        drawPosY: 30,
        drawWidth: 65,
        drawHeight: 50,
      });
      this.status = new gameJS.Status({
        posX: this.icon.drawPosX + this.icon.drawWidth,
        posY: this.icon.drawPosY + this.icon.drawHeight / 3,
        width: canvas.width / 3,
        height: this.icon.drawHeight / 3,
        strokeStyle: '#0eb26d',
        fillStyle: '#ff6347',
        lineWidth: this.icon.drawHeight / 25,
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.stand = false;
      this.run = false;
      this.left = false;
      this.right = false;
      this.jump = false;
      this.shot = false;
      this.plazmaShot = false;
      this.killedEnemy = 0;
      this.speed = 6;
      this.dx = 0;
      this.jumpHeight = 0;
      this.jumpLength = 43;
      this.jumpCount = 0;
      this.health = 100;
    };

    move() {
      if (this.speed) {
        this.posX += this.dx;
      }
    };

    update() {

      if (this.run) {

        if (this.right) {
          this.sprite.image = metroidRightImage;
          this.dx = this.speed;
        }

        if (this.left) {
          this.sprite.image = metroidLeftImage;
          this.dx = -this.speed;
        }

        if (this.left && this.shot) {
          this.sprite.image = metroidLeftAttImage;
          this.sprite.animationSpeed = 0.01;
          bullets.push(new gameJS.Shot({
            sprite: new gameJS.Sprite({
              image: bulletImage,
              framePosX: 0,
              framePosY: 0,
              frameWidth: 29,
              frameHeight: 27,
              animationSpeed: 0.2,
              arrFrames: [0, 1, 2, 3],
              frameIndex: 0,
              animateDirection: 'horizontal',
              once: false,
            }),
            posX: player.posX,
            posY: player.posY + player.height / 4 - 10,
            speed: -10,
            width: 25,
            height: 25,
          }));
        }

        if (this.right && this.shot) {
          this.sprite.image = metroidRightAttImage;
          this.sprite.animationSpeed = 0.01;
          bullets.push(new gameJS.Shot({
            sprite: new gameJS.Sprite({
              image: bulletImage,
              framePosX: 0,
              framePosY: 0,
              frameWidth: 29,
              frameHeight: 27,
              animationSpeed: 0.2,
              arrFrames: [0, 1, 2, 3],
              frameIndex: 0,
              animateDirection: 'horizontal',
              once: false,
            }),
            posX: player.posX + player.width,
            posY: player.posY + player.height / 4 - 10,
            speed: 10,
            width: 25,
            height: 25,
          }));
        }

        if (this.left && this.plazmaShot) {
          this.sprite.image = metroidLeftAttImage;
          this.sprite.animationSpeed = 0.01;
          plazmaShots.push(new gameJS.Shot({
            sprite: new gameJS.Sprite({
              image: plazmaBulletImage,
              framePosX: 0,
              framePosY: 0,
              frameWidth: 66,
              frameHeight: 66,
              animationSpeed: 0.1,
              arrFrames: [0, 1, 2, 3],
              frameIndex: 0,
              animateDirection: 'horizontal',
              once: false,
            }),
            posX: player.posX,
            posY: player.posY,
            speed: -7,
            width: 75,
            height: 75,
          }));
        }

        if (this.right && this.plazmaShot) {
          this.sprite.image = metroidRightAttImage;
          this.sprite.animationSpeed = 0.01;
          plazmaShots.push(new gameJS.Shot({
            sprite: new gameJS.Sprite({
              image: plazmaBulletImage,
              framePosX: 0,
              framePosY: 0,
              frameWidth: 66,
              frameHeight: 66,
              animationSpeed: 0.1,
              arrFrames: [0, 1, 2, 3],
              frameIndex: 0,
              animateDirection: 'horizontal',
              once: false,
            }),
            posX: player.posX + player.width,
            posY: player.posY,
            speed: 7,
            width: 75,
            height: 75,
          }));
        }

      } else if (this.jump) {
        this.sprite.animationSpeed = 0.05;
        this.jumpCount++;
        this.jumpHeight = 4 * this.jumpLength * Math.sin(Math.PI * this.jumpCount / this.jumpLength);

        if (this.jumpCount > this.jumpLength) {
          this.sprite.animationSpeed = 0.3;
          this.jump = false;
          this.jumpCount = 0;
          this.jumpHeight = 0;
        }

      } else {
        this.sprite.image = metroidStandImage;
        this.sprite.animationSpeed = 0.3;
        this.stand = true;
        this.dx = 0;
      }

      this.move();

      this.sprite.update();
    };

    render(context) {
      this.sprite.render(context, this.posX, this.posY - this.jumpHeight, this.width, this.height);
      this.icon.render(context);
      this.status.render(context, this.health * 3);
    };

  }

  window.gameJS = window.gameJS || {};
  window.gameJS.Player = Player;
})(window);
