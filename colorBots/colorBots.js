// 2d array
// n 'bots' grabbing amd moving squares
// each bot is tied to a specific row/column
// import { InsertionSort } from './InsertionSort';

const canvas  = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width  = window.innerWidth *  0.9;
canvas.height = window.innerHeight * 0.9;
const mapWidth  = 6;
const mapHeight = 18;

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
				this.array[Math.floor(remaining / this.height)][remaining % this.height],
				this.array[Math.floor(index / this.height)][index % this.height]
			);

			remaining -= 1;
		}
	}

	swapSquares(one, two) {
		let temp = this.array[one.position.x][one.position.y];
		this.array[one.position.x][one.position.y] = this.array[two.position.x][two.position.y];
		this.array[two.position.x][two.position.y] = temp;

		temp         = { ...one.position };
		// one.position = { ...two.position };
		// two.position = { ...temp };
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

//
class Square {
	constructor(red, green, blue, position, score) {
		this.red      = red;
		this.green    = green;
		this.blue     = blue;
		this.position = position;
		this.home     = position;
		this.score    = score;
	}

	getColor() {
		return `rgba( ${this.red} , ${this.green} , ${this.blue} + )`;
	}

	setColor(red, green, blue) {
		this.red   = red;
		this.green = green;
		this.blue  = blue;

		return this;
	}

	setPosition(x, y) {
		this.position.x = x;
		this.position.y = y;
	}
}

class MapSolver {
	constructor(map, sorter) {
		this.map    = map;
		this.sorter = sorter;
	}

	step() {
		if (this.sorter.done) {
			this.map.scramble();
		}
		this.sorter.next(this.map.getArray());
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

	goTo (position) {

	}

	pickUp() {
		this.inventory = this.map.getSquare(this.position);
	}

	putDown() {
		this.inventory = null;
	}

	// draw() {

	// }

	tick() {
		// find a square to pick up
		// move to it
		// pick it up
		// find a position to drop it
		// move to it
		// drop it
		// loop
		if (this.inventory === null
			&& this.goal === null) {
			findSquare();
		}
	}
}

// let map = new Map(192,108);
const map = new Map(mapWidth, mapHeight);
const solver = InsertionSort;
const mapSolver = new MapSolver(map, solver);
let interval = null;

const fps = 60;
const tick = function tick () {
	try {
		mapSolver.step();
		map.draw();
	} catch (e) {
		clearInterval(interval);
		throw e;
	}
};

interval = setInterval(tick, 1000.0 / fps);
