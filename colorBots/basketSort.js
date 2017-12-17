//sort into baskets
//fill a basket until full, then move to next basket
//pivot = last item in basket
//compare item with pivot, put smaller one in basket

// class Iter {
// 	constructor(x = 0, y = 0) {
// 		this.x = x;
// 		this.y = y;
// 	}

// 	getScore(){
// 		return map.getSquare({x:this.x, y:this.y});
// 	}
// 	getPosition(){
// 		return {x:this.x, y:this.y};
// 	}
// 	next(){
// 		this.y += 1;
// 		if(!!!map.getArray()[this.x][this.y]){
// 			this.y = 0;
// 			this.x += 1;
// 		}
// 		if(!!!map.getArray()[this.x]){
// 			this = false;
// 		}
// 		return this;
// 	}
// }

// let map = [10][10];
// let currentBasket = 0;
// let pivot = map[currentBasket][end];
// let compareIter = map[currentBasket+1][0];
// let basketIndex = 0;


// while(basketIndex < basketCount){
// 	if(compare(compareIter.getScore(), basketPivot.getScore()) < 0){
// 		map.swapSquares(compareIter.getPosition(), basketPivot.getPosition());
// 		basketPivot.next();
// 	} else {
// 		compareIter.next();
// 	}

// 	if(basketIndex === currentBasket.length){//basket is full, move to next basket
// 		basketIndex = 0;
// 		currentBasket += 1;
// 		compareIter = map[currentBasket+1][0];
// 	}


// }

const BasketSort = function* BasketSort() {
	let currentBasketIndex      = 0; //map[0]
	let currentBasketItemIndex = 0; //currentBasket[0]
	let testObjectPosition = {x: 1, y: 0}; //map[0][0]

	while(currentBasketIndex < mapWidth){
		//fill basket until full
		while(currentBasketItemIndex < mapHeight){
			// const currentBasket               = map.getArray()[currentBasketIndex];
			// const currentBasketItem           = currentBasket[currentBasketItemIndex];
			const testObjectScore             = map.getScore(testObjectPosition);
			const currentBasketItemIndexScore = map.getScore({x:currentBasketIndex, y:currentBasketItemIndex});

			if(compare(testObjectScore, currentBasketItemIndexScore) < 0){
				map.swapSquares(testObjectPosition, {x:currentBasketIndex, y:currentBasketItemIndex});
				currentBasketItemIndex += 1;
				yield;
			}
			/**
			 * we can:
			 * 1 always increment testObjectPosition
			 * 		meaning values could be swapped out of the basket,
			 * 			and not checked again
			 * 		I think this only ensures that one correct in the basket,
			 * 			and one correct out
			 *
			 * 2 restart testObjectPosition every swap
			 *    	this would ensure the basket contains the bottommost values
			 *
			 * 3 check the item we just swapped out against the next pivot
			 *  	ensures every value is checked at least once
			 */

			testObjectPosition.y += 1; //method 1
			if(testObjectPosition.y >= mapHeight){
				testObjectPosition.y = 0;
				testObjectPosition.x += 1;
			}

		}
		currentBasketIndex += 1;
	}

	return null;

};
