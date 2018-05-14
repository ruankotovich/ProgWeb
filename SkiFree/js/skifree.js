(()=>{
  new Audio('./sfx/theme.mp3').play();
})();

(function () {

  let SPEED = 20;
  let OVERFLOW = false;
  const FPS = 60;
  const TAMX = 800;
  const TAMY = 600;
  const PROB_ARVORE = .5;
  const OVERFLOW_LIMIT_LEFT = 80;
  const OVERFLOW_LIMIT_RIGHT = TAMX - OVERFLOW_LIMIT_LEFT;

  var gameLoop;
  var montanha;
  var skier;
  var direcoes = ['para-esquerda','para-frente','para-direita']
  var horizontal_speed = [-2,0,2];
  var arvores = [];

  function init () {
    montanha = new Montanha();
    skier = new Skier();
    gameLoop = setInterval(run, 1000/FPS);
  }

  window.addEventListener('keydown', function (e) {
    if (e.key == 'a') skier.mudarDirecao(-1);
    else if (e.key == 'd') skier.mudarDirecao(1);
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
          OVERFLOW = false;
        }else{
          OVERFLOW = true;
        }
      }
      if (this.direcao == 2) {
        if(parseInt(this.element.style.left) < OVERFLOW_LIMIT_RIGHT){
          this.element.style.left = (parseInt(this.element.style.left)+horizontal_speed[this.direcao]) + "px";
          OVERFLOW = false;
        }else{
          OVERFLOW = true;
        }
      }
    }
  }

  function Arvore() {
    this.element = document.createElement('div');
    montanha.element.appendChild(this.element);
    this.element.className = 'arvore';
    this.element.style.top = TAMY + "px";
    this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
  }

  function run () {
    var random = Math.floor(Math.random() * 1000);

    if (random <= PROB_ARVORE*10*SPEED) {
      var arvore = new Arvore();
      arvores.push(arvore);
    }

    arvores.forEach(function (a) {
      a.element.style.top = (parseInt(a.element.style.top)-(FPS/SPEED)) + "px";
      if(OVERFLOW){
        a.element.style.left = (parseInt(a.element.style.left)-horizontal_speed[skier.direcao]) + "px";
      }
    });
    skier.andar();
  }

  init();

})();
