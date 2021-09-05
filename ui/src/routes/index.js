import Home from './Home.svelte';
import Work from './Work.svelte';
import NotFound from './NotFound.svelte';
import Library from './Library.svelte';

export const routes = {
  '/': Home,
  '/library': Library,
  '/works/:id': Work,
  '/*/': NotFound
};
