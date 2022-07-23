import { ClassesArgument } from 'html-classes';
export declare type Keys = string | 'root';
export declare type IsSingleKeys<K extends Keys = Keys> = Exclude<K, 'root'> extends never ? true : false;
export declare type SingleStyles = {
    root: string;
};
export declare type MultipleStyles<K extends Keys = Keys> = Record<K, string>;
export declare type Styles<K extends Keys = Keys> = MultipleStyles<K> | SingleStyles;
export declare type MultipleRawStyles<K extends Keys = Keys> = {
    [T in K]?: ClassesArgument<K>;
};
export declare type SingleRawStyles = {
    root?: ClassesArgument;
};
export declare type RawStyles<K extends Keys = Keys> = IsSingleKeys<K> extends true ? SingleRawStyles : MultipleRawStyles<K>;
export declare type SingleGenerator = (className: ClassesArgument) => Styles<'root'>;
export declare type MultipleGenerator<K extends Keys = Keys> = (className: ClassesArgument, classNames: RawStyles<K>) => MultipleStyles<K>;
export declare type StyleGenerator<K extends Keys = Keys> = IsSingleKeys<K> extends true ? SingleGenerator : MultipleGenerator<K>;
export declare type GetClassNames<G extends StyleGenerator = StyleGenerator> = Parameters<G>[1];
export declare type StyleProps<G extends StyleGenerator = StyleGenerator<'root'>, S extends GetClassNames = GetClassNames<G>> = IsSingleKeys<keyof S> extends true ? {
    className?: ClassesArgument;
} : {
    className?: ClassesArgument;
    classNames?: S;
};
export declare const isSingleStyles: <K extends string>(styles: RawStyles<K>) => styles is SingleStyles;
export declare const getStyleGenerator: <K extends string>(styles: RawStyles<K>) => StyleGenerator<K>;
