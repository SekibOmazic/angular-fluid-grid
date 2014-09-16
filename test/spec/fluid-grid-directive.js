'use strict';

describe('fluid-grid directive', function () {

  beforeEach(module('fluidGrid'));

  var $scope;
  var FluidGridCtrl;
  var $el;
  var startCount;
  var resizeCount;
  var stopCount;

  var dragHelper = function (el, dx, dy) {
    //el.simulate('mouseover').simulate('drag', {
    //	moves: 1,
    //	dx: dx,
    //	dy: dy
    //});

    el.triggerHandler('mousedown');
    angular.element(document.body).triggerHandler('mousemove', {
      pageX: dx,
      pageY: dy
    });
  };

  beforeEach(inject(function ($rootScope, $compile /*, $document*/) {
    $scope = $rootScope.$new();
    startCount = resizeCount = stopCount = 0;

    $scope.opts = {
      minRows: 3,
      resizable: {
        enabled: true,
        handles: ['s', 'e', 'n', 'w', 'se', 'ne', 'sw', 'nw'],
        start: function () {
          startCount++;
        },
        resize: function () {
          resizeCount++;
        },
        stop: function () {
          stopCount++;
        }
      }
    };

    $scope.dashboard = {
      widgets: [
        {
          id: 1,
          row: 0,
          col: 0,
          sizeX: 1,
          sizeY: 1
        },
        {
          id: 2,
          row: 0,
          col: 3,
          sizeX: 2,
          sizeY: 1
        },
        {
          id: 3,
          row: 1,
          col: 3,
          sizeX: 2,
          sizeY: 2
        }
      ]
    };

    $el = angular.element('<div fluid-grid="opts" style="width: 1000px;">' +
      '<ul><li fluid-grid-item="widget" ng-repeat="widget in dashboard.widgets"></li>' +
      '</div>');

    //$el.appendTo(document.body); // append to body so jquery-simulate works

    //$document.find('body').append($el);
    angular.element(document.body).append($el);

    $compile($el)($scope);
    $scope.$digest();

    FluidGridCtrl = $el.controller('fluidGrid');
  }));


  it('should add a class of fluid-grid', function () {
    expect($el.hasClass('fluid-grid')).toBe(true);
  });

  it('should override options', function () {
    expect(FluidGridCtrl.minRows).toBe($scope.opts.minRows);
  });

  it('should add widgets to DOM', function () {
    expect($el.find('li').length).toBe($scope.dashboard.widgets.length);
  });

  it('should initialize resizable', function () {
    var $widget = $el.find('li')[0];
    expect($widget.childNodes.length).toBe(8);
    var dragHandle = $widget.childNodes[0];
    expect(dragHandle.className).toBe('fluid-grid-item-resizable-handler handle-s'); //('fluid-grid-item-resizable-handler')).toBe(true);
    //expect($widget.find('.handle-e').length).toBe(1);
  });

  it('should update widget dimensions on resize & trigger custom resize events', function () {
    //var $widget = $el.find('li:first-child');
    var $widget = $el.find('li')[0];
    $widget = angular.element($widget);

    var handle = angular.element($widget.find('div')[1]);
    //var handle = $widget.find('.ui-resizable-e');

    expect($widget.prop('offsetWidth')).toBe(155);
    expect($scope.dashboard.widgets[0].sizeX).toBe(1);
    expect(startCount).toBe(0);
    expect(resizeCount).toBe(0);
    expect(stopCount).toBe(0);

    // TODO
    dragHelper(handle, $widget.prop('offsetWidth') + $widget.prop('offsetLeft') + 50); // should resize to next width step

    // TODO
    /*
     expect($widget.prop('offsetWidth')).toBe(320);
     expect($scope.dashboard.widgets[0].sizeX).toBe(2);
     expect(startCount).toBe(1);
     expect(resizeCount).toBe(1);
     expect(stopCount).toBe(1);
     */
  });

});
