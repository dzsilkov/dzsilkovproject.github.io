'use strict';

const ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";

let updatePassword;

const strName = 'SILKOV_DRINKS_AJAXSTORAGE';

let playerName;

let bestPlayers = [{name: 'denis', points: '45'}, {name: 'Vasja', points: '78'}, {name: 'Петя Петров', points: '34'}];

restoreData();

function restoreData() {

  $.ajax(
    {
      url : ajaxHandlerScript,
      type : 'POST',
      cache : false,
      dataType:'json',
      data : {
        f : 'READ',
        n : strName },
      success : resultReady,
      error : errorHandler,
    }
  );
}

function resultReady(resultData) {
  if ( resultData.error !== undefined ) {
    alert(resultData.error);
  } else if ( resultData.result !== '' ) {
    bestPlayers = JSON.parse(resultData.result);
    console.log(bestPlayers);
  }
}

function storeData() {

  updatePassword = Math.random();
  $.ajax(
    {
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'LOCKGET',
        n: strName,
        p: updatePassword
      },
      cache: false,
      success: lockGetReady,
      error: errorHandler
    }
  );
}

function lockGetReady(resultData) {
  if (resultData.error !== undefined) {
    alert(resultData.error);
  } else {
    $.ajax(
      {
        url: AjaxHandlerScript,
        type: 'POST',
        data: {
          f: 'UPDATE',
          n: strName,
          v: JSON.stringify(bestPlayers),
          p: updatePassword
        },
        cache: false,
        success: updateReady,
        error: errorHandler
      }
    );
  }
}

function updateReady(resultData) {
  if (resultData.error !== undefined) {
    alert(resultData.error);
  }
}

function errorHandler(jqXHR, StatusStr, ErrorStr) {
  alert(StatusStr + ' ' + ErrorStr);
}

function generateGame() {
  let parent = document.getElementById('game_zone');
  let game = document.createElement('div');
  game.id = 'game_wrapper';
  parent.appendChild(createCanvas('game_background'));
  parent.appendChild(game);
  parent.appendChild(createModal(parent));
}

function createCanvas(id) {
  let canvas = document.createElement('canvas');
  let text = document.createTextNode('Sorry, canvas API is not supported');
  canvas.id = id;
  canvas.style.position = 'absolute';
  canvas.style.display = 'block';
  canvas.style.zIndex = '-99';
  canvas.appendChild(text);
  return canvas;
}

function createModal (parent){
  let modal = document.createElement('div');
  let shadow = document.createElement('div');
  shadow.id = 'shadow';
  shadow.setAttribute('onclick','alert(\' вы не ввели своё имя!\')');
  parent.appendChild(shadow);
  modal.id = 'modal';
  modal.className = 'modal_name';
  modal.style.position = 'fixed';
  modal.style.zIndex = '999';
  modal.innerHTML = `
  <h2 style="margin: 1em;"> Добро пожаловать</h2>
  <p style="margin: 1em;">Введите ваше имя:</p>
  <!--<form id="name">-->
      <input id="input_name" type="text" name="input_name" form="name" autofocus autocomplete="off" style="font-size: 1em; padding: 0.5em; margin: 1em; border-radius: 0.3em; background-color: antiquewhite" value="">
      <input id="enter_name" type="submit" value="начать игру" class="game_button" onclick="getPlayerName()">
  <!--</form> -->
  `;
  return modal;
}

function destroyElement(id) {
  let el = document.getElementById(id);
  el.parentNode.removeChild(el)
}

generateGame();

function getPlayerName() {
  try {
    let inputName = document.getElementById('input_name');
    playerName = inputName.value;

    let nameRE = /^[a-zA-Zа-яА-Я][а-яА-Яa-zA-Z0-9]{1,10}$/;
    if (!nameRE.test(playerName)) {
      alert('Пожалуйста введите имя корректно!');
      inputName.focus();
      return false;
    }

    game.menuThemeAudio.play();
    switchToStateFromURLHash();
    destroyElement('shadow');
    destroyElement('modal');
    return true;
  }
  catch (E) {
    return false;
  }
}

let game = new gameJS.Game();

document.addEventListener("keydown", keyRightHandler, false);
document.addEventListener("keyup", keyLeftHandler, false);

function keyRightHandler(e) {
  if (e.keyCode === 39) {
    game.player.rightPressed = true;
    console.log('right')
  }
  if (e.keyCode === 37) {
    game.player.leftPressed = true;
    console.log('left')
  }
  if (e.keyCode === 38) {
    game.player.jump = true;
    console.log('jump')
  }
  if (e.keyCode ===  16) {
    e.preventDefault();
    game.player.shooting = true;
    console.log('shot')
  }
  if (e.keyCode ===  17) {
    e.preventDefault();
    game.player.plazmaShooting = true;
    console.log('pzhot')
  }
}

