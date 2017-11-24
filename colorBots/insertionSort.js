/**
 * Insertion Sort
 */

// import swap from 'swap.js';

const swap = function swap(firstPosition, secondPosition) {
	let temp = firstPosition;
	map.setSquare(firstPosition, map.getSquare(secondPosition));
	map.setSquare(secondPosition, map.getSquare(temp));

	return array;
};

const InsertionSort = function* InsertionSort(array, compare) {
	let index = 1;
	while (index < array.length) {
		let curIndex = index;
		while (curIndex > 0) {
			const squareOne= map.getSquare(array[curIndex]);
			const squareTwo = map.getSquare(array[curIndex - 1]);
			if(mapSolver.compare(squareOne, squareTwo) < 0){
				map.swapSquares(squareOne.position, squareTwo.position);
				yield;
			// 	const temp = {...array[curIndex]};
			// 	array[curIndex] = {...array[curIndex - 1]};
			// 	array[curIndex - 1] = temp;
			}
			curIndex -= 1;
			// yield;
		}
		index += 1;
	}

	return array;
};

// export default InsertionSort;
