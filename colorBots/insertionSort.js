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

const InsertionSort = function* InsertionSort(array) {
	let index = 1;
	while (index < array.length) {
		let curIndex = index;
		while (curIndex > 0) {
			if(compare(array[curIndex].score, array[curIndex - 1].score) < 0){
				map.swapSquares(array[curIndex].position, array[curIndex - 1].position);
			}
			curIndex -= 1;
			yield;
		}
		index += 1;
	}

	return array;
};

// export default InsertionSort;
