'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var htmlClasses = require('html-classes');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var htmlClasses__default = /*#__PURE__*/_interopDefaultLegacy(htmlClasses);

var classes = htmlClasses__default["default"];
var isSingleStyles = function (styles) {
    for (var key in styles) {
        if (key !== 'root') {
            return false;
        }
    }
    return true;
};
var style = function (styles) {
    if (isSingleStyles(styles)) {
        return (function (className) { return ({
            root: classes([styles.root, className])
        }); });
    }
    return (function (className, classNames) {
        var result = {};
        for (var key in styles) {
            result[key] = classes([styles[key], key === 'root' && className, classNames && classNames[key]]);
        }
        return result;
    });
};

exports.classes = classes;
exports["default"] = style;
exports.isSingleStyles = isSingleStyles;
