import { writable } from 'svelte/store'

export const isMobile = writable(false);

export const isListView = writable(true);

export const source = writable("");
