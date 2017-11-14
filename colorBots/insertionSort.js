/**
 * Insertion Sort
 */

import swap from 'swap.js';

const InsertionSort = function* InsertionSort(array) {
	let index = 1;
	while (index < array.length) {
		let curIndex = index;
		while (curIndex > 0
			&& array[curIndex] < array[curIndex - 1]) {
			swap(curIndex, curIndex - 1, array);
			curIndex -= 1;
			yield;
		}
		index += 1;
	}

	return array;
};

export default InsertionSort;
