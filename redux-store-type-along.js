function createStore(reducer) {
    // variables whose value can change are declared by the let keyword in ES6
    let state
    let listeners = []

    // functions are declared by the const keyword since their value will not be modified
    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.map(listener => listener())
    }

    // returns an object whose two props are functions
    return {getState, subscribe, dispatch}
}

// pure function (reducer) to modify and return new state
function todos(state = [], action) {
    console.log('todos() called')
    switch (action.type) {
        case 'ADD_TODO':
            return state = state.concat(action.todo)
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.id)
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (todo.id === action.id) {
                    todo.complete = !todo.complete
                }
                return todo
            })
        default:
            return state
    }
}

// pure function (reducer) to modify and return new state
function goals(state = [], action) {
    console.log('goals() called')
    switch (action.type) {
        case 'ADD_GOAL':
            return state = state.concat(action.goal)
        case 'REMOVE_GOAL':
            return state.filter(goal => goal.id !== action.id)
        default:
            return state
    }
}

function app(state={}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

// two subscribers each returning a ref to an unsubscriber function
const store = createStore(app)
unsub1 = store.subscribe(()=> {
    console.log(`Listener 1: The new state is ${JSON.stringify(store.getState())}`)
})

/*
unsub2 = store.subscribe(()=> {
    console.log(`Listener 2: The new state is ${JSON.stringify(store.getState())}`)
})
*/

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id:1,
        title: 'Run 40k',
        complete: false
    }
})

store.dispatch({
    type: 'ADD_GOAL',
    goal: {
        id:1,
        title: 'Eat well',
        complete: false
    }
})

/*unsub1();

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id:2,
        title: 'Run 10k',
        complete: false
    }
})

console.log(`the state is now ${JSON.stringify(store.getState())}`)

store.dispatch({
    type:'REMOVE_TODO',
    id:1
})

store.dispatch({
    type:'TOGGLE_TODO',
    id:2
})*/
