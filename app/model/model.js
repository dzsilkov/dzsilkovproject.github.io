'use strict';

var player1 = {
  width: 100,
  height: 100,
  posX: 450,
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

    if(this.rightPressed && this.posX < canvas.width - this.width){
      this.posX += this.speed;
    }
    else if(this.leftPressed && this.posX > 0){
      this.posX -= this.speed;
    }
    if(this.jumpPressed){
      this.jumpCount++;
      this.jumpHeight = 4 * this.jumpLength * Math.sin(Math.PI * this.jumpCount / this.jumpLength);
    }
    if(this.jumpCount > this.jumpLength){
      this.jumpCount = 0;
      this.jumpPressed = false;
      this.jumpHeight = 0;
    }
  },
  update: function(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.posX, this.posY - this.jumpHeight, this.width, this.height);
    context.fill();
    context.closePath();
  }
};

document.addEventListener("touchstart", touchStartHandler, true);
document.addEventListener("touchend", touchEndHandler, true);

function touchStartHandler(e){
  if(e.type === 'touchstart' && e.touches[0].pageX > player1.posX + (player1.width / 2)) {
    player1.rightPressed = true;
  }
  if(e.type === 'touchstart' && e.touches[0].pageX < player1.posX + (player1.width / 2)) {
    player1.leftPressed = true;
  }
  if(e.type === 'touchstart' && e.touches[0].pageY < player1.posY) {
    player1.jumpPressed = true;
  }
}

function touchEndHandler(e){
  if(e.type === 'touchend'){
    e.preventDefault();
    e.stopPropagation();
    player1.rightPressed = false;
    player1.leftPressed = false;
  }
}

document.addEventListener("keydown", keyRightHandler, false);
document.addEventListener("keyup", keyLeftHandler, false);

function keyRightHandler(e){
  if(e.keyCode === 39){
    player1.rightPressed = true;
  }
  if(e.keyCode === 37){
    player1.leftPressed = true;
  }
  if(e.keyCode === 32){
    player1.jumpPressed = true;
  }
}

function keyLeftHandler(e){
  if(e.keyCode === 39){
    player1.rightPressed = false;
  }
  if(e.keyCode === 37){
    player1.leftPressed = false;
  }
}

var player2 = {
  radius: 50,
  centerX: 500,
  centerY: 550,
  color: '#FFD700',
  speed: 7,
  move: function() {
    this.centerX += this.speed;
  },
  jump: function() {

  },
  update: function(context) {
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
};

var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;

var gameEngine;

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
  context.clearRect(0, 0, 1000, 600);
  player1.move();
  player1.update(context);
  gameEngine();
  nextGameStep(gameEngineStep)
};

var setGameEngine = function (callback) {
  gameEngine = callback;
};

var gameLoopRight = function () {
  player2.update(context);
  player2.move();
  if(player2.centerX >= 950) {
    setGameEngine(gameLoopLeft);
  }
};

var gameLoopLeft = function () {
  player2.update(context);
  player2.centerX -= player2.speed;
  if(player2.centerX < 50) {
    setGameEngine(gameLoopRight);
  }
};

gameEngineStart(gameLoopRight);