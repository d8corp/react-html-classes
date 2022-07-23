'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classes = require('html-classes');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var classes__default = /*#__PURE__*/_interopDefaultLegacy(classes);

var isSingleStyles = function (styles) {
    for (var key in styles) {
        if (key !== 'root') {
            return false;
        }
    }
    return true;
};
var getStyleGenerator = function (styles) {
    if (isSingleStyles(styles)) {
        return (function (className) { return ({
            root: classes__default["default"]([styles.root, className])
        }); });
    }
    return (function (className, classNames) {
        var result = {};
        for (var key in styles) {
            result[key] = classes__default["default"]([styles[key], key === 'root' && className, classNames && classNames[key]]);
        }
        return result;
    });
};

exports.getStyleGenerator = getStyleGenerator;
exports.isSingleStyles = isSingleStyles;
