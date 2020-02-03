import App from './App.svelte';

const app = new App({
  target: document.querySelector('#app'),
  props: {
    name: 'warld'
  }
});

window.app = app;

export default app;