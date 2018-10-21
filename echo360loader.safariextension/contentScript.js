if (window.location.hostname === 'delivery.streaming.sydney.edu.au' && window.top === window) {
    /**
     * Prevent the page redirecting to error_ios.htm
     */
    const stopRedirectScript = document.createElement('script');
    stopRedirectScript.appendChild(document.createTextNode('mySource = "audio-vga-streamable.m4v";'));
    document.head.appendChild(stopRedirectScript);

    /**
     * Waits for the video tag to be loaded by the iPad player page
     */
    const observer = new MutationObserver(() => {
        if (document.getElementById('video1')) {
            observer.disconnect();
            addCustomControls();
            fixThumbnails();
        }
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    /**
     * Adds the custom controls below the video player
     */
    function addCustomControls() {
        const container = document.getElementById('content');
        const video = document.getElementById('video1');
        const src = video.getAttribute('src');

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
        sliderContainer.setAttribute('style', 'color: #fff; font-family: Helvetica Neue, sans-serif; display: inline-block;');
        sliderContainer.innerHTML = `
            <label for="slider">Playback speed:</label>
            <span id="slider-value">1.00</span>
            <input id="slider" type="range" step="any" min="0.5" max="2" value="1">
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

        document.getElementById('slider').onchange = e => {
            document.getElementById('slider-value').innerHTML = parseFloat(e.target.value).toFixed(2);
            document.getElementById('video1').playbackRate = e.target.value;
        };
    }

    /**
     * Fixes thumbnail seeking
     */
    function fixThumbnails() {
        const styleElement = document.createElement('style');
        const styles = document.createTextNode(`
            #content #content-thumbs {
                float: right !important;
                overflow-y: scroll !important;
                height: 410px !important;
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
    }
}
