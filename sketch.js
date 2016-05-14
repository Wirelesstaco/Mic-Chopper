var img;

function preload(){
	img = loadImage("media/lunar.jpg");
}
function setup() {
	createCanvas(500,500);
}
function draw() {
	image(img,0,0);
}