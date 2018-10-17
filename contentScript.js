console.log('loaded content script');
// alert(document.readyState);
// alert(document.getElementById('video1').getAttribute('src'));

const observer = new MutationObserver(() => {
    if (document.getElementById('video1')) {
        console.log('ready');
        observer.disconnect();
    }
});
observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});
