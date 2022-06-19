let bindings = {}

const getIndex = () => (
    Date.now().toString(36)
    + Math.random().toString(36).substring(2)
)

const useState = (initialValue) => {
    let state

    const getState = () => state
    getState.id = getIndex()

    const setState = (newValue) => {
        if (typeof newValue === 'function') {
            newValue = newValue(getState())
        }

        state = newValue

        const effects = bindings[getState.id] || []
        effects.map(effect => effect())
    }

    setState(initialValue)
    return [getState, setState]
}

const useEffect = (effect, dependencies) => {
    effect()

    for (let dependency of dependencies) {
        bindings[dependency.id] ??= []
        bindings[dependency.id].push(effect)
    }

}

export {
    useState,
    useEffect,
}