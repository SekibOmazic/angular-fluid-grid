(function(angular) {
	'use strict';

	function SimpleCtrl() {

		this.fluidGridOpts = {
			margins: [20, 20],
			// outerMargin: false,
			pushing: true,
			floating: true,
			draggable: {
				handle: '.header',
				enabled: false
			},
			resizable: {
				enabled: false,
				handles: ['se', 'ne', 'sw', 'nw'] // corner handles only
			},

			dynamicContent: {
				name: 'type',
				selector: '.section'
			}
		};

		// these map directly to fluidGridItem options
		this.standardItems = [{
			sizeX: 2,
			sizeY: 1,
			row: 0,
			col: 0,
			name: 'Widget 1',
			type: 'custom'
		}, {
			sizeX: 2,
			sizeY: 2,
			row: 0,
			col: 2
		}, {
			sizeX: 2,
			sizeY: 1,
			row: 2,
			col: 1
		}, {
			sizeX: 1,
			sizeY: 1,
			row: 2,
			col: 3
		}, {
			sizeX: 1,
			sizeY: 1,
			row: 2,
			col: 4
		}, {
			sizeX: 1,
			sizeY: 1,
			row: 0,
			col: 4
		}, {
			sizeX: 1,
			sizeY: 1,
			row: 0,
			col: 5
		}, {
			sizeX: 2,
			sizeY: 1,
			row: 1,
			col: 0
		}, {
			sizeX: 1,
			sizeY: 1,
			row: 1,
			col: 4
		}, {
			sizeX: 1,
			sizeY: 2,
			row: 1,
			col: 5
		}, {
			sizeX: 1,
			sizeY: 1,
			row: 2,
			col: 0
		}];
	}

	angular.module('app')
		.controller('SimpleCtrl', SimpleCtrl);

})(angular);
