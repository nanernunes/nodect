# Nodect

[![license](https://img.shields.io/github/license/nanernunes/nodect.svg)](LICENSE)
[![version](https://img.shields.io/github/tag/nanernunes/nodect.svg)](https://github.com/nanernunes/nodect/releases/latest)
[![npm version](https://img.shields.io/npm/v/nodect.svg?style=flat)](https://www.npmjs.com/package/nodect)
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

✅ State envs were replaced with getters.
```typescript
/* value is a getter function */
const [value, setValue] = useState()
```

 ```typescript
/* So, instead of using it as an env */
console.log(value)

/* call the function instead */
console.log(value())
```

```typescript
/* You can destructure the value with a get prefix
so you don't forget about the env/function rule */
const [getCounter, setCounter] = useState(0)
```

## Using States
```typescript
import { useState } from 'nodect'

const HelloWorld = () => {

    const [getHello, setHello] = useState("World")
    console.log(`Yay! ${getHello()}`)

    setHello("nodect")
    console.log(`I'm using ${getHello()}`)
}
```
```
Yay! World
I'm using nodect
```

## Creating Custom Hooks
```typescript
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
```typescript
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

```
the counter has changed -> 0
the counter has changed -> 1
the counter has changed -> 2
the counter has changed -> 1
```