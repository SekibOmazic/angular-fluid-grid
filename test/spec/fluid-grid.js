'use strict';

describe('GridyCtrl', function() {

	// load the controller's module
	beforeEach(module('gridy'));

	var GridyCtrl,
		item1x1,
		item2x1,
		item1x2,
		item2x2;

	// Initialize the controller
	beforeEach(inject(function($controller) {
		item1x1 = {
			sizeX: 1,
			sizeY: 1,
			id: '1x1'
		};
		item2x1 = {
			sizeX: 2,
			sizeY: 1,
			id: '2x1'
		};
		item2x2 = {
			sizeX: 2,
			sizeY: 2,
			id: '2x2'
		};
		item1x2 = {
			sizeX: 1,
			sizeY: 2,
			id: '1x2'
		};

		var config = [item1x1, item2x1, item2x2, item1x2];

		GridyCtrl = $controller('GridyCtrl');
		GridyCtrl.setOptions(config);
	}));

	it('should have a grid Array', function() {
		expect(GridyCtrl.grid.constructor).toBe(Array);
	});

	describe('options', function() {
		it('should set default options', function() {
			expect(GridyCtrl.columns).toBe(6);
			expect(GridyCtrl.width).toBe('auto');
			expect(GridyCtrl.colWidth).toBe('auto');
			expect(GridyCtrl.rowHeight).toBe('match');
			expect(GridyCtrl.margins).toEqual([10, 10]);
			expect(GridyCtrl.isMobile).toBe(false);
			expect(GridyCtrl.minColumns).toEqual(1);
			expect(GridyCtrl.minRows).toBe(1);
			expect(GridyCtrl.maxRows).toBe(100);
			expect(GridyCtrl.defaultSizeX).toBe(2);
			expect(GridyCtrl.defaultSizeY).toBe(1);
			expect(GridyCtrl.mobileBreakPoint).toBe(600);
			expect(GridyCtrl.resizable.enabled).toBe(true);
			expect(GridyCtrl.draggable.enabled).toBe(true);
		});

		// todo: move these to e2e test
		//		it('should resolve smart options', function() {
		//			expect(GridyCtrl.curWidth).toBe(400); // inherit element width
		//			expect(GridyCtrl.curColWidth).toBe(65); // (400 - 10) / 6
		//			expect(GridyCtrl.curRowHeight).toBe(65); // match curColWidth
		//		});

		it('should update options', function() {
			GridyCtrl.setOptions({
				width: 1200,
				colWidth: 120,
				rowHeight: 140,
				columns: 7,
				margins: [15, 15]
			});

			expect(GridyCtrl.width).toBe(1200);
			expect(GridyCtrl.colWidth).toBe(120);
			expect(GridyCtrl.rowHeight).toBe(140);
			expect(GridyCtrl.columns).toBe(7);
			expect(GridyCtrl.margins).toEqual([15, 15]);

			// todo: move these to e2e test
			//			expect(GridyCtrl.curColWidth).toBe(120);
			//			expect(GridyCtrl.curRowHeight).toBe(140);
		});
	});

	describe('autoSetItemPosition', function() {
		it('should place an item in the first available space', function() {
			GridyCtrl.putItem(item2x1, 0, 1);
			GridyCtrl.autoSetItemPosition(item1x1);
			expect(GridyCtrl.getItem(0, 0)).toBe(item1x1);

			GridyCtrl.autoSetItemPosition(item2x2);
			expect(GridyCtrl.getItem(0, 3)).toBe(item2x2);
		});

		it('should respect item size', function() {
			GridyCtrl.putItem(item2x1, 0, 1);

			GridyCtrl.autoSetItemPosition(item2x2);
			expect(GridyCtrl.getItem(0, 3)).toBe(item2x2);
		});
	});

	describe('putItem', function() {
		it('should be able to place an item with coordinates', function() {
			GridyCtrl.putItem(item1x1, 2, 3);
			expect(GridyCtrl.getItem(2, 3)).toBe(item1x1);
		});

		it('should place an item without coordinates into empty grid', function() {
			GridyCtrl.putItem(item1x1);
			expect(GridyCtrl.getItem(0, 0)).toBe(item1x1);
		});

		it('should place item into without coordinates into the next available position', function() {
			// place 1x1 at 0x0
			GridyCtrl.putItem(item1x1);
			expect(GridyCtrl.getItem(0, 0)).toBe(item1x1);

			// place 2x1 at 0x2
			item2x1.row = 0;
			item2x1.col = 2;
			GridyCtrl.putItem(item2x1);
			expect(GridyCtrl.getItem(0, 2)).toBe(item2x1);

			// place 1x2 in without coordinates
			GridyCtrl.putItem(item1x2);
			expect(GridyCtrl.getItem(0, 1)).toBe(item1x2); // should stick it at 0x1

			// place 2x2 without coordinates
			GridyCtrl.putItem(item2x2);
			expect(GridyCtrl.getItem(0, 4)).toBe(item2x2); // should stick it at 0x4
		});

		it('should not allow items to be placed with negative indices', function() {
			GridyCtrl.putItem(item1x1, -1, -1);
			expect(GridyCtrl.getItem(0, 0)).toBe(item1x1);
			expect(item1x1.row).toBe(0);
			expect(item1x1.col).toBe(0);
		});

		it('should not float items until told to', function() {
			GridyCtrl.putItem(item1x1, 3, 0);
			expect(GridyCtrl.getItem(0, 0)).toBe(null);
			expect(GridyCtrl.getItem(3, 0)).toBe(item1x1);
		});

		it('should not create two references to the same item', function() {
			GridyCtrl.putItem(item1x1, 0, 0);
			expect(GridyCtrl.getItem(0, 0)).toBe(item1x1);
			GridyCtrl.putItem(item1x1, 0, 4);
			expect(GridyCtrl.getItem(0, 4)).toBe(item1x1);
			expect(GridyCtrl.getItem(0, 0)).toBe(null);
		});
	});

	describe('getItem', function() {
		it('should match any column of a multi-column item', function() {
			GridyCtrl.putItem(item2x2, 0, 2);

			// all 4 corners should return the same item
			expect(GridyCtrl.getItem(0, 2)).toBe(item2x2);
			expect(GridyCtrl.getItem(1, 2)).toBe(item2x2);
			expect(GridyCtrl.getItem(0, 3)).toBe(item2x2);
			expect(GridyCtrl.getItem(1, 3)).toBe(item2x2);
		});
	});

	describe('getItems', function() {
		it('should get items within an area', function() {
			GridyCtrl.putItem(item2x2, 0, 1);
			GridyCtrl.putItem(item2x1, 2, 0);

			// verify they are still where we put them
			expect(GridyCtrl.getItem(0, 1)).toBe(item2x2);
			expect(GridyCtrl.getItem(2, 0)).toBe(item2x1);

			var items = GridyCtrl.getItems(1, 0, 2, 1);
			expect(items.length).toBe(1);
			expect(items[0]).toBe(item2x2);
		});
	});

	describe('floatItemsUp', function() {
		it('should float an item up', function() {
			GridyCtrl.putItem(item1x1, 3, 0);
			GridyCtrl.floatItemsUp();
			expect(GridyCtrl.getItem(0, 0)).toBe(item1x1);
		});

		it('should stack items when they float up', function() {
			GridyCtrl.putItem(item1x1, 3, 0);
			GridyCtrl.floatItemsUp();
			expect(GridyCtrl.getItem(0, 0)).toBe(item1x1);

			GridyCtrl.putItem(item2x1, 3, 0);
			GridyCtrl.floatItemsUp();
			expect(GridyCtrl.getItem(1, 0)).toBe(item2x1);

			GridyCtrl.putItem(item1x1, 3, 1);
			GridyCtrl.floatItemsUp();
			expect(GridyCtrl.getItem(1, 1)).toBe(item1x1);
		});

		it('should correctly stack multi-column items when their primary coordinates do not stack', function() {
			GridyCtrl.putItem(item2x2, 0, 2);
			GridyCtrl.putItem(item2x1, 2, 1);

			// verify they are still where we put them
			expect(GridyCtrl.getItem(0, 2)).toBe(item2x2);
			expect(GridyCtrl.getItem(2, 1)).toBe(item2x1);

			// allow them to float up
			GridyCtrl.floatItemsUp();

			// verify they are still where we put them
			expect(GridyCtrl.getItem(0, 2)).toBe(item2x2);
			expect(GridyCtrl.getItem(2, 1)).toBe(item2x1);
		});
	});

	describe('moveOverlappingItems', function() {
		it('should correctly stack items on resize when their primary coordinates do not stack', function() {
			GridyCtrl.putItem(item1x1, 0, 0);
			GridyCtrl.putItem(item2x2, 0, 2);
			GridyCtrl.putItem(item2x1, 1, 0);

			// verify they are still where we put them
			expect(GridyCtrl.getItem(0, 0)).toBe(item1x1);
			expect(GridyCtrl.getItem(0, 2)).toBe(item2x2);
			expect(GridyCtrl.getItem(1, 0)).toBe(item2x1);

			item2x1.sizeX = 3;
			GridyCtrl.moveOverlappingItems(item2x1);
			expect(GridyCtrl.getItem(1, 2)).toBe(item2x1);

			expect(item2x2.row).toBe(2);
		});

		it('should correctly push items down', function() {
			GridyCtrl.putItem(item2x2, 0, 0);
			GridyCtrl.putItem(item1x1, 2, 0);
			GridyCtrl.putItem(item1x2, 1, 1);
			GridyCtrl.floatItemsUp();

			expect(item2x2.row).toBe(2);
			expect(item2x2.col).toBe(0);

			expect(GridyCtrl.getItem(4, 0)).toBe(item1x1);

			expect(item1x2.row).toBe(0);
			expect(item1x2.col).toBe(1);
		});

		it('should correctly push items down', function() {
			GridyCtrl.putItem(item1x2, 0, 0);
			GridyCtrl.putItem(item2x1, 0, 1);
			GridyCtrl.putItem(item1x1, 1, 2);

			item1x2.sizeX = 2;
			GridyCtrl.moveOverlappingItems(item1x2);

			expect(GridyCtrl.getItem(0, 0)).toBe(item1x2);
			expect(GridyCtrl.getItem(2, 1)).toBe(item2x1);
			expect(GridyCtrl.getItem(3, 2)).toBe(item1x1);
		});
	});
});
