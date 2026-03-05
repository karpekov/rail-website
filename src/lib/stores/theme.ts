import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// ── Matrix mode ───────────────────────────────────────────────────────────────
const storedMatrix = browser ? localStorage.getItem('matrixTheme') === 'true' : false;

export const showMatrix = writable<boolean>(storedMatrix);

showMatrix.subscribe(value => {
    if (browser) localStorage.setItem('matrixTheme', String(value));
});

// ── Dark mode — follows system preference until user explicitly overrides ──────
// We only persist to localStorage after an explicit user toggle.
// On initial load, if no saved value exists, we follow prefers-color-scheme.
function getInitialDark(): boolean {
    if (!browser) return false;
    const saved = localStorage.getItem('darkTheme');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const showDark = writable<boolean>(getInitialDark());

// Call this only on explicit user action — persists the choice.
export function toggleDark(): void {
    showDark.update(current => {
        const next = !current;
        if (browser) localStorage.setItem('darkTheme', String(next));
        return next;
    });
}

// Follow system preference changes when the user has not manually overridden.
if (browser) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkTheme') === null) {
            showDark.set(e.matches);
        }
    });
}
