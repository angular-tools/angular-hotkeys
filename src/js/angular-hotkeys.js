angular.module('angularHotkeys', [])
    .directive('hotkey', function () {
        return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs',
                function ($scope, $element, $attrs) {
                    var mousetrap;

                    $scope.$watch($attrs.hotkey, function (_mousetrap) {
                        mousetrap = _mousetrap;

                        Mousetrap.prototype.stopCallback = function () {
                            return false;
                        };

                        for (var key in mousetrap) {
                            if (mousetrap.hasOwnProperty(key)) {
                                Mousetrap.unbind(key);
                                Mousetrap.bind(key, applyWrapper(mousetrap[key]));
                            }
                        }
                    }, true);

                    function applyWrapper(func) {
                        return function (e) {
                            $scope.$apply(function () {
                                e.preventDefault();
                                func();
                            });
                        };
                    }

                    $element.bind('$destroy', function () {
                        if (!mousetrap) return;

                        for (var key in mousetrap) {
                            if (mousetrap.hasOwnProperty(key)) {
                                Mousetrap.unbind(key);
                            }
                        }
                    });

                }]
        }
    });