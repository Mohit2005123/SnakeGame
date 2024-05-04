const gridcount= 225;
let gridcontainer= document.querySelector('.gamecontainer');
let ismoving= false;
let snake=[{x:5, y:5}];
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
    // foodposition.style.backgroundColor='#fc0318';
    foodposition.innerHTML = '<span style="font-size: 2em;">🍎</span>';
}
function getFood(){
    let location= 0;
    while(true){
        location= Math.floor(Math.random()*gridcount);
        isfound=  false;
        for(let i=0; i<snake.length; i++){
            if(location==(15*(snake[i].y-1)+ snake[i].x)){
                isfound= true;
                break;
            }
        }
        if(isfound== false){
            break;
        }
    }
    let position= gridcontainer.childNodes[location];
    // console.log(position);
    foodlocation= location;
    position.innerHTML = '<span style="font-size: 2em;">🍎</span>';
    // position.style.backgroundColor='#fc0318';
}
getFood();
function draw(){
    destroy();
    for(let i=0; i<snake.length; i++){
        let node= undefined;
        if(snake[i].y==1){
            // let node= gridcontainer.childNodes[snake[i].y+ snake[i].x];
             node= gridcontainer.childNodes[snake[i].x];
        }
        else{
            node= gridcontainer.childNodes[(15*(snake[i].y-1))+ (snake[i].x)];
            
        }
        node.style.backgroundColor='#0303fc';
        node.style.borderWidth='2px';
        node.style.borderStyle='solid';
        node.style.borderColor='black';
        // let node= gridcontainer.childNodes[(30*snake[i].y)+ snake[i].x];
        // console.log(node);
        // node.style.backgroundColor='#0303fc';
        
    }
}
function destroy(){
    for(let i=1; i<=gridcount; i++){
        if(i!=foodlocation){
            gridcontainer.childNodes[i].innerHTML='';
            if(i%2==0){
                gridcontainer.childNodes[i].style.backgroundColor='#77fc03';
            }
            else{
                gridcontainer.childNodes[i].style.backgroundColor='#56fc03';

            }
            gridcontainer.childNodes[i].style.border='';
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
            , 500);
        }
        snake.unshift(head);
        // Checking if the snake has eaten the food
        if((15*(head.y-1)+ head.x)!=foodlocation){
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
            collisionoccured= true;
            setTimeout(
                ()=>{
                    location.reload();
                }
            , 500);
        }
        let currFoodLocation= gridcontainer.childNodes[foodlocation];
        // currFoodLocation.style.backgroundColor='#fc0318';
        currFoodLocation.innerHTML = '<span style="font-size: 2em;">🍎</span>';
    }
}
function changeDirection(key){
    if(key=='ArrowUp'){
        if(direction!='down'){
            direction='up';
        }
    }
    else if(key=='ArrowDown'){
        if(direction!='up'){
            direction='down';
        }
    }
    else if(key=='ArrowRight'){
       if(direction!='left'){
        direction='right';
       }
    }
    else if(key=='ArrowLeft'){
        if(direction!='right'){
            direction='left';
        }
    }
}
function checkBlockCollision(head){
    if(head.x<0 || head.y<0 || head.x>15 || head.y>15){
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
let interval= ()=>{
    setInterval(gameFunction, gameSpeed);
}
document.addEventListener('keydown', (event)=>{
    if(event.key==' '  && isgamestarted== false && collisionoccured== false){
        isgamestarted= true;
        secondheading.innerText=`Score : ${score}`;
        // let interval= setInterval(gameFunction, gameSpeed);
        interval();
    }
})