function keyLeftHandler(e) {
  if (e.keyCode === 39) {
    game.player.rightPressed = false;
  }
  if (e.keyCode === 37) {
    game.player.leftPressed = false;
  }
  if (e.keyCode === 16) {
    e.preventDefault();
    game.player.shootingt = false;
  }
  if (e.keyCode === 17) {
    e.preventDefault();
    game.player.plazmaShooting = false;
  }
}
document.addEventListener("touchstart", touchStartHandler, true);
document.addEventListener("touchend", touchEndHandler, true);


function touchStartHandler(e) {
  if (e.type === 'touchstart' && e.touches[0].pageX > game.player.posX + (game.player.width / 2)) {
    game.player.rightPressed = true;
  }
  if (e.type === 'touchstart' && e.touches[0].pageX < game.player.posX + (game.player.width / 2)) {
    game.player.leftPressed = true;
  }
  if (e.type === 'touchstart' && e.touches[0].pageY < game.player.posY) {
    game.player.jumpPressed = true;
  }
}

function touchEndHandler(e) {
  if (e.type === 'touchend') {
    // e.preventDefault();
    // e.stopPropagation();
    game.player.rightPressed = false;
    game.player.leftPressed = false;
  }
}


//ANIMATION FRAME

function gameEngineStart(engine) {
  game.gameEngine = engine;
  gameEngineStep();
}

function gameEngineStep() {
  game.gameEngine();
  nextGameStep(gameEngineStep)
}

let nextGameStep =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

function setGameEngine(engine) {
  game.gameEngine = engine;
  // gameEngineStep();
}

game.init();

window.onhashchange = switchToStateFromURLHash;

window.onbeforeunload = function (EO) {
  EO = EO || window.event;
  if (gameExists) {
    EO.returnValue = 'Возможно некоторые изменения не были сохранены. Вы уверены, что хотите покинуть страницу?';
  }
};

let SPAState = {};

function switchToStateFromURLHash() {

  let hash = window.location.hash;

  let stateStr = decodeURIComponent(hash.substr(1));

  if (stateStr === '') {
    SPAState = {pageHTML: 'Main'};

  } else {
    SPAState = JSON.parse(stateStr);
  }

  let pageHTML = "";

  switch ( SPAState.pageHTML ) {

    case 'Main':
      pageHTML += `
      <ul class="game_menu" style="position: ">
      <li class="gameMain, game_button" style="text-align: center" onclick="switchToMain()">Main</li>
      <li class="gameGame, game_button" style="text-align: center" onclick="switchToGame()">Game</li>
      <li class="gameRules, game_button" style="text-align: center" onclick="switchToRules()">Rules</li>
      <li class="gameRecords, game_button" style="text-align: center" onclick="switchToRecords()">Records</li>
      </ul>
      `;

      game.exists = false;
      game.menu = true;
      game.gameThemeAudio.pause();
      game.menuThemeAudio.play();
      break;

    case 'Game':
      pageHTML += `
      <canvas id="game_canvas" style="position: absolute; display: block">'Sorry, canvas API is not supported'
      </canvas>
      <span class="gameMenu game_button" style="position: absolute" onclick="switchToMain()">Back To Main</span>

      `;
      game.menu = false;
      game.exists = true;
      game.menuThemeAudio.pause();
      game.gameThemeAudio.play();


      break;

    case 'Rules':

      pageHTML += `
      <span class="gameMenu game_button" style="position: absolute" onclick="switchToMain()">Back To Main</span>
      <div class="rules">
      <h3 class="rules_header" style="text-align: center; color: rgba(255, 99, 71, .8)">Rules</h3> 
      </div>
      `;

      // game.gameExists = false;

      break;

    case 'Records':
      pageHTML += "<span class='gameMenu game_button' style='position: absolute;' onclick='switchToMain()'>Back To Main</span>";
      pageHTML += "<h3 class='bestPlayers' style=' color: rgba(255, 99, 71, .8)'>Best Players</h3>";
      pageHTML += "<table class='table' align='center'>";
      game.bestPlayers.forEach((record, i) => {
        pageHTML += "<tr><td>" + (i + 1) + "</td><td>" + record.name + "</td><td>" + record.points + "</td></tr>";
      });
      pageHTML += "</table>";

      // game.gameExists = false;

      break
  }

  document.getElementById('game_wrapper').innerHTML = pageHTML;


  if (SPAState.pageHTML === 'Game') {
  }

  if (SPAState.pageHTML === 'Main') {
  }
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}

function switchToMain() {
  switchToState( { pageHTML:'Main' } );
}

function switchToGame() {
  switchToState( { pageHTML:'Game'} );
}

function switchToRules() {
  switchToState( { pageHTML:'Rules' } );
}

function switchToRecords() {
  switchToState( { pageHTML:'Records' } );
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

