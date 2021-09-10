import Home from './Home.svelte';
import Work from './Work.svelte';
import Viewer from './Viewer.svelte';
import NotFound from './NotFound.svelte';
import Library from './Library.svelte';

export const routes = {
  '/': Home,
  '/library': Library,
  '/works/:tree': Work,
  '/view/:source': Viewer,
  '/*/': NotFound
};
