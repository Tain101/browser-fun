// radom number of dots in random place [3, 13]
// iter ~10k times?
// show seed in corner
// opt for diff placements
// and ofc show dots
//
// // var canvas = document.getElementById("myCanvas");
// var canvasWidth = canvas.width;
// var canvasHeight = canvas.height;
// var ctx = canvas.getContext("2d");
// var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

// // That's how you define the value of a pixel //
// function drawPixel (x, y, r, g, b, a) {
//     var index = (x + y * canvasWidth) * 4;

//     canvasData.data[index + 0] = r;
//     canvasData.data[index + 1] = g;
//     canvasData.data[index + 2] = b;
//     canvasData.data[index + 3] = a;
// }

// // That's how you update the canvas, so that your //
// // modification are taken in consideration //
// function updateCanvas() {
//     ctx.putImageData(canvasData, 0, 0);
// }

const radius     = window.innerHeight/2.0 * 0.99;
const iterCount  = 100000;
const offSetX    = window.innerWidth / 2.0;
const offSetY    = window.innerHeight / 2.0;
const canvas     = document.getElementById("canvas");
const pointColor = '#f00f';//'#f004'
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const context    = canvas.getContext("2d");
const canvasData = context.getImageData(0, 0, canvas.width, canvas.height);
const fps = 120;


let iter    = 0;
let dotList = [];
let point   = {x: null, y: null};
let interval = null;



function getNextPoint(){
	let choice = Math.floor(Math.random() * dotList.length);
	let x = (point.x+dotList[choice].x)/2.0;
	let y = (point.y+dotList[choice].y)/2.0;
	return {x: x, y: y};
}

function drawPoint(){
 	context.fillStyle = pointColor;
 	context.fillRect(point.x, point.y, 1, 1);
}

function newGame(){
	iter = 0;
	point = {x: null, y: null};
	dotList = [];
	context.clearRect(0, 0, canvas.width, canvas.height);

	let dotCount = 3 + Math.floor(Math.random() * 11);
	let angle = Math.random()*Math.PI*2;
	dotCount = 6;

	dotList = [{x:20,               y:20},
			   {x:canvas.width/4,   y:canvas.height/2},
			   {x:canvas.width*2/4, y:20},
			   {x:canvas.width*3/4, y:canvas.height/2},
			   {x:canvas.width-20,  y:20},
			   {x:0,                y:canvas.height-20},
			   {x:canvas.width/4,   y:canvas.height-20},
			   {x:canvas.width*2/4, y:canvas.height-20},
			   {x:canvas.width*3/4, y:canvas.height-20},
			   {x:canvas.width-20,  y:canvas.height-20},
			   ];
   	for (var i = 0; i < dotCount; i++) {
		// angle = angle + Math.PI*2/dotCount;
		// dotList[i] = new Dot(angle);
		context.beginPath();
		context.arc(dotList[i].x, dotList[i].y, 10, 0, 2 * Math.PI, false);
		context.fillStyle = '#000';
		context.fill();
	}
	if(!interval){
		interval = setInterval(tick, 1000.0/fps);
	}
}

function Dot(angle = Math.random()*Math.PI*2){
	this.x = Math.cos(angle)*radius + offSetX;
	this.y = Math.sin(angle)*radius + offSetY;
	this.draw = function(){
		context.beginPath();
		context.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
		context.fillStyle = '#000';
		context.fill();
	}
}

function tick(){
	if(iter >= iterCount){
		clearInterval(interval);
		// newGame();
		return;
	}
	if(!iter % 100){
		// context.putImageData(canvasData, 0, 0);
	}
	iter++;

	point = getNextPoint();
	drawPoint();
}

newGame();