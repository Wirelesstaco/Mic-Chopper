//TODO: Mic Contorl
// Barriers
//Visual design



//Mic
var mic;
var amp;
var micThreashold =.018;
var micSlider;

//Chopper
var chopper;
var boost = .256;
var gravity = 0.37;
var isBoost = false;

//TUnnel
var yoff = 0.0;        //Speed the map moves defautl value
var yoffSpeed = 0.015; //speed increase
var tHeightStart = 500;
var tHeight = tHeightStart;

var playing = true;
var freezeTimeStart = 50
var freezeTime = freezeTimeStart;


var score = 0 ;
var highScore = 0;

function setup(){
	createCanvas(900,600);
	background(0);
	
	
	micSlider = createSlider(0, 50, micThreashold*100);
  micSlider.position(20, 20);
  micSlider.style('width','300');
  
	mic = new p5.AudioIn();
	mic.start();

	amp = new p5.Amplitude();
	amp.setInput(mic);

	chopper = new Chopper();
	background(111);
}

function draw(){

  background(51);
 
  fill(225);
  noStroke();
  drawWalls()
  chopper.checkMic();
  if(playing){ 
    score ++;
    if(tHeight >150){
      tHeight = tHeight -.1;
    }
  chopper.fly();
 
  chopper.checkEdges();
  chopper.checkHit();
  }
  
  
  //Pause game if not playing wait until freeTimeh as been met

  if(!playing){
    scoreBoard();
    fill(3,3,222);
   
    ellipse(200,300,freezeTime*2,freezeTime*2);
        
  if(freezeTime <0 ){
        freezeTime = freezeTimeStart;
        resetGame();
    }
  }
  
  //Draw interface
  var iFace = new Interface();
  iFace.micMeter();
  
}

function Chopper(){
  //Chopper Setup
  this.pos = createVector(200,height /2);
  this.vel = createVector(0,0);
  
  
  // Draw Copter
  this.checkMic = function () {
   var sliderVal = micSlider.value();
  micThreashold = micSlider.value()/100;
    if(amp.getLevel() > micThreashold){
      isBoost = true;
      //Slow velocity to help boost.
      if(this.vel.y >2){
         this.vel.y = 2;
      }
    this.acc = createVector(0,-boost);
     
	    fill(0,255,0);
	    
	    if(!playing){
	      freezeTime --;
	    }
    }else{
      isBoost = false;
      fill(255,0,0);
      this.acc = createVector(0,gravity);
    }
    
	  ellipse(this.pos.x,this.pos.y,30,30);

  }
  this.fly = function (){
   
    this.vel.limit(6);
    
    this.vel.add(this.acc);
    this.pos.add(this.vel)
    
    this.vel.mult(0.98);
    
    }
  this.checkEdges = function () {
    if (this.pos.y > height){
      this.vel.y = 0;
      this.pos.y = height;
     } else if (this.pos.y < 0){
       this.vel.y = 0;
       this.pos.y = 0;
     } 
  }
  this.checkHit = function() {
    if( this.pos.y > hitCheck ||this.pos.y < hitCheck-tHeight){
        //On hit Reset Game board Pause Movement
        playing = false;
        //pause movment
          
    }
  }
}

function drawWalls(){
   fill(255);
   beginShape(); 
  var xoff = yoff; // 1D Noise - Resets offset
  var tWidth = 10;
  var topLine = []; // array for top boundry
  // Iterate over horizontal pixels
  for (var x = 0; x <= width+tWidth; x += tWidth) {
    // Calculate a y value according to noise, map to 
  
    // Option #2: 1D Noise
    var y = map(noise(xoff), 0, 1, tHeight,height);
    
    // Set the vertex
    vertex(x, y); 
    // Increment x dimension for noise
    xoff += 0.02;
    
    //Set HitCheck value to y
      if (x == chopper.pos.x){
      hitCheck = y;
      background(222);
    }else{
      background(51);
    }
    //Add values to array
    topLine.push([x,y]);
  }
  // increment y dimension for noisef
  if(playing){
  yoff += yoffSpeed;
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  //Draw Second line
  beginShape();
  for(var i=0; i < topLine.length; i++){
   vertex(topLine[i][0],topLine[i][1] -tHeight); //bottom plus tunel width  
  }
  vertex(width, 0);//top right corner
  vertex(0, 0);//top left
  endShape(CLOSE);
  
}

function Interface(){
  var quadWidth = 320;
 
  this.micMeter = function (){
    if(isBoost){
      fill(0,200,0);
      
    }else{
      fill(200,0,0)
    }
    var qW = (quadWidth * amp.getLevel()  + 20)*1.3;
    quad(20,10,qW,10,qW,20,20,20);
  }
}
function resetGame() {
    score = 0;
    chopper.vel.y = 0;
    chopper.pos.y = height/2;
    tHeight = tHeightStart;
    playing= true;
}
function scoreBoard(){
  if(score > highScore){
    highScore = score;
  }
  textSize(32);
  fill(0, 102, 153);
  text("Your Score: " + score +"\nHigh Score: " + highScore, width/2, height/2);
}


