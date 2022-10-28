import { 
  ACTION_COUNT_ID, 
  ACTION_TODO_MESSAGE, 
  ACTION_TODO_ADD, 
  ACTION_TODO_SET_EDIT, 
  ACTION_TODO_UPDATE, 
  ACTION_TODO_REMOVE 
} from '../actions/todo';

const INITIAL_AVAILABLE_ID = 3;
const INITIAL_STATE = {
  availableId: INITIAL_AVAILABLE_ID,
  todos: [
    {
      status: false,
      text: "Default todo 1",
      id: "1"
    },
    {
      status: false,
      text: "Default todo 2",
      id: "2"
    },
  ],
  editTodo: null,
  todoMessage: '',
};

export default function rootReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ACTION_COUNT_ID:
      return { ...state, count: state.availableId + 1};
    case ACTION_TODO_MESSAGE:
      return { ...state, todoMessage: payload};
    case ACTION_TODO_ADD:
      return { ...state, todos: [...state.todos, payload]};
    case ACTION_TODO_SET_EDIT:
      return { ...state, editTodo: payload};
    case ACTION_TODO_UPDATE:
      return { ...state, todos: state.todos.map(todo => todo.id !== payload.id ? todo : payload)};
    case ACTION_TODO_REMOVE:
      return { ...state, todos: state.todos.filter(todo => todo.id !== payload)};
    default:
      return state;
  }
};
