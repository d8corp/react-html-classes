import classes from 'html-classes'

type Rec <K extends keyof any, T> = { [P in K]?: T }

interface Style {
  [key: string]: any
}
interface StyleDescriptor {
  get (): string
}
interface StyleDescriptors {
  [key: string]: StyleDescriptor
}
interface StyleProps <S extends Record<string, any> = Record<string, any>> {
  className?: any
  classNames?: Rec<keyof S, any>
}
interface StyleComponent <S extends Record<string, any> = Record<string, any>> {
  props: StyleProps<S>
}

const STYLES = Symbol('styles')

let styleComponent: StyleComponent

function style (styles: Style) {
  const newStyles: StyleDescriptors = {}
  const oldStyles: Record<string, string> = {}
  for (const key in styles) {
    const className = classes(styles[key])
    oldStyles[key] = className
    newStyles[key] = {
      get (): string {
        if (styleComponent) {
          const {props} = styleComponent
          return classes(styleComponent[STYLES][key], key === 'root' && props.className, props.classNames?.[key])
        }
        return className
      }
    }
  }
  Object.defineProperties(styles, newStyles)

  return target => {
    const {prototype} = target
    const {render} = prototype
    if (render) {
      if (STYLES in prototype) {
        prototype[STYLES] = {__proto__: prototype[STYLES]}
        for (const key in oldStyles) {
          prototype[STYLES][key] = classes(prototype[STYLES][key], oldStyles[key])
        }
      } else {
        prototype[STYLES] = oldStyles
        Object.defineProperty(prototype, 'render', {
          value () {
            const prevProps = styleComponent
            styleComponent = this
            const result = render.apply(this, arguments)
            styleComponent = prevProps
            return result
          }
        })
      }
    } else {
      return function () {
        const prevProps = styleComponent
        styleComponent = {props: arguments[0], [STYLES]: oldStyles} as StyleComponent
        const result = target.apply(this, arguments)
        styleComponent = prevProps
        return result
      }
    }
    return target
  }
}

export default style

export {
  classes,
  StyleProps
}
