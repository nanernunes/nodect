# Nodect

[![version](https://img.shields.io/github/tag/nanernunes/nodect.svg)](https://github.com/nanernunes/nodect/releases/latest)
[![license](https://img.shields.io/github/license/nanernunes/nodect.svg)](LICENSE)
[![LoC](https://tokei.rs/b1/github/nanernunes/nodect?category=lines)](https://github.com/nanernunes/nodect)
[![codecov](https://codecov.io/gh/nanernunes/nodect/branch/master/graph/badge.svg)](https://codecov.io/gh/nanernunes/nodect)

Nodect is a subset of React functions and hooks designed to work with Node

![nodect logo](assets/nodect.png)

## Nodect vs React
Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

Hooks are JavaScript functions, but **~~you need to follow two rules when using them~~**:

**Only Call Hooks at the Top Level**

Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple useState and useEffect calls.

**~~Only Call Hooks from React Functions~~**

Don’t call Hooks from regular JavaScript functions. Instead, you can:

✅ Call Hooks from React function components. **(no limitation with Nodect);**

✅ Call Hooks from custom Hooks (we’ll learn about them on the next page).

By following this rule, you ensure that all stateful logic in a component is clearly visible from its source code.

## Nodect Rules

✅ State envs were replaced with getters. So, instead of using them
```javascript
const [value, setValue] = useState()

// as a normal env
console.log(value)

// use a function instead
console.log(value())
```

## Using States
```javascript
import { useState } from 'nodect'

const HelloWorld = () => {

    /* You can destructure the value with a get prefix
       so you don't forget about the env/function rule
       eg.: const [getHello, setHello] = useState() */
    const [hello, setHello] = useState("world")

    console.log(`Yay! ${hello()}`)

    setHello("nodect")
    console.log(`I'm using ${hello()}`)
}
```

## Creating Custom Hooks
```javascript
import { useState } from 'nodect'

const useCounter = (initialValue = 0) => {
    const [counter, setCounter] = useState(initialValue)

    const increment = () => setCounter(counter => ++counter)
    const decrement = () => setCounter(counter => --counter)

    return [counter, increment, decrement]
}

export { useCounter }
```

## Using Effects
```javascript
import { useEffect } from 'nodect'
import { useCounter } from 'hooks'

const Countable = () => {
    const [counter, increment, decrement] = useCounter()
    
    useEffect(() => {
        console.log(`the counter has changed -> ${counter()}`)
    }, [counter])

    increment()
    increment()
    decrement()
}
```