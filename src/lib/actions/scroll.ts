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
        const navbarHeight = 80;
        const headerOffset = navbarHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}