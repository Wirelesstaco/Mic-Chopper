var mic;
var amp;

var micThreashold =.01;

var chopper;

var boost = .156;
var gravity = 0.17;



function setup(){
	createCanvas(440,440);
	background(0);
  
	mic = new p5.AudioIn();
	mic.start();

	amp = new p5.Amplitude();
	amp.setInput(mic);

	chopper = new Chopper();
	
}

function draw(){
  background(51);
  noStroke();
  chopper.fly();
  chopper.display();
  chopper.checkEdges();
  
}

function Chopper(){
  //Chopper Setup
  this.pos = createVector(200,height /2);
  this.vel = createVector(0,0);
  
  
  // Draw Copter
  this.display = function () {
    if(amp.getLevel() > micThreashold){
    this.acc = createVector(0,-boost);
	    fill(0,255,0);
    }else{
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
}

