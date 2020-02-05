import { writable } from "svelte/store";

const defaultTodos = [
  { id: 1, text: 'Show todos', isComplete: true, isEditing: false },
  { id: 2, text: 'Mark todo complete', isComplete: true },
  { id: 3, text: 'Hard-delete todo', isComplete: true },
  { id: 4, text: 'Add todo', isComplete: true },
  { id: 5, text: 'Edit todo', isComplete: false, isEditing: false }
];

export function createTodos(initialTodosList) {
  const { subscribe, set, update } = writable(initialTodosList);

  return {
    subscribe,
    addTodo: (newTodoText) => update(todoList => {
      const maxId = todoList.length > 0
        ? Math.max(...todoList.map(t => t.id))
        : 0;
      const newId = maxId + 1;
      const newTodo = { id: newId, text: newTodoText, isComplete: false };
      return [ ...todoList, newTodo ];
    }),
    clearTodos: () => set([]),
    completeTodo: (todoId) => update(todoList => {
      return todoList.map(t => {
        return {
          ...t,
          isComplete: t.id === todoId ? !t.isComplete : t.isComplete
        }
      });
    }),
    deleteTodo: (todoId) => update(todoList => {
      return todoList.filter(t => t.id !== todoId);
    }),
    editTodo: (todoId, newTodoText) => update(todoList => {
      return todoList.map(t => {
        return {
          ...t,
          text: t.id === todoId ? newTodoText : t.text,
          isEditing: t.id === todoId ? false : t.isEditing
        }
      });
    })
  };
}

export const todos = createTodos(defaultTodos);