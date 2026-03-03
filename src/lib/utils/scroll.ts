export function scrollable(node: HTMLElement) {
    return {
        update(id: string) {
            node.id = id;
        }
    };
}

export function scrollIntoView(id: string) {
    const element = document.getElementById(id);
    if (element) {
        // Read navbar height from the CSS variable so it stays in sync with the stylesheet
        const navHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
        ) || 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
}
