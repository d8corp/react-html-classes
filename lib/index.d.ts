import htmlClasses, { ClassesArgument } from 'html-classes';
export declare const classes: typeof htmlClasses;
export declare type Styles = Record<string, string>;
export declare type RawStyles<S extends Styles = Styles> = Partial<Record<keyof S, ClassesArgument>>;
export declare type StyleGenerator<S extends Styles = Styles> = (className?: ClassesArgument, classNames?: RawStyles<S>) => S;
export interface SingleStyleProps {
    className?: ClassesArgument;
}
export interface MultipleStyleProps<S extends Styles = Styles> {
    className?: ClassesArgument;
    classNames?: RawStyles<S>;
}
export declare const isSingleStyles: (styles: Styles) => styles is Record<"root", string>;
declare const style: <S extends Styles>(styles: S) => StyleGenerator<S>;
export default style;
