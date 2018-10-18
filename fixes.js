const styleElement = document.createElement('style');
const styles = document.createTextNode(`
    #content-thumbs {
        float: right !important;
        overflow-y: scroll !important;
    }
    #content #content-thumbs #thumb-container {
        display: block;
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
}
presentationxhr.open("GET", document.getElementById('presentationInfo').getAttribute('src').replace('https', 'http'));
presentationxhr.responseType = "document";
presentationxhr.send();

const sectionxhr = new XMLHttpRequest();
sectionxhr.onload = function() {
    sectionxml = this.responseXML;
    console.log(sectionxml);

    loadSectionObject();

    const myPresenter = getPresenterValue("name");
    setHtml("author", myPresenter);
}
sectionxhr.open("GET", document.getElementById('presentationInfo').getAttribute('src').replace('https', 'http'));
sectionxhr.responseType = "document";
sectionxhr.send();
`);
newScript.appendChild(scriptText);
document.body.appendChild(newScript);
