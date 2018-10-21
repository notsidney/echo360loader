let src, container, video;

/**
 * Prevent the page redirecting to ios_error.htm by overwriting its
 * source code
 */
document.write(`
    <!DOCTYPE HTML>

    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <title>EchoPlayer</title>
            <meta charset="utf-8">
            <link rel="icon" href="favicon.ico" type="image/x-icon"> 
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            
            <script type="text/javascript" src="scripts/scripts.js"></script>
            <script type="text/javascript" src="scripts/languages.js"></script>
            <script type="text/javascript" src="scripts/parser.js"></script>
            <script type="text/javascript" src="scripts/mobile/general.js"></script>

            <script type="text/javascript">
                function currentServerTimeKeeper( ){
                    if( secondsToStart > 0 ){
                        secondsToStart = secondsToStart - 1;
                        setHtml("live-text1", id_1053);
                        setHtml("live-text2", parseStartTime(secondsToStart));
                    }else{
                        clearInterval(timeInterval);
                        
                        // launch live
                        setDisplay("content-tolive", false );
                        setDisplay("content-player", true );
                        
                        launchVideo();
                    }
                }
                
                var timeInterval;
                if( secondsToStart != undefined ){
                    timeInterval = setInterval(currentServerTimeKeeper, 1000);
                }

                // detect retina displays
                var isRetina = window.devicePixelRatio > 1;
                
                // setup some global variables
                var presentationxml = null;
                var sectionxml = null;
                
                var myScrollTimeout;
                var myScroll;

                var totalSlides = 0; // holds total slides in presentation
                var thumbDirectory;
                var thumbScenes;
                var thumbAspectRatio;
                var firstThumbURI;
                var mySource = 'audio-vga-streamable.m4v';
                var copyVisible = true;
                
                // store current orientation
                var myOrientation;
                
                // store calculated width and height
                var containerPortraitWidth;
                var containerPortraitHeight;
                var containerLandscapeWidth;
                var containerLandscapeHeight;

                // get querystring params
                var altContentDir = "";
                if( getQueryVariable("contentDir") != "" ){
                    altContentDir = getQueryVariable("contentDir");
                }
                
                var altStreamDir = "";
                if( getQueryVariable("streamDir") != "" ){
                    altStreamDir = getQueryVariable("streamDir");
                }
                
                var altSectionDir = "";
                if( getQueryVariable("sectionDir") != "" ){
                    altSectionDir = getQueryVariable("sectionDir");
                }
                
                // find browser language for display
                var languageTimeout;
                var userLanguage;	
                
                if (typeof(navigator.language) != "undefined")
                    userLanguage = navigator.language;
                else if (typeof(navigator.browserLanguage) != "undefined")
                    userLanguage = navigator.browserLanguage;
                else
                    userLanguage = "en"; 
                
                userLanguage = userLanguage.toLowerCase();			
                userLanguage = userLanguage.substring(0, 2);
                
                // calls in loads in the found language file
                includeScript( getLanguageFile(userLanguage) );
                
                // onload check for language file loaded
                window.onload = function(){
                    if( languageTimeout )
                        clearTimeout( languageTimeout );
                    
                    try{
                        setHtml("1050", id_1050);
                    }catch(e){
                        languageTimeout = setTimeout( loader, 100 );
                        return;
                    }
                    
                    // language file loaded so proceed with init
                    windowLoader();
                }
                
                // handle presentation init
                function windowLoader(){
                    presentationxml = window.frames["presentationInfo"].window.document;
                    sectionxml = window.frames["sectionInfo"].window.document;
                    
                    loadSessionObject();
                    loadSectionObject();

                    if( findLiveSource() == true ){
                        isLive = true;
                    }else{
                        var hasMedia = findThumbnails();
                        if( hasMedia == 0 ){
                            // document.location.replace("ios_error.htm");
                        }else if(sources.length == 0 && hasMedia == 1){
                            // document.location.replace("ios_error.htm");
                        }else if( hasMedia == 1){
                            findVGASource(false);
                        }else if( hasMedia == 2 ){
                            findMediaSource(false);
                        }
                    }
                    
                    var myName = getPresentationValue("name");
                    var myTimestamp = getPresentationValue("start-timestamp");
                    var myPresenter = getPresenterValue("name");

                    document.title = "EchoPlayer: " + myName;
                    
                    setHtml("name", myName);
                    setHtml("date", myTimestamp);
                    setHtml("author", myPresenter);
                    setHtml("copyright", copyrightText);
                    
                    loadThumbs();
                    
                    var thumbContainer = document.getElementById("content-thumbs");
                    var thumbs = document.getElementById("thumb-container");
                    var copy = document.getElementById("copyright");
                            
                    if( isLive == false ){
                        // handle on demand
                        firstThumbURI = altContentDir + thumbDirectory + "/" + thumbScenes[0].trackDataURI;
                                            
                        launchVideo();
                        
                        if( copyrightText == "" ){
                            copyVisible = false;
                        }
                    }else{			
                        // handle live display
                        var playerContainer = document.getElementById("content-player");						
                        var thumbContainer = document.getElementById("content-thumbs");
                        var thumbs = document.getElementById("thumb-container");
                        var copy = document.getElementById("copyright");
                        
                        // thumbContainer.setAttribute("style", "display:block; width:730px; height:auto; max-width:730px;");
                        // copy.setAttribute("style", "width:730px; height:auto;");
                        // playerContainer.setAttribute("style", "margin-right:auto; margin-left:auto; float:none;");
                        
                        if( secondsToStart > 0 ){
                            /* show loading screen */
                            setHtml("live-text1", id_1053);
                            setHtml("live-text2", parseStartTime(secondsToStart));
                            setDisplay("content-tolive", true );
                            setDisplay("content-player", false );
                        }else{
                            // launch live
                            setDisplay("content-tolive", false );
                            setDisplay("content-player", true );
                                                
                            launchVideo();
                        }
                    }
                    
                    // force a page refresh
                    updateOrientation();
                }
                
                window.onresize = function(){
                    updateOrientation();
                }
                
                function updateOrientation(){				
                    var height = getScreenHeight();
                    var width = getScreenWidth();
                    
                    var windowState;
                    
                    // the window.orientation is not reliable cross ipad/android 
                    // so just figure it out ourselves...
                    if( width > height )
                        windowState = "landscape";
                    else
                        windowState = "portrait";
                    
                    if( myScrollTimeout )
                        clearTimeout( myScrollTimeout );
                    
                    document.body.setAttribute("class", windowState);
                    myOrientation = windowState;
                            
                    var playerContainer = document.getElementById("content-player");						
                    var thumbContainer = document.getElementById("content-thumbs");
                    var thumbs = document.getElementById("thumb-container");
                    var copy = document.getElementById("copyright");
                    
                    if (myScroll){ 
                        try{ 
                            myScroll.destroy(); 
                        }catch (e){ 
                            // do nothing; 
                        }finally { 
                            myScroll = null; 
                        } 
                    } 
                    
                    if( isLive == false ){				
                        if(myOrientation == "portrait"){
                            if(copyVisible == true){
                                // thumbContainer.setAttribute("style", "display:block; width:730px; height:auto; max-width:730px ;");
                                // copy.setAttribute("style", "width:730px ; height:auto ;");
                            }else{			
                                // thumbContainer.setAttribute("style", "display:block; width:730px; height:190px; max-width:730px; max-height:190px ;");
                                thumbs.style.width = containerPortraitWidth;
                                thumbs.style.height = containerPortraitHeight;
                                
                                // create the scroller
                                myScrollTimeout = setTimeout(function () {
                                    myScroll = new iScroll('content-thumbs', {hScroll:true,vScroll:false, scrollbarClass:"myScroller"});
                                }, 100);
                            }
                        }else if(myOrientation == "landscape"){
                            if(copyVisible == true){
                                // thumbContainer.setAttribute("style", "display:block; width:240px; height:auto; max-width:240px;");
                                // copy.setAttribute("style", "width:244px ; height:auto ;");
                            }else{			
                                // thumbContainer.setAttribute("style", "display:block; width:240px; height:570px; max-width:240px; max-height:580px;");
                                // thumbs.style.width = containerLandscapeWidth;
                                // thumbs.style.height = containerLandscapeHeight;
                                
                                // create the scroller
                                myScrollTimeout = setTimeout(function () {
                                    myScroll = new iScroll('content-thumbs', {hScroll:false,vScroll:true, scrollbarClass:"myScroller"});
                                }, 100);
                            }
                        }
                    }else{
                        // handle live display
                        thumbContainer.setAttribute("style", "display:block; width:730px; height:auto; max-width:730px;");
                        // copy.setAttribute("style", "width:730px; height:auto;");
                        // playerContainer.setAttribute("style", "margin-right:auto; margin-left:auto; float:none;");
                    }
                }
                    
                function hideCopyright(){
                    // don't actually hide it if it's live
                    if( isLive == true )
                        return;
                        
                    if( myScrollTimeout )
                        clearTimeout( myScrollTimeout );
                        
                    if (myScroll){ 
                        try{ 
                            myScroll.destroy(); 
                        }catch (e){ 
                            // do nothing; 
                        }finally { 
                            myScroll = null; 
                        } 
                    } 
                        
                    hasPlayed = true;				
                    copyVisible = false;
                
                    var copy = document.getElementById("copyright");
                    // copy.setAttribute("style", "display:none; padding:0; max-height:0; max-width:0;");
                
                    var thumbs = document.getElementById("thumb-container");
                    // thumbs.setAttribute("style", "display:block;");
                    
                    if(myOrientation == "portrait"){
                        thumbs.style.width = containerPortraitWidth;
                        thumbs.style.height = containerPortraitHeight;
                    }
                    else if(myOrientation == "landscape"){
                        thumbs.style.width = containerLandscapeWidth;
                        thumbs.style.height = containerLandscapeHeight;
                    }
                    
                    var thumbContainer = document.getElementById("content-thumbs");
                    
                    if(myOrientation == "portrait"){
                        // thumbContainer.setAttribute("style", "display:block; width:730px; height:190px; max-width:730px; max-height:190px;");
                        // create the scroller
                        myScrollTimeout = setTimeout(function () {
                            myScroll = new iScroll('content-thumbs', {hScroll:true, vScroll:false, scrollbarClass:"myScroller"});
                        }, 100);
                    }else if(myOrientation == "landscape"){
                        // thumbContainer.setAttribute("style", "display:block; width:240px; height:570px; max-width:240px; max-height:580px;");
                        myScrollTimeout = setTimeout(function () {
                            myScroll = new iScroll('content-thumbs', {hScroll:false,vScroll:true, scrollbarClass:"myScroller"});
                        }, 100);
                        
                    }				
                }

                function loadThumbs(){
                    if( thumbScenes == undefined )
                        return;
                        
                    var thumbHTML = "";
                    
                    var thumbSpace = 5;
                    var thumbWidth = 240;
                    var thumbHeight = Math.round(thumbWidth / thumbAspectRatio);
                    
                    var containerWidth = 0;
                    var containerHeight = 0;
                    
                    for(var i = 0; i < thumbScenes.length; i++){
                        tempURI = parent.altContentDir + thumbDirectory + "/" + thumbScenes[i].trackDataURI;
                        thumbHTML += "<li><img src='" + tempURI + "' id='thumb" + i + "' style='width:" + thumbWidth + "px; height:" + thumbHeight + "px;' onclick='seekVideo(" + thumbScenes[i].trackDataStartTime + ");' alt='' title='' /></li>";
                        
                        containerWidth += thumbWidth + thumbSpace;
                        containerHeight += thumbHeight + thumbSpace;
                    }
                                                    
                    var thumbs = document.getElementById("thumb-container");
                    thumbs.innerHTML = thumbHTML;
                    
                    containerPortraitWidth = containerWidth + "px";
                    containerPortraitHeight = "180px";
                    containerLandscapeWidth = "240px";
                    containerLandscapeHeight = containerHeight + "px";

                    if(myOrientation == "portrait"){
                        thumbs.style.width = containerPortraitWidth;
                        thumbs.style.height = containerPortraitHeight;
                    }
                    else if(myOrientation == "landscape"){
                        thumbs.style.width = containerLandscapeWidth;
                        thumbs.style.height = containerLandscapeHeight;
                    }
                }
                
                function launchVideo(){
                    var videoURI;

                    // check to make sure that thru all that we actually got a media file
                    if( mySource == null ){
                        // document.location.replace("ios_error.htm");
                    }
                    
                    if(altStreamDir){
                        var tmpStreamDir = altStreamDir.replace("rtmp://","http://");
                        var doubleSlashIndex = tmpStreamDir.indexOf("//");
                        var portIndex = tmpStreamDir.indexOf("/", doubleSlashIndex+2);
                        var portStart = tmpStreamDir.substring(0, portIndex);
                        var portEnd = tmpStreamDir.substring(portIndex, tmpStreamDir.length);
                        tmpStreamDir = portStart + ":1935" + portEnd;
                        if( isLive == false ){
                            videoURI = tmpStreamDir + "mp4:" + mySource + "/playlist.m3u8";
                        }else{
                            videoURI = tmpStreamDir + mySource + "/playlist.m3u8";
                        }
                    }else{
                        videoURI = mySource;
                    }
                    
                    checkForFlipbook();
                    
                    if(!thumbAspectRatio){
                        thumbAspectRatio = 1.3333;
                    }

                    var setWidth = 730;
                    var setHeight = 730 / thumbAspectRatio;

                    setHtml( "content-player", '<video id="video1" src="' + videoURI + '" width="' + setWidth + 'px" height="' + setHeight + 'px" controls="true" poster="' + firstThumbURI + '" onplaying="hideCopyright();"></video>');
                }
            </script>
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
                    
            <script type="text/javascript">
                document.write('<iframe title="" style="visibility: hidden; display:none;" id="presentationInfo" name="presentationInfo" src="' + altContentDir + 'presentation.xml"></iframe>');
            </script>
        </body>
    </html>
    <script id="f5_cspm">(function(){var f5_cspm={f5_p:'PGPMBFEGFEOFBPIECHJLNAFCOLCJGFNCEPFFCMOAKEIBMGEJLMCNNOFHHHOAFALGAAHNKPMHJCKCMFGAAACDIAKECOMNPKPLELFMMDMKICOEICGBHBIPPOGEFFFLFBOC',setCharAt:function(str,index,chr){if(index>str.length-1)return str;return str.substr(0,index)+chr+str.substr(index+1);},get_byte:function(str,i){var s=(i/16)|0;i=(i&15);s=s*32;return((str.charCodeAt(i+16+s)-65)<<4)|(str.charCodeAt(i+s)-65);},set_byte:function(str,i,b){var s=(i/16)|0;i=(i&15);s=s*32;str=f5_cspm.setCharAt(str,(i+16+s),String.fromCharCode((b>>4)+65));str=f5_cspm.setCharAt(str,(i+s),String.fromCharCode((b&15)+65));return str;},set_latency:function(str,latency){latency=latency&0xffff;str=f5_cspm.set_byte(str,32,(latency>>8));str=f5_cspm.set_byte(str,33,(latency&0xff));str=f5_cspm.set_byte(str,27,2);return str;},wait_perf_data:function(){try{var wp=window.performance.timing;if(wp.loadEventEnd>0){var res=wp.loadEventEnd-wp.navigationStart;if(res<60001){var cookie_val=f5_cspm.set_latency(f5_cspm.f5_p,res);window.document.cookie='f5avr0551769362aaaaaaaaaaaaaaaa='+encodeURIComponent(cookie_val)+';path=/';}
    return;}}
    catch(err){return;}
    setTimeout(f5_cspm.wait_perf_data,100);return;},go:function(){var chunk=window.document.cookie.split(/\s*;\s*/);for(var i=0;i<chunk.length;++i){var pair=chunk[i].split(/\s*=\s*/);if(pair[0]=='f5_cspm'&&pair[1]=='1234')
    {var d=new Date();d.setTime(d.getTime()-1000);window.document.cookie='f5_cspm=;expires='+d.toUTCString()+';path=/;';setTimeout(f5_cspm.wait_perf_data,100);}}}}
    f5_cspm.go();}());</script>
`);

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
    const newScript = document.createElement('script');
    const scriptText = document.createTextNode(`
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

    function seekVideo(time) {
        video.currentTime = Math.round(time / 1000);
    }
    `);
    newScript.appendChild(scriptText);
    document.body.appendChild(newScript);
}
