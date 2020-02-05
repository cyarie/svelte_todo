import { get } from "svelte/store";
import { createTodos } from "./stores";

const sampleTodos = [{ id: 1, text: `I'm a todo!`, isComplete: false, isEditing: false }];

test('getting todos should return default todos', () => {
  const newStore = createTodos(sampleTodos);
  expect(get(newStore).length).toBe(1);
});

test('clearTodos should remove all todos and return an empty array', () => {
  const newStore = createTodos(sampleTodos);
  newStore.clearTodos();
  expect(get(newStore).length).toBe(0);
});

test('deleteTodo should remove a todo from the array', () => {
  const newStore = createTodos(sampleTodos);
  newStore.deleteTodo(sampleTodos[0].id);
  expect(get(newStore).length).toBe(0);
});

test('editTodo should update the text of a given todo', () => {
  const newStore = createTodos(sampleTodos);
  newStore.editTodo(1, `I'm some new todo text!`);
  const newTodoList = get(newStore);
  expect(newTodoList[0].text).toBe(`I'm some new todo text!`);
});

describe('testing addTodo', () => {
  test('addTodo should add a new todo to the list when it is empty', () => {
    const newStore = createTodos([]);
    newStore.addTodo(`I'm a new todo!`);
    const newTodoList = get(newStore);
    expect(newTodoList.length).toBe(1);
    expect(newTodoList[0].text).toBe(`I'm a new todo!`);
    expect(newTodoList[0].id).toBe(1);
  });

  test('addTodo should add a new todo to the list when it is not empty', () => {
    const newStore = createTodos(sampleTodos);
    newStore.addTodo(`I'm a new todo!`);
    const newTodoList = get(newStore);
    expect(newTodoList.length).toBe(2);
    expect(newTodoList[1].text).toBe(`I'm a new todo!`);
    expect(newTodoList[1].id).toBe(2);
  });
});

describe('testing completeTodo', () => {
  test('completeTodo should mark a todo as complete if it exists and is incomplete', () => {
    const newStore = createTodos(sampleTodos);
    newStore.completeTodo(sampleTodos[0].id);
    const newTodoList = get(newStore);
    expect(newTodoList[0].isComplete).toBe(true);
  });

  test('completeTodo should mark a todo as incomplete if it exists and is completed', () => {
    const newStore = createTodos([{ ...sampleTodos[0], isComplete: true }]);
    newStore.completeTodo(sampleTodos[0].id);
    const newTodoList = get(newStore);
    expect(newTodoList[0].isComplete).toBe(false);
  });
});
