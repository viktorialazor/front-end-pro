export const ACTION_COUNT_ID = 'countId';
export const ACTION_TODO_MESSAGE = 'message';
export const ACTION_TODO_ADD = 'add';
export const ACTION_TODO_SET_EDIT = 'edit';
export const ACTION_TODO_UPDATE = 'update';
export const ACTION_TODO_REMOVE = 'remove';

export function setAvailableId() {
  return { type: ACTION_COUNT_ID };
};

export function setTodoMessage(message) {
  return { type: ACTION_TODO_MESSAGE, payload: message };
};

export function add(todo) {
  return { type: ACTION_TODO_ADD, payload: todo };
};

export function setEditTodo(todo) {
  return { type: ACTION_TODO_SET_EDIT, payload: todo };
};

export function update(todo) {
  return { type: ACTION_TODO_UPDATE, payload: todo };
};

export function remove(id) {
  return { type: ACTION_TODO_REMOVE, payload: id };
};
