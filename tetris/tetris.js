const canvas  = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const boardWidth  = 10;
const boardHeight = 20;
const fps         = 120;

let pieces = [];
let board  = Array(10).fill(Array(10).fill(0));


let tick = function(){
	let anyFalling = false;
	//drop all pieces 1 square
	for(piece in pieces){
		if(piece.isFalling){
			piece.fall();
			anyFalling = true;
		}
	}

	//check for new row
	checkRows();

	if(!anyFalling){
		addNewPiece();
	}
}

let Piece = function(){
	let squares = createNewSquares();
	let isFalling = true;

	let fall = function(){
		if(canFall){
			for (var i = squares.length - 1; i >= 0; i--) {
				squares[i].fall();
			}
			isFalling = true;
		}
		isFalling = false;
	}

	let createNewSquares = function(){
		let squares     = Array(4);
		let startSquare = {x:Math.floor(Math.random() * boardWidth),//random sqare on top of board
						   y:boardHeight-1};

		squares[0] = startSquare;
		for (var i = 1; i < Things.length; i++) {
			Things[i] = getAdjSquare(squares[0]);//find adjacent squares to create shape
			if(things[i] === false){
				return false;
			}
		}
	}

	let getAdjSquare = function(square){
		let choice = Math.floor(Math.random() * 4);
		let count  = 0;
		//TODO trying to check adjacent squares, use choice to determine which is checked first
		for (var i = 0; i < Things.length; i++) {
			Things[i]
		}
	}
}