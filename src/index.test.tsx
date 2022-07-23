import React, { FC } from 'react'
import { getStyleGenerator, StyleProps } from '.'
import { render } from '@testing-library/react'

function get (component): string {
  return render(component).container.innerHTML
}

describe('classNames', () => {
  describe('examples', () => {
    test('example1', () => {
      const getStyles = getStyleGenerator({
        root: 'root-test',
      })

      interface TestProps extends StyleProps<typeof getStyles> {

      }

      const Test: FC<TestProps> = ({ className }) => {
        const styles = getStyles(className)

        return <>{styles.root}</>
      }

      expect(get(<Test />)).toBe('root-test')
      expect(get(<Test className='test' />)).toBe('root-test test')
    })
  })
  describe('empty', () => {
    test('class decorator', () => {
      const getStyles = getStyleGenerator({
        root: '',
        test1: '',
        test2: '',
      })

      interface TestProps extends StyleProps<typeof getStyles> {}

      const Test: FC<TestProps> = ({className, classNames}) => {
        const styles = getStyles(className, classNames)

        return <>{`root: ${styles.root}, test1: ${styles.test1}, test2: ${styles.test2}`}</>
      }

      expect(get(<Test />)).toBe('root: , test1: , test2: ')
      expect(get(<Test className='test' />)).toBe('root: test, test1: , test2: ')
      expect(get(<Test className={['result1', 'result2']} />)).toBe('root: result1 result2, test1: , test2: ')
      expect(get(<Test classNames={{root: ['result1', 'result2']}} />)).toBe('root: result1 result2, test1: , test2: ')
      expect(get(<Test classNames={{root: 'result1', test1: 'result2', test2: 'result3'}} />)).toBe('root: result1, test1: result2, test2: result3')
    })
  })
})
