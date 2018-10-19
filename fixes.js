const styleElement = document.createElement('style');
const styles = document.createTextNode(`
    #content #content-thumbs {
        float: right !important;
        overflow-y: scroll !important;
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
