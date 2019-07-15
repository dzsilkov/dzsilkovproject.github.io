(function (window) {
  'use strict';

  class Game {

    constructor(options) {

      this.bombs = [];
      this.bombBangs = [];
      this.enemys = [];
      this.healths = [];
      this.bullets = [];
      this.bulletsBangs = [];
      this.plazmaBangs = [];
      this.plazmaShots = [];
      this.gameTimer = 0;
      this.player = undefined;
      this.menu = true;
      this.gameIsOver = false;
      this.exists = false;
      this.rules = false;
      this.records = [];
      this.canvas = null;
      this.context = null;
      this.gameEngine = undefined;
      this.fons = [];
      this.images = [];
      this.icons = [];
      this.background = null;
      this.bestPlayers = [];

    };

    init() {

      this.canvas = document.getElementById('game_background');
      this.canvas.width = parseInt(window.innerWidth);
      this.canvas.height = parseInt(window.innerHeight);
      this.areaWidth = parseInt(this.canvas.getAttribute('width'));
      this.areaHeiht = parseInt(this.canvas.getAttribute('height'));
      this.context = this.canvas.getContext('2d');

      this.menuThemeAudio = new Audio();
      this.menuThemeAudio.src = './assets/sound/menu_theme.mp3';
      this.menuThemeAudio.autoplay;
      this.menuThemeAudio.loop;


      this.gameThemeAudio = new Audio();
      this.gameThemeAudio.src = './assets/sound/game_theme.mp3';
      this.gameThemeAudio.autoplay;
      this.gameThemeAudio.loop;


      this.images.alienBigImage = new Image();
      this.images.alienBigImage.src = './assets/alienBig.jpg';

      this.images.arahnidBigImage = new Image();
      this.images.arahnidBigImage.src = './assets/arahnidBig.png';

      this.images.metroidBigImage = new Image();
      this.images.metroidBigImage.src = './assets/metroidBig.png';

      this.images.arahnidLeft = new Image();
      this.images.arahnidLeft.src = './assets/arahnidLeft.png';

      this.images.arahnidRight = new Image();
      this.images.arahnidRight.src = './assets/arahnidRight.png';

      this.icons.arahnidIcon = new Image();
      this.icons.arahnidIcon.src = './assets/arahnidIcon.png';

      this.images.alienLeft = new Image();
      this.images.alienLeft.src = './assets/alienLeft.png';

      this.images.alienRight = new Image();
      this.images.alienRight.src = './assets/alienRight.png';

      this.icons.alienIcon = new Image();
      this.icons.alienIcon.src = './assets/alienIcon.png';

      this.images.backgroundImage = new Image();
      this.images.backgroundImage.src = './assets/game_background3.png';

      this.background = new gameJS.Picture({
        image: this.images.backgroundImage,
        posX: 0,
        posY: 0,
        width: 1920,
        height: 1080,
        drawPosX: 0,
        drawPosY: 0,
        drawWidth: this.canvas.width,
        drawHeight: this.canvas.height,
      });

      this.images.metroidRightImage = new Image();
      this.images.metroidRightImage.src = './assets/metroidRight.png';

      this.images.metroidLeftImage = new Image();
      this.images.metroidLeftImage.src = './assets/metroidLeft.png';

      this.images.metroidRightAttImage = new Image();
      this.images.metroidRightAttImage.src = './assets/metroidRightAtt.png';

      this.images.metroidLeftAttImage = new Image();
      this.images.metroidLeftAttImage.src = './assets/metroidLeftAtt.png';

      this.images.metroidStandImage = new Image();
      this.images.metroidStandImage.src = './assets/metroidStand.png';

      this.icons.metroidIcon = new Image();
      this.icons.metroidIcon.src = './assets/metroidIcon.png';

      this.images.bullet = new Image();
      this.images.bullet.src = './assets/bullet.png';

      this.images.plazmaShot = new Image();
      this.images.plazmaShot.src = './assets/plazmaBullet.png';

      this.images.bulletBang = new Image();
      this.images.bulletBang.src = './assets/bulletBang.png';

      this.images.plazmaBang = new Image();
      this.images.plazmaBang.src = './assets/plazmaBang.png';

      this.images.bombImage = new Image();
      this.images.bombImage.src = './assets/bomb.png';

      this.images.bombBang = new Image();
      this.images.bombBang.src = './assets/bang.png';

      this.images.healthImage = new Image();
      this.images.healthImage.src = './assets/health.png';

      this.fons.push(new gameJS.Picture({
        image: this.images.alienBigImage,
        posX: 0,
        posY: 0,
        width: 1920,
        height: 1080,
        drawPosX: 0,
        drawPosY: 0,
        drawWidth: this.areaWidth,
        drawHeight: this.areaHeiht,
      }));
      this.fons.push(new gameJS.Picture({
        image: this.images.arahnidBigImage,
        posX: 0,
        posY: 0,
        width: 480,
        height: 270,
        drawPosX: -this.canvas.width / 7,
        drawPosY: this.canvas.height / 1.6,
        drawWidth: this.canvas.width / 2,
        drawHeight: this.canvas.height / 2,
      }));
      this.fons.push(new gameJS.Picture({
        image: this.images.metroidBigImage,
        posX: 0,
        posY: 0,
        width: 750,
        height: 422,
        drawPosX: 0,
        drawPosY: 0,
        drawWidth: this.canvas.width,
        drawHeight: this.canvas.height,
      }));


      this.player = new gameJS.Player({
        name: playerName,
        sprite: new gameJS.Sprite({
          image: this.images.metroidStandImage,
          framePosX: 0,
          framePosY: 0,
          frameWidth: 97.5,
          frameHeight: 80,
          animationSpeed: 0.3,
          arrFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          frameIndex: 0,
          animateDirection: 'horizontal',
          once: false,
        }),
        icon: new gameJS.Picture({
          image: this.icons.metroidIcon,
          posX: 0,
          posY: 0,
          width: 97,
          height: 80,
          drawPosX: 20,
          drawPosY: 30,
          drawWidth: 65,
          drawHeight: 50,
        }),
        status: new gameJS.Status({
          posX: 100,
          posY: 50,
          width: this.canvas.width / 3,
          height: 20,
          strokeStyle: '#0eb26d',
          fillStyle: '#ff6347',
          lineWidth: 2,
        }),
        posX: 0,
        posY: this.canvas.height - 200,
        speed: 6,
        width: 200,
        height: 150,
      });

      this.enemys.push(new gameJS.Arahnid({
        sprite: new gameJS.Sprite({
          image: this.images.arahnidRight,
          framePosX: 0,
          framePosY: 0,
          frameWidth: 320,
          frameHeight: 140,
          animationSpeed: 0.2,
          arrFrames: [0, 1, 2, 3, 4, 5],
          frameIndex: 0,
          animateDirection: 'horizontal',
          once: false,
        }),
        icon: new gameJS.Picture({
          image: this.icons.arahnidIcon,
          posX: 0,
          posY: 0,
          width: 126,
          height: 70,
          drawPosX: this.canvas.width - 100,
          drawPosY: 30,
          drawWidth: 65,
          drawHeight: 50,
        }),
        status: new gameJS.Status({
          posX: this.canvas.width / 2,
          posY: 100,
          width: this.canvas.width / 3,
          height: 20,
          strokeStyle: '#0eb26d',
          fillStyle: '#ff6347',
          lineWidth: 2,
        }),
        posX: 0,
        posY: this.canvas.height - 230,
        speed: 5,
        width: 380,
        height: 180,
      }));

      this.enemys.push(new gameJS.Alien({
        sprite: new gameJS.Sprite({
          image: this.images.alienRight,
          framePosX: 0,
          framePosY: 0,
          frameWidth: 151,
          frameHeight: 75,
          animationSpeed: 0.2,
          arrFrames: [0, 1, 2, 3, 4, 5, 6, 7],
          frameIndex: 0,
          animateDirection: 'horizontal',
          once: false,
        }),
        icon: new gameJS.Picture({
          image: this.icons.alienIcon,
          posX: 0,
          posY: 0,
          width: 96,
          height: 128,
          drawPosX: this.canvas.width - 100,
          drawPosY: 80,
          drawWidth: 65,
          drawHeight: 50,
        }),
        status: new gameJS.Status({
          posX: this.canvas.width / 2,
          posY: 50,
          width: this.canvas.width / 3,
          height: 20,
          strokeStyle: '#0eb26d',
          fillStyle: '#ff6347',
          lineWidth: 2,
        }),
        posX: 0,
        posY: this.canvas.height - 190,
        speed: 4,
        width: 260,
        height: 140,
      }));

      this.player.name = playerName;

      gameEngineStart(game.mainEngine);
    }


    mainEngine() {

      if (game.menu) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.fons.forEach((fon) => fon.render(this.context));
      }
      if (game.exists) {
        setGameEngine(game.runEngine);
        game.menu = false;
      }
    }

    runEngine() {

      if (game.exists) {
        if (this.player.health <= 0) {
          this.gameIsOver = true;
          bestPlayers.name = playerName;
          bestPlayers.poins = game.player.killedEnemy;
          storeData();
          switchToMain();
          this.stop();
        }
        this.update();
        this.render();
      }

      if (game.menu) {
        game.exists = false;
        this.gameTimer = 0;
        setGameEngine(game.mainEngine);
      }

    }

    update() {

      this.gameTimer++;

      if (this.gameTimer % 200 === 0) {
        this.bombs.push(new gameJS.Bomb({
          posX: getRandom(0, this.canvas.width),
          posY: -50,
          speed: 0,
          width: 80,
          height: 80,
        }));
      }

      if (this.gameTimer % 400 === 0) {
        this.healths.push(new gameJS.Health({
          posX: getRandom(0, this.canvas.width),
          posY: -50,
          speed: 0,
          width: 30,
          height: 30,
        }));
      }

      this.enemys.forEach((enemy, index) => {
        enemy.run = true;
        if (enemy.health <= 0) {
          game.player.killedEnemy++;
          this.enemys.splice(index, 1);
          this.enemys.push(new gameJS.Alien({
            sprite: new gameJS.Sprite({
              image: this.images.alienRight,
              framePosX: 0,
              framePosY: 0,
              frameWidth: 151,
              frameHeight: 75,
              animationSpeed: 0.2,
              arrFrames: [0, 1, 2, 3, 4, 5, 6, 7],
              frameIndex: 0,
              animateDirection: 'horizontal',
              once: false,
            }),
            icon: new gameJS.Picture({
              image: this.icons.alienIcon,
              posX: 0,
              posY: 0,
              width: 96,
              height: 128,
              drawPosX: this.canvas.width - 100,
              drawPosY: 80,
              drawWidth: 65,
              drawHeight: 50,
            }),
            status: new gameJS.Status({
              posX: this.canvas.width / 2,
              posY: 50,
              width: this.canvas.width / 3,
              height: 20,
              strokeStyle: '#0eb26d',
              fillStyle: '#ff6347',
              lineWidth: 2,
            }),
            posX: 0,
            posY: this.canvas.height - 190,
            speed: 4,
            width: 260,
            height: 140,
          }));
          this.enemys.push(new gameJS.Arahnid({
            sprite: new gameJS.Sprite({
              image: this.images.arahnidRight,
              framePosX: 0,
              framePosY: 0,
              frameWidth: 320,
              frameHeight: 140,
              animationSpeed: 0.2,
              arrFrames: [0, 1, 2, 3, 4, 5],
              frameIndex: 0,
              animateDirection: 'horizontal',
              once: false,
            }),
            icon: new gameJS.Picture({
              image: this.icons.arahnidIcon,
              posX: 0,
              posY: 0,
              width: 126,
              height: 70,
              drawPosX: this.canvas.width - 100,
              drawPosY: 30,
              drawWidth: 65,
              drawHeight: 50,
            }),
            status: new gameJS.Status({
              posX: this.canvas.width / 2,
              posY: 100,
              width: this.canvas.width / 3,
              height: 20,
              strokeStyle: '#0eb26d',
              fillStyle: '#ff6347',
              lineWidth: 2,
            }),
            posX: 0,
            posY: this.canvas.height - 230,
            speed: 5,
            width: 380,
            height: 180,
          }));
        }

        if (Math.abs(enemy.posX + 10 - this.player.posX - 30) < 100 && Math.abs(enemy.posY - this.player.posY) < 30) {
          this.player.health -= 1;
        }

        this.healths.forEach((health) => {
          if (Math.abs(enemy.posX + 10 - health.posX - 30) < 100 && Math.abs(enemy.posY - health.posY) < 30) {
            enemy.health += 4;
            this.healths.splice(this, 1)
          }
        });
        let x = enemy.posX + enemy.dx;
        if (x + enemy.width > this.canvas.width) {
          enemy.left = true;
          enemy.right = false;
        } else if (x < 0) {
          enemy.right = true;
          enemy.left = false;
        }
        this.bullets.forEach((bullet, index) => {
          let x = bullet.posX + bullet.speed;
          if (x + bullet.width > this.canvas.width || x + bullet.width >= enemy.posX && x + bullet.width < enemy.posX + enemy.width) {
            this.bulletsBangs.push(new gameJS.Bang({
              sprite: new gameJS.Sprite({
                image: this.images.bulletBang,
                framePosX: 0,
                framePosY: 0,
                frameWidth: 100,
                frameHeight: 100,
                animationSpeed: 0.5,
                arrFrames: [0, 1, 2, 3, 4, 5, 6],
                frameIndex: 0,
                animateDirection: 'horizontal',
                once: true,
              }),
              posX: bullet.posX + 30,
              posY: bullet.posY - 50,
              width: 150,
              height: 150,
            }));

            enemy.health--;
            this.bullets.splice(index, 1);
          }
          bullet.update();
        });

        this.plazmaShots.forEach((shot, index) => {
          let x = shot.posX + shot.speed;
          if (x + shot.width > this.canvas.width || x + shot.width >= enemy.posX && x + shot.width < enemy.posX + enemy.width) {
            this.plazmaBangs.push(new gameJS.Bang({
              sprite: new gameJS.Sprite({
                image: this.images.plazmaBang,
                framePosX: 0,
                framePosY: 0,
                frameWidth: 100,
                frameHeight: 100,
                animationSpeed: 0.6,
                arrFrames: [0, 1, 2, 3, 4, 5, 6],
                frameIndex: 0,
                animateDirection: 'horizontal',
                once: true,
              }),
              posX: shot.posX + 30,
              posY: shot.posY - 50,
              width: 250,
              height: 250,
            }));
            enemy.health--;
            this.plazmaShots.splice(index, 1);
          }
          shot.update();
        });
        enemy.update();
      });
      if (this.player.posX > this.canvas.width - this.player.width) {
        this.player.rightPressed = false;
      }
      if (this.player.posX < 0) {
        this.player.leftPressed = false;
      }
      this.player.update();

      this.enemys.forEach((enemy) => enemy.update());

      this.bullets.forEach((bullet) => bullet.update());

      this.plazmaShots.forEach((shot) => shot.update());

      this.bombs.forEach((bomb) => {
        bomb.update();
        if (Math.abs(bomb.posX + 10 - this.player.posX - 30) < 100 && Math.abs(bomb.posY - this.player.posY) < 30) {
          this.bombBangs.push(new gameJS.Bang({
            sprite: new gameJS.Sprite({
              image: game.images.bombBang,
              framePosX: 0,
              framePosY: 0,
              frameWidth: 224,
              frameHeight: 254,
              animationSpeed: 0.5,
              arrFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
              frameIndex: 0,
              animateDirection: 'horizontal',
              once: true,
            }),
            posX: bomb.posX - bomb.width / 2,
            posY: bomb.posY - 120,
            width: 200,
            height: 200,
          }));
          this.player.health -= 5;
          this.bombs.splice(this, 1)
        }
        this.enemys.forEach((enemy => {
          if (Math.abs(bomb.posX + 10 - enemy.posX - 30) < 100 && Math.abs(bomb.posY - enemy.posY) < 30) {
            this.bombBangs.push(new gameJS.Bang({
              sprite: new gameJS.Sprite({
                image: game.images.bombBang,
                framePosX: 0,
                framePosY: 0,
                frameWidth: 224,
                frameHeight: 254,
                animationSpeed: 0.5,
                arrFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                frameIndex: 0,
                animateDirection: 'horizontal',
                once: true,
              }),
              posX: bomb.posX - bomb.width / 2,
              posY: bomb.posY - 120,
              width: 200,
              height: 200,
            }));
            enemy.health -= 2;
            this.bombs.splice(this, 1)
          }
        }));
        if (Math.abs(bomb.posX + 10 - this.player.posX - 30) < 100 && Math.abs(bomb.posY - this.player.posY) < 30) {
          this.bombBangs.push(new gameJS.Bang({
            sprite: new gameJS.Sprite({
              image: game.images.bombBang,
              framePosX: 0,
              framePosY: 0,
              frameWidth: 224,
              frameHeight: 254,
              animationSpeed: 0.5,
              arrFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
              frameIndex: 0,
              animateDirection: 'horizontal',
              once: true,
            }),
            posX: bomb.posX - bomb.width / 2,
            posY: bomb.posY - 120,
            width: 200,
            height: 200,
          }));
          this.player.health -= 10;
          this.bombs.splice(this, 1)
        }

        let y = bomb.posY + bomb.speed;
        if (Math.abs(bomb.speed) < bomb.accel * 2 && bomb.posY + bomb.height >= this.canvas.height) {
          bomb.fall = false;
          bomb.speed = 0;
        }
        if (y + bomb.height >= this.canvas.height) {
          this.bombBangs.push(new gameJS.Bang({
            sprite: new gameJS.Sprite({
              image: game.images.bombBang,
              framePosX: 0,
              framePosY: 0,
              frameWidth: 224,
              frameHeight: 254,
              animationSpeed: 0.5,
              arrFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
              frameIndex: 0,
              animateDirection: 'horizontal',
              once: true,
            }),
            posX: bomb.posX - bomb.width / 2,
            posY: bomb.posY - 120,
            width: 200,
            height: 200,
          }));
          this.bombs.splice(this, 1)
        }
      });

      this.healths.forEach((health) => {
        health.update();
        if (!health.fall) {
          return
        }

        if (Math.abs(health.posX + 10 - this.player.posX - 30) < 100 && Math.abs(health.posY - this.player.posY) < 30) {
          this.player.health++;
          this.healths.splice(this, 1);
        }

        let y = health.posY + health.speed;

        if (Math.abs(health.speed) < health.accel * 2 && health.posY + health.height >= this.canvas.height) {
          health.fall = false;
          health.speed = 0;
        }
        if (y + health.height >= this.canvas.height) {
          this.healths.splice(this, 1)
        }
      });

      this.bombBangs.forEach((bang, index) => {
        if (bang.sprite.animateDone) {
          this.bombBangs.splice(index, 1);
        }
        bang.update();
      });

      this.bulletsBangs.forEach((bang, index) => {
        if (bang.sprite.animateDone) {
          this.bulletsBangs.splice(index, 1);
        }
        bang.update();
      });

      this.plazmaBangs.forEach((bang, index) => {
        if (bang.sprite.animateDone) {
          this.plazmaBangs.splice(index, 1);
        }
        bang.update();
      });
    };

    render() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.background.render(this.context);

      this.player.render(this.context);

      this.bullets.forEach((bullet) => bullet.render(this.context));

      this.plazmaShots.forEach((shot) => shot.render(this.context));

      this.enemys.forEach((enemy) => enemy.render(this.context));

      this.bombs.forEach((bomb) => bomb.render(this.context));

      this.healths.forEach((health) => health.render(this.context));

      this.bombBangs.forEach((bang) => bang.render(this.context));

      this.bulletsBangs.forEach((bang) => bang.render(this.context));

      this.plazmaBangs.forEach((bang) => bang.render(this.context));
    };

    stop() {
      this.menu = true;
    }

  }

  window.gameJS = window.gameJS || {};
  window.gameJS.Game = Game;
})(window);

