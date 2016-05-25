var yoff = 0.0;        // 2nd dimension of perlin noise


var hitCheck; //value of hit line.

function setup() {
  createCanvas(900, 600);
  fill(255);
  
}

function draw() {

  background(51);
  ellipse(200,250, 5,5);
  fill(250);


  beginShape(); 
  var xoff = yoff; // 1D Noise - Resets offset
  var tWidth = 10;
  var topLine = []; // array for top boundry
  // Iterate over horizontal pixels
  for (var x = 0; x <= width+tWidth; x += tWidth) {
    // Calculate a y value according to noise, map to 
  
    // Option #2: 1D Noise
    var y = map(noise(xoff), 0, 1, height-200,height);
    
    // Set the vertex
    vertex(x, y); 
    // Increment x dimension for noise
    xoff += 0.02;
    
    //Set HitCheck value to y
      if (x == 200){
      hitCheck = y;
    }
    //Add values to array
    topLine.push([x,y]);
  }
  // increment y dimension for noise
  yoff += 0.009;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  //Draw Second line
  beginShape();
  for(var i=0; i < topLine.length; i++){
   vertex(topLine[i][0],topLine[i][1] -300);  
  }
  vertex(width, 0);//top right corner
  vertex(0, 0);//top left
  endShape(CLOSE);
}
