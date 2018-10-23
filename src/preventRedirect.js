/**
 * Prevent the page redirecting to ios_error.htm by overwriting its
 * source code
 */
console.log('preventRedirect.js');
document.write(`
    <!DOCTYPE HTML>

    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <title>EchoPlayer</title>
            <meta charset="utf-8">
            <link rel="icon" href="favicon.ico" type="image/x-icon"> 
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        </head>
        <body>
            <div id="container">
                <div id="top">
                    <a href="http://www.echo360.com" id="logo" target="_blank"></a>
                    <div id="content-text">
                        <span id="date" class="dateFormat"></span><br />
                        <span id="name"></span><br />
                        <span id="author"></span>
                    </div>
                </div>
                <div id="content">
                    <div id="content-left"></div>
                    <div id="content-player"></div>
                    <div id="content-thumbs">
                        <ul id="thumb-container"></ul>
                        <div id="copyright"></div>
                    </div>
                </div>
            </div>
            <iframe title="" style="visibility: hidden; display:none;" id="presentationInfo" name="presentationInfo" src="" />
        </body>
    </html>
`);
window.stop();
