import { browser } from '$app/env';

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

export function trackEvent(
    eventName: string,
    params?: Record<string, string | number | boolean>
): void {
    if (!browser || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params);
}

/** Svelte action: report clicks on any link inside the node. */
export function trackLinkClicks(
    node: HTMLElement,
    onLink: (link: HTMLAnchorElement) => void
) {
    const handler = (event: MouseEvent) => {
        const link = (event.target as Element | null)?.closest('a');
        if (link) onLink(link);
    };
    node.addEventListener('click', handler);
    return { destroy: () => node.removeEventListener('click', handler) };
}
