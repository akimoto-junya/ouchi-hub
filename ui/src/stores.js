import { writable } from 'svelte/store'

export const isMobile = writable(false);

export const libraryScrollY = writable(0);
export const isViewer = writable(false);
export const showDrawer = writable(false);

export const needsMiniPlayer = writable(false);
export const albumArt = writable("");

export const isPaused = writable(true);
export const sources = writable([]);
