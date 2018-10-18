if (window.location.hostname === 'view.streaming.sydney.edu.au') {
    const iframe = document.getElementsByTagName('iframe')[0];
    let url = iframe.getAttribute('src')
        .replace('echo.htm', 'echo_files/echo_ipad.htm')
        .replace('https', 'http');
    location.href = url;
} else if (window.location.hostname === 'delivery.streaming.sydney.edu.au') {
    const stopRedirectScript = document.createElement('script');
    stopRedirectScript.appendChild(document.createTextNode('mySource = "audio-vga-streamable.m4v";'));
    document.head.appendChild(stopRedirectScript);

    const observer = new MutationObserver(() => {
        if (document.getElementById('video1')) {
            playHLS();
            observer.disconnect();
        }
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}

function playHLS() {
    const container = document.getElementById('content');
    const oldVideo = document.getElementById('video1');
    const src = oldVideo.getAttribute('src');
    const poster = new URLSearchParams(window.location.search).get('contentDir') + 'flipbook/00000000.jpg';

    container.removeChild(document.getElementById('content-player'));

    const video = document.createElement('video');
    video.setAttribute('id', 'video');
    video.setAttribute('style', 'width: 720px; height: 405px;');
    video.setAttribute('controls', 'true');
    video.setAttribute('poster', poster);
    container.insertBefore(video, document.getElementById('content-thumbs'));

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.attachMedia(video);
        hls.loadSource(src);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });
    }
}
