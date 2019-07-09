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

let lastTime;

function clearCanvas(context) {
  context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

document.addEventListener("keydown", keyRightHandler, false);
document.addEventListener("keyup", keyLeftHandler, false);
function keyRightHandler(e) {
  if (e.keyCode === 39) {
    player.rightPressed = true;
  }
  if (e.keyCode === 37) {
    player.leftPressed = true;
  }
  if (e.keyCode === 38) {
    player.jumpPressed = true;
  }
  if (e.keyCode === 32) {
    player.shoting = true;
  }
}
function keyLeftHandler(e) {
  if (e.keyCode === 39) {
    player.rightPressed = false;
  }
  if (e.keyCode === 37) {
    player.leftPressed = false;
  }
  if (e.keyCode === 32) {
    player.shoting = false;
  }
}

function main() {
  let now = Date.now();
  let dt = (now - lastTime) / 1000.0;
  update(dt);
  render(gCtx);
  lastTime = now;
  nextGameStep(main);
}

let gameTime = 0;

function update(dt) {
  gameTime += dt;
  fon.update(dt);
  player.update(dt);
  enemys[0].update(dt);
  enemys[1].update(dt);
}

function render(gCtx) {
  clearCanvas(gCtx);
  fon.render(gCtx);
  player.render(gCtx);
  enemys[0].render(gCtx);
  enemys[1].render(gCtx);
}

function init() {
  lastTime = Date.now();
  main();
}

// const terrainCanvas = document.getElementById('game_terrain');
// const playerCanvas = document.getElementById('game_player');
// const environmentCanvas = document.getElementById('game_environment');
// const hudCanvas = document.getElementById('game_hud');
const gameCanvas = document.getElementById('game_canvas');

// const terCtx = terrainCanvas.getContext('2d');
// const plCtx = playerCanvas.getContext('2d');
// const envCtx = environmentCanvas.getContext('2d');
// const hudCtx = hudCanvas.getContext('2d');
const gCtx = gameCanvas.getContext('2d');


gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

const backgroundImage1 = new Image();
backgroundImage1.src = './assets/fon/fon1/game_background.png';
const backgroundImage2 = new Image();
backgroundImage2.src = './assets/fon/fon2/game_background.png';
const backgroundImage3 = new Image();
backgroundImage3.src = './assets/fon/fon3/game_background.png';
const backgroundImage4 = new Image();
backgroundImage4.src = './assets/fon/fon4/game_background.png';

const arahnidLeft = new Image();
arahnidLeft.src = './assets/arahnidLeft.png';
const arahnidRight = new Image();
arahnidRight.src = './assets/arahnidRight.png';

const alienRight = new Image();
alienRight.src = './assets/alienRight.png';
const alienLeft = new Image();
alienLeft.src = './assets/alienLeft.png';

const metroidRightImage = new Image();
metroidRightImage.src = './assets/metroidRight.png';
const metroidLeftImage = new Image();
metroidLeftImage.src = './assets/metroidLeft.png';
const metroidStandImage = new Image();
metroidStandImage.src = './assets/metroidStand.png';



const fon = new gameJS.Background({
  sprite: new gameJS.Sprite({
    image: backgroundImage2,
    framePosX: 0,
    framePosY: 0,
    frameWidth: 1920,
    frameHeight: 1080,
    animationSpeed: 5,
    arrFrames: [0],
    frameIndex: 0,
    animateDirection: 'horizontal',
    once: false
  }),
  posX: 0,
  posY: 0,
  width: gameCanvas.width,
  height: gameCanvas.height,
});

const enemys = [
  new gameJS.Arahnid({
    sprite: new gameJS.Sprite({
      image: arahnidRight,
      framePosX: 0,
      framePosY: 0,
      frameWidth: 320,
      frameHeight: 140,
      animationSpeed: 8,
      arrFrames: [0, 1, 2, 3, 4, 5],
      frameIndex: 0,
      animateDirection: 'horizontal',
      once: false,
    }),
    posX: 0,
    posY: 400,
    speed: 5,
    width: 400,
    height: 200,
  }),
  new gameJS.Alien({
    sprite: new gameJS.Sprite({
      image: alienRight,
      framePosX: 0,
      framePosY: 0,
      frameWidth: 151,
      frameHeight: 75,
      animationSpeed: 8,
      arrFrames: [0, 1, 2, 3, 4, 5, 6, 7],
      frameIndex: 0,
      animateDirection: 'horizontal',
      once: false,
    }),
    posX: 0,
    posY: 430,
    speed: 5,
    width: 320,
    height: 180,
  })
];

const player = new gameJS.Player({
  name: 'mitroid',
  sprite: new gameJS.Sprite({
    image: metroidStandImage,
    framePosX: 0,
    framePosY: 0,
    frameWidth: 97.5,
    frameHeight: 80,
    animationSpeed: 16,
    arrFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    frameIndex: 0,
    animateDirection: 'horizontal',
    once: false,
  }),
  posX: 0,
  posY: 450,
  speed: 6,
  width: 200,
  height: 150,
});

