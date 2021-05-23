let inputdir ={x:0,y:0};
let speed=7;
let lastpainttime=0;
let score=0;
let snakearr=[
    {x: 15,y: 12}
];
let food={x: 9,y: 2};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=ctime;
    gameengine();
}

function iscollide(snake){
    for(let i=1;i<snakearr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if((snake[0].x>=18 || snake[0].x<=0) || (snake[0].y>=18 || snake[0].y<=0)){
        return true;
    }
}

function gameengine(){
    if(iscollide(snakearr)){
        inputdir={x:0,y:0};
        alert("game over! press any key");
        snakearr=[{x: 15,y: 12}]
        score=0;
        scorebox.innerHTML="Score: "+score;
    }

    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        snakearr.unshift({x:snakearr[0].x+inputdir.x,y:snakearr[0].y+inputdir.y});
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML="Highest Score: "+ hiscoreval;
        }
        scorebox.innerHTML="Score: "+score;
        let a=2;
        let b=16;
        food={x:2+Math.round(a+(b-a)*Math.random()),y:2+Math.round(a+(b-a)*Math.random())};
    }

    for(let i=snakearr.length-2;i>=0;i--){
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x+=inputdir.x;
    snakearr[0].y+=inputdir.y;

    //displaying snake.
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeelement=document.createElement('div');
        snakeelement.style.gridRowStart=e.y;
        snakeelement.style.gridColumnStart=e.x;
        if(index===0){
            snakeelement.classList.add('head');
        }else{
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    });

    //displaying food.
    foodelement=document.createElement('div');
    foodelement.style.gridRowStart=food.y;
    foodelement.style.gridColumnStart=food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="Highest Score: "+ hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputdir={x:0,y:1}
    switch(e.key){
        case "ArrowUp":
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case "ArrowDownp":
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight":
            inputdir.x=1;
            inputdir.y=0;
            break;
        default:
            break;
    }
});