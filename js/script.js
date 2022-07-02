window.addEventListener('DOMContentLoaded', () => {
    const field = document.querySelector('.field'),
      ship = document.querySelector('.ship'),
      body = document.querySelector('body'),
      fireBox = document.querySelector('.fire_box'),
      styleBoom = document.querySelector('.style_boom');
      
      console.log(styleBoom);
let count = 1;
let countEndGame = true;
// создание выпадающих блоков

function appendBlock() {
    const block = document.createElement('div');
    count++;
    const left = Math.random() * 700;
    block.classList.add(`block`);
    block.classList.add(`block${count}`);
       
    field.insertAdjacentElement('afterbegin', block);
    const blockObserve = document.querySelector(`.block${count}`);
    blockObserve.style.left = `${left}px`;
    
    console.log(blockObserve.clientTop);
    console.log(ship.clientLeft);
    // Отслеживание блоков и реализация проиграша
    function gameEnd() {
        if(countEndGame){
            countEndGame = false;
            for (let i = 1; i < 500; i++){
                appendBoom();
            }
            setTimeout(()=>{
                location.reload();
            }, 4000);
            ship.style.animation = 'none';
            ship.style.visibility = 'hidden';
            clearInterval(fire1);
            clearInterval(fire2);
            clearInterval(fire3);
            clearInterval(gameOver);
        }    
    }
            
    let gameOver = setInterval(() => {  
        if(blockObserve.getBoundingClientRect().top > 765 && blockObserve.getBoundingClientRect().top < 845 && 
            blockObserve.getBoundingClientRect().left > (ship.getBoundingClientRect().left - 100) && 
            blockObserve.getBoundingClientRect().left < (ship.getBoundingClientRect().left + 30)){
            gameEnd();
        }else if (blockObserve.getBoundingClientRect().top > 730 && blockObserve.getBoundingClientRect().top < 880 && 
        blockObserve.getBoundingClientRect().left > (ship.getBoundingClientRect().left - 85) && 
        blockObserve.getBoundingClientRect().left < (ship.getBoundingClientRect().left + 15)){
            gameEnd();
        }else if (blockObserve.getBoundingClientRect().top > 747 && blockObserve.getBoundingClientRect().top < 863 && 
        blockObserve.getBoundingClientRect().left > (ship.getBoundingClientRect().left - 92) && 
        blockObserve.getBoundingClientRect().left < (ship.getBoundingClientRect().left + 22)){
            gameEnd();
        }else if (blockObserve.getBoundingClientRect().top > 738 && blockObserve.getBoundingClientRect().top < 872 && 
        blockObserve.getBoundingClientRect().left > (ship.getBoundingClientRect().left - 95) && 
        blockObserve.getBoundingClientRect().left < (ship.getBoundingClientRect().left + 25)){
            gameEnd();
        } else {
            
        }  
    },1);
    
    setTimeout(()=>{
        clearInterval(gameOver);
    }, 3000);
    setTimeout(() => {
        blockObserve.remove();
    }, 3300);

}
// звезды
let countStar = 1;
let removeStar = 100;
function appendStar() {
    const star = document.createElement('div');
    countStar++;
    const left = Math.random() * 1920;
    star.classList.add(`star`);
    star.classList.add(`star${countStar}`);
       
    body.insertAdjacentElement('afterbegin', star);
    const starObserve = document.querySelector(`.star${countStar}`);
    starObserve.style.left = `${left}px`;
    setTimeout(() => {
        starObserve.remove();
    }, 600);
}
// огонь
let countFire = 1;
function appendFire() {
    const fire = document.createElement('div');
    const fireRed = document.createElement('div');
    countFire++;
    const left = Math.random() * 28;
    const leftRed = 9 + Math.random() * 10;
    fire.classList.add(`fire`);
    fire.classList.add(`fire${countFire}`);
    fireRed.classList.add(`firered`);
    fireRed.classList.add(`firered${countFire}`);   
    fireBox.insertAdjacentElement('afterbegin', fire);
    fireBox.insertAdjacentElement('afterbegin', fireRed);
    const fireObserve = document.querySelector(`.fire${countFire}`);
    const fireRedObserve = document.querySelector(`.firered${countFire}`);
    fireObserve.style.left = `${left}px`;
    fireRedObserve.style.left = `${leftRed}px`;
    setTimeout(() => {
        fireRedObserve.remove();
    }, Math.random()*250);
    setTimeout(() => {
        fireObserve.remove();
    }, Math.random()*400);
}
// запуск огня
function intervalFire() {
    setTimeout(appendFire, Math.random()*1);
}
let fire1 = setInterval(intervalFire, 1);

let fire2 = setInterval(intervalFire, 1);

let fire3 = setInterval(intervalFire, 1);

// запуск звезд
function intervalStar() {
    setTimeout(appendStar, Math.random()*30);
}
setInterval(intervalStar, 30);

// запуск камней
function interval() {
    setTimeout(appendBlock, Math.random()*400);
}
setInterval(interval, 300);

//Движение

let intRight,
    intLeft,
    intBottom,
    intTop;
document.addEventListener('keyup', (e) => {
    if(e.code === 'ArrowRight' || e.code === 'ArrowLeft'){
        clearInterval(intRight);
        clearInterval(intLeft);
    }  
},);
/* document.addEventListener('keyup', (e) => {
    if(e.code === 'ArrowUp' || e.code === 'ArrowBottom'){
        clearInterval(intTop);
        clearInterval(intBottom);
    }  
},); */

document.addEventListener('keydown', (e) => {
    if(countEndGame){
        clearInterval(intLeft);
        clearInterval(intRight);
        clearInterval(intTop);
        clearInterval(intBottom);

        
        
        if (e.code === 'ArrowRight'){
            let x = ship.offsetLeft;
        
            intRight = setInterval(() => {
                if (x < 785){
                    x += 3;
                    ship.style.left = `${x}px`;
                }   
            } ,1);  
        }
        

        if (e.code === 'ArrowLeft'){
            let x = ship.offsetLeft;
            intLeft = setInterval(() => {
                if (x > 15){
                    x -= 3;
                    ship.style.left = `${x}px`;
                }
            } ,1);
        }  
    }
/*     if (e.code === 'ArrowUp'){
        let x = ship.offsetTop;
        intTop = setInterval(() => {
            if (x > 750){
                x = x - 3;
                ship.style.top = `${x}px`;
            }   
        } ,1);  
    }
    if (e.code === 'ArrowDown'){
        let x = ship.offsetTop;
        intBottom = setInterval(() => {
            if (x < 820){
                x = x + 3;
                ship.style.top = `${x}px`;
            }   
        } ,1);  
    } */
});

 //Взрыв
    let countBoom = 1;
    function appendBoom() {
        const piece = document.createElement('div');
        const firepiece = document.createElement('div');
        countBoom++;
        const top = Math.random() * 2000-1500;
        const left = Math.random() * 2000 - 1000;
        let speedLeft = 2;
        let speedTop = 2;
        for (let i = 10; i <  Math.abs(left/2);i = i + 10){
            speedLeft = speedLeft + 0.04;
        }
        for (let i = 10; i <  Math.abs(top/2);i = i + 10){
            speedTop = speedTop + 0.04;
        }
        const speed = (speedTop + speedLeft) / 2;
        /*  styleBoom.innerHTML = `:root {
            --topRandom: ${top}px;
            --leftRandom: ${left}px;
          }`; */
        piece.classList.add(`piece`); 
        piece.classList.add(`piece${countBoom}`); 
        
        fireBox.insertAdjacentElement('afterbegin', piece);
        const boomObserve = document.querySelector(`.piece${countBoom}`);
        boomObserve.innerHTML = `<style>@keyframes boom${countBoom}{
            from {
              top: -55px;
              left: -10px;
              width: 50px;
              height: 50px;
            }
            to {
              top: ${top}px;
              left: ${left}px;
              width: 1px;
              height: 1px;
            }
          }
          .piece${countBoom} {
            animation: boom${countBoom} ${speed}s ease-out 1;
          }
          </style>`; 
        setTimeout(() => {
            boomObserve.remove();
        }, (speed * 1000 - 100)); 
    }
});









