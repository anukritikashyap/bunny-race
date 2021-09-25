var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  //trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  //trex_collided = loadAnimation("trex_collided.png");
  bunny_running=loadAnimation("bunny2.gif")
  
  groundImage = loadImage("ground2.png");
  
 
  
  obstacle1 = loadImage("baboon.gif");
  obstacle2 = loadImage("bull.gif");
  obstacle3 = loadImage("log.gif");
  obstacle4 = loadImage("rock1.gif");
  obstacle5 = loadImage("rock2.gif");
  obstacle6 = loadImage("obstacle6.png");

  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  bg1=loadImage("BG1.gif");
  //bg2=loadImage("jungle.jpg")
}

function setup() {
  createCanvas(1200, 600);
//scene=createSprite(200,100);
//scene.addImage(bg2);
//scene.velocityX = -4

backgr=createSprite(0,0,1200,600);
  backgr.addImage(bg1);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;


  bunny = createSprite(80,10);
 // trex.addImage("run",trex_run)
  
bunny.addAnimation("running", bunny_running);
 //trex.addAnimation("collided", trex_collided);
  bunny.scale = 0.1;
  

  ground = createSprite(400,280,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;

  
  
  
  
 // ground = createSprite(200,280,400,20);
  //ground.addImage("ground",groundImage);
 // ground.x = ground.width /2;
 // ground.velocityX = -(6 + 3*score/100);

  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    backgr.velocityX=-2
    
    

    

    

    //change the trex animation
   // trex.changeAnimation("running", trex_running);
    
    if(keyDown("space") && bunny.y >= 159) {
     bunny.velocityY = -12;
    }
  bunny.velocityY = bunny.velocityY + 0.8
  
    if(ground.x<0) {
      ground.x=ground.width/2;
    }
    if(backgr.x<150){
      backgr.x=backgr.width/2;
    }


  
    bunny.collide(ground);

   // spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(bunny)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    backgr.velocityX=0
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    bunny.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   // trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  //backgr.velocityX
  
  obstaclesGroup.destroyEach();
  //cloudsGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,250,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
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
      //case 6: obstacle.addImage(obstacle6);
       //       break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

