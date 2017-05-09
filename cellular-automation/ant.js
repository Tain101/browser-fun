//follow langton's ant behavior
//each step should create a 'light' that spreads through the canvas
//use the same light formula for both states
//just add one color or the other with a given opacity
const canvas  = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// const colors  = ['#16161d', '#ff0000'];//'#f004'
const colors  = ['#ffffff', '#000000'];//'#f004'
const fps     = 120;

let pointList = null;
let interval  = null;

let Point = function(){
	this.x   = Math.floor(Math.random() * canvas.width);
	this.y   = Math.floor(Math.random() * canvas.height);
	this.dir = Math.floor((Math.random() * 5)%4);
	this.state = true;

	this.updateState = function(){
		let data = context.getImageData(this.x, this.y, 1, 1).data;
		this.state = (data[0]/255.0 > 0.5);
	}

	this.step = function(){
		let x = this.x;
		let y = this.y;
		let w = canvas.width;
		let h = canvas.height;

		switch (this.dir){
			case 0:
				x = (w + x + 1) % w;
				break;
			case 1:
				y = (h + y + 1) % h;
				break;
			case 2:
				x = (w + x - 1) % w;
				break;
			case 3:
				y = (h + y - 1) % h;
				break;
			default:
				console.error("invalid step");
		}

		this.x = x;
		this.y = y;
		this.updateState();
	}


	this.updateDir = function(){
		let rDir = -1;
		if(this.state){
			rDir = 1;
		}

		this.dir= (this.dir + 4 + rDir)%4;
	}

	this.draw = function(){
		let color = colors[0];
		let x = this.x;
		let y = this.y;
	 	if(this.state){
	 		color = colors[1];
	 	}
	 	context.fillStyle = color;
	 	context.fillRect(this.x, this.y, 1, 1);
	}
}

function tick(){
	for (var i = pointList.length - 1; i >= 0; i--) {
		pointList[i].step();
		pointList[i].updateDir();
		pointList[i].draw();
	}
}


pointList = [new Point(), new Point()];
interval = setInterval(tick, 1000.0/fps);

window.onresize = function(){
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}