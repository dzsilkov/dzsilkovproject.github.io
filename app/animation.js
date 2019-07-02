'use strict';
function Sprite(ctx, image, width, height, x, y, ticksPerFrame, numberOfFrames) {
  this.ctx = ctx;
  this.image = image;
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = ticksPerFrame || 0;
  this.numberOfFrames = numberOfFrames || 1;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speed = 5;

  this.update = function () {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
  };

  this.render = function () {
    // this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(
      this.image,
      this.frameIndex * this.width / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      this.x,
      this.y,
      this.width / this.numberOfFrames,
      this.height
    )
  };

  this.start = function() {
    let loop = () => {
      this.update();
      this.render();

      window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);
  }
}
function Bomb(ctx, image, width, height, x, y, ticksPerFrame, numberOfFrames) {
  this.ctx = ctx;
  this.image = image;
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = ticksPerFrame || 0;
  this.numberOfFrames = numberOfFrames || 1;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.maxSpeed = 10;
  this.accel = 0.1;
  this.fall = true;
  this.update = function () {
    // this.x += this.speed;
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
  };
  this.render = function () {
    // this.ctx.clearRect(0, 0, 1000, 600);
    this.ctx.drawImage(
      this.image,
      this.frameIndex * this.width / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      this.x,
      this.y,
      this.width / this.numberOfFrames,
      this.height
    )
  };

  this.start = function() {
    let loop = () => {
      this.update();
      this.render();

      window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);
  }
}
Bomb.prototype = {
move: function () {
  this.x += this.speedX;
  this.y += this.speedY;
},
falling: function () {
  if (!this.fall) {
    return
  }
  if (this.speedY > this.maxSpeed) {
    this.speedY = this.speedY / this.maxSpeed;
  }
  this.speedY += this.speedY <= this.maxSpeed ? this.accel : 0;
  if (this.y + this.height >= canvas.height) {
    this.y = canvas.height - this.height;
    this.speedY = 0;
    // ------------------- для отскока от земли
    // this.speedY /= 2;
    // this.speedY *= -1;
  }
  if (Math.abs(this.speedY) < this.accel * 2 && this.y + this.height >= canvas.height) {
    this.fall = false;
    this.speedY = 0;
  }
}
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.getElementById('game_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#FFD700';
const context = canvas.getContext('2d');
var gameEngine;
function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// var arahnidRight = loadImage('arahnidRight.png', 320, 140, 6);
// var arahnidLeft = loadImage('arahnidLeft.png', 320, 140, 6);

var arahnidImage = new Image();
arahnidImage.src = 'arahnidRight.png';
var bombImage = new Image();
bombImage.src = 'bomb.png';
var bangImage = new Image();
bangImage.src = 'bang.png';
// var bomb = new Sprite(context, bombImage, 640, 160, 0, 0, 2, 4);
var arahnid = new Sprite(context, arahnidImage, 1920, 140, 0, canvas.height - 140 * 1.5, 4, 6);
// var bang = new Sprite(context, bangImage, 5376, 254, bomb.x, 0, 2, 24);
var bombs = [];
var bangs = [];
var timer = 0;

if (timer % 100) {
  bombs.push(new Bomb(context, bombImage, 640, 160, getRandom(0, canvas.width), 0, 2, 4,));
}

// var player = {
//   width: 320,
//   height: 140,
//   x: 0,
//   y: 0,
//   speed: 10,
//   update: function (step) {
//     this.x += this.speed * step;
//   },
//   render: function (img, dt) {
//     drawImage(img, this.x, this.y)
//   }
// };

// function drawImage(img, x, y,) {
//   if (!img.loaded) {
//     return;
//   }
//   if (img.frame >= img.frameCount) {
//     img.frame = 1;
//   } else {
//     img.frame++;
//   }
//   context.drawImage(img.dom, img.width * (img.frame - 1), 0, img.width, img.height, x, y, 320 / 2, 140 / 2);
// }

// function loadImage(path, width, height, frameCount) {
//   var image = document.createElement('img');
//   var result = {
//     dom: image,
//     width: width,
//     height: height,
//     frameCount: frameCount,
//     loaded: false,
//     frame: 1,
//   };
//   image.onload = function () {
//     result.loaded = true;
//   };
//   image.src = path;
//   return result;
// }

var nextGameStep = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function gameEngineStart(callback) {
  gameEngine = callback;
  gameEngineStep();
}

function setGameEngine(callback) {
  gameEngine = callback;
}

function gameEngineStep() {
  timer++;
  clearCanvas(context);
  if (timer % 300 === 0) {
    bombs.push(new Bomb(context, bombImage, 640, 160, getRandom(0, canvas.width), 0, 2, 4,));
  }
  for (var b in bombs) {
    bombs[b].falling();
    bombs[b].move();
    bombs[b].update();
    bombs[b].render();
    if(bombs[b].y >= canvas.height - bombs[b].height * 1.5) {
      bangs.push(new Sprite(context, bangImage, 5376, 254, bombs[b].x, bombs[b].y, 2, 24));
      for(var bg in bangs) {
        bangs[bg].update();
        bangs[bg].render();
        if (bangs[bg].frameIndex >= 24) {
          bangs.splice(bg, 1);
        }
      }
      // bombs.splice(b, 1);
    }
  }


  gameEngine();
  nextGameStep(gameEngineStep, canvas)
}

// var last = performance.now();
// var step = 1 / 60;
// var dt = 0;
// var now;

function gameLoopRight() {
  arahnidImage.src = 'arahnidRight.png';
  arahnid.x += arahnid.speed;
  // now = performance.now();
  // dt += dt + Math.min(1, (now - last) / 1000);
  // while(dt > step) {
  //   dt = dt - step;
    arahnid.update();

  // }
  // last = now;
  arahnid.render();


  if (arahnid.x >= canvas.width - arahnid.width / 6) {
    setGameEngine(gameLoopLeft);
  }
}

function gameLoopLeft() {
  arahnidImage.src = 'arahnidLeft.png';
  arahnid.x -= arahnid.speed;
  arahnid.update();
  arahnid.render();

  if (arahnid.x < 0) {
    setGameEngine(gameLoopRight);
  }
}

gameEngineStart(gameLoopRight);
