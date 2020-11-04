import classes from 'html-classes';
export { default as classes } from 'html-classes';

const STYLES = Symbol('styles');
let styleComponent;
function style(styles) {
    const newStyles = {};
    const oldStyles = {};
    for (const key in styles) {
        const className = classes(styles[key]);
        oldStyles[key] = className;
        newStyles[key] = {
            get() {
                var _a;
                if (styleComponent) {
                    const { props } = styleComponent;
                    return classes(styleComponent[STYLES][key], key === 'root' && props.className, (_a = props.classNames) === null || _a === void 0 ? void 0 : _a[key]);
                }
                return className;
            }
        };
    }
    Object.defineProperties(styles, newStyles);
    return target => {
        const { prototype } = target;
        const render = prototype === null || prototype === void 0 ? void 0 : prototype.render;
        if (render) {
            if (STYLES in prototype) {
                prototype[STYLES] = { __proto__: prototype[STYLES] };
                for (const key in oldStyles) {
                    prototype[STYLES][key] = classes(prototype[STYLES][key], oldStyles[key]);
                }
            }
            else {
                prototype[STYLES] = oldStyles;
                Object.defineProperty(prototype, 'render', {
                    value() {
                        const prevProps = styleComponent;
                        styleComponent = this;
                        const result = render.apply(this, arguments);
                        styleComponent = prevProps;
                        return result;
                    }
                });
            }
        }
        else {
            return function () {
                const prevProps = styleComponent;
                styleComponent = { props: arguments[0], [STYLES]: oldStyles };
                const result = target.apply(this, arguments);
                styleComponent = prevProps;
                return result;
            };
        }
        return target;
    };
}

export default style;
