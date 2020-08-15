import React, {Component, FunctionComponent} from 'react'
import style, {StyleProps} from '.'
import {render} from '@testing-library/react'

function get (component): string {
  return render(component).container.innerHTML
}

describe('classNames', () => {
  describe('examples', () => {
    test('example1', () => {
      const styles = {
        root: 'root-test'
      }

      @style(styles)
      class Test extends Component <StyleProps<typeof styles>> {
        render () {
          return styles.root
        }
      }

      expect(get(<Test />)).toBe('root-test')
      expect(get(<Test className='test' />)).toBe('root-test test')
      expect(get(<Test classNames={{root: 'test1'}} />)).toBe('root-test test1')
      expect(get(<Test classNames={{root: ['test1', 'test2']}} />)).toBe('root-test test1 test2')
      expect(get(<Test classNames={{root: {test1: true, test2: true, test3: false}}} />)).toBe('root-test test1 test2')
      expect(get(<Test className='test1' classNames={{root: ['test2', 'test3']}} />)).toBe('root-test test1 test2 test3')
    })
  })
  describe('empty', () => {
    test('class decorator', () => {
      const styles = {
        root: '',
        test1: '',
        test2: ''
      }

      @style(styles)
      class Test extends Component <StyleProps<typeof styles>> {
        render () {
          const {root, test1, test2} = styles
          return `root: ${root}, test1: ${test1}, test2: ${test2}`
        }
      }

      expect(get(<Test />)).toBe('root: , test1: , test2: ')
      expect(get(<Test className='test' />)).toBe('root: test, test1: , test2: ')
      expect(get(<Test className={['result1', 'result2']} />)).toBe('root: result1 result2, test1: , test2: ')
      expect(get(<Test classNames={{root: ['result1', 'result2']}} />)).toBe('root: result1 result2, test1: , test2: ')
      expect(get(<Test classNames={{root: 'result1', test1: 'result2', test2: 'result3'}} />)).toBe('root: result1, test1: result2, test2: result3')
    })
    test('class override', () => {
      const styles = {
        root: '',
        test1: '',
        test2: ''
      }

      class Test extends Component <StyleProps<typeof styles>> {
        render () {
          const {root, test1, test2} = styles
          return `root: ${root}, test1: ${test1}, test2: ${test2}`
        }
      }

      expect(style(styles)(Test)).toBe(Test)

      expect(get(<Test />)).toBe('root: , test1: , test2: ')
      expect(get(<Test className='test' />)).toBe('root: test, test1: , test2: ')
      expect(get(<Test className={['result1', 'result2']} />)).toBe('root: result1 result2, test1: , test2: ')
      expect(get(<Test classNames={{root: ['result1', 'result2']}} />)).toBe('root: result1 result2, test1: , test2: ')
      expect(get(<Test classNames={{root: 'result1', test1: 'result2', test2: 'result3'}} />)).toBe('root: result1, test1: result2, test2: result3')
    })
    test('function override', () => {
      const styles = {
        root: '',
        test1: '',
        test2: ''
      }

      const Test: FunctionComponent<StyleProps<typeof styles>> = style(styles)(() => {
        const {root, test1, test2} = styles
        return <>root: {root}, test1: {test1}, test2: {test2}</>
      })

      expect(get(<Test />)).toBe('root: , test1: , test2: ')
      expect(get(<Test className='test' classNames={{}} />)).toBe('root: test, test1: , test2: ')
      expect(get(<Test className={['result1', 'result2']} />)).toBe('root: result1 result2, test1: , test2: ')
      expect(get(<Test className='result' classNames={{root: ['result1', 'result2']}} />)).toBe('root: result result1 result2, test1: , test2: ')
      expect(get(<Test classNames={{root: 'result1', test1: 'result2', test2: 'result3'}} />)).toBe('root: result1, test1: result2, test2: result3')
    })
  })
  test('combine', () => {
    const styles1 = {key: 'test1'}
    const styles2 = {key: 'test2'}

    @style(styles2)
    @style(styles1)
    class Test extends Component <StyleProps> {
      render () {
        return <>{styles1.key} | {styles2.key}</>
      }
    }

    expect(get(<Test />)).toBe('test1 test2 | test1 test2')

    expect(get(<Test classNames={{key: 'test3'}} />)).toBe('test1 test2 test3 | test1 test2 test3')
  })
  test('extension', () => {
    const styles1 = {root: 'test1'}
    const styles2 = {root: 'test2'}

    @style(styles1)
    class Test1 extends Component <StyleProps> {
      render () {
        return styles1.root
      }
    }

    @style(styles2)
    class Test2 extends Test1 {}

    expect(get(<Test1 />)).toBe('test1')
    expect(get(<Test1 className='test3' />)).toBe('test1 test3')
    expect(get(<Test2 />)).toBe('test1 test2')
    expect(get(<Test2 className='test3' />)).toBe('test1 test2 test3')
  })
})
