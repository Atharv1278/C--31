var Balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database , position ;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {

  database=firebase.database();

  createCanvas(1500,700);

  Balloon=createSprite(250,450,150,150);
  Balloon.addAnimation("hotAirBalloon",balloonImage1);
  Balloon.scale=0.5;

  var BallonPosition = database.ref("Ballons/position") ;
  BallonPosition.on("value", readPosition , showError )

  textSize(20); 
}

// function to display UI
function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

}
  
function writePosition(x,y){
  database.ref('Ballons/position').set({ 'x': position.x + x , 'y': position.y + y })  
}


function readPosition(data){
  position = data.val(); 
  console.log(position.x); 
  Ball.x = position.x;
  Ball.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
