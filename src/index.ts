import htmlClasses, { ClassesArgument } from 'html-classes'

export const classes = htmlClasses

export type Styles = Record<string, string>
export type RawStyles<S extends Styles = Styles> = Partial<Record<keyof S, ClassesArgument>>
export type StyleGenerator<S extends Styles = Styles> = (className?: ClassesArgument, classNames?: RawStyles<S>) => S

export interface SingleStyleProps {
  className?: ClassesArgument
}

export interface MultipleStyleProps <S extends Styles = Styles> {
  className?: ClassesArgument
  classNames?: RawStyles<S>
}

export const isSingleStyles = (styles: Styles): styles is Record<'root', string> => {
  for (const key in styles) {
    if (key !== 'root') {
      return false
    }
  }

  return true
}

const style = <S extends Styles>(styles: S): StyleGenerator<S> => {
  if (isSingleStyles(styles)) {
    return (className => ({
      root: classes([styles.root, className])
    })) as unknown as StyleGenerator<S>
  }

  return ((className, classNames) => {
    const result = {} as S

    for (const key in styles) {
      result[key] = classes([styles[key], key === 'root' && className, classNames && classNames[key]]) as S[typeof key]
    }

    return result
  }) as StyleGenerator<S>
}

export default style
