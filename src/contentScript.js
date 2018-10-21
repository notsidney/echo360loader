let src, container, video;

/**
 * Prevent the page redirecting to ios_error.htm
 */
const stopRedirectScript = document.createElement('script');
stopRedirectScript.appendChild(document.createTextNode('mySource = "audio-vga-streamable.m4v";'));
document.head.appendChild(stopRedirectScript);

/**
 * Handle ios_error.htm
 */
if (window.location.href.indexOf('ios_error.htm') > 0) {
    alert('Oops! Please try closing this tab and playing the video again.');
}

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

    video = document.createElement('video');
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
        });
    }
}

/**
 * Adds the custom controls below the video player
 */
function addCustomControls() {
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
        <a href="https://github.com/notseenee/echo360loader/blob/master/downloadinstructions.md"
        target="_blank" rel="noopener noreferrer">
            Download instructions
        </a>
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
    const styleElement = document.createElement('style');
    const styles = document.createTextNode(`
        #top #content-text * {
            font-family: "Helvetica Neue", Arial, sans-serif !important;
        }
        #content #content-thumbs {
            float: right !important;
            overflow-y: scroll !important;
            overflow-x: hidden !important;
            height: 400px !important;
        }
        #content #content-thumbs #thumb-container {
            display: block;
        }
        #content #content-thumbs ul li img {
            cursor: pointer;
            opacity: .5;
            transition: opacity .2s;
        }
        #content #content-thumbs ul li img:hover {
            opacity: 1;
        }
    `);
    styleElement.appendChild(styles);
    document.head.appendChild(styleElement);

    const newScript = document.createElement('script');
    const scriptText = document.createTextNode(`
    const presentationxhr = new XMLHttpRequest();
    presentationxhr.onload = function() {
        presentationxml = this.responseXML;
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
    presentationxhr.open("GET", document.getElementById('presentationInfo').getAttribute('src').replace('https', 'http'));
    presentationxhr.responseType = "document";
    presentationxhr.send();

    function seekVideo(time) {
        video.currentTime = Math.round(time / 1000);
    }
    `);
    newScript.appendChild(scriptText);
    document.body.appendChild(newScript);
}
