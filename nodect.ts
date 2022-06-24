let bindings: { [__id__: string]: Function[] } = {}

interface State<T> {
    __id__: string
    (): T
}

const getIndex = (): string => Date.now().toString(36) + Math.random().toString(36).substring(2)

const useState = <T>(initialValue?: T): [State<T>, Function] => {
    let state: T

    const getState = (): T => state
    getState.__id__ = getIndex()

    const setState = (newValue?: any) => {
        if (newValue instanceof Function) {
            newValue = newValue(getState())
        }

        state = newValue

        const effects = bindings[getState.__id__] || []
        effects.map((effect) => effect())
    }

    setState(initialValue)
    return [getState, setState]
}

const useEffect = (effect: Function, dependencies: State<any>[]) => {
    effect()

    for (let dependency of dependencies) {
        bindings[dependency.__id__] ??= []
        bindings[dependency.__id__].push(effect)
    }
}

export { State, useState, useEffect }
