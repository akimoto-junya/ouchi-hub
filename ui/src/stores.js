import { writable } from 'svelte/store'

export const isMobile = writable(false);

export const isListView = writable(true);

export const showDrawer = writable(false);

export const isViewer = writable(false);

export const disabledHeader = writable(false);

export const source = writable("");
