import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const stored = browser ? localStorage.getItem('matrixTheme') === 'true' : false;

export const showMatrix = writable<boolean>(stored);

showMatrix.subscribe(value => {
    if (browser) {
        localStorage.setItem('matrixTheme', String(value));
    }
});
