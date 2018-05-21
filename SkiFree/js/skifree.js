(()=>{
  new Audio('./sfx/theme.mp3').play();
})();

(function () {

  let OBSTACLE_CLASSES = []
  
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(70).fill("tree"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(10).fill("big_tree"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(5).fill("flame_brush"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(5).fill("tree_trunk"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(5).fill("rock"));
  OBSTACLE_CLASSES = OBSTACLE_CLASSES.concat(Array(50).fill("dog"));

  const FPS = 60;
  const TAMX = 800;
  const TAMY = 600;
  const PROB_OBSTACLE = .5;
  const OVERFLOW_LIMIT_LEFT = 80;
  const OVERFLOW_LIMIT_RIGHT = TAMX - OVERFLOW_LIMIT_LEFT;
  let speed = FPS/20;
  let overflow = false;

  var gameLoop;
  var montanha;
  var skier;
  var direcoes = ['para-esquerda','para-frente','para-direita']
  var horizontal_speed = [-2,0,2];
  var obstacles = [];

  function init () {
    montanha = new Montanha();
    skier = new Skier();
    gameLoop = setInterval(run, 1000/FPS);
  }

  window.addEventListener('keydown', function (e) {
    if (e.key == 'a') skier.mudarDirecao(-1);
    else if (e.key == 'd') skier.mudarDirecao(1);
    else if(e.key == 'f') speed = speed > FPS/20? FPS/20 : FPS/30;
  });

  function Montanha () {
    this.element = document.getElementById("montanha");
    this.element.style.width = TAMX + "px";
    this.element.style.height = TAMY + "px";
  }

  function Skier() {

    this.element = document.getElementById("skier");
    this.direcao = 1; //0-esquerda;1-frente;2-direita
    this.element.className = 'para-frente';
    this.element.style.top = '30px';
    this.element.style.left = parseInt(TAMX/2)-7 + 'px';

    this.mudarDirecao = function (giro) {
      if (this.direcao + giro >=0 && this.direcao + giro <=2) {
        this.direcao += giro;
        this.element.className = direcoes[this.direcao];
      }
    }

    this.andar = function () {
      if (this.direcao == 0) {

        if(parseInt(this.element.style.left) > OVERFLOW_LIMIT_LEFT){
          this.element.style.left = (parseInt(this.element.style.left)+horizontal_speed[this.direcao]) + "px";
          overflow = false;
        }else{
          overflow = true;
        }
      }
      if (this.direcao == 2) {
        if(parseInt(this.element.style.left) < OVERFLOW_LIMIT_RIGHT){
          this.element.style.left = (parseInt(this.element.style.left)+horizontal_speed[this.direcao]) + "px";
          overflow = false;
        }else{
          overflow = true;
        }
      }
    }
  }

  function Obstacle() {
    this.element = document.createElement('div');
    montanha.element.appendChild(this.element);
    this.element.className = OBSTACLE_CLASSES[Math.floor(Math.random() * OBSTACLE_CLASSES.length)];
    this.element.style.top = TAMY + "px";
    this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
  }

  function run () {
    var random = Math.floor(Math.random() * 1000);

    if (random <= PROB_OBSTACLE*100*speed) {
      var obstacle = new Obstacle();
      obstacles.push(obstacle);
    }

    obstacles.forEach(function (a) {
      a.element.style.top = (parseInt(a.element.style.top)-speed) + "px";
      if(overflow){
        a.element.style.left = (parseInt(a.element.style.left)-horizontal_speed[skier.direcao]) + "px";
      }
    });
    skier.andar();
  }

  init();

})();
