import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

const ADD_TASK = "task/add"
const DELETE_TASK = "task/delete"
const FETCH_TASKS = "task/fetch"

const initialState = {
  task: [],
}

const reducer  = (state = initialState, action) => {
  switch(action.type){
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload]
      }
      
    case DELETE_TASK:
      return {
        ...state,
        task: state.task.filter((ele, index) => {
          return index != action.payload
        })
      }

      case FETCH_TASKS:
        return {
          ...state,
          task: [...state.task, ...action.payload]
        }
      
    default:
      return state
  }
}

export const addTask = (data) => {
  return {type: ADD_TASK, payload: data}
}

export const deleteTask = (id) => {
  return {type: DELETE_TASK, payload: id}
}

export const fetchTasks = () => {
  return async (dispatch) => {
    try{
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      )

      const tasks = await res.json()

      dispatch({
        type: FETCH_TASKS,
        payload: tasks.map((currEle) => currEle.title) 
      })
      
    } catch (err){
      console.log(err)
    }
  }
}
      
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

// Getting the initial state
console.log("Initial State: ", store.getState())

// Adding the tasks in the state
// store.dispatch({type: ADD_TASK, payload: "Hello World!!!"}) // Writing type each time
store.dispatch(addTask("Hello World!!!"))
console.log("Updated State: ", store.getState())

// store.dispatch({type: ADD_TASK, payload: "Happy New Year!!!"})  // Writing type each time
store.dispatch(addTask("Happy New Year!!!"))
console.log("Updated State: ", store.getState())

// Deleting the task in the state
// store.dispatch({type: DELETE_TASK, payload: 1}) // Writing type each time
store.dispatch(deleteTask(1)) // Writing type each time
console.log("Updated State: ", store.getState())
