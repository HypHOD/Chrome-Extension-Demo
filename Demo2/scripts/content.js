function renderReadingTime(article) {
    if (!article) return;
    const wordsPerMinute = 200; // Average reading speed
    const text = article.innerText || article.textContent;
    const wordMatchExp = /[^\s] +/g;
    const words = text.matchAll(wordMatchExp);
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / wordsPerMinute);
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = '⏱️ ' + readingTime + ' min read';

    const heading = article.querySelector("h1");
    const sub_heading = article.querySelector("h3");
    const targetSub = sub_heading?.closest('div');
    const date = article.querySelector("time")?.parentNode;
    (date ?? heading ?? targetSub).insertAdjacentElement("afterend", badge);

}

renderReadingTime(document.querySelector("article"));


const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        // If a new article was added.
        for (const node of mutation.addedNodes) {
            if (node instanceof Element && node.tagName === 'ARTICLE') {
                // Render the reading time for this particular article.
                renderReadingTime(node);
            }
        }
    }
});

// https://developer.chrome.com/ is a SPA (Single Page Application) so can
// update the address bar and render new content without reloading. Our content
// script won't be reinjected when this happens, so we need to watch for
// changes to the content.
observer.observe(document.querySelector('devsite-content'), {
    childList: true
});