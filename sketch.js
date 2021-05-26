var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Pikachu, PikachuImg, PikahcuImg1;
var ground, groundImg;
var ThunderBolt, ThunderBoltImg;
var Piplup, PiplupImg;
var invisibleGround;
var Electabuzz, ElectabuzzImg;
var StarRaptor, StarRaptorImg;
var stone, stoneImg;
var PiplupGroup, ThunderBoltGroup, ElectabuzzGroup, StarRaptorGroup, StoneGroup;
var score;
var gameOver, gameOverImg;
var restart, restartImg;

function preload(){
  
  groundImg = loadImage("ground.jpg");
  PikachuImg = loadImage("Pikachu Img.gif");
  ThunderBoltImg = loadImage("ThunderBolt.png");
  PiplupImg = loadImage("Piplup.png");
  ElectabuzzImg = loadImage("Electabuzz.png");
  StarRaptorImg = loadImage("Star Raptor.png");
  stoneImg = loadImage("Stone.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  PikachuImg1 = loadImage("Pikachu Stop.png");

}

function setup(){
  createCanvas(595,225);
  
  ground = createSprite(10,130,595,100);
  ground.x = ground.width/2;
  ground.addImage(groundImg);
  ground.scale = 1;
  
  Pikachu = createSprite(50,180,30,30);
  Pikachu.addImage("Pikachu",PikachuImg);
  Pikachu.scale = 0.2;
  
  invisibleGround = createSprite(297,210,595,20);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.1;
  
  restart = createSprite(300,150,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.28;
  
  PiplupGroup = createGroup();
  ElectabuzzGroup = createGroup();
  StarRaptorGroup = createGroup();
  StoneGroup = createGroup();
  ThunderBoltGroup = createGroup();
  
  score = 0;
 
}



function draw(){
  background(220);
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(3 + 3* score/5);
    
      if(ground.x < 285){
    ground.x = ground.width/2;
  }
  
    if(keyDown("space")){
     
    CreateThunderBolt();
  }
   if(keyDown("W")&& Pikachu.y>= 164){
    
    Pikachu.velocityY = -12;
  }  
    
  CreatePiplup();
  CreateElectabuzz();
  CreateStarRaptor();
  CreateStone();
    
    if(ThunderBoltGroup.isTouching(PiplupGroup)){
    PiplupGroup.destroyEach();
    ThunderBoltGroup.destroyEach();
    score = score+1;
    }
      
    if(ThunderBoltGroup.isTouching(ElectabuzzGroup)){
    ElectabuzzGroup.destroyEach();
    ThunderBoltGroup.destroyEach();
    score = score+1;
  }
    if(ThunderBoltGroup.isTouching(StarRaptorGroup)){
    StarRaptorGroup.destroyEach();
    ThunderBoltGroup.destroyEach();
    score = score+1;
  }
    
    if(PiplupGroup.isTouching(Pikachu)){
      gameState = END;
      Pikachu.velocityX = 0;
      Pikachu.addImage("collided",PikachuImg1);
      Pikachu.scale = 0.15;
      

    }

    
     if(ElectabuzzGroup.isTouching(Pikachu)){
      gameState = END;
      Pikachu.velocityX = 0;
      Pikachu.addImage("collided",PikachuImg1);
      Pikachu.scale = 0.15;

    }
    
     if(StarRaptorGroup.isTouching(Pikachu)){
      gameState = END;
      Pikachu.velocityX = 0;
      Pikachu.addImage("collided",PikachuImg1);
      Pikachu.scale = 0.15;
   

    }
    
     if(StoneGroup.isTouching(Pikachu)){
      gameState = END;
      Pikachu.velocityX = 0;
      Pikachu.addImage("collided",PikachuImg1);
      Pikachu.scale = 0.15;
      
    }
    
    
  
    
  }
  
  if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
   
    ground.velocityX = 0;
    Pikachu.velocityX = 0
    
     StoneGroup.setVelocityXEach(0);
     StoneGroup.setLifetimeEach(-1);
     StarRaptorGroup.setVelocityXEach(0);
     StarRaptorGroup.setLifetimeEach(-1);
     ElectabuzzGroup.setVelocityXEach(0);
     ElectabuzzGroup.setLifetimeEach(-1);
     PiplupGroup.setVelocityXEach(0);
     PiplupGroup.setLifetimeEach(-1); 
    
    
    Pikachu.changeImage("collided",PikachuImg1);
    
  if(mousePressedOver(restart)){
    reset();
  
  }
    
  }
    

  Pikachu.velocityY = Pikachu.velocityY+ 0.8;  

      
  Pikachu.collide(invisibleGround);
  Pikachu.setCollider("Circle",0,0,160);
                  
  drawSprites();
  
  
  fill(0);
  text("Score:"+ score,520,20);

  
 
}

function CreateThunderBolt(){
 ThunderBolt = createSprite(90,190,20,20);
 ThunderBolt.velocityX = 5;
 ThunderBolt.y = Pikachu.y;
 ThunderBolt.lifetime = 119;
 ThunderBolt.addImage(ThunderBoltImg);
 ThunderBolt.scale = 0.1;
 ThunderBoltGroup.add(ThunderBolt);
 
}

function CreatePiplup(){
 if(frameCount% 180===0){
 Piplup = createSprite(600,180,20,20);
 Piplup.velocityX = -(5 + 3* score/5);
 Piplup.addImage(PiplupImg);
 Piplup.scale = 0.16;
 Piplup.x = Math.round(random(300,500));
 Piplup.lifetime = 119;
 PiplupGroup.add(Piplup);

 }

}

function CreateElectabuzz(){
  if(frameCount% 250===0){
  Electabuzz= createSprite(600,160,20,20);
  Electabuzz.addImage(ElectabuzzImg);
  Electabuzz.scale = 0.5;
  Electabuzz.velocityX = -(5 + 3* score/5);
  Electabuzz.x = Math.round(random(300,500));
  Electabuzz.lifetime = 119;
  ElectabuzzGroup.add(Electabuzz);
  }
  
}

function CreateStarRaptor(){
  if(frameCount% 300===0){
    StarRaptor = createSprite(600,50,20,20);
    StarRaptor.addImage(StarRaptorImg);
    StarRaptor.scale = 0.4;
    StarRaptor.velocityX = -(5 + 3* score/5);
    StarRaptor.x = Math.round(random(300,500));
    StarRaptor.lifetime = 119;
    StarRaptorGroup.add(StarRaptor);
  }
}

function CreateStone(){
  if(frameCount% 330===0){
  stone = createSprite(600,190,20,20);
  stone.addImage(stoneImg);
  stone.scale = 0.1;
  stone.velocityX = -(5 + 3* score/5);
  stone.x = Math.round(random(300,500))
  stone.lifetime = 119;
  StoneGroup.add(stone);
  
  
  
  }
}

function reset(){
  score = 0;
  
  Pikachu.changeImage("Pikachu",PikachuImg);
  Pikachu.scale = 0.2;
  
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;  
  
  PiplupGroup.destroyEach();
  ElectabuzzGroup.destroyEach();
  StarRaptorGroup.destroyEach();
  StoneGroup.destroyEach();
}  
    







