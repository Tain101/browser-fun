// FIXME: dont pass thw solver to this, try and flip it?
// the sort should hold the index not the solver?
// because not all solvers have the same number of indexes
/**
 * The first sort made. Was supposed to be similar to insertion/bubble sort.
 * Uses swaps to move each square to the correct position.
 * This causes issues as swaps will move previously solved squares.
 *
 * @param {[type]} mapSolver [description]
 */

// export default walkSort;


const walkSort = function weirdBubbleSort(mapSolver) {
	/**
	 * find lowest *unsorted* square
	 * move 1x or 1y towards home
	 * loop
	 */
	if (!mapSolver.isMoving) {
		if (mapSolver.inventory.position.y === (mapSolver.map.height - 1)) {
			mapSolver.inventory = mapSolver.map.getHome({
				x: ((mapSolver.inventory.position.x + 1) % mapSolver.map.width),
				y: 0,
			});
		} else {
			mapSolver.inventory = mapSolver.map.getHome({
				x: mapSolver.inventory.position.x,
				y: mapSolver.inventory.position.y + 1,
			});
		}

		// TODO: this is logically backwards as well
		mapSolver.isMoving = true;
		return;
	}
	if (mapSolver.inventory.position.x === mapSolver.inventory.home.x
		&& mapSolver.inventory.position.y === mapSolver.inventory.home.y) {
		mapSolver.isMoving = false;
		return;
	}

	if (Math.random() > 0.5) {
		if (mapSolver.inventory.position.x !== mapSolver.inventory.home.x) {
			mapSolver.moveX();
		} else {
			mapSolver.moveY();
		}
	}
	if (mapSolver.inventory.position.y !== mapSolver.inventory.home.y) {
		mapSolver.moveY();
	} else {
		mapSolver.moveX();
	}
};