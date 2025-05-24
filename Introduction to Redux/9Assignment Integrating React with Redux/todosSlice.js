const initialState = {
  todos: []
};

// Action Types
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";

// Action Creators
export const addTodo = (title) => ({
  type: ADD_TODO,
  payload: { title, status: false, id: Date.now() }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});

// Reducer
export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return { todos: [...state.todos, action.payload] };
    case TOGGLE_TODO:
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, status: !todo.status } : todo
        )
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}
