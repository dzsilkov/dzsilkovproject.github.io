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

  class Picture {
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
      this.show = true;
    };

    update() {
      this.show = true;
    };

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
        this.drawHeight
      );
    };
  }

  class Bomb {
    constructor(options) {
      this.sprite = new gameJS.Sprite({
        image: game.images.bombImage,
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
      this.speed = 0;
      this.fall = true;
      this.bang = false;
      this.banged = false;
      this.maxSpeed = 30;
      this.accel = 0.2;
    };

    move() {
      this.posY += this.speed * this.accel;
    };

    update() {
      if (this.fall) {
        this.speed += this.speed <= this.maxSpeed ? this.accel : 0;
      }

      if (this.bang) {
        this.banged = true;
      }

      this.move();
      this.sprite.update();
    };

    render(context) {

      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  class Health {
    constructor(options) {
      this.sprite = new gameJS.Sprite({
        image: game.images.healthImage,
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
      this.speed = 0;
      this.fall = true;
      this.used = false;
      this.maxSpeed = 30;
      this.accel = 0.2;
    }

    move() {
      this.posY += this.speed * this.accel;
    };

    update() {
      if (this.fall) {
        this.speed += this.speed <= this.maxSpeed ? this.accel : 0;
      }

      this.move();
      this.sprite.update();
    };

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  class Shot {
    constructor(options) {
      this.sprite = options.sprite;
      this.posX = options.posX;
      this.posY = options.posY;
      this.width = options.width;
      this.height = options.height;
      this.speed = options.speed;
      this.bang = false;
      this.banged = false;
    }

    move() {
      this.posX += this.speed;
    }

    update() {
      if (this.bang) {
        this.banged = true;
      }
      this.move();
      this.sprite.update();
    }

    render(context) {
      this.sprite.render(context, this.posX, this.posY, this.width, this.height);
    }
  }

  class Bang {
    constructor(options) {
      this.sprite = options.sprite;
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
  window.gameJS.Picture = Picture;
  window.gameJS.Bomb = Bomb;
  window.gameJS.Health = Health;
  window.gameJS.Status = Status;
  window.gameJS.Shot = Shot;
  window.gameJS.Bang = Bang;
})(window);