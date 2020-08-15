# react-html-classes
[![NPM](https://img.shields.io/npm/v/react-html-classes.svg)](https://www.npmjs.com/package/react-html-classes)
[![downloads](https://img.shields.io/npm/dm/react-html-classes.svg)](https://www.npmjs.com/package/react-html-classes)
[![license](https://img.shields.io/npm/l/html-classes)](https://github.com/d8corp/react-html-classes/blob/master/LICENSE)  
Combine html classes for React.
## Installation
```bash
npm i react-html-classes
# or
yarn add react-html-classes
```
## Using
You may use `react-html-classes` as a decorator of react component.
```typescript jsx
import React, {Component} from 'react'
import style, {StyleProps} from 'react-html-classes'

// default class names
const styles = {
  root: 'root'
}

@style(styles)
class Root extends Component <StyleProps<typeof styles>> {
  render () {
    return styles.root
  }
}

export default Root
```
Also, you can use it without decorators
```typescript jsx
import React, {Component} from 'react'
import style, {StyleProps} from 'react-html-classes'

// default class names
const styles = {
  root: 'root'
}

class Root extends Component <StyleProps<typeof styles>> {
  render () {
    return styles.root
  }
}

export default style(styles)(Root)
```
You can override a function component
```typescript jsx
import React, {FunctionComponent} from 'react'
import style, {StyleProps} from 'react-html-classes'

// default class names
const styles = {
  root: 'root'
}

const Root: FunctionComponent<StyleProps<typeof styles>> = () => {
  return styles.root
}

export default style(styles)(Root)
```
## Features
You can override default class names by component props `className` and `classNames`.
```typescript jsx
const Test = () => <Root className='test' />
// returns `root test`

const Test = () => <Root classNames={{root: 'test'}} />
// the same `root test`
```
All features from [html-classes](https://www.npmjs.com/package/html-classes) are available to use.
```typescript jsx
import React, {Component} from 'react'
import style, {StyleProps} from 'react-html-classes'

// default class names
const styles = {
  root: () => 'root', // returns 'root'
  test: ['test1', 'test2'] // returns 'test1 test2'
}

@style(styles)
class Root extends Component <StyleProps<typeof styles>> {
  render () {
    return <>{styles.root} | {styles.test}</>
  }
}

export default Root
```
With props
```typescript jsx
const Test = () => <Root className={{test: true}} />
// returns `root test | test1 test2`

const Test = () => <Root className='test' classNames={{
  root: 'root-test',
  test: ['test3']
}} />
// returns `root test root-test | test1 test2 test3`
```
## Create React App
You can use it with sass modules in CRA.
```typescript jsx
import React, {Component} from 'react'
import style, {StyleProps} from 'react-html-classes'
import styles from './Root.module.scss'

@style(styles)
class Root extends Component <StyleProps> {
  render () {
    return styles.root
  }
}

export default Root
```
## Issues
If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/react-html-classes/issues)  
[![issues](https://img.shields.io/github/issues-raw/d8corp/react-html-classes)](https://github.com/d8corp/react-html-classes/issues)  
 
[![stars](https://img.shields.io/github/stars/d8corp/react-html-classes?style=social)](https://github.com/d8corp/react-html-classes)
[![watchers](https://img.shields.io/github/watchers/d8corp/react-html-classes?style=social)](https://github.com/d8corp/react-html-classes)
