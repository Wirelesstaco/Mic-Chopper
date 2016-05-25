/*var x = [],
  y = [],
  segNum = 10,
  segLength = 100;

for (var i = 0; i < segNum; i++) {
  x[i] = 0;
  y[i] = 0;
}*/



var Terrain;
function setup() {

  createCanvas(700, 500);

  Terrain = new Terrain();
  
}
function draw(){
  background(10);

  console.log(frameRate());

 Terrain.display();
}

function Terrain(){
var tSegAmt = 100;
var tSegLen = 5;
var terrainArr = [];
var tGap = 400; // Distance Between top and bottom line
var tConstraint = height -tGap; //How low can the top line dip?
  //Set up terrain 
  var prevY = 100;
  for (var i=0; i < tSegAmt; i++){
    var r = prevY + random(-25,25);
    prevY = r;
    terrainArr.push(createVector(i * tSegLen,prevY));
  }
  
  strokeWeight(9);
  stroke(255, 100);
  this.display = function(){
    for(var i =0; i < terrainArr.length -1; i++){
    
     line(terrainArr[i].x,terrainArr[i].y,terrainArr[i+1].x,terrainArr[i+1].y);
     //Bottom line
      line(terrainArr[i].x,terrainArr[i].y + tGap,terrainArr[i+1].x,terrainArr[i+1].y + tGap);
    
     //Shift array over add new Item
   terrainArr[i].y = terrainArr[i +1].y;
  

   }
   
   //add to end of array and constrain 
   var newPos = constrain(terrainArr[terrainArr.length -2].y + random(-25,25),0,tConstraint); 
   terrainArr[terrainArr.length -1].y = newPos;
  }
}