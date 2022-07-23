import htmlClasses from 'html-classes';

const classes = htmlClasses;
const isSingleStyles = (styles) => {
    for (const key in styles) {
        if (key !== 'root') {
            return false;
        }
    }
    return true;
};
const style = (styles) => {
    if (isSingleStyles(styles)) {
        return (className => ({
            root: classes([styles.root, className])
        }));
    }
    return ((className, classNames) => {
        const result = {};
        for (const key in styles) {
            result[key] = classes([styles[key], key === 'root' && className, classNames && classNames[key]]);
        }
        return result;
    });
};

export { classes, style as default, isSingleStyles };
