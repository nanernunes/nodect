# Nodect

[![license](https://img.shields.io/github/license/nanernunes/nodect.svg)](LICENSE)
[![version](https://img.shields.io/github/tag/nanernunes/nodect.svg)](https://github.com/nanernunes/nodect/releases/latest)
[![npm version](https://img.shields.io/npm/v/nodect.svg?style=flat)](https://www.npmjs.com/package/nodect)
[![LoC](https://tokei.rs/b1/github/nanernunes/nodect?category=lines)](https://github.com/nanernunes/nodect)
[![codecov](https://codecov.io/gh/nanernunes/nodect/branch/master/graph/badge.svg)](https://codecov.io/gh/nanernunes/nodect)

Nodect is a subset of React functions and hooks designed to work with Node

![nodect logo](assets/nodect.png)

# Hooks at a Glance
Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

## βοΈ Rules of Hooks
Hooks are JavaScript functions, but they impose two additional rules:

- πββοΈ (React): ~~Only call Hooks **at the top level**. Donβt call Hooks inside loops, conditions, or nested functions;~~
- πββοΈ (React): ~~Only call Hooks **from React function components.** Donβt call Hooks from regular JS functions;~~
- π₯° (Nodect): **Call Hooks from anywhere.**


## π State Hook
This example sets a name. When you call the setter, it changes the value:

```typescript
import { useState } from 'nodect'

// Declare a new state function, which we'll call "name"
const [name, setName] = useState("World")

console.log(`Hello ${name()}!`)

setName("Nodect")
console.log(`I'm using ${name()}`) 
```
```
Hello World!
I'm using Nodect
```


## π‘ Nodect replaces **state envs** with **getters**.
```typescript
/* value is a getter function */
const [value, setValue] = useState()
```

 ```typescript
/* So, instead of using it as an env */
console.log(value)

/* call the function instead */
console.log(value())

/* You can destructure the value with a get prefix
so you don't forget about the env/function rule */
const [getCounter, setCounter] = useState(0)
```


## π‘ Building Your Own Hooks
Sometimes, we want to reuse some stateful logic between components. Custom Hooks let you do this, but without adding more functions to your tree.

Letβs say we want to reuse a counter logic in more than one place or just isolate its logic.

First, weβll extract this logic into a custom Hook called useCounter:

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

Now we can use it in any code:

```typescript
/* without functions, components or closures */
const [counter, increment, decrement] = useCounter()
```

```typescript
const InsideFunction = () => {
    
    /* with an optional custom initial value */
    const [counter, increment, decrement] = useCounter(10)

    increment()
    decrement()
}
```

The state of each hook is completely independent. Hooks are a way to reuse stateful logic, not state itself. In fact, each call to a Hook has a completely isolated state β so you can even use the same custom Hook twice in the same block of code.

## β‘οΈ Effect Hook
Youβve likely performed data fetching, subscriptions, and etc. We call these operations βside effectsβ (or βeffectsβ for short). The Effect Hook, `useEffect`, adds the ability to perform side effects

For example, this function logs after any counter update:

```typescript
import { useEffect } from 'nodect'

const CounterChanges = () => {
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

When you call `useEffect`, youβre telling Nodect to run your βeffectβ function after flushing changes to the state. By default, Nodect runs the effects after every change β including the first change. This is the reason of the first log with 0.

```
the counter has changed -> 0
```

## π Hook Tips
Setters define new states through values or by a callback function that receives the state as a parameter:

```typescript
const [age, setAge] = useState(18)

/* by value */
setAge(19)

/* by a function */
setAge((age) => age + 1)

/* or even this way */
setAge(age => ++age)
```