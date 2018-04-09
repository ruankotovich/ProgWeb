const TurnStatus = {
    DRAW : 0,
    WIN : 1,
    LOSE : 2,
    END : 3
};

function randomNumber(pFrom, pTo){
    return Math.floor((Math.random() * pTo) + pFrom);
}

function evaluateStatus(pStatus){
    switch(pStatus){
        case TurnStatus.DRAW:{console.log("É um empate!");}break;
        case TurnStatus.WIN:{console.log("Você ganhou!");}break;
        case TurnStatus.LOSE:{console.log("Você perdeu!");}break;
        case TurnStatus.END:{console.log("Fim de Jogo!");}break;
        
    }
}

function turn(px){
    let x = parseInt(px);
    
    switch(x){

        case 1:{
            let cpuTurn = randomNumber(1,3);
            return (cpuTurn == 1? TurnStatus.DRAW : (cpuTurn == 2? TurnStatus.WIN : TurnStatus.LOSE));
        }break;
        
        case 2:{
            let cpuTurn = randomNumber(1,3);
            return (cpuTurn == 2? TurnStatus.DRAW : (cpuTurn == 3? TurnStatus.WIN : TurnStatus.LOSE));
        }break;
        
        case 3:{
            let cpuTurn = randomNumber(1,3);
            return (cpuTurn == 3? TurnStatus.DRAW : (cpuTurn == 1? TurnStatus.WIN : TurnStatus.LOSE));
        }break;
        
        default:{
            return TurnStatus.END;
        } break;
    }
}

function play(){
    let puntuaction = 0;
    let curTurn;
    
    console.log("1 - Papel\n2 - Pedra\n3 - Tesoura");
       
    do{
        console.log(`GoGoGo, você está com ${puntuaction} ponto${puntuaction != 1 ? "s":""}`);
        curTurn = turn(prompt());
        evaluateStatus(curTurn);
        
        if(curTurn == TurnStatus.WIN){
            ++puntuaction;
        }
        
    }while(curTurn <= TurnStatus.WIN);
    
    console.log("Obrigado por jogar ;)");
          
}
