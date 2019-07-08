'use strict';
const nextGameStep = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const canvas = document.getElementById('game_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
// const s = window.screen;  //Переменная для выясняющая размер вашего экрана
// const width = canvas.width = s.width;
// const height = canvas.height = s.height;

class Sprite {
  constructor(options) {
    this.context = options.context;
    this.image = options.image;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.width = options.width;
    this.height = options.height;
    this.posX = options.posX;
    this.posY = options.posY;
    this.speed = options.speed;
    this.once = options.once;
    this.drawWidth = options.drawWidth;
    this.drawHeight = options.drawHeight;
    this.jumpHeight = options.jumpHeight
  }

  update() {
    this.tickCount++;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  render() {
    // clearCanvas(this.context);
    this.context.drawImage(
      this.image,
      this.frameIndex * this.width / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      this.posX,
      this.posY,
      this.drawWidth,
      this.drawHeight
    )
  }
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
document.addEventListener("keydown", keyRightHandler, false);
document.addEventListener("keyup", keyLeftHandler, false);
function keyRightHandler(e) {
  if (e.keyCode === 39) {
    player1.rightPressed = true;
  }
  if (e.keyCode === 37) {
    player1.leftPressed = true;
  }
  if (e.keyCode === 38) {
    player1.jumpPressed = true;
  }
}
function keyLeftHandler(e) {
  if (e.keyCode === 39) {
    player1.rightPressed = false;
  }
  if (e.keyCode === 37) {
    player1.leftPressed = false;
  }
}
const backgroundImage = new Image();
backgroundImage.src = './assets/game_background.png';

const arahnidLeft = new Image();
arahnidLeft.src = './assets/arahnidLeft.png';

const arahnidRight = new Image();
arahnidRight.src = './assets/arahnidRight.png';

const alienRight = new Image();
alienRight.src = './assets/alienRight.png';

const alienLeft = new Image();
alienLeft.src = './assets/alienLeft.png';

const bombImage = new Image();
bombImage.src = './assets/bomb.png';

const bangImage = new Image();
bangImage.src = './assets/bang.png';
const bangSmallImage = new Image();
bangSmallImage.src = './assets/bangBlue.png';
const metroidRightImage = new Image();
metroidRightImage.src = './assets/metroidRight.png';
const metroidLeftImage = new Image();
metroidLeftImage.src = './assets/metroidLeft.png';

const metroidRightAtImage = new Image();
metroidRightAtImage.src = './assets/metroidRightAtt.png';
const metroidLeftAtImage = new Image();
metroidLeftAtImage.src = './assets/metroidStand.png';
const metroidStandImage = new Image();
metroidStandImage.src = './assets/metroidStand.png';
const bulletImage = new Image();
bulletImage.src = './assets/bullet.png';
const bulletBlueImage = new Image();
bulletBlueImage.src = './assets/bullet1.png';

const background = {
  sprite: new Sprite({
    context: context,
    image: backgroundImage,
    width: 1920,
    height: 1080,
    numberOfFrames: 1,
    ticksPerFrame: 4,
    posX: 0,
    posY: 0,
    drawWidth: canvas.width,
    drawHeight: canvas.height
  }),
  update() {
    this.sprite.update();
  },
  render() {
    this.sprite.render();
  }
};

const player1 = {
  sprite: new Sprite({
    context: context,
    image: metroidRightImage,
    width: 975,
    height: 80,
    posX: 500,
    posY: 480,
    numberOfFrames: 10,
    ticksPerFrame: 2,
    drawWidth: 90 * 2,
    drawHeight: 80 * 2,
    jumpHeight: 0,
  }),
  width: 90 * 2,
  height: 80 * 2,
  rightPressed: false,
  leftPressed: false,
  jumpPressed: false,

  jumpLength: 10,
  jumpCount: 0,
  speed: 8,
  dx: 5,
  dy: 0,

  move: function () {

    if (this.rightPressed && this.sprite.posX < canvas.width - this.width) {
      this.sprite.posX += this.speed;
      this.sprite.image = metroidRightImage;
      this.sprite.update();
    }
    else if (this.leftPressed && this.sprite.posX > 0) {
      this.sprite.posX -= this.speed;
      this.sprite.image = metroidLeftImage;
      this.sprite.update();
    }
    if (this.jumpPressed) {
      this.jumpCount++;
      this.jumpHeight = 4 * this.jumpLength * Math.sin(Math.PI * this.jumpCount / this.jumpLength);
    }
    if (this.jumpCount > this.jumpLength) {
      this.jumpCount = 0;
      this.jumpPressed = false;
      this.jumpHeight = 0;
    }
  },

  // checkBounce() {
  //   let x = this.sprite.posX + this.dx;
  //   let y = this.sprite.posY + this.dy;
  //   if (x + this.width > canvas.width) {
  //     this.sprite.image = metroidLeftAtImage;
  //     this.sprite.posX = canvas.width - this.width;
  //     this.dx = -this.speed;
  //   }
  //   if (x < 0) {
  //     this.sprite.image = metroidRightAtImage;
  //     this.sprite.posX = 0;
  //     this.dx = this.speed;
  //   }
  // },
  update() {
    this.move();
  },
  render() {
    this.sprite.render();
  }
};

const player2 = {
  sprite: new Sprite({
    context: context,
    image: arahnidRight,
    width: 1920,
    height: 140,
    posX: 0,
    posY: 480,
    numberOfFrames: 6,
    ticksPerFrame: 4,
    drawWidth: 320,
    drawHeight: 140
  }),
  width: 320,
  height: 140,
  speed: 5,
  dx: 5,
  dy: 0,
  move() {
    this.sprite.posX += this.dx;
  },
  checkBounce() {
    let x = this.sprite.posX + this.dx;
    let y = this.sprite.posY + this.dy;
    if (x + this.width > canvas.width) {
      this.sprite.image = arahnidLeft;
      this.sprite.posX = canvas.width - this.width;
      this.dx = -this.speed;
    }
    if (x < 0) {
      this.sprite.image = arahnidRight;
      this.sprite.posX = 0;
      this.dx = this.speed;
    }
  },
  update() {
    this.move();
    this.checkBounce();
    this.sprite.update();
  },
  render() {
    this.sprite.render();
  }
};

const bomb = {
  sprite: new Sprite({
    context: context,
    image: bombImage,
    width: 640,
    height: 160,
    posX: 200,
    posY: 0,
    numberOfFrames: 4,
    ticksPerFrame: 2,
    drawWidth: 80,
    drawHeight: 80
  }),
  width: 80,
  height: 80,
  speed: 0,
  dx: 5,
  dy: 0,
  maxSpeed: 10,
  fall: true,
  accel: 0.1,

  move() {
    this.sprite.posY += this.speed;
  },

  falling() {
    if (!this.fall) {
      return
    }
    // if (this.speed > this.maxSpeed) {
    //   this.speed = this.speed / this.maxSpeed;
    // }
    this.speed += this.speed <= this.maxSpeed ? this.accel : 0;
    if (this.sprite.posY + this.height >= canvas.height) {
      this.sprite.posY = canvas.height - this.height;
      // ------------------- для отскока от земли
      this.speed /= 2;
      this.speed *= -1;
    }
    if (Math.abs(this.speed) < this.accel * 2 && this.sprite.posY + this.height >= canvas.height) {
      this.fall = false;
      this.speed = 0;
    }
  },
  collisions() {
    let x = this.sprite.posX + this.dx;
    let y = this.sprite.posY + this.dy;

    // if (x + this.width > element.width && x < 0) {
    //   return true;
    // } else {
    //   return false;
    // }
  },
  update() {
    this.sprite.update();
    this.move();
    this.falling();
  },
  render() {
    this.sprite.render();
  }
};
const bulletBlue = {
  sprite: new Sprite({
    context: context,
    image: bulletBlueImage,
    width: 264,
    height: 66,
    numberOfFrames: 4,
    ticksPerFrame: 2,
    posX: 100,
    posY: 0,
    drawWidth: 264 / 4,
    drawHeight: 66
  }),
  width: 66,
  height: 66,
  speed: 5,
  dx: 5,
  dy: 0,
  move() {
    this.sprite.posX += this.speed;
  },
  update() {
    this.sprite.update();
    this.move();
  },
  render() {
    this.sprite.render();
  }
};
const bullet = {
  sprite: new Sprite({
    context: context,
    image: bulletImage,
    width: 117,
    height: 27,
    numberOfFrames: 4,
    ticksPerFrame: 2,
    posX: 100,
    posY: 0,
    drawWidth: 117 / 4,
    drawHeight: 27
  }),
  width: 117 / 4,
  height: 27,
  speed: 5,
  dx: 5,
  dy: 0,
  move() {
    this.sprite.posX += this.speed;
    this.sprite.posY += this.speed;

  },
  update() {
    this.sprite.update();
    this.move();
  },
  render() {
    this.sprite.render();
  }
};
const bang = {
  sprite: new Sprite({
    context: context,
    image: bangImage,
    width: 5376,
    height: 254,
    posY: 0,
    posX: 300,
    numberOfFrames: 24,
    ticksPerFrame: 2,
    drawWidth: 224,
    drawHeight: 254
  }),
  width: 224,
  height: 254,
  update() {
    this.sprite.update();
  },
  render() {
    this.sprite.render();
  }
};
const bangSmall = {
  sprite: new Sprite({
    context: context,
    image: bangSmallImage,
    width: 700,
    height: 100,
    posY: 0,
    posX: 600,
    numberOfFrames: 7,
    ticksPerFrame: 4,
    drawWidth: 150,
    drawHeight: 150
  }),
  width: 100,
  height: 100,
  update() {
    this.sprite.update();
  },
  render() {
    this.sprite.render();
  }
};

function start() {
  let loop = () => {
    clearCanvas(context);
    bomb.update();
    background.update();
    bulletBlue.update();
    bullet.update();
    player2.update();
    player1.update();
    bangSmall.update();
    bang.update();
    background.render();
    bomb.render();
    bulletBlue.render();
    bullet.render();
    player2.render();
    player1.render();
    bangSmall.render();
    bang.render();
    nextGameStep(loop);
  };

  nextGameStep(loop);
}

window.addEventListener('load', function () {
  start();
});


