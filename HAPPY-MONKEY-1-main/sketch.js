var monkey,ground,banana,stone,invg,stoneGroup,bananaGroup,score=0,health=2,play=0,end=1,gameState=0,h1,h2,gameOver,restart,uphill,bananaImage;
var monkeyA,bananaI,StoneI,groundI,hp,gameOverI,restartI,b1;
var groundI;
var x,y,z;
var index;

function preload(){
  monkeyA = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",
"Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaI = loadImage("banana.png");
  
  stoneI = loadImage("stone.png");
  
  groundI = loadImage("jungle.jpg");

  hp = loadImage("pixel hearts.png");
  
  gameOverI = loadImage("game over.png");
  
  restartI = loadImage("restart.png");
  
 bananaImage=loadImage("banana2.png");
}
function setup() {
  createCanvas(630, 280);
  console.log(camera.position)
  invg=createSprite(200,280,100,10);
  
  x=-width
  y=0
  z=width
index=1;
 /* ground=createSprite(20,10,200,400);
  ground.addImage("ground",groundI);
  ground.setVelocity(-5,0);
   ground.y=ground.width/5;
  */
   monkey = createSprite(70,140,10,10);
   monkey.addAnimation("monkeyG",monkeyA);
    monkey.scale=0.13;
 

 staidBanana=createSprite(monkey.x+200,15,50,50)
  staidBanana.addImage(bananaImage);
  staidBanana.scale=0.04;
  
  
 
  
  stoneGroup = createGroup();
  bananaGroup = createGroup();
  upGroup = createGroup();
  
  h1=createSprite(monkey.x+200,50);
  h1.addAnimation("heart1",hp);
  h1.scale=0.30;
  
  h2 = createSprite(monkey.x+235,50);
  h2.addAnimation("heart2",hp);
  h2.scale=0.30;
  
  gameOver = createSprite(monkey.x,130,10,10); 
  gameOver.addImage("GameOverT",gameOverI);
  gameOver.scale=0.7;
  gameOver.visible=false;

  restart = createSprite(monkey.x,215,10,10);
  restart.addImage("restartButton",restartI);
  restart.scale=0.2;
  restart.visible=false;
  
  b1 = createSprite(0,200,5,400);
  
}

function draw() {
  camera.position.x=monkey.x-2
camera.position.y=height/2;
  background(220);

 
  image(groundI,x,0,width,height)
  image(groundI,y,0,width,height)
  image(groundI,z,0,width,height)
  
  if(monkey.x>width*index&&monkey.x<width*(index+1)){x=z+width}
  if(monkey.x>width*(index+1)&&monkey.x<width*(index+2)){y=x+width}
  if(monkey.x>width*(index+2)&&monkey.x<width*(index+3)){z=y+width;index+=3;}



h1.x=monkey.x+200
h2.x=monkey.x+235
staidBanana.x=monkey.x+200;

  invg.x=monkey.x;
  edges = createEdgeSprites();
  monkey.collide(b1);
  if(gameState===play){
     monkey.collide(upGroup);
    /* ground.setVelocity(-5,0);
  
      if (ground.x < 100){
        ground.x = ground.width/2;
      }*/
   
    if(keyDown("space")){
  monkey.setVelocity(0,-8);
     }
     monkey.velocityX=0;
     if(keyDown("left")){
      monkey.setVelocity(-8,0);
         }
         if(keyDown("right")){
          monkey.setVelocity(8,0);
             }
  monkey.velocityY=monkey.velocityY+0.5;
    
    if(monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach();
     score=score+1;
     }
    
    spawnObstacles();
   spawnBanana();
    monkeyLife();
  
    if(health===0){
     gameState="end";
     }
     }
  
  
  else if(gameState==="end"){
     monkey.visible=false;
     gameOver.visible=true;
     restart.visible=true;
     monkey.setVelocity(0,0)
    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
   
    upGroup.destroyEach();
     }
  
    
  monkey.collide(invg);
  
  if(mousePressedOver(restart)){
   reset();
  
     }
 gameOver.x=monkey.x;
 restart.x=monkey.x;
 
  drawSprites();
  fill("white");
  textSize(15);
  text(" : "+score,monkey.x+225,20);
}
  
function spawnObstacles(){
  
  if (frameCount%200===0) {
    stone = createSprite(camera.position.x+width,247,10,10);
     
    stone.addAnimation( "Stone",stoneI);
   
    stone.lifetime=2*width;
    stone.scale=0.18;
    //stone.debug=true;
    stone.setCollider("rectangle",0,0,350,350);
    stoneGroup.add(stone);
     
  }
}

function spawnBanana(){
  if (frameCount%120===0) {
    banana = createSprite( camera.position.x+width/2,347,10,10);
  
    banana.y=random(100,150);
    banana.addAnimation( "Banana",bananaI);
  
    banana.lifetime=2*width;
    banana.scale=0.35;
    bananaGroup.add(banana);
  }
}

function monkeyLife(){
  if(monkey.isTouching(stoneGroup)){
  health=health-1;
  stoneGroup.destroyEach();
  
}
  if(health===2){
    h1.visible=true;
    h2.visible=true;
     }
  if(health===1){
    monkey.scale=0.13;
     h2.visible=false;
     }
  
  if(health===0){
     h1.visible=false;
     
     }
  
  switch(score){
    case 10: monkey.scale=0.12;
       break;
    case 20: monkey.scale=0.14;
       break;
    case 30: monkey.scale=0.16;
       break;
    case 40:monkey.scale=0.18;
       break; 
    case 50:monkey.scale=0.20;
       break;
    case 60:monkey.scale=0.22;  
       break;
    case 70:monkey.scale=0.24;
       break;
    case 80:monkey.scale=0.26;
       break;
         }
}


function reset(){
  gameState=play;
  monkey.visible=true;
  monkey.scale=0.13;
  gameOver.visible=false;
  restart.visible=false;
 
  score=0;
  health=2;
  
}