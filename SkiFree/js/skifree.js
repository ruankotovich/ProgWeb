
(function () {


  const MAIN_THEME = new Audio('./sfx/theme.mp3');
  const BOSS_THEME = new Audio('./sfx/bosstheme.mp3');
  const END = new Audio('./sfx/end.mp3');
  const HURT = new Audio('./sfx/hurt.mp3');
  const SCREAM = new Audio('./sfx/scream.mp3');
  const DYING = new Audio('./sfx/dying.mp3');
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
  let iceman;
  let directions = ['para-esquerda', 'para-frente', 'para-direita']
  let iceman_directions = ['iceman_lstep1', 'iceman_lstep2', 'iceman_rstep1', 'iceman_rstep2'];
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
    iceman = new Iceman();
    gameLoop = setInterval(run, 1000 / FPS);
    MAIN_THEME.play();
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
    this.nextIceman = 2000;
  }

  function Iceman() {
    this.element = document.createElement('div');
    hill.element.appendChild(this.element);
    this.element.className = "iceman_lstep1";
    this.computedStyle = window.getComputedStyle(this.element, null);
    this.lastStep = 1;
    this.online = false;

    this.start = () => {
      this.online = true;
      this.rebuild();
      BOSS_THEME.currentTime = MAIN_THEME.currentTime = 0;
      BOSS_THEME.pause();
      MAIN_THEME.pause();
      BOSS_THEME.play();
    }


    this.stop = () => {
      this.online = false;
      this.rebuild();
      BOSS_THEME.currentTime = MAIN_THEME.currentTime = 0;
      BOSS_THEME.pause();
      MAIN_THEME.pause();
      MAIN_THEME.play();
    }

    this.rebuild = () => {
      this.element.style.top = '-50px';
      this.element.style.left = parseInt(TAMX) >> 1 + parseInt(this.computedStyle.height) >> 1;
    }

    this.walk = (skier) => {
      let pos = skier.getPosition();

      this.lastStep = (this.lastStep + 1) % 8;

      if (pos.x > parseInt(this.computedStyle.left)) {
        this.element.style.left = `${parseInt(this.element.style.left) + 2}px`;
        this.element.className = `iceman_rstep${this.lastStep > 4 ? 1 : 2}`;
      } else if (pos.x < parseInt(this.computedStyle.left)) {
        this.element.className = `iceman_lstep${this.lastStep > 4 ? 1 : 2}`;
        this.element.style.left = `${parseInt(this.element.style.left) - 2}px`;
      } else {

        this.element.className = `iceman_rstep${this.lastStep > 4 ? 1 : 2}`;
      }

      if (parseInt(this.element.style.top) + parseInt(this.computedStyle.height) < pos.y) {

        if (parseInt(this.element.style.top) < -80) {
          this.stop();
        }

        this.element.style.top = `${parseFloat(this.element.style.top) + (2.8 - speed)}px`
      } else {
        this.element.style.top = `${parseFloat(this.element.style.top) - 0.1}px`
      }

      if (intersects(this.getPosition(), skier.getPosition())) {
        skier.die();
        skier.element.style.display = 'none';

        setTimeout(() => {
          this.element.className = 'iceman_eating1';
          setTimeout(() => {
            this.element.className = 'iceman_eating2';
            setTimeout(() => {
              this.element.className = 'iceman_eating3';
              setTimeout(() => {
                this.element.className = 'iceman_eating4';
                setTimeout(() => {
                  this.element.className = 'iceman_eating5';
                  setTimeout(() => {
                    this.element.className = 'iceman_eating6';
                    setTimeout(() => {
                      this.element.className = 'iceman_eating5';
                      setTimeout(() => {
                        this.element.className = 'iceman_eating6';
                        setTimeout(() => {
                          this.element.className = 'iceman_eating7';
                          SCREAM.play();
                        }, 500);

                      }, 600);

                    }, 500);
                  }, 700);

                }, 400);

              }, 400);
            }, 400);
            DYING.play();
          }, 400);

        }, 100);

      }

    }


    this.getPosition = () => {
      let x0 = parseInt(this.computedStyle.left);
      return { y: parseInt(this.computedStyle.top) + parseInt(this.computedStyle.height), height: 1, x: x0, width: parseInt(this.computedStyle.width) };
    }

    this.rebuild();
  }

  function Skier() {

    this.element = document.getElementById("skier");
    this.direcao = 1; //0-esquerda;1-frente;2-direita
    this.element.className = 'para-frente';
    this.element.style.top = '30%';
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
        this.element.className = 'raw-died';
        this.die();
      } else {
        HURT.play();
        this.element.className = 'queda';
        setTimeout(() => {
          if (this.alive) {
            speed = 2;
            this.element.className = 'para-frente'
            this.notInLockdown = true;
          }
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
      speed = 0;
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
      if (skier.distance >= hill.nextIceman) {
        if (!iceman.online) {
          iceman.start();
          hill.nextIceman += 2000;
        }
      }

      panel.refresh(skier);
      obstacles = nextItObstacles;
      skier.andar();
      if (iceman.online) {
        iceman.walk(skier);
      }
    }

  }

  init();

})();

