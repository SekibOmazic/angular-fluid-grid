angular-fluid-grid
==================

AngularJS directive providing a nice fluid dashboard functionality.


Tested with FF, Chrome, Safari on OSX and FF, Chrome, IE9 on Windows7.

##Demo

See <a href="http://rawgit.com/SekibOmazic/angular-fluid-grid/master/index.html">Live demo</a>

##Requirements

AngularJS only!


##How to use

Here is an example of the default usage:

```HTML
    <div fluid-grid>
        <ul>
            <li fluid-grid-item="item" ng-repeat="item in items"></li>
        </ul>
    </div>
```

Which expects a scope setup like the following:


```JavaScript
    // IMPORTANT: Items should be placed in the grid in the order in which they should appear.
    // In most cases the sorting should be by row ASC, col ASC

    // these map directly to fluidGridItem directive options
    $scope.items = [
        { sizeX: 2, sizeY: 1, row: 0, col: 0 },
        { sizeX: 2, sizeY: 2, row: 0, col: 2 },
        { sizeX: 1, sizeY: 1, row: 0, col: 4 },
        { sizeX: 1, sizeY: 1, row: 0, col: 5 },
        { sizeX: 2, sizeY: 1, row: 1, col: 0 },
        { sizeX: 1, sizeY: 1, row: 1, col: 4 },
        { sizeX: 1, sizeY: 2, row: 1, col: 5 },
        { sizeX: 1, sizeY: 1, row: 2, col: 0 },
        { sizeX: 2, sizeY: 1, row: 2, col: 1 },
        { sizeX: 1, sizeY: 1, row: 2, col: 3 },
        { sizeX: 1, sizeY: 1, row: 2, col: 4 }
    ];
```

## Configuration

#### Via Scope
Simply pass your desired options to the fluid-grid directive


```JavaScript
    $scope.fluidGridOpts = {
		columns: 6, // the width of the grid, in columns
		pushing: true, // whether to push other items out of the way on move or resize
		floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
		width: 'auto', // can be an integer or 'auto'. 'auto' scales fluid-grid to be the full width of its containing element
		colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
		rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
		margins: [10, 10], // the pixel distance between each widget
		outerMargin: true, // whether margins apply to outer edges of the grid
		isMobile: false, // stacks the grid items if true
		mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
		mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
		minColumns: 1, // the minimum columns the grid must have
		minRows: 2, // the minimum height of the grid, in rows
		maxRows: 100,
		defaultSizeX: 2, // the default width of a fluid-grid item, if not specifed
		defaultSizeY: 1, // the default height of a fluid-grid item, if not specified
		resizable: {
            enabled: true,
            handles: ['s', 'e', 'n', 'w', 'se', 'ne', 'sw', 'nw'],
            start: function(event, $element, item) {}, // optional callback fired when resize is started,
            resize: function(event, $element, item) {}, // optional callback fired when item is resized,
            stop: function(event, $element, item) {} // optional callback fired when item is finished resizing
		},
		draggable: {
            enabled: true, // whether dragging items is supported
            handle: '.my-class', // optional selector for drag handle (either element tag or class attribute)
            start: function(event, $element, item) {}, // optional callback fired when drag is started,
            drag: function(event, $element, item) {}, // optional callback fired when item is moved,
            stop: function(event, $element, item) {} // optional callback fired when item is finished dragging
		},
		dynamicContent: { // optional dynamic content to be injected (see below for more information)
		    name: 'some-attr', // item's attribute holding the name of the custom directive (required)
		    selector: '.some-class' // element tag or class name where dynamic content will be injected (required)
		}
    };
```


#### Via Constant
You can also override the default configuration site wide by modifying the ```fluidGridConfig``` constant

```JavaScript
    angular.module('yourApp').run(['fluidGridConfig', function(fluidGridConfig) {
        fluidGridConfig.width = 1000;
    }]);
```

#### Dynamic Content

To add (inject) a dynamic content like for example your own directive, use the ```dynamicContent``` option. Just
provide the name of item's attribute that holds the name of your custom directive and the selector (html element or
class name) which marks the position where your directive will be placed. Sounds complicated? OK, let's try with an
example.

Given this:

```JavaScript

// somewhere in your controller
this.fluidGridOpts = {
    dynamicContent: {
        name: 'type',
        selector: '.put-my-content-here'
    }
};

this.items = [{
    sizeX: 2,
    sizeY: 1,
    row: 0,
    col: 0,
    name: 'Widget 1',
    type: 'my-custom-directive'
}];
```

```HTML

    <div fluid-grid="ctrl.fluidGridOpts">
        <ul>
            <li fluid-grid-item="item" ng-repeat="item in ctrl.standardItems">
                <div class="put-my-content-here">
                    {{item.row}} , {{item.col}}
                </div>
            </li>
        </ul>
    </div>
```

and your custom directive:

```JavaScript
    angular.directive('myCustomDirective', function () {
        return {
            restrict: 'A',
            template: '<div>My fantastic directive shows item\'s row {{item.row}} and col {{item.col}}</div>',
            scope: {
                item: '='
            }
        };
    });
```

you get following:

```HTML
    <div fluid-grid="ctrl.fluidGridOpts">
        <ul>
            <li fluid-grid-item="item" ng-repeat="item in ctrl.standardItems">
                <div class="put-my-content-here ng-scope ng-isolate-scope" my-custom-directive="" item="item">
                    <div class="ng-binding">
                        <div>My fantastic directive shows item's row 0 and col 0</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
```


##Installation

```bash
    bower install angular-fluid-grid
```

Then, import the following in your HTML alongside `angular`:

```HTML
    <link rel="stylesheet" href="dist/angular-fluid-grid.min.css" />
    <script src="dist/angular-fluid-grid.js"></script>
```


## TO DO

Documentation

Tests (Oh my ...)

~~Option handle to fluid-grid-item (like jQuery-UI)~~