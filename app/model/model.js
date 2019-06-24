'use strict';

var player1 = {
  width: 100,
  height: 100,
  posX: 100,
  posY: 500,
  speed: 5,
  color: '#FF6347',
  rightPressed: false,
  leftPressed: false,
  jumpPressed: false,
  jumpHeight: 0,
  jumpLength: 50,
  jumpCount: 0,
  move: function () {

    if (this.rightPressed && this.posX < canvas.width - this.width) {
      this.posX += this.speed;
    }
    else if (this.leftPressed && this.posX > 0) {
      this.posX -= this.speed;
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

  update: function (context) {
    fillRect(context, this.posX, this.posY - this.jumpHeight, this.width, this.height, this.color)
  }
};

document.addEventListener("touchstart", touchStartHandler, true);
document.addEventListener("touchend", touchEndHandler, true);

function touchStartHandler(e) {
  if (e.type === 'touchstart' && e.touches[0].pageX > player1.posX + (player1.width / 2)) {
    player1.rightPressed = true;
  }
  if (e.type === 'touchstart' && e.touches[0].pageX < player1.posX + (player1.width / 2)) {
    player1.leftPressed = true;
  }
  if (e.type === 'touchstart' && e.touches[0].pageY < player1.posY) {
    player1.jumpPressed = true;
  }
}

function touchEndHandler(e) {
  if (e.type === 'touchend') {
    e.preventDefault();
    e.stopPropagation();
    player1.rightPressed = false;
    player1.leftPressed = false;
  }
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
  if (e.keyCode === 32) {
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

var player2 = {
  radius: 50,
  centerX: 150,
  centerY: 550,
  color: '#FFD700',
  speed: 7,
  move: function () {
    this.centerX += this.speed;
  },
  jump: function () {

  },

  update: function (context) {
    fillCircle(context,this.centerX, this.centerY, this.radius, this.color);
  }
};

var canvas = document.getElementById('game_canvas');
canvas.width = 1000;
canvas.height = 600;
canvas.style.backgroundColor = '#000000';
var context = canvas.getContext('2d');

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function fillRect(ctx, x, y, w, h, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.closePath();
}
function fillCircle(ctx, centerX, centerY, radius, color) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
function strokeRect(ctx, x, y, w, h, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  // ctx.lineWidth = 5;

  ctx.strokeRect(x, y, w, h,);
  ctx.closePath();
}
function strokeCircle(ctx, centerX, centerY, radius, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

var Circle = function(centerX, centerY, radius, color) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius;
  this.color = color;
  this.speedX = 0;
  this.speedY = 0;
  this.maxSpeed = 10;
  this.accel = 0.1;
  this.fall = true;
};
Circle.prototype = {
  update: function () {
    fillCircle(context, this.centerX, this.centerY, this.radius, this.color)
  },
  updateStrokeCircle: function() {
    strokeCircle(context, this.centerX, this.centerY, this.radius, this.color);
  },
  move: function () {
    this.centerX += this.speedX;
    this.centerY += this.speedY;
  },
  falling: function () {
    if (!this.fall) {
      return
    }
    if (this.speedY > this.maxSpeed) {
      this.speedY = this.speedY / this.maxSpeed;
    }
    this.speedY += this.speedY <= this.maxSpeed ? this.accel : 0;
    if (this.centerY + this.radius >= canvas.height) {
      this.centerY = canvas.height - this.radius;

      // ------------------- для отскока от земли
      this.speedY /= 2;
      this.speedY *= -1;
    }
    if (Math.abs(this.speedY) < this.accel * 2 && this.centerY + this.radius >= canvas.height) {
      this.fall = false;
      this.speedY = 0;
    }
  }
};

var Rect = function (x, y, w, h, color) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;
  this.speedX = 0;
  this.speedY = 0;
  this.maxSpeed = 10;
  this.accel = 0.1;
  this.fall = true;
};
Rect.prototype = {
  update: function () {
    fillRect(context, this.x, this.y, this.w, this.h, this.color)
  },
  updateStrokeRect: function() {
    strokeRect(context, this.x, this.y, this.w, this.h, this.color)
  },
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
    if (this.y + this.h >= canvas.height) {
      this.y = canvas.height - this.h;

      // ------------------- для отскока от земли
      this.speedY /= 2;
      this.speedY *= -1;
    }
    if (Math.abs(this.speedY) < this.accel * 2 && this.y + this.h >= canvas.height) {
      this.fall = false;
      this.speedY = 0;
    }
  }
};


var gameEngine;

var circles = [];
var rects = [];
var strokeRects = [];
var strokeCircles = [];

setInterval(function () {
  circles.push(new Circle(getRandom(25, canvas.width - 25), 25 , 25, '#FFD700'));
  strokeRects.push(new Rect(getRandom(25, canvas.width - 25), 25 , 25, '#00FFFF'));
}, 2000);

setInterval(function () {
  rects.push(new Rect(getRandom(25, canvas.width - 50), 0, 50, 50, '#FF6347'));
  strokeCircles.push(new Circle(getRandom(25, canvas.width - 50), 0, 50, 50, '#00FF00'));
},4000);

var nextGameStep =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var gameEngineStart = function (callback) {
  gameEngine = callback;
  gameEngineStep();
};

var gameEngineStep = function () {
  clearCanvas(context);
  player1.move();
  player1.update(context);
  for (var r in rects) {
    rects[r].falling();
    rects[r].move();
    rects[r].update();
  }
  for (var sR in strokeRects) {
    strokeRects[sR].falling();
    strokeRects[sR].move();
    strokeRects[sR].updateStrokeRect();
  }
  for (var c in circles) {
    circles[c].falling();
    circles[c].move();
    circles[c].update();
  }
  for (var sC in strokeCircles) {
    strokeCircles[sC].falling();
    strokeCircles[sC].move();
    strokeCircles[sC].updateStrokeCircle();
  }

  gameEngine();
  nextGameStep(gameEngineStep)
};

var setGameEngine = function (callback) {
  gameEngine = callback;
};

var gameLoopRight = function () {
  player2.update(context);
  player2.move();
  if (player2.centerX >= canvas.width - player2.radius) {
    setGameEngine(gameLoopLeft);
  }
};

var gameLoopLeft = function () {
  player2.update(context);
  player2.centerX -= player2.speed;
  if (player2.centerX < player2.radius) {
    setGameEngine(gameLoopRight);
  }
};

gameEngineStart(gameLoopRight);