import { writable, readable } from 'svelte/store';

export const isMobile = writable(false);

export const libraryScrollY = writable(0);
export const isViewer = writable(false);
export const showDrawer = writable(false);

export const needsMiniPlayer = writable(false);
export const albumArt = writable('');

export const isPaused = writable(true);
export const sources = writable([]);

export const apiAddress = readable(process.env.API_ADDRESS)
export const mediaAddress = readable(process.env.MEDIA_ADDRESS)
