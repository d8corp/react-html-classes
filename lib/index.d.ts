import classes from 'html-classes';
declare type Rec<K extends keyof any, T> = {
    [P in K]?: T;
};
interface Style {
    [key: string]: any;
}
interface StyleProps<S extends Record<string, any> = Record<string, any>> {
    className?: any;
    classNames?: Rec<keyof S, any>;
}
declare function style(styles: Style): (target: any) => any;
export default style;
export { classes, StyleProps };
