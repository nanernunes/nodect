import { jest } from '@jest/globals'
import { useState, useEffect } from './nodect'

test('useState should allow an initial value', () => {
    const [value] = useState(10)
    expect(value()).toEqual(10)
})

test('useState should return all values as functions', () => {
    const [state, setState] = useState()
    expect(state).toBeInstanceOf(Function)
    expect(setState).toBeInstanceOf(Function)
})

test('useState should include a random id on state', () => {
    const [state] = useState()
    expect(state.__id__).not.toBeUndefined
})

test('useState should always return a random identifier', () => {
    const [one] = useState()
    const [two] = useState()
    expect(one.__id__).not.toEqual(two.__id__)
})

test('useState should allow a setter function with values', () => {
    const [value, setValue] = useState(0)
    setValue(2)
    expect(value()).toEqual(2)
})

test('useState should allow a setter function with callback', () => {
    const [counter, setCounter] = useState(0)
    setCounter((counter) => ++counter)
    expect(counter()).toEqual(1)
})

test('useEffect should invoke the given function when the binding changes', () => {
    const [counter, setCounter] = useState(0)

    const mockEffect = jest.fn()
    expect(mockEffect).toBeCalledTimes(0)

    useEffect(mockEffect, [counter])
    expect(mockEffect).toBeCalledTimes(1)

    setCounter(200)
    expect(mockEffect).toBeCalledTimes(2)
})
