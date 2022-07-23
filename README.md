# react-html-classes
[![NPM](https://img.shields.io/npm/v/react-html-classes.svg)](https://www.npmjs.com/package/react-html-classes)
[![downloads](https://img.shields.io/npm/dm/react-html-classes.svg)](https://www.npmjs.com/package/react-html-classes)
[![license](https://img.shields.io/npm/l/html-classes)](https://github.com/d8corp/react-html-classes/blob/master/LICENSE)  
Combine html classes for React with pleasure.
## Install
```bash
npm i react-html-classes
# or
yarn add react-html-classes
```
## Usage
It was born to simplify the work with SCSS modules.
Use [CRA](https://create-react-app.dev) to start a project.

Create a SCSS module file  
`App.module.scss`
```scss
.root {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  height: 100px;
  background: #aaa;
}

.footer {
  background: #333;
  color: #aaa;
}

.content {
  flex: 1;
}
```

Import the file into  
`App.jsx`
```typescript jsx
import { FC } from 'react'
import { getStyleGenerator, StyleProps } from 'react-html-classes'

// import our styles
import styles from './App.module.scss'

// create style generator
export const getStyles = getStyleGenerator(styles)

export interface AppProps extends StyleProps<typeof getStyles> {
  // add your props here
}

export const App: FC<AppProps> = ({
  className,
  classNames,
}) => {
  // generate html classes list
  const styles = getStyles(className, classNames)
  
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        This is a header
      </header>
      <main className={styles.content}>
        Hello World!
      </main>
      <footer className={styles.footer}>
        FOOTER
      </footer>
    </div>
  )
}
```

## Features
You can provide any styles to the `App` component through props

`index.ts`
```typescript jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App
      className='test'
      classNames={{
        root: 'test1',
        header: 'test2',
        content: 'test3',
        footer: 'test4',
      }}
    />
  </StrictMode>
)
```

You can use any feature available with [html-classes](https://www.npmjs.com/package/html-classes)
on `className` and `classNames`
```typescript jsx
root.render(
  <StrictMode>
    <App
      className={() => 'test'}
      classNames={{
        root: { test1_1: true, test1_2: () => false },
        header: ['test2_1', ['test2_2', 'test2_3']],
        content: () => () => ['test3_1', () => 'test3_2'],
        footer: new Set(['test4']),
      }}
    />
  </StrictMode>
)
```

## Issues
If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/react-html-classes/issues)  
[![issues](https://img.shields.io/github/issues-raw/d8corp/react-html-classes)](https://github.com/d8corp/react-html-classes/issues)  
 
[![stars](https://img.shields.io/github/stars/d8corp/react-html-classes?style=social)](https://github.com/d8corp/react-html-classes)
[![watchers](https://img.shields.io/github/watchers/d8corp/react-html-classes?style=social)](https://github.com/d8corp/react-html-classes)
