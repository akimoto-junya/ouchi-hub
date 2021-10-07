import Home from './Home.svelte';
import Library from './Library.svelte';
import Work from './Work.svelte';
import Viewer from './Viewer.svelte';
import SettingImage from './SettingImage.svelte';
import NotFound from './NotFound.svelte';

export const routes = {
  '/': Home,
  '/library': Library,
  '/works/:tree': Work,
  '/view/:source': Viewer,
  '/setting/image': SettingImage,
  '/*/': NotFound,
};
