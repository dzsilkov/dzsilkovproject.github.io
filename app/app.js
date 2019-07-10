'use strict';


const canvas = document.getElementById('game_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let gameTimer = 0;
const bombs = [];
const bullets = [];
const plazmaShots = [];
const bombBangs = [];
const bulletBangs = [];
const plazmaBangs = [];
const enemies = [];
const healths = [];


const backgroundImage2 = new Image();
backgroundImage2.src = './assets/fon/fon2/game_background.png';

const bombImage = new Image();
bombImage.src = './assets/bomb.png';

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

const metroidRightAttImage = new Image();
metroidRightAttImage.src = './assets/metroidRightAtt.png';

const metroidLeftAttImage = new Image();
metroidLeftAttImage.src = './assets/metroidLeftAtt.png';

const metroidStandImage = new Image();
metroidStandImage.src = './assets/metroidStand.png';

const bulletImage = new Image();
bulletImage.src = './assets/bullet.png';

const plazmaBulletImage = new Image();
plazmaBulletImage.src = './assets/plazmaBullet.png';

const bangImage = new Image();
bangImage.src = './assets/bang.png';

const bulletBangImage = new Image();
bulletBangImage.src = './assets/bulletBang.png';

const plazmaBangImage = new Image();
plazmaBangImage.src = './assets/plazmaBang.png';

const healthImage = new Image();
healthImage.src = './assets/health.png';

const metroidIconImage = new Image();
metroidIconImage.src = './assets/metroidIcon.png';

const alienIconImage = new Image();
alienIconImage.src = './assets/alienIcon.png';
const arahnidIconImage = new Image();
arahnidIconImage.src = './assets/arahnidIcon.png';

const fon = new gameJS.Background({
  posX: 0,
  posY: 0,
  width: canvas.width,
  height: canvas.height,
});


const player = new gameJS.Player({
  name: 'mitroid',
  posX: 0,
  posY: 450,
  speed: 6,
  width: 200,
  height: 150,
});

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
  if (e.keyCode ===  16) {
    e.preventDefault();
    player.shooting = true;
  }
  if (e.keyCode ===  17) {
    e.preventDefault();
    player.plazmaShooting = true;
  }
}

function keyLeftHandler(e) {
  if (e.keyCode === 39) {
    player.rightPressed = false;
  }
  if (e.keyCode === 37) {
    player.leftPressed = false;
  }
  if (e.keyCode === 16) {
    e.preventDefault();
    player.shooting = false;
  }
  if (e.keyCode === 17) {
    e.preventDefault();
    player.plazmaShooting = false;
  }
}

function game() {
  update();
  render();
  nextGameStep(game);
}

function init() {
  game();
}

enemies.push(new gameJS.Arahnid({
  posX: 0,
  posY: 420,
  speed: 5,
  width: 380,
  height: 180,
}));

enemies.push(new gameJS.Alien({
  posX: 0,
  posY: 460,
  speed: 4,
  width: 260,
  height: 140,
}));

function update() {
  gameTimer++;
  if (gameTimer % 200 === 0) {
    bombs.push(new gameJS.Bomb({
      posX: getRandom(0, canvas.width),
      posY: -50,
      speed: 0,
      width: 80,
      height: 80,
    }));
  }
  if (gameTimer % 100 === 0) {
    healths.push(new gameJS.Health({
      posX: getRandom(0, canvas.width),
      posY: -50,
      speed: 0,
      width: 30,
      height: 30,
    }));
  }
  // if (gameTimer % 100 === 0) {
  //   enemies.push(new gameJS.Arahnid({
  //     posX: 0,
  //     posY: 420,
  //     speed: 5,
  //     width: 380,
  //     height: 180,
  //   }));
  // }
  // if (gameTimer % 150 === 0) {
  //   enemies.push(new gameJS.Alien({
  //     posX: 0,
  //     posY: 460,
  //     speed: 4,
  //     width: 260,
  //     height: 140,
  //   }));
  // }

  bombs.forEach((bomb) => {
    bomb.update();
    let y = bomb.posY + bomb.speed;
    if (y + bomb.height >= canvas.height) {
      bombBangs.push(new gameJS.Bang({
        posX: bomb.posX - bomb.width / 2,
        posY: bomb.posY - 120,
        width: 200,
        height: 200,
      }));
    }
  });

  healths.forEach((health) => {
    health.update();
  });

  bombBangs.forEach((bang, index) => {
    if (bang.sprite.animateDone) {
      bombBangs.splice(index, 1);
    }
    bang.update();
  });

  bulletBangs.forEach((bang, index) => {
    if (bang.sprite.animateDone) {
      bulletBangs.splice(index, 1);
    }
    bang.update();
  });

  plazmaBangs.forEach((bang, index) => {
    if (bang.sprite.animateDone) {
      plazmaBangs.splice(index, 1);
    }
    bang.update();
  });

  bullets.forEach((bullet) => bullet.update());

  plazmaShots.forEach((shot) => shot.update());

  player.update();

  enemies.forEach((enemy, index) => {

    if (enemy.health <= 0) {
      enemies.splice(index, 1);
    }


    bullets.forEach((bullet, index) => {
      let x = bullet.posX + bullet.speed;
      if (x + bullet.width > canvas.width || x + bullet.width >= enemy.posX && x + bullet.width < enemy.posX + enemy.width) {
        bulletBangs.push(new gameJS.BulletBang({
          posX: bullet.posX + 30,
          posY: bullet.posY - 50,
          width: 150,
          height: 150,
        }));
        enemy.health--;
        bullets.splice(index, 1);
      }
      bullet.update();
    });

    plazmaShots.forEach((shot, index) => {
      let x = shot.posX + shot.speed;
      if (x + shot.width > canvas.width || x + shot.width >= enemy.posX && x + shot.width < enemy.posX + enemy.width) {
        plazmaBangs.push(new gameJS.PlazmaBang({
          posX: shot.posX + 30,
          posY: shot.posY - 50,
          width: 250,
          height: 250,
        }));
        enemy.health--;
        plazmaShots.splice(index, 1);
      }
      shot.update();
    });

    enemy.update();
  });

}

function render() {
  fon.render(ctx);
  healths.forEach((health) => health.render(ctx));
  player.render(ctx);
  enemies.forEach((enemy) => {
    enemy.render(ctx);
  });
  bombs.forEach((bomb) => bomb.render(ctx));

  bullets.forEach((bullet) => bullet.render(ctx));
  plazmaShots.forEach((bang) => bang.render(ctx));
  bombBangs.forEach((bang) => bang.render(ctx));
  bulletBangs.forEach((bang) => bang.render(ctx));
  plazmaBangs.forEach((bang) => bang.render(ctx));
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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