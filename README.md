# Nodect
Nodect is a subset of React functions and hooks designed to work with Node

## Using States
```javascript
import { useState } from 'nodect'

const HelloWorld = () => {

    const [hello, setHello] = useState("world")

    // With nodect, state envs are functions too
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

## Using Custom Hooks
```javascript
    const [counter, increment, decrement] = useCounter(0)

    increment()
```

## Using Effects
```javascript
import { useEffect } from 'nodect'

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