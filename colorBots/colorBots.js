// 2d array
// n 'bots' grabbing amd moving squares
// each bot is tied to a specific row/column
// import { InsertionSort } from './InsertionSort';

const canvas  = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width  = window.innerWidth  * 0.99;
canvas.height = window.innerHeight * 0.99;
const mapWidth  = Math.floor(window.innerWidth  / 50);
const mapHeight = Math.floor(window.innerHeight  / 50);

class Square {
	constructor(red, green, blue, position, score) {
		this.red      = red;
		this.green    = green;
		this.blue     = blue;
		this.position = position;
		this.score    = score;
	}

	getColor() {
		// return `rgba( 191 , 0 , 0 , 1)`;
		return `rgba( ${Math.floor(this.red)} , ${Math.floor(this.green)} , ${Math.floor(this.blue)} , 1)`;
	}

	setColor(red, green, blue) {
		this.red   = red;
		this.green = green;
		this.blue  = blue;

		return this;
	}

	setPosition({x, y}) {
		this.position.x = x;
		this.position.y = y;
	}
}

class Map {
	constructor(width = 10, height = 10) {
		this.width  = width;
		this.height  = height;
		// create a 2d array of sorted colors
		this.array = 	[...Array(width)].map((xVal, xIndex) =>
			[...Array(height)].map((yVal, yIndex) => {
				const red   = 255 * (xIndex / width);
				const green = 255 * (yIndex / height);
				const blue  = 0;// 255 * ((x+y)/(width+height));
				const index = { x: xIndex, y: yIndex };
				const score = (xIndex * width) + yIndex;

				return new Square(red, green, blue, index, score);
			}));

		console.log(this.array);
		this.scramble();
		this.draw();
	}

	getSquare({ x, y }) {
		return this.array[x][y];
	}

	setSquare({x, y}, square) {
		this.array[x][y]          = square;
		this.array[x][y].position = {x, y};
	}

	setColor({ x, y }, color) {
		this.array[x][y].setColor(color);
	}

	draw() {
		this.array.forEach((val) => {
			val.forEach((square) => {
				context.fillStyle = square.getColor();
				context.fillRect(
					(square.position.x / this.width)  * canvas.width,
					(square.position.y / this.height) * canvas.height,
					canvas.width / this.width + 1,
					canvas.height / this.height + 1
				);

				context.fillStyle = "blue";
				context.font = "30px Arial";
				// context.fillText(
				// 	square.score,
				// 	((square.position.x / this.width) * canvas.width) + 0.5 * (canvas.width / this.width + 1),
				// 	((square.position.y / this.height) * canvas.height) + 0.5 * (canvas.height / this.height + 1)
				// 	);
			});
		});
	}

	scramble() {
		let remaining = this.width * this.height - 1;
		let index     = 0;
		// let temp      = null;
		// let tempPos   = null;

		while (remaining >= 0) {
			index = Math.floor(Math.random() * remaining);
			this.swapSquares(
				{	x: Math.floor(remaining / this.height),
					y: remaining % this.height
				},
				{	x: Math.floor(index / this.height),
					y: index % this.height
				}
			);

			remaining -= 1;
		}
	}

	swapSquares(firstPosition, secondPosition) {
		let temp = this.getSquare(firstPosition);
		this.setSquare(firstPosition, this.getSquare(secondPosition));
		this.setSquare(secondPosition, temp);

		return true;
	}

	getHome(homePosition) {
		let returnSquare = null;
		this.array.forEach((val) => {
			val.forEach((square) => {
				if (square.home.x === homePosition.x
					&& square.home.y === homePosition.y) {
					returnSquare = square;
				}
			});
		});
		if (returnSquare !== null) {
			return returnSquare;
		}
		throw new Error(`invalid getHome position: [ ${homePosition.x}, ${homePosition.y} ]`);
	}

	getArray() {
		return this.array;
	}

