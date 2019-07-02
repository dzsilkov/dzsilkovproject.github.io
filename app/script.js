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
// var gameEngine;


const game = {
  context: undefined,
  arahnid: undefined,
  bomb: undefined,
  bang: undefined,
  sprites: {
    background: undefined,
    arahnid: undefined,
    bomb: undefined,
    bang: undefined
  },
  init: function () {
    this.canvas = document.getElementById('game_canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');
  },
  load: function () {
    this.sprites.background = new Image();
    this.sprites.background.src = './assets/game_background.png';
    this.sprites.arahnid = new Image();
    this.sprites.arahnid.src = './assets/arahnidRight.png';
    this.sprites.bomb = new Image();
    this.sprites.bomb.src = './assets/bomb.png';
    this.sprites.bang = new Image();
    this.sprites.bang.src = './assets/bang.png';
  },
  start: function () {
    this.init();
    this.load();
    this.step();
  },
  clearCanvas: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  render: function () {
    this.clearCanvas();
    this.context.drawImage(this.sprites.background, 0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.sprites.arahnid, this.arahnid.width * this.arahnid.frameIndex, 0, this.arahnid.width, this.arahnid.height, this.arahnid.x, this.arahnid.y, this.arahnid.width, this.arahnid.height);
    this.context.drawImage(this.sprites.bomb, this.bomb.width * this.bomb.frameIndex, 0, this.bomb.width, this.bomb.height, this.bomb.x, this.bomb.y, this.bomb.width / 1.5, this.bomb.height / 1.5);
    this.context.drawImage(this.sprites.bang, this.bang.width * this.bang.frameIndex, 0, this.bang.width, this.bang.height, this.bang.x, this.bang.y, this.bang.width / 1.5, this.bang.height / 1.5);
  },
  update: function () {
    if (this.arahnid.dx) {
      this.arahnid.move();
      this.arahnid.checkBounce();
    }
  },
  step: function() {
    this.update();
    this.render();
    window.requestAnimationFrame(function () {
      game.step();
    })
  },
};

game.arahnid = {
  width: 320,
  height: 140,
  frameIndex: 0,
  x: 0,
  y: 480,
  speed: 5,
  dx: 5,
  dy: 0,
  move: function () {
    this.x += this.dx;
  },
  collisions: function (element) {
    let x = this.x + this.dx;
    let y = this.y + this.dy;
    if (x + this.width > element.width && x < 0) {
      return true;
    } else {
      return false;
    }
  },
  afterCollisions: function (element) {

  },

  checkBounce: function () {
    let x = this.x + this.dx;
    let y = this.y + this.dy;
    if (x + this.width > game.canvas.width) {
      game.sprites.arahnid.src = './assets/arahnidLeft.png';
      this.x = game.canvas.width - this.width;
      this.dx = -this.speed;
    }
    if (x < 0) {
      game.sprites.arahnid.src = './assets/arahnidRight.png';
      this.x = 0;
      this.dx = this.speed;
    }
  }
};

game.bomb = {
  width: 160,
  height: 160,
  frameIndex: 0,
  x: 100,
  y: 0
};

game.bang = {
  width: 224,
  height: 254,
  frameIndex: 0,
  x: 500,
  y: 0
};

window.addEventListener('load', function () {
  game.start();
});




