(function (window) {
  'use strict';

  class Player {
    constructor(options) {

      this.name = options.name;
      this.sprite = options.sprite;
      this.icon = options.icon;
      this.status = options.status;
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.stand = false;
      this.leftPressed = false;
      this.rightPressed = false;
      this.jump = false;
      this.shooting = false;
      this.plazmaShooting = false;
      this.killedEnemy = 0;
      this.speed = 6;
      this.dx = 0;
      this.jumpHeight = 0;
      this.jumpLength = 43;
      this.jumpCount = 0;
      this.health = 100;
      this.count = null;
    };

    shot() {

      if (this.shooting && this.leftPressed) {
        this.sprite.image = game.images.metroidLeftAttImage;
        if (game.gameTimer % 30 === 0) {
          game.bullets.push(new gameJS.Shot({
            sprite: new gameJS.Sprite({
              image: game.images.bullet,
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
            posX: game.player.posX,
            posY: game.player.posY + game.player.height / 4 - 10,
            speed: -10,
            width: 25,
            height: 25,
          }));
        }
      }

      if (this.shooting && this.rightPressed) {
        this.sprite.image = game.images.metroidRightAttImage;
        this.sprite.update();
        if (game.gameTimer % 30 === 0) {
          game.bullets.push(new gameJS.Shot({
            sprite: new gameJS.Sprite({
              image: game.images.bullet,
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
            posX: game.player.posX + game.player.width,
            posY: game.player.posY + game.player.height / 4 - 10,
            speed: 10,
            width: 25,
            height: 25,
          }));
        }
      }

      if (this.plazmaShooting && this.leftPressed) {
        this.sprite.image = game.images.metroidLeftAttImage;
        game.plazmaShots.push(new gameJS.Shot({
          sprite: new gameJS.Sprite({
            image: game.images.plazmaShot,
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
          posX: game.player.posX,
          posY: game.player.posY,
          speed: -7,
          width: 75,
          height: 75,
        }));
      }

      if (this.plazmaShooting && this.rightPressed) {
        this.sprite.image = game.images.metroidRightAttImage;
        game.plazmaShots.push(new gameJS.Shot({
          sprite: new gameJS.Sprite({
            image: game.images.plazmaShot,
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
          posX: game.player.posX + game.player.width,
          posY: game.player.posY,
          speed: 7,
          width: 75,
          height: 75,
        }));
      }
    }

    update() {
      this.sprite.image = game.images.metroidStandImage;
      if (this.rightPressed) {
        this.posX += this.speed;
        this.sprite.image = game.images.metroidRightImage;
      }
      else if (this.leftPressed) {
        this.sprite.image = game.images.metroidLeftImage;
        this.posX -= this.speed;
      }
      if (this.jump) {
        this.sprite.animationSpeed = 0.05;
        this.jumpCount++;
        this.jumpHeight = 4 * this.jumpLength * Math.sin(Math.PI * this.jumpCount / this.jumpLength);
      }
      if (this.jumpCount > this.jumpLength) {
        this.jumpCount = 0;
        this.jump = false;
        this.jumpHeight = 0;
        this.sprite.animationSpeed = 0.3;
      }
      this.shot();
      this.sprite.update();
    }

    render(context) {
      this.sprite.render(context, this.posX, this.posY - this.jumpHeight, this.width, this.height);
      this.icon.render(context);
      this.status.render(context, this.health * 3);
    };

  }

  window.gameJS = window.gameJS || {};
  window.gameJS.Player = Player;
})(window);
