
(function () {


  const MAIN_THEME = new Audio('./sfx/theme.mp3');
  const BOSS_THEME = new Audio('./sfx/bosstheme.mp3');
  const END = new Audio('./sfx/end.mp3');
  let OBSTACLE_CLASSES = []

  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(70).fill("tree"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(10).fill("big_tree"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(5).fill("flame_brush"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(5).fill("tree_trunk"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(5).fill("rock"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(2).fill("dog"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(1).fill("mushroom"));

  const FPS = 60;
  const TAMX = 800;
  const TAMY = 600;
  const PROB_OBSTACLE = .5;
  const OVERFLOW_LIMIT_LEFT = 80;
  const OVERFLOW_LIMIT_RIGHT = TAMX - OVERFLOW_LIMIT_LEFT;
  let speed = 2;
  let overflow = false;
  let gameLoop;
  let hill;
  let skier;
  let panel;
  let directions = ['para-esquerda', 'para-frente', 'para-direita']
  let horizontal_speed = [-2, 0, 2];
  let obstacles = [];
  function intersects(a, b) {
    return !(a.x + a.width < b.x || b.x + b.width < a.x || a.y + a.height < b.y || b.y + b.height < a.y)
  }

  function init() {
    hill = new Hill();
    skier = new Skier();
    panel = new LateralPanel();
    panel.refresh(skier);
    gameLoop = setInterval(run, 1000 / FPS);
    MAIN_THEME.play()
  }

  window.addEventListener('keydown', function (e) {
    if (skier.notInLockdown) {
      if (e.keyCode == 37) skier.changeDirection(-1);
      else if (e.keyCode == 39) skier.changeDirection(1);
      else if (e.keyCode == 40) speed = speed == 2 ? 3 : 2;
    }
  });

  function LateralPanel() {
    this.element = document.getElementById('panel');

    this.refresh = (skier) => {
      this.element.innerHTML = `Distância : ${skier.distance}<br>Vidas : ${skier.lifes}<br>Velocidade : ${speed * 10}m/s`;
    }

    this.finalPuntuaction = (pt) => {
      this.element.innerHTML = `<center><b><font color='red'>Você morreu!</font></b><br>Sua pontuação é <b>${pt}.</b><br><a href='javascript:window.location.href=window.location.href'>Tentar Novamente</a></center>`;
    }
  }

  function Hill() {
    this.element = document.getElementById("montanha");
    this.element.style.width = TAMX + "px";
    this.element.style.height = TAMY + "px";
  }

  function Skier() {

    this.element = document.getElementById("skier");
    this.direcao = 1; //0-esquerda;1-frente;2-direita
    this.element.className = 'para-frente';
    this.element.style.top = '80px';
    this.element.style.left = parseInt(TAMX / 2) - 7 + 'px';
    this.computedStyle = window.getComputedStyle(this.element, null);
    this.notInLockdown = true;
    this.distance = 0;
    this.lifes = 3;
    this.alive = true;
    this.hitObstacle = () => {
      --this.lifes;

      this.notInLockdown = false;
      speed = 0;
      this.direcao = 1;

      if (this.lifes < 0) {
        this.die();
      } else {

        this.element.className = 'queda';
        setTimeout(() => {
          speed = 2;
          this.element.className = 'para-frente'
          this.notInLockdown = true;
        }, 1000);

      }
    }

    this.die = () => {
      BOSS_THEME.currentTime = MAIN_THEME.currentTime = 0;
      BOSS_THEME.pause();
      MAIN_THEME.pause();
      END.play();

      this.alive = false;
      this.lifes = 0;
      this.element.className = 'died';
      panel.finalPuntuaction(this.distance);
    }

    this.getPosition = () => {
      let x0 = parseInt(this.computedStyle.left);
      return { y: parseInt(this.computedStyle.top) + parseInt(this.computedStyle.height), height: 1, x: x0, width: parseInt(this.computedStyle.width) };
    }

    this.changeDirection = function (giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        this.element.className = directions[this.direcao];
      }
    }

    this.andar = function () {
      if (this.direcao == 0) {

        if (parseInt(this.element.style.left) > OVERFLOW_LIMIT_LEFT) {
          this.element.style.left = (parseInt(this.element.style.left) + horizontal_speed[this.direcao]) + "px";
          overflow = false;
        } else {
          overflow = true;
        }
      }
      if (this.direcao == 2) {
        if (parseInt(this.element.style.left) < OVERFLOW_LIMIT_RIGHT) {
          this.element.style.left = (parseInt(this.element.style.left) + horizontal_speed[this.direcao]) + "px";
          overflow = false;
        } else {
          overflow = true;
        }
      }
    }
  }

  function Obstacle() {
    this.element = document.createElement('div');
    hill.element.appendChild(this.element);
    this.element.className = OBSTACLE_CLASSES[Math.floor(Math.random() * OBSTACLE_CLASSES.length)];
    this.element.style.top = TAMY + "px";
    this.element.style.left = (-300 + Math.floor(Math.random() * TAMX) + 300) + "px";
    this.computedStyle = window.getComputedStyle(this.element, null);
    this.notEroded = true;

    this.getPosition = () => {

      let x0 = parseInt(this.computedStyle.left);
      let heightOverlay = parseInt(this.computedStyle.height) / 2;
      let y0 = parseInt(this.computedStyle.top);

      return { y: y0 + heightOverlay, height: heightOverlay, x: x0, width: parseInt(this.computedStyle.width) };
    }
  }

  function run() {
    var random = Math.floor(Math.random() * 1000);

    let nextItObstacles = [];
    let positionSkier = skier.getPosition();

    if (random <= PROB_OBSTACLE * 70 * speed) {
      var obstacle = new Obstacle();
      obstacles.push(obstacle);
    }

    obstacles.forEach(function (a) {
      a.element.style.top = (parseInt(a.element.style.top) - speed) + "px";
      if (overflow) {
        a.element.style.left = (parseInt(a.element.style.left) - horizontal_speed[skier.direcao]) + "px";
      }

      if (parseInt(a.element.style.top) > -100) {
        let positionObstacle = a.getPosition();

        if (a.notEroded && intersects(positionObstacle, positionSkier)) {
          console.log(positionObstacle, '<->', positionSkier);
          a.notEroded = false;
          console.log(a.element.className);
          if (a.element.className !== "mushroom") {
            skier.hitObstacle();
          } else {
            skier.lifes++;
          }
        }

        nextItObstacles.push(a);
      }

    });

    if (skier.alive) {
      skier.distance += speed;
      panel.refresh(skier);
      obstacles = nextItObstacles;
      skier.andar();
    }

  }

  init();

})();
