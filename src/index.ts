import classes, { ClassesArgument } from 'html-classes'

export type Keys = string | 'root'
export type IsSingleKeys<K extends Keys = Keys> = Exclude<K, 'root'> extends never ? true : false
export type SingleStyles = { root: string }
export type MultipleStyles<K extends Keys = Keys> = Record<K, string>
export type Styles<K extends Keys = Keys> = MultipleStyles<K> | SingleStyles
export type MultipleRawStyles<K extends Keys = Keys> = {[T in K]?: ClassesArgument<K>}
export type SingleRawStyles = { root?: ClassesArgument }
export type RawStyles<K extends Keys = Keys> = IsSingleKeys<K> extends true ? SingleRawStyles : MultipleRawStyles<K>
export type SingleGenerator = (className: ClassesArgument) => Styles<'root'>
export type MultipleGenerator<K extends Keys = Keys> = (className: ClassesArgument, classNames: RawStyles<K>) => MultipleStyles<K>
export type StyleGenerator<K extends Keys = Keys> = IsSingleKeys<K> extends true
  ? SingleGenerator
  : MultipleGenerator<K>

export type GetClassNames<G extends StyleGenerator = StyleGenerator> = Parameters<G>[1]

export type StyleProps <
  G extends StyleGenerator = StyleGenerator<'root'>,
  S extends GetClassNames = GetClassNames<G>,
  // @ts-ignore
> = IsSingleKeys<keyof S> extends true ? {
  className?: ClassesArgument
} : {
  className?: ClassesArgument
  classNames?: S
}

export const isSingleStyles = <K extends Keys>(styles: RawStyles<K>): styles is SingleStyles => {
  for (const key in styles) {
    if (key !== 'root') {
      return false
    }
  }

  return true
}

export const getStyleGenerator = <K extends Keys>(styles: RawStyles<K>): StyleGenerator<K> => {
  if (isSingleStyles(styles)) {
    return (className => ({
      root: classes([styles.root, className])
    })) as StyleGenerator<K>
  }

  return ((className, classNames) => {
    const result: MultipleStyles = {}

    for (const key in styles) {
      result[key] = classes([styles[key], key === 'root' && className, classNames && classNames[key]])
    }

    return result
  }) as StyleGenerator<K>
}
