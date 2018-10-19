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
    video.setAttribute('style', 'width: 720px; height: 400px;');
    video.setAttribute('controls', 'true');
    video.setAttribute('poster', poster);
    container.insertBefore(video, document.getElementById('content-thumbs'));

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.attachMedia(video);
        hls.loadSource(src);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(err => { console.log(err) });
            hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
                console.log(data.details.fragments);
            });
        });
    }

    const controlStyles = document.createElement('style');
    controlStyles.appendChild(document.createTextNode(`
        label {
            font-weight: bold;
        }
        #slider {
            width: 300px;
            margin: 10px 10px;
            vertical-align: sub;
        }
        #playlist-link {
            margin-left: 3px;
            width: 610px;
            background-color: transparent;
            border: 1px solid rgba(255,255,255,.5);
            color: #fff;
            padding: 3px 5px;
            font-size: 16px;
            font-family: "Helvetica Neue", Arial, sans-serif;
            border-radius: 5px;
        }
        a {
            color: #0bf;
            font-weight: bold;
            margin: 10px 0 40px;
            display: block;
        }
    `));
    document.head.appendChild(controlStyles);

    const sliderContainer = document.createElement('div');
    sliderContainer.setAttribute('style', 'color: #fff; font-family: Helvetica Neue, sans-serif');
    sliderContainer.innerHTML = `
        <label for="slider">Playback speed:</label>
        <span id="slider-value">1.00</span>
        <input id="slider" type="range" step="any" min="0.1" max="3" value="1"
        list="tickmarks">
        <datalist id="tickmarks">
            <option value="1">
            <option value="1.25">
            <option value="1.5">
            <option value="1.75">
            <option value="2">
            <option value="3">
        </datalist>
        <br>
        <label for="playlist-link">Playlist link:</label>
        <input id="playlist-link" type="text" value="${src}" readonly
        onClick="this.select()" />
        <a href="https://github.com/notseenee/echo360loader/downloadinstructions.md"
        target="_blank" rel="noopener noreferrer">
            Download instructions
        </a>
    `;
    container.appendChild(sliderContainer);

    document.getElementById('slider').oninput = e => {
        document.getElementById('slider-value').innerHTML = parseFloat(e.target.value).toFixed(2);
        video.playbackRate = e.target.value;
    }
}