	checkIfSolved() {
		let solved = true;
		this.array.forEach((val) => {
			val.forEach((square) => {
				if (square.position.x !== square.home.x
					|| square.position.y !== square.home.y) {
					solved = false;
				}
			});
		});

		return solved;
	}
}

class MapSolver {
	constructor(map, sorter) {
		this.map    = map;
		// this.sorter = sorter(this.map.getArray()[0]);
		this.arrayIndex = -1;
		this.arrayDirection = "vertical";
		this.sorter = sorter;
		this.stepper = this.sorter(this.getNextArray(), this.compare);

	}
	compare(squareOne, squareTwo) {
		if(this.arrayDirection === "vertical"){
			return squareOne.red - squareTwo.red;
		} else {
			return squareOne.green - squareTwo.green;
		}
	}
	getNextArray(){
		this.arrayIndex += 1;
		if(this.arrayDirection === "vertical"){
			if(this.arrayIndex >= this.map.width){
				this.arrayIndex = -1;
				this.arrayDirection = "horizontal";
				return this.getNextArray();
			}

			return Array.from(this.map.getArray()[this.arrayIndex], (val) => {return val.position});
		}else{
			if(this.arrayIndex >= this.map.height){
				this.arrayIndex = -1;
				this.arrayDirection = "vertical";
				return this.getNextArray();
			}
			const rArray = Array.from(this.map.getArray(), (val) => {return val[this.arrayIndex].position});
			if(rArray[0] === undefined){
				console.log(rArray);
			}
			return rArray;
		}

	}

	step() {
		if (this.stepper.next().done) {
			// this.map.scramble();
			const array = this.getNextArray();
			// console.log(array);
			this.stepper = this.sorter(array, this.compare);
		}
	}

	walk() {
		if (this.step.item.x === this.step.goal.x
			&& this.step.item.y === this.step.goal.y) {
			this.isWalking = false;
			return false;
		}

		return this.map.swapSquares(this.currentItem, this.getWalkTowards(this.goalItem));
	}

	doneWithStep() {
		return !(this.step.item.x === this.step.goal.x
			&& this.step.item.y === this.step.goal.y);
	}

	moveX() {
		if (this.inventory.position.x === this.inventory.home.x) {
			return;
		}

		if (this.inventory.position.x > this.inventory.home.x) {
			this.move({ x: this.inventory.position.x - 1, y: this.inventory.position.y });
		} else {
			this.move({ x: this.inventory.position.x + 1, y: this.inventory.position.y });
		}
	}

	moveY() {
		if (this.inventory.position.y === this.inventory.home.y) {
			return;
		}

		if (this.inventory.position.y > this.inventory.home.y) {
			this.move({ x: this.inventory.position.x, y: this.inventory.position.y - 1 });
		} else {
			this.move({ x: this.inventory.position.x, y: this.inventory.position.y + 1 });
		}
	}

	move(position) {
		this.map.swapSquares(this.inventory, this.map.getSquare(position));
	}
}

class Bot {
	constructor(position, direction) {
		this.inventory = null;
		this.position  = position;
		this.direction = direction;
	}

	// goTo(position) {

	// }

	pickUp() {
		this.inventory = this.map.getSquare(this.position);
	}

	putDown() {
		this.inventory = null;
	}

	tick() {
		if (this.inventory === null
			&& this.goal === null) {
			findSquare();
		}
	}
}

// const compare = function compare(valOne, valTwo){
// 	return valOne - valTwo;
// }

// let map = new Map(192,108);
const map = new Map(mapWidth, mapHeight);
const solver = InsertionSort;
const mapSolver = new MapSolver(map, solver);
let interval = null;

const fps = 3;
const tick = function tick() {
	try {
		mapSolver.step();
		map.draw();
	} catch (e) {
		clearInterval(interval);
		throw e;
	}
};

interval = setInterval(tick, 1000.0 / fps);
