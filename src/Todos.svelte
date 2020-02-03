<script>
  import Todo from './Todo.svelte';
  import { todos } from './stores';

  let defaultNewTodo = '';

  $: todoCount = $todos.length;
  $: completedTodoCount = $todos.filter(t => t.isComplete).length;
</script>

<style></style>

<h2>
  {completedTodoCount} of {todoCount} TODOs completed
</h2>
<ul>
  {#each $todos as todo}
    <Todo todo={todo} />
  {/each}
  <li>
    <form on:submit|preventDefault={() => todos.addTodo(defaultNewTodo)}>
      <label>
        <input type="text" bind:value={defaultNewTodo} placeholder="Add new TODO"/>
      </label>
      <button type="submit">Add TODO</button>
      <button on:click|preventDefault={() => todos.clearTodos()}>Clear all todos</button>
    </form>
  </li>
</ul>