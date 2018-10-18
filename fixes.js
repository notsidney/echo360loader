const presentationInfo = document.getElementById('presentationInfo');
presentationInfo.setAttribute('src', presentationInfo.getAttribute('src').replace('https', 'http'));

const sectionInfo = document.getElementById('sectionInfo');
sectionInfo.setAttribute('src', sectionInfo.getAttribute('src').replace('https', 'http'));

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

// const newScript = document.createElement('script');
// const scriptText = document.createTextNode('alert(document.getElementById("presentationInfo").getAttribute("src"))');
// newScript.appendChild(scriptText);
// document.head.appendChild(newScript);
