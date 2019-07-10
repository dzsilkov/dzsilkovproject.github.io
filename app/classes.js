(function (window) {

  'use strict';

  class Sprite {
    constructor(options) {
      this.framePosX = options.framePosX;
      this.framePosY = options.framePosY;
      this.frameWidth = options.frameWidth;
      this.frameHeight = options.frameHeight;
      this.animationSpeed = options.animationSpeed || 0;
      this.arrFrames = options.arrFrames || [0];
      this.frameIndex = 0;
      this.image = options.image;
      this.animateDirection = options.animateDirection || 'horizontal';
      this.once = options.once;
      this.animateDone = false;
    };

    update() {
      this.frameIndex += this.animationSpeed;
    };

    render(context, valueX, valueY, drawW, drawH) {
      let frame;
      this.drawPosX = valueX;
      this.drawPosY = valueY;
      this.drawWidth = drawW;
      this.drawHeight = drawH;
      if (this.animationSpeed > 0) {
        let maxFrame = this.arrFrames.length;
        let activeFrameIndex = Math.floor(this.frameIndex);
        frame = this.arrFrames[activeFrameIndex % maxFrame];

        if (this.once && activeFrameIndex >= maxFrame) {
          this.animateDone = true;
          return;
        }
      }
      else {
        frame = 0;
      }

      let x = this.framePosX;
      let y = this.framePosY;

      if (this.animateDirection === 'horizontal') {
        x += frame * this.frameWidth;
      }
      else {
        y += frame * this.frameHeight;
      }

      context.drawImage(
        this.image,
        x,
        y,
        this.frameWidth,
        this.frameHeight,
        this.drawPosX,
        this.drawPosY,
        this.drawWidth,
        this.drawHeight);
    };
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
      this.icon = new gameJS.Icon({
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
        posX: this.icon.drawPosX - this.icon.drawWidth * 0.5 -canvas.width / 3,
        posY: this.icon.drawPosY + this.icon.drawHeight / 3,
        width: canvas.width / 3,
        height: this.icon.drawHeight / 3,
        strokeStyle: '#0eb26d',
        fillStyle: '#ff6347',
        lineWidth: this.icon.drawHeight / 25,
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.speed = options.speed;
      this.width = options.width;
      this.height = options.height;
      this.dx = 6;
      this.health = 100;
    }

    move() {
      this.posX += this.dx;
    };

    checkBounce() {
      let x = this.posX + this.dx;
      if (x + this.width > canvas.width) {
        this.sprite.image = arahnidLeft;
        this.posX = canvas.width - this.width;
        this.dx = -this.speed;
      }
      if (x < 0) {
        this.sprite.image = arahnidRight;
        this.sprite.posX = 0;
        this.dx = this.speed;
      }
    };

    update() {
      if (this.health > 0) {
        this.move();
        this.checkBounce();
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
      this.icon = new gameJS.Icon({
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
      this.posX = options.posX;
      this.posY = options.posY;
      this.speed = options.speed;
      this.width = options.width;
      this.height = options.height;
      this.health = 100;
      this.dx = 4;
      this.dy = 0;
    }

    move() {
      this.posX += this.dx;
    };

    checkBounce() {
      let x = this.posX + this.dx;
      if (x + this.width > canvas.width) {
        this.sprite.image = alienLeft;
        this.posX = canvas.width - this.width;
        this.dx = -this.speed;
      }
      if (x < 0) {
        this.sprite.image = alienRight;
        this.sprite.posX = 0;
        this.dx = this.speed;
      }
    };

    update() {
      if (this.health >= 0) {
        this.move();
        this.checkBounce();
        this.sprite.update();
      }
    };

    render(context) {
      if (this.health >= 0) {
        this.sprite.render(context, this.posX, this.posY, this.width, this.height);
        this.icon.render(context);
        this.status.render(context, this.health * 3);
      }
    }
  }

  class Background {
    constructor(options) {
      this.name = options.name;
      this.sprite = new gameJS.Sprite({
        image: backgroundImage2,
        framePosX: 0,
        framePosY: 0,
        frameWidth: 1920,
        frameHeight: 1080,
        animationSpeed: 0,
        arrFrames: [0],
        frameIndex: 0,
        animateDirection: 'horizontal',
        once: false
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
    }

    update() {
      this.sprite.update();
    }

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  class Bomb {
    constructor(options) {
      this.sprite = new gameJS.Sprite({
        image: bombImage,
        framePosX: 0,
        framePosY: 0,
        frameWidth: 160,
        frameHeight: 160,
        animationSpeed: 0.1,
        arrFrames: [0, 1, 2, 3],
        frameIndex: 0,
        animateDirection: 'horizontal',
        once: false,
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.speed = options.speed;
      this.fall = true;
      this.maxSpeed = 30;
      this.accel = 0.2;
    }

    move() {
      this.posY += this.speed * this.accel;
    };

    falling() {
      if (!this.fall) {
        return
      }
      this.speed += this.speed <= this.maxSpeed ? this.accel : 0;
      if (this.posY + this.height >= canvas.height) {
        this.posY = canvas.height - this.height;
      }
      if (Math.abs(this.speed) < this.accel * 2 && this.posY + this.height >= canvas.height) {
        this.fall = false;
        this.speed = 0;
      }
    };

    collisions() {
      let x = this.posX + this.dx;
      let y = this.posY + this.speed;

      if (y + this.height > canvas.height) {
        bombs.splice(this, 1);
      }
    };

    update() {
      this.collisions();
      this.move();
      this.falling();
      this.sprite.update();

    };

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }

  }

  class Health {
    constructor(options) {
      this.sprite = new gameJS.Sprite({
        image: healthImage,
        framePosX: 0,
        framePosY: 0,
        frameWidth: 200,
        frameHeight: 200,
        animationSpeed: 0.1,
        arrFrames: [0, 1, 2, 3],
        frameIndex: 0,
        animateDirection: 'horizontal',
        once: false,
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.speed = options.speed;
      this.fall = true;
      this.maxSpeed = 30;
      this.accel = 0.2;
    }

    move() {
      this.posY += this.speed * this.accel;
    };

    falling() {
      if (!this.fall) {
        return
      }
      this.speed += this.speed <= this.maxSpeed ? this.accel : 0;
      if (this.posY + this.height >= canvas.height - 50) {
        this.posY = canvas.height - 50 - this.height;
      }
      if (Math.abs(this.speed) < this.accel * 2 && this.posY + this.height >= canvas.height - 50) {
        this.fall = false;
        this.speed = 0;
      }
    };

    collisions() {
      let x = this.posX + this.dx;
      let y = this.posY + this.speed;

      if (y + this.height > canvas.height - 50) {
        healths.splice(this, 1);
      }
    };

    update() {
      this.collisions();
      this.move();
      this.falling();
      this.sprite.update();

    };

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }

  }

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
      this.icon = new gameJS.Icon({
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
      this.speed = options.speed;
      this.jumpHeight = 0;
      this.width = options.width;
      this.height = options.height;
      this.rightPressed = false;
      this.leftPressed = false;
      this.jumpPressed = false;
      this.shooting = false;
      this.plazmaShooting = false;
      this.jumpLength = 43;
      this.jumpCount = 0;
      this.health = 100;
    }

    move() {
      this.sprite.image = metroidStandImage;
      if (this.rightPressed && this.posX < canvas.width - this.width) {
        this.posX += this.speed;
        this.sprite.image = metroidRightImage;
      }
      else if (this.leftPressed && this.posX > 0) {
        this.sprite.image = metroidLeftImage;
        this.posX -= this.speed;
      }
      if (this.jumpPressed) {
        this.sprite.animationSpeed = 0.05;
        this.jumpCount++;
        this.jumpHeight = 4 * this.jumpLength * Math.sin(Math.PI * this.jumpCount / this.jumpLength);
      }
      if (this.jumpCount > this.jumpLength) {
        this.jumpCount = 0;
        this.jumpPressed = false;
        this.jumpHeight = 0;
        this.sprite.animationSpeed = 0.3;
      }
    };

    shot() {

      if (this.shooting && this.leftPressed) {
        this.sprite.image = metroidLeftAttImage;
        if (gameTimer % 30 === 0) {
          bullets.push(new gameJS.Bullet({
            posX: player.posX,
            posY: player.posY + player.height / 4 - 10,
            speed: -10,
            width: 25,
            height: 25,
          }));
        }
      }

      if (this.shooting && this.rightPressed) {
        this.sprite.image = metroidRightAttImage;
        this.sprite.update();
        if (gameTimer % 30 === 0) {
          bullets.push(new gameJS.Bullet({
            posX: player.posX + player.width,
            posY: player.posY + player.height / 4 - 10,
            speed: 10,
            width: 25,
            height: 25,
          }));
        }
      }

      if (this.plazmaShooting && this.leftPressed) {
        this.sprite.image = metroidLeftAttImage;
        plazmaShots.push(new gameJS.PlazmaShot({
          posX: player.posX,
          posY: player.posY,
          speed: -7,
          width: 75,
          height: 75,
        }));
      }

      if (this.plazmaShooting && this.rightPressed) {
        this.sprite.image = metroidRightAttImage;
        this.sprite.update();
        plazmaShots.push(new gameJS.PlazmaShot({
          posX: player.posX + player.width,
          posY: player.posY,
          speed: 7,
          width: 75,
          height: 75,
        }));
      }


    }

    update() {
      this.move();
      this.shot();
      this.sprite.update();
    };

    render(context,) {
      this.sprite.render(context, this.posX, this.posY - this.jumpHeight, this.width, this.height);
      this.icon.render(context);
      this.status.render(context, this.health * 3);
    }
  }

  class Icon {
    constructor(options) {
      this.image = options.image;
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.drawPosX = options.drawPosX;
      this.drawPosY = options.drawPosY;
      this.drawWidth = options.drawWidth;
      this.drawHeight = options.drawHeight;
    }

    render(context) {
      context.drawImage(
        this.image,
        this.posX,
        this.posY,
        this.width,
        this.height,
        this.drawPosX,
        this.drawPosY,
        this.drawWidth,
        this.drawHeight);
    };
  }

  class Bullet {
    constructor(options) {
      this.sprite = new gameJS.Sprite({
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
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.speed = options.speed;
    }

    move() {
      this.posX += this.speed;
    }

    collisions() {
      let x = this.posX + this.speed;
    };

    update() {
      this.collisions();
      this.move();
      this.sprite.update();
    }

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  class PlazmaShot {
    constructor(options) {
      this.sprite = new gameJS.Sprite({
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
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.speed = options.speed;
    }

    move() {
      this.posX += this.speed;
    }

    collisions() {
      let x = this.posX + this.speed;
    };

    update() {
      this.collisions();
      this.move();
      this.sprite.update();
    }

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  class Bang {
    constructor(options) {
      this.sprite = new gameJS.Sprite({
        image: bangImage,
        framePosX: 0,
        framePosY: 0,
        frameWidth: 224,
        frameHeight: 254,
        animationSpeed: 0.5,
        arrFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        frameIndex: 0,
        animateDirection: 'horizontal',
        once: true,
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
    }

    update() {
      this.sprite.update();
    };

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }

  }

  class BulletBang {
    constructor(options) {
      this.sprite = new gameJS.Sprite({
        image: bulletBangImage,
        framePosX: 0,
        framePosY: 0,
        frameWidth: 100,
        frameHeight: 100,
        animationSpeed: 0.5,
        arrFrames: [0, 1, 2, 3, 4, 5, 6],
        frameIndex: 0,
        animateDirection: 'horizontal',
        once: true,
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
    };

    update() {
      this.sprite.update();
    };

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  class PlazmaBang {
    constructor(options) {
      this.sprite = new gameJS.Sprite({
        image: plazmaBangImage,
        framePosX: 0,
        framePosY: 0,
        frameWidth: 100,
        frameHeight: 100,
        animationSpeed: 0.6,
        arrFrames: [0, 1, 2, 3, 4, 5, 6],
        frameIndex: 0,
        animateDirection: 'horizontal',
        once: true,
      });
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
    };

    update() {
      this.sprite.update();
    };

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  class Status {
    constructor(options) {
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.lineWidth = options.lineWidth;
      this.strokeStyle = options.strokeStyle;
      this.fillStyle = options.fillStyle;
    }

    render(context, value) {
      context.lineWidth = this.lineWidth;
      context.strokeStyle = this.strokeStyle;
      context.strokeRect(this.posX, this.posY, this.width, this.height);
      context.fillStyle = this.fillStyle;
      context.fillRect(this.posX + this.lineWidth / 2, this.posY + this.lineWidth / 2, value - this.lineWidth, this.height - this.lineWidth);

    }
  }


  window.gameJS = window.gameJS || {};
  window.gameJS.Sprite = Sprite;
  window.gameJS.Background = Background;
  window.gameJS.Arahnid = Arahnid;
  window.gameJS.Alien = Alien;
  window.gameJS.Bomb = Bomb;
  window.gameJS.Health = Health;
  window.gameJS.Player = Player;
  window.gameJS.Status = Status;
  window.gameJS.Icon = Icon;
  window.gameJS.Bullet = Bullet;
  window.gameJS.PlazmaShot = PlazmaShot;
  window.gameJS.Bang = Bang;
  window.gameJS.BulletBang = BulletBang;
  window.gameJS.PlazmaBang = PlazmaBang;
})(window);