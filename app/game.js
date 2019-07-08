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

document.addEventListener("keydown", keyRightHandler, false);
document.addEventListener("keyup", keyLeftHandler, false);
function keyRightHandler(e) {
  if (e.keyCode === 39) {
    metroid.rightPressed = true;
    console.log('right')
  }
  if (e.keyCode === 37) {
    metroid.leftPressed = true;
  }
  if (e.keyCode === 38) {
    metroid.jumpPressed = true;
  }
  if (e.keyCode === 32) {
    metroid.shoting = true;
  }
}
function keyLeftHandler(e) {
  if (e.keyCode === 39) {
    metroid.rightPressed = false;
  }
  if (e.keyCode === 37) {
    metroid.leftPressed = false;
  }
  if (e.keyCode === 32) {
    metroid.shoting = false;
  }
}
const canvas = document.getElementById('game_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let lastTime;

function main() {
  clearCanvas(ctx);
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;

  update(dt);
  render(ctx);
  lastTime = now;
  nextGameStep(main);
}

let gameTime = 0;

function update(dt) {
  gameTime += dt;
  background.update(dt);
  metroid.update(dt);
  for (var b in bullets) {
    bullets[b].update(dt);
  }
}

function render(ctx) {
  background.render(ctx);
  metroid.render(ctx);
  for (var b in bullets) {
    bullets[b].render(ctx);
  }
}

function init() {
  lastTime = Date.now();
  main();
}
let bullets = [];
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
  };

  update(dt) {
    this.frameIndex += this.animationSpeed * dt;
  };
  render(context, valueX, valueY, drawW, drawH) {
    let frame;
    this.drawPosX = valueX;
    this.drawPosY = valueY;
    this.drawWidth = drawW;
    this.drawHeight = drawH;
    if(this.animationSpeed > 0) {
      let maxFrame = this.arrFrames.length;
      let activeFrameIndex = Math.floor(this.frameIndex);
      frame = this.arrFrames[activeFrameIndex % maxFrame];

      if(this.once && activeFrameIndex >= maxFrame) {
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

const backgroundImage = new Image();
backgroundImage.src = './assets/game_background.png';
const metroidRightImage = new Image();
metroidRightImage.src = './assets/metroidRight.png';
const metroidLeftAImage = new Image();
metroidLeftAImage.src = './assets/metroidRightAt.png';
const metroidLeftAtImage = new Image();
metroidLeftAtImage.src = './assets/metroidRightAtt.png';
const metroidLeftImage = new Image();
metroidLeftImage.src = './assets/metroidLeft.png';
const metroidStandImage = new Image();
metroidStandImage.src = './assets/metroidStand.png';
const bulletImage = new Image();
bulletImage.src = './assets/bullet1.png';

const metroid = new Player({
  name: 'Metroid',
  sprite: new Sprite({
    image: metroidStandImage,
    framePosX: 0,
    framePosY: 0,
    frameWidth: 97.5,
    frameHeight: 80,
    animationSpeed: 15,
    arrFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    frameIndex: 0,
    animateDirection: 'horizontal',
    once: false,
  }),
  posX: 0,
  posY: 480,
  speed: 3,
  width: 97.5 * 2,
  height: 80 * 2,
});

const background = new Background({
  sprite: new Sprite({
    image: backgroundImage,
    framePosX: 0,
    framePosY: 0,
    frameWidth: 1920,
    frameHeight: 1080,
    animationSpeed: 5,
    arrFrames: [0],
    frameIndex: 0,
    animateDirection: 'horizontal',
    once: false,}),
  posX: 0,
  posY: 0,
  width: canvas.width,
  height: canvas.height,
});

function clearCanvas(context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
