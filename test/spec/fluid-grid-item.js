'use strict';

describe('Controller: FluidGridItemCtrl', function() {
	// load the controller's module
	beforeEach(module('fluidGrid'));

	var fluidGrid,
		config,
		scope,
		item1x1,
		item2x1,
		item1x2,
		item2x2,
		fluidGridItem;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();

		config = {
			colWidth: 100,
			rowHeight: 100,
			columns: 6,
			margins: [10, 10],
			defaultHeight: 1,
			defaultWidth: 2,
			minRows: 2,
			maxRows: 100,
			mobileBreakPoint: 600,
			defaultSizeX: 3,
			defaultSizeY: 4
		};

		fluidGrid = $controller('FluidGridCtrl');
		fluidGridItem = $controller('FluidGridItemCtrl');

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

		fluidGrid.setOptions(config);
		fluidGridItem.init(null, fluidGrid);
	}));

	it('should get defaults from fluid-grid', function() {
		expect(fluidGridItem.sizeX).toBe(config.defaultSizeX);
		expect(fluidGridItem.sizeY).toBe(config.defaultSizeY);
	});

});
