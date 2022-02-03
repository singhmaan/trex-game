var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png");
   gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  gameOver = createSprite(300,100);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.5;

   restart = createSprite(300,140);
    restart.addImage(restartImg);
    restart.scale = 0.5;
 
 
 

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);

  trex.setCollider("circle",0,0,40);
  trex.debug = true;

  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  console.log("this is",gameState)
  
  if(gameState === PLAY){
    
    
    gameOver.visible = false;
    restart.visible = false;

    ground.velocityX = -(4 +3* score/100)
   
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
    if(keyDown("space",)&& trex.y >= 100) {
        trex.velocityY = -13;
        
    }
    
  
    trex.velocityY = trex.velocityY + 0.8
  
  

    spawnClouds();
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      
  }
  }
   else if (gameState === END) {
            trex.velocityY = 0;

    trex.changeAnimation("collided",trex_collided);

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible =true;

      ground.velocityX = 0;
     
     obstaclesGroup.destroyEach(0);
     cloudsGroup.destroyEach(0);
   }
  
 

  trex.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
    console.log("Restart the Game")
  }
  
  drawSprites();
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running",trex_running,);

  obstaclesGroup.DestroyEach();
  cloudsGroup.DestroyEach();
  score = 0;
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(800,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}

