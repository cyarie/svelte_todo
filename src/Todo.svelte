<script>
  import { todos } from './stores';
  let defaultNewTodo = '';
  export let todo;
</script>
<style>
  .complete {
    text-decoration: line-through;
  }

  .todo {
    cursor: pointer;
  }
</style>


<li>
  <div>
    <span class="todo {todo.isComplete ? 'complete': 'incomplete'}" on:click={() => todo.isEditing = !todo.isEditing}>{todo.text}</span>
      {#if todo.isEditing}
        <form on:submit|preventDefault={() => todos.editTodo(todo.id, defaultNewTodo)}>
          <label>
            <input type="text" bind:value={defaultNewTodo} placeholder="{todo.text}"/>
          </label>
          <button on:click={() => todo.isEditing = false}>Cancel</button>
          <button type="submit">Save</button>
        </form>
      {:else}
          {#if todo.isComplete}
            <button on:click={() => todos.completeTodo(todo.id)}>Still working on it</button>
          {:else}
            <button on:click={() => todos.completeTodo(todo.id)}>Complete Todo</button>
          {/if}
        <button on:click={() => todos.deleteTodo(todo.id)}>Delete</button>
      {/if}
  </div>
</li>
