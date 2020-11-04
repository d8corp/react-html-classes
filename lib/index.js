'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classes = _interopDefault(require('html-classes'));

var STYLES = Symbol('styles');
var styleComponent;
function style(styles) {
    var newStyles = {};
    var oldStyles = {};
    var _loop_1 = function (key) {
        var className = classes(styles[key]);
        oldStyles[key] = className;
        newStyles[key] = {
            get: function () {
                var _a;
                if (styleComponent) {
                    var props = styleComponent.props;
                    return classes(styleComponent[STYLES][key], key === 'root' && props.className, (_a = props.classNames) === null || _a === void 0 ? void 0 : _a[key]);
                }
                return className;
            }
        };
    };
    for (var key in styles) {
        _loop_1(key);
    }
    Object.defineProperties(styles, newStyles);
    return function (target) {
        var prototype = target.prototype;
        var render = prototype === null || prototype === void 0 ? void 0 : prototype.render;
        if (render) {
            if (STYLES in prototype) {
                prototype[STYLES] = { __proto__: prototype[STYLES] };
                for (var key in oldStyles) {
                    prototype[STYLES][key] = classes(prototype[STYLES][key], oldStyles[key]);
                }
            }
            else {
                prototype[STYLES] = oldStyles;
                Object.defineProperty(prototype, 'render', {
                    value: function () {
                        var prevProps = styleComponent;
                        styleComponent = this;
                        var result = render.apply(this, arguments);
                        styleComponent = prevProps;
                        return result;
                    }
                });
            }
        }
        else {
            return function () {
                var _a;
                var prevProps = styleComponent;
                styleComponent = (_a = { props: arguments[0] }, _a[STYLES] = oldStyles, _a);
                var result = target.apply(this, arguments);
                styleComponent = prevProps;
                return result;
            };
        }
        return target;
    };
}

exports.classes = classes;
exports.default = style;
