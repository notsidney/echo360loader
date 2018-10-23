let src, container, video;

/**
 * Waits for the video tag to be loaded by the iPad player page
 */
const observer = new MutationObserver(() => {
    if (document.getElementById('video1')) {
        observer.disconnect();
        playHLS();
        addCustomControls();
        fixMetadata();
    }
});
observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

/**
 * Plays the HLS stream
 */
function playHLS() {
    container = document.getElementById('content');
    const oldVideo = document.getElementById('video1');
    src = oldVideo.getAttribute('src');
    const poster = new URLSearchParams(window.location.search).get('contentDir') + 'flipbook/00000000.jpg';

    container.removeChild(document.getElementById('content-player'));

    container = document.getElementById('content-left');
    video = document.createElement('video');
    video.setAttribute('id', 'video');
    //video.setAttribute('style', 'width: 720px; height: 400px;');
    video.setAttribute('controls', 'true');
    video.setAttribute('poster', poster);
    container.appendChild(video);

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.attachMedia(video);
        hls.loadSource(src);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(err => { console.log(err) });
        });
    }
}

/**
 * Adds the custom controls below the video player
 */
function addCustomControls() {
    const sliderContainer = document.createElement('div');
    sliderContainer.innerHTML = `
        <div id="custom-controls">
            <label for="slider">Playback speed:</label>
            <div>
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
            </div>

            <label for="playlist-link">Playlist link:</label>
            <input id="playlist-link" type="text" value="${src}" readonly
            onClick="this.select()" />

            <a href="https://github.com/notseenee/echo360loader/blob/master/downloadinstructions.md"
            target="_blank" rel="noopener noreferrer">
                Download instructions
            </a>
        </div>
    `;
    container.appendChild(sliderContainer);

    document.getElementById('slider').oninput = e => {
        document.getElementById('slider-value').innerHTML = parseFloat(e.target.value).toFixed(2);
        video.playbackRate = e.target.value;
    };
}

/**
 * Re-adds the metadata on top of the page and enables thumbnail seeking
 */
function fixMetadata() {
    const presentationInfoIframe = document.getElementById('presentationInfo');
    presentationInfoIframe.setAttribute('src', altContentDir + 'presentation.xml');

    presentationInfoIframe.onload = () => {
        presentationxml = window.frames["presentationInfo"].window.document;

        loadSessionObject();

        const myName = getPresentationValue("name");
        const myTimestamp = getPresentationValue("start-timestamp");

        document.title = "EchoPlayer: " + myName;

        setHtml("name", myName);
        setHtml("date", myTimestamp);

        const myPresenter = getPresenterValue("name");
        setHtml("author", myPresenter);

        findThumbnails();
        loadThumbs();
    }

    const newScript = document.createElement('script');
    const scriptText = document.createTextNode(`
    function seekVideo(time) {
        video.currentTime = Math.round(time / 1000);
    }
    `);
    newScript.appendChild(scriptText);
    document.body.appendChild(newScript);
}
