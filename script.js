const gridcount= 900;
let gridcontainer= document.querySelector('.gamecontainer');
let ismoving= false;
let snake=[{x:10, y:10}];
let direction= 'right';
let gameSpeed= 200;
let foodlocation= undefined;
let isgamestarted= false;
let secondheading= document.querySelector('h2');
let collisionoccured= false;
let score=0;
// 1 means right
// -1 means left
// 2 means up
// -2 means down
for(let i=0; i<gridcount; i++){
    let gridelement= document.createElement('div');
    gridelement.classList.add(i+1);
    gridelement.classList.add('griditem');
    if(i%2==0){
        gridelement.classList.add('even');
    }
    else{
        gridelement.classList.add('odd');
    }
    gridcontainer.appendChild(gridelement);
}
function setFoodColour(){
    let foodposition= gridcontainer.childNodes[foodlocation];
    foodposition.style.backgroundColor='#fc0318';
}
function getFood(){
    let location= Math.floor(Math.random()*gridcount);
    let position= gridcontainer.childNodes[location];
    // console.log(position);
    foodlocation= location;
    position.style.backgroundColor='#fc0318';
}
getFood();
function draw(){
    destroy();
    for(let i=0; i<snake.length; i++){
        if(snake[0].y==1){
            let node= gridcontainer.childNodes[snake[i].y+ snake[i].x];
            node.style.backgroundColor='#0303fc';
        }
        else{
            let node= gridcontainer.childNodes[(30*(snake[i].y-1))+ (snake[i].x)];
            node.style.backgroundColor='#0303fc';
        }

        // let node= gridcontainer.childNodes[(30*snake[i].y)+ snake[i].x];
        // console.log(node);
        // node.style.backgroundColor='#0303fc';
        
    }
}
function destroy(){
    for(let i=1; i<=gridcount; i++){
        if(i!=foodlocation){
            if(i%2==0){
                gridcontainer.childNodes[i].style.backgroundColor='#77fc03';
            }
            else{
                gridcontainer.childNodes[i].style.backgroundColor='#56fc03';
            }
        }
       
    }
}
function move(){
    if(collisionoccured== false){
        const head= { ... snake[0]};
        document.addEventListener('keydown', (event)=>{
            changeDirection(event.key);
        });
        if(direction=='right'){
            head.x= head.x+1;
        }
        else if(direction=='left'){
            head.x= head.x-1;
        }
        else if(direction=='up'){
            head.y=head.y-1;
        }
        else if(direction=='down'){
            head.y= head.y+1;
        }
        if(checkBlockCollision(head)== false){
            // console.log('Collided');
            secondheading.innerText=`Score : ${score} You lost`;
            collisionoccured= true;
            setTimeout(
                ()=>{
                    location.reload();
                }
            , 5000);
        }
        snake.unshift(head);
        // Checking if the snake has eaten the food
        if((30*(head.y-1)+ head.x)!=foodlocation){
            snake.pop();
        }
        else{
            score++;
            secondheading.innerText=`Score : ${score}`;
            getFood();
        }
        if(checkCollision(head)== false){
            // console.log('Collided');
            secondheading.innerText=`Score : ${score} You lost`;
            collisionoccured= false;
            setTimeout(
                ()=>{
                    location.reload();
                }
            , 5000);
        }
        let currFoodLocation= gridcontainer.childNodes[foodlocation];
        currFoodLocation.style.backgroundColor='#fc0318';
        
    }
}
function changeDirection(key){
    if(key=='ArrowUp'){
        direction='up';
    }
    else if(key=='ArrowDown'){
       direction='down';
    }
    else if(key=='ArrowRight'){
       direction='right';
    }
    else if(key=='ArrowLeft'){
        direction='left';
    }
}
function checkBlockCollision(head){
    if(head.x==-1 || head.y==-1 || head.x== 31 || head.y==31){
        return false;
    }
}
function checkCollision(head){
    for(let i=1; i<snake.length; i++){
        if(head.x==snake[i].x && head.y==snake[i].y){
            return false;
        }
    }
    return true;
}

let gameFunction= ()=>{
    setFoodColour();
    // draw();
    if(collisionoccured== false){
        move();
   draw();
    }
}

document.addEventListener('keydown', (event)=>{
    if(event.key==' '  && isgamestarted== false && collisionoccured== false){
        isgamestarted= true;
        secondheading.innerText=`Score : ${score}`;
        let interval= setInterval(gameFunction, gameSpeed);
    }
})
