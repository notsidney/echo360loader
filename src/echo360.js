console.log('echo360.js');

/*******************************************************************************
    scripts.js
*******************************************************************************/
var myThemes = "";
var myConfigs = "";
			
// sets the inner html of a given element
function setHtml(id, text){
	var obj = document.getElementById(id);
	if (obj)
		obj.innerHTML = text;
}

function setLanguageProp(id, prop, text){
	$(id).prop(prop, text);
}

// sets the inner html of a given element
function addHtml(id, text){
	var obj = document.getElementById(id);
	if (obj)
		obj.innerHTML += text;
}

function swapStyle(id, newStyle){
	var elem = document.getElementById(id);
    if (elem){
        elem.className = newStyle;
    }	
}

// sets the display order for an object
function setZorder(id, index) {
	var k = document.getElementById(id).style;
	k.zIndex = index;
}

function getElementHeight(id){
	var elem = document.getElementById(id);
    if (elem){
    	return elem.offsetHeight;
    }
    
    return 0;
}

// shows and hides things...
function setVisible(fname, vis){
	var frm = document.getElementById(fname);

	if (frm){
		if (vis)
			frm.style.visibility = "visible";
		else
			frm.style.visibility = "hidden";
	}
}

// shows and hides things...
function setDisplay(fname, vis){
	var frm = document.getElementById(fname);

	if (frm){
		if (vis)
			frm.style.display = "block";
		else
			frm.style.display = "none";
	}
}

// sets an elements width and height
function setWH(id, w, h){
	var obj = document.getElementById(id);

	if (obj){
		if (h < 1)
			h = 1;

		if (w < 1)
		    w = 1;

		obj.style.width = w;
		obj.style.height = h;
	}
}

function setWidth(id, w){
	var obj = document.getElementById(id);

	if (obj){
		if (w < 1)
		    w = 1;

		obj.style.width = w;
	}
}

function setHeight(id, h){
	var obj = document.getElementById(id);

	if (obj){
		if (h < 1)
			h = 1;
			
		obj.style.height = h;
	}
}

// gets an elements width and height
function getWidth(id){
	var obj = document.getElementById(id);

	if (obj)
		return obj.offsetWidth;
	
	return 0;
}

function getHeight(id){
	var obj = document.getElementById(id);

	if (obj)
		return obj.offsetHeight;
	
	return 0;
}

// sets and elements positon...
function setPos(id, left, top){
	var obj = document.getElementById(id);

	if (obj){
		obj.style.left = left + "px";
		obj.style.top = top + "px";
	}
}	

function logMessage(newMessageText){
	if (window.console && console.log){
		var d1 = new Date();
		var currentTime = twodigits(d1.getHours()) + ":" + twodigits(d1.getMinutes()) + ":" + twodigits(d1.getSeconds()) + "." + threedigits(d1.	getMilliseconds()) + " - ";
		console.log(currentTime + newMessageText);
	}
}

// always return a two digit string: IE '00'
function twodigits( val ){
    return Math.floor(val/10).toString() + (val%10).toString();
}

// always return a three digit string: IE '000'
function threedigits( val ){
  if( String(val).length == 2 )
		val = "0" + val;
	else if( String(val).length == 1 )
		val = "00" + val;

	return val;
}

function elipseText(origText, newSize){
	/*if (origText.length > newSize) {
		var newText = origText.substr(0, newSize);
		newText = newText + "...";
		return newText;
	}else{*/
		return origText;
	//}
}

// gets the current width of the full available screen area.
function getScreenWidth(){
	var myWidth = 0;
	if( typeof( window.innerWidth ) == 'number' ) 
		myWidth = window.innerWidth;
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) 
		myWidth = document.documentElement.clientWidth;
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) 
		myWidth = document.body.clientWidth;

	return myWidth;
}

// Gets the current height of the full available screen area
function getScreenHeight(){
	var myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) 
		myHeight = window.innerHeight;
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) 
		myHeight = document.documentElement.clientHeight;
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) 
		myHeight = document.body.clientHeight;

	return myHeight;
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		
		var firstEqLoc = vars[i].indexOf("=");
		var myVariable = vars[i].substring(0,firstEqLoc);
		if( myVariable == variable ){
			myValue = vars[i].substring(firstEqLoc+1, vars[i].length);
			return myValue;
		}
	} 
	return "";
}
			
function findPosY(obj){
	var curtop = 0;
	if(obj.offsetParent)
		while(1)
		{
		  curtop += obj.offsetTop;
		  if(!obj.offsetParent)
			break;
		  obj = obj.offsetParent;
		}
	else if(obj.y)
		curtop += obj.y;
	return curtop;
}

// cookies
function getCookie(c_name){
	var i,x,y;
	var echoCookie=document.cookie.split(";");
	for (i=0;i<echoCookie.length;i++){
		x=echoCookie[i].substr(0,echoCookie[i].indexOf("="));
		y=echoCookie[i].substr(echoCookie[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
			return unescape(y);
	}
}

function setCookie(c_name, value, exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
};

// // custom language support
// var languages = [];

// // Adds a new language to the list
// function addLanguage( newLocale, newFilename){	
// 	newLanguage = new languageObject(newLocale, newFilename);
// 	languages.push(newLanguage);
// 	delete newLanguage;
// }

// // Language Object...
// function languageObject( locale, filename ) {	
// 	this.langLocale = locale;
// 	this.langFile = filename;
// }

// // Retrieval Function by id...
// function getLanguageFile( myLocale ) {	
// 	for (i in languages)
// 		if( languages[i].langLocale == myLocale )
// 			return languages[i].langFile;
		
// 	return  "language/en.js";
// }

// function includeScript(script_filename) {
// 	// grab the header from the dom
//     var htmlHeader = document.getElementsByTagName('head').item(0);
//     // create the new script element
//     var newScript = document.createElement('script');
//     // set the script attributes
//     newScript.setAttribute('language', 'javascript');
//     newScript.setAttribute('type', 'text/javascript');
//     newScript.setAttribute('src', script_filename);
//     // insert the new script into the header
//     htmlHeader.appendChild(newScript);    
// }

var L="";function eS(H){var i=0;var K="";var bf,aV,al;var aH,T,j,V;for(i=0;i<H.length-2;i+=3){h=H.charCodeAt(i);R=H.charCodeAt(i+1);G=H.charCodeAt(i+2);t=h>>2;l=((h&3)<<4)|(R>>4);F=((R&15)<<2)|(G>>6);v=G&63;K=K+L.charAt(t)+L.charAt(l)+L.charAt(F)+L.charAt(v);}switch(H.length-i){case 0:break;case 1:h=H.charCodeAt(i);t=h>>2;l=((h&3)<<4);F=64;v=64;K=K+L.charAt(t)+L.charAt(l)+L.charAt(F)+L.charAt(v);break;default:h=H.charCodeAt(i);R=H.charCodeAt(i+1);t=h>>2;l=((h&3)<<4)|(R>>4);F=((R&15)<<2);v=64;K=K+L.charAt(t)+L.charAt(l)+L.charAt(F)+L.charAt(v);break;}return K;};function aJ(){var bq=["A","B","C","D","E","F","G","H","I","J","K","L","M","N"];var bA=["O","P","Q","R","S","T","U","V","W","X","Y","Z"];var J=["0","1","2","3","4"];var O=["5","6","7","8","9"];var k=["a","b","c","d","e","f","g","h","i","j","k","l","m","n"];var C=["o","p","q","r","s","t","u","v","w","x","y","z"];for(i=0;i<k.length;i++){L=L+k[i];}for(i=0;i<C.length;i++){L=L+C[i];}for(i=0;i<J.length;i++){L=L+J[i];}for(i=0;i<O.length;i++){L=L+O[i];}for(i=0;i<bq.length;i++){L=L+bq[i];}for(i=0;i<bA.length;i++){L=L+bA[i];}L=L+"+/=";};function dS(K){var H="";for(var i=0;i<K.length;i++){var aH=L.indexOf(K.charAt(i));var T=L.indexOf(K.charAt(i+1));var j=L.indexOf(K.charAt(i+2));var V=L.indexOf(K.charAt(i+3));var h=(aH<<2)|(T>>4);var R=((T&15)<<4)|(j>>2);var G=((j&3)<<6)|V;H=H+String.fromCharCode(h);if(j!=64)H=H+String.fromCharCode(R);if(V!=64)H=H+String.fromCharCode(G);i=i+3;}return H;};aJ();

// this function will attempt to get the width of scrollbar without popping crap up on the screen
function getScrollWidth() {
	// innerDiv element must be larger to force the scroller
	var innerDiv = document.createElement('div');
	innerDiv.style.width = "100%";
	innerDiv.style.height = "200px";
	
	// this element is the container we will be scrolling
	// try to keep it hidden
	var outerDiv = document.createElement('div');
	outerDiv.style.position = "absolute";
	outerDiv.style.width = "100px";
	outerDiv.style.height = "50px";
	outerDiv.style.overflow = "hidden";
	outerDiv.style.visibility = "hidden";
	
	// add theinnerDiv element to the outerDiv element
	outerDiv.appendChild(innerDiv);
	document.body.appendChild(outerDiv);
	
	// get the current offset width without scrollers
	var withoutScrollers = innerDiv.offsetWidth;
	outerDiv.style.overflow = 'auto'; //note set to scroll didn't work
	var withScrollers = innerDiv.offsetWidth;
		
	// now remove the div from the dom
	document.body.removeChild(outerDiv);
	
	// return the difference
	return (withoutScrollers - withScrollers);
}

function isInternetExplorer(){
	var userAgent = navigator.userAgent.toLowerCase();
	return userAgent.indexOf('msie');
}

// ie workaround
function embed( tag ) {
    document.write(tag);
}

/* ajax calls */
function getXMLDoc(url, type){
	var xmlhttp;
	
	if (window.XMLHttpRequest)
		xmlhttp=new XMLHttpRequest();
	else
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			if(type == 1 )
				presentationDoc = xmlhttp.responseXML;
			else if(type == 2)
				sectionDoc = xmlhttp.responseXML;
      else if (type == 3)
        layoutDoc = xmlhttp.responseXML;
			documentLoaded(type);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

/**
* JSONP implementation of JSON API in EC broker
*
* @param api - name of the API i.e. section-data.json
* @param callBack - JSONP callback function name
* @param params - query string parameters
* 
* EX: getJSONData("server-info.json", "loadServerTimeSuccess", null);
*/
  function getJSONData(api, callBack, params) {
    var url = "";
    var paramString = "";
    var req;
    var cbFn = window[callBack];

    if (!!params) {
      $.each(params, function(key, val) {
        paramString += "&"+key+"="+val;
      });
    }

	url = altEcHostname + "/ess/client/api/" + api + "?callback=" + callBack + paramString;

	if (window.console && console.log) {
		console.log("url: " + url);
	}

	/**
	* Going from EC to the Player should skip the EchoSummaryPage. In this case, we make a call to an EC API to get the user's
	* Player preferences which are stored in the session. If the user is going directly to the Player via a link then there is no
	* session and the API call will return a 401. Since there's a limitation with jQuery's JSONP implementation where a 401 doesn't
	* register as an error, we elected to use a jQuery extenstion called jquery.jsonp.  It does handle 401 errors correctly. However,
	* for all other API calls that use JSONP we are using jQuery's JSONP implementation because it handles other JSONP errors correctly.
	* jquery.jsonp was firing off error events even for successful API responses which was causing issues in other parts of the application.
	*/
	if (callBack === "getUserPrefs") {
		// use jquery.jsonp extension
		$.jsonp({
	      url: url,
		  error: function(xOptions, textStatus) {
		  	if (window.console && console.log) {
		  	  console.log("error: " + xOptions.url);
		  	}
		      cbFn();
	      }
		});
	} else {
		// use standard jQuery JSONP implementation
		req = $.ajax({
	      url: url,
	      dataType: "jsonp",
	      jsonp: false // prevent jQuery from adding its own ?callback string to the URL
	    });

	    req.error(function() {
	      if (!!arguments) {
	        for (var i = 0; i < arguments.length; i++) {
	          if (!!arguments[i].status) {
	            if (arguments[i].status === 200) { // no idea why $.ajax returns errors for 200 so just continue on
	              break;
	            } else {
	              handleError(arguments[i].status);
	            }
	          }
	        }
	      }
	    });

	    function handleError(error) {
	      if (error === 408) { // handle request timeouts
	        if (cbFn) {
			  if (typeof id_601 != 'undefined' && typeof id_602 != 'undefined') {
			    cbFn({error:id_601 + " " + id_602});
			  } else {
			    cbFn({error:'ERROR'});
			  }
	        }
	      } else { // handle 404, 500, and all other errors gracefully
	        if (cbFn) {
			  if (typeof id_600 != 'undefined' && typeof id_602 != 'undefined') {
	            cbFn({error:id_600 + " " + id_602});
			  } else {
			    cbFn({error:'ERROR'});
			  }
	        }
	      }
	    }
	}
  }

/**
* Format presentation duration into human readable form of min:secs
*
* @param duration - duration in milliseconds
*/
function parseDuration(duration) {
    var hour = 1000*60*60;
    var min = 1000*60;
    var hrs = Math.floor(duration / hour);
    var mins = Math.floor((duration % hour) / min);
    var secs = Math.floor(((duration % hour) % min) / 1000);

    if (secs == 60) {secs = 0; mins++}
    if (mins == 60) {mins = 0; hrs++}

    return (hrs < 10 ? "0" + hrs : hrs) + ":" + (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
}

/**
* Format presentation start time into human readable form of min:secs
*
* @param duration - duration in seconds
*/
function parseStartTime(duration) {
    var hour = 60*60;
    var min = 60;
    var hrs = Math.floor(duration / hour);
    var mins = Math.floor((duration % hour) / min);
    var secs = Math.floor(((duration % hour) % min));

    if (secs == 60) {secs = 0; mins++}
    if (mins == 60) {mins = 0; hrs++}

    return (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
}

/**
 * Return a new JavaScript date that supports all browsers
 *
 * @param date
 */
function parseDate(date) {
  // i.e. date string in the format of 2012-03-23T09:00:00.000-04:00
  return new Date(
    date.substring(0, 4), // year
    date.substring(5, 7)-1, // month
    date.substring(8, 10), // day
    date.substring(11, 12) === "0" ?
    date.substring(12, 13) : date.substring(11, 13), // hours
    date.substring(14, 16), // minutes
    date.substring(17, 19) // seconds
  );
}

/**
 * Return a formatted string for discussion/note post date/time
 *
 * @param timestamp
 */
function formatItemDate(timestamp) {
  var date = parseDate(timestamp);
  var hours = date.getHours();
  var minutes = (date.getMinutes() < 10) ? "0"+date.getMinutes() : date.getMinutes();
  var day = (/ja/.test(parent.userLanguage)) ? date.getDate() + ja_day : date.getDate();
  var amPM = "AM";

  if (hours > 11) { amPM = "PM"; }
  if (hours > 12) { hours = hours - 12; }
  if (hours == 0) { hours = 12; }

  return months_short[date.getMonth()] + " " + day + " " + hours + ":" + minutes + " " + amPM;
}

function isMozilla() {
  return /mozilla/.test(navigator.userAgent.toLowerCase());
}

function isChrome() {
  return /chrome/.test(navigator.userAgent.toLowerCase());
}

function isMSIE() {
  return /msie/.test(navigator.userAgent.toLowerCase());
}


/*******************************************************************************
    parser.js
*******************************************************************************/
var sectionDom;
var copyrightText = "";
var supportText = "";
var supportUrl = "";
var supportPhone = "";

function loadSectionObject(){
	sectionDom = sectionxml;
	var i, j, mainTag;
	try{
		mainTag = sectionDom.documentElement;
		for (i=0; i<=mainTag.childNodes.length-1; i++){
			if (mainTag.childNodes[i].nodeType != 1) continue;	
			if (mainTag.childNodes[i].nodeName == "copyright"){
				var copyrightTag = mainTag.childNodes[i];
				for (j=0; j<=copyrightTag.childNodes.length-1; j++) {
					if (copyrightTag.childNodes[j].nodeType != 1) continue;	
					if (copyrightTag.childNodes[j].nodeName == "text") {
						try{
							copyrightText = copyrightTag.childNodes[j].firstChild.nodeValue;
						}catch(e){}
					}
				}
			} else if (mainTag.childNodes[i].nodeName == "support") {
				var supportTag = mainTag.childNodes[i];
				for (j=0; j<=supportTag.childNodes.length-1; j++) {
					if (supportTag.childNodes[j].nodeType != 1) continue;	
					if (supportTag.childNodes[j].nodeName == "text") {
						try{
							supportText = supportTag.childNodes[j].firstChild.nodeValue;
						}catch(e){}
					}else if (supportTag.childNodes[j].nodeName == "url") {
						try{
							supportUrl = supportTag.childNodes[j].firstChild.nodeValue;
						}catch(e){}
					}else if (supportTag.childNodes[j].nodeName == "phone") {
						try{
							supportPhone = supportTag.childNodes[j].firstChild.nodeValue;
						}catch(e){}
					}
				}
			}else if (mainTag.childNodes[i].nodeName == "text-chat") {
				var propTag = mainTag.childNodes[i];
				for (j=0; j<=propTag.childNodes.length-1; j++) {		
					if (propTag.childNodes[j].nodeName == "url") {
						var subTag = propTag.childNodes[j];
						putSectionObject(subTag, section_params, "chat-server");
					}
				}
			} else if (mainTag.childNodes[i].nodeName == "applications") {
				var propTag = mainTag.childNodes[i];
				for (j=0; j<=propTag.childNodes.length; j++) {		
					if (propTag.childNodes[j].nodeName == "application") {
						try{
							var subTag = propTag.childNodes[j];						
							var applicationName = subTag.getAttribute("ref");
							
							for (k=0; k<=subTag.childNodes.length; k++) {		
								if (subTag.childNodes[k].nodeName == "enabled") {
									var enTag = subTag.childNodes[k];
									putSectionObject(enTag, section_params, applicationName + "-visible");
								}
							}
						}catch(e){}
					}
				}
			}else if( mainTag.childNodes[i].nodeName == "disable-vsp-android-playback") {
				var dvsp = mainTag.childNodes[i];
				putSectionObject(dvsp, section_params, "disable-vsp-android-playback");
			}
		}
	}catch(e){/*file does not have to exist */}
}

function putSectionObject(subTag, object_array, obect_key){
	try{
		var aValue = subTag.firstChild.nodeValue;
		var thisItem = new genericObject(obect_key, aValue);
		object_array.push(thisItem);
		delete aValue;
		delete thisItem;
	}catch(e){}
}

// Retrieval Functions by Name...
function getSectionValue(name) {
	for (i in section_params) {
		if (section_params[i].ntit == name) {
			return section_params[i].nval;
		}
	}
}

var section_params = [];

// section is an array of section objects
var section = [];

var sessionDOM;

var presentationGuid;
var presentation_properties = [];
var organization_properties = [];
var presenter_properties = [];
var application_hints = [];
var additional_data = [];
var groups = [];
var sources = [];
		
function loadSessionObject(){
	sessionDOM = presentationxml;
	
	var i, j, mainTag;
	
	//get the root node
	var mainTag = sessionDOM.documentElement;
	
	for (i=0; i<=mainTag.childNodes.length-1; i++){
		if (mainTag.childNodes[i].nodeType != 1) continue;
		if (mainTag.childNodes[i].nodeName == "presentation-properties"){
			presPropTag = mainTag.childNodes[i];
			for (j=0; j<=presPropTag.childNodes.length-1; j++) {
				if (presPropTag.childNodes[j].nodeType != 1) continue;	
				if (presPropTag.childNodes[j].nodeName == "guid") {
					try{
						thisItem = new genericObject("guid", presPropTag.childNodes[j].firstChild.nodeValue);
						presentationGuid = presPropTag.childNodes[j].firstChild.nodeValue;
					}catch(e){
						thisItem = new genericObject("guid", "");
					}
					presentation_properties.push(thisItem);
					delete thisItem;
				} else if (presPropTag.childNodes[j].nodeName == "name") {
					try{
						thisItem = new genericObject("name", presPropTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("name", "");
					}
					presentation_properties.push(thisItem);
					delete thisItem;
				} else if (presPropTag.childNodes[j].nodeName == "description") {
					try{
						thisItem = new genericObject("description", presPropTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("description", "");
					}
					presentation_properties.push(thisItem);
					delete thisItem;
				} else if (presPropTag.childNodes[j].nodeName == "location") {
					try{
						thisItem = new genericObject("location", presPropTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("location", "");
					}
					presentation_properties.push(thisItem);
					delete thisItem;
				} else if (presPropTag.childNodes[j].nodeName == "total-presentation-size") {
					try{
						thisItem = new genericObject("total-presentation-size", presPropTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("total-presentation-size", "");
					}
					presentation_properties.push(thisItem);
					delete thisItem;
				} else if (presPropTag.childNodes[j].nodeName == "start-timestamp") {
					try{
						thisItem = new genericObject("start-timestamp", presPropTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("start-timestamp", "");
					}
					presentation_properties.push(thisItem);
					delete thisItem;
				} else if (presPropTag.childNodes[j].nodeName == "end-timestamp") {
					try{
						thisItem = new genericObject("end-timestamp", presPropTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("end-timestamp", "");
					}
					presentation_properties.push(thisItem);
					delete thisItem;
				} else if (presPropTag.childNodes[j].nodeName == "duration") {
					try{
						thisItem = new genericObject("duration", presPropTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("duration", "");
					}
					presentation_properties.push(thisItem);
					delete thisItem;
				}
			}
		} else if (mainTag.childNodes[i].nodeName == "organization-properties") {
			orgTag = mainTag.childNodes[i];
			for (j=0; j<=orgTag.childNodes.length-1; j++) {
				if (orgTag.childNodes[j].nodeType != 1) continue;
				if (orgTag.childNodes[j].nodeName == "logo") {
					try{
						thisItem = new genericObject("logo", orgTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("logo", "");
					}
					organization_properties.push(thisItem);
					delete thisItem;
				} else if (orgTag.childNodes[j].nodeName == "url") {
					try{
						thisItem = new genericObject("url", orgTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("url", "");
					}
					organization_properties.push(thisItem);
					delete thisItem;
				} else if (orgTag.childNodes[j].nodeName == "tooltips") {
					try{
						thisItem = new genericObject("tooltips", orgTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("tooltips", "");
					}
					organization_properties.push(thisItem);
					delete thisItem;
				}
			}
		} else if (mainTag.childNodes[i].nodeName == "presenter-properties") {
			presenterTag = mainTag.childNodes[i];
			for (j=0; j<=presenterTag.childNodes.length-1; j++) {
				if (presenterTag.childNodes[j].nodeType != 1) continue;
				if (presenterTag.childNodes[j].nodeName == "name") {
					try{
						thisItem = new genericObject("name", presenterTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("name", "");
					}
					presenter_properties.push(thisItem);
					delete thisItem;
				} else if (presenterTag.childNodes[j].nodeName == "title") {
					try{
						thisItem = new genericObject("title", presenterTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("title", "");
					}
					presenter_properties.push(thisItem);
					delete thisItem;
				} else if (presenterTag.childNodes[j].nodeName == "url") {
					try{
						thisItem = new genericObject("url", presenterTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("url", "");
					}
					presenter_properties.push(thisItem);
					delete thisItem;
				} else if (presenterTag.childNodes[j].nodeName == "email") {
					try{
						thisItem = new genericObject("email", presenterTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("email", "");
					}
					presenter_properties.push(thisItem);
					delete thisItem;
				} else if (presenterTag.childNodes[j].nodeName == "phone") {
					try{
						thisItem = new genericObject("phone", presenterTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("phone", "");
					}
					presenter_properties.push(thisItem);
					delete thisItem;
				} else if (presenterTag.childNodes[j].nodeName == "organization") {
					try{
						thisItem = new genericObject("organization", presenterTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("organization", "");
					}
					presenter_properties.push(thisItem);
					delete thisItem;
				}
			}
		} else if (mainTag.childNodes[i].nodeName == "hints") {
			hintsTag = mainTag.childNodes[i];
			for (j=0; j<=hintsTag.childNodes.length-1; j++) {
				if (hintsTag.childNodes[j].nodeType != 1) continue;
				if (hintsTag.childNodes[j].nodeName == "files-suffix") {
					try{
						thisItem = new genericObject("files-suffix", hintsTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("files-suffix", "");
					}
					application_hints.push(thisItem);
					delete thisItem;
				} else if (hintsTag.childNodes[j].nodeName == "output-template") {
					try{
						thisItem = new genericObject("output-template", hintsTag.childNodes[j].firstChild.nodeValue);
					}catch(e){
						thisItem = new genericObject("output-template", "");
					}
					application_hints.push(thisItem);
					delete thisItem;
				}
			}
		} else if (mainTag.childNodes[i].nodeName == "additional-resources") {
			resTag = mainTag.childNodes[i];
			for (j=0; j<=resTag.childNodes.length-1; j++) {
				if (resTag.childNodes[j].nodeName == "data") {
					var aDataType, aDataURI, aDataDesc;
					dataTag = resTag.childNodes[j];
					
					for( var z = 0; z < dataTag.attributes.length; z++ ) {
						if( dataTag.attributes[z].nodeName.toLowerCase() == 'type' ) 
							aDataType = dataTag.attributes[z].nodeValue;
						else if( dataTag.attributes[z].nodeName.toLowerCase() == 'uri' )
							aDataURI = dataTag.attributes[z].nodeValue;
						else if( dataTag.attributes[z].nodeName.toLowerCase() == 'description' )
							aDataDesc = dataTag.attributes[z].nodeValue;
					}
					
					dataElement = new additionalDataObject(aDataType, aDataURI, aDataDesc);
					additional_data.push(dataElement);
					delete dataElement;
				}
			}
		} else if (mainTag.childNodes[i].nodeName == "group") {
			var aGroupType, aGroupInstance, groupMode;
			var aGroupTracks = new Array;
			
			// Get the group
			groupTag = mainTag.childNodes[i];
			
			for( var v = 0; v < groupTag.attributes.length; v++ ) {
				if( groupTag.attributes[v].nodeName.toLowerCase() == 'type' )
					aGroupType = groupTag.attributes[v].nodeValue;
				else if( groupTag.attributes[v].nodeName.toLowerCase() == 'instance' )
					aGroupInstance = groupTag.attributes[v].nodeValue;
			}
						  
			for (j=0; j<=groupTag.childNodes.length-1; j++) {
				if (groupTag.childNodes[j].nodeName == "track") {
					var aTrackType, aTrackFPS, aTrackBitrate, aTrackWidth, aTrackHeight, aTrackDirectory, aTrackLang, aTrackLocation, aTrackAspectRatio;
					var aTrackData = new Array;
					
					trackTag = groupTag.childNodes[j];
					
					for( var z = 0; z < trackTag.attributes.length; z++ ) {
						if( trackTag.attributes[z].nodeName.toLowerCase() == 'type' ) 
							aTrackType = trackTag.attributes[z].nodeValue;
						else if( trackTag.attributes[z].nodeName.toLowerCase() == 'location' )
							aTrackLocation = trackTag.attributes[z].nodeValue;
						else if( trackTag.attributes[z].nodeName.toLowerCase() == 'bitrate' )
							aTrackBitrate = trackTag.attributes[z].nodeValue;
						else if( trackTag.attributes[z].nodeName.toLowerCase() == 'fps' )
							aTrackFPS = trackTag.attributes[z].nodeValue;
						else if( trackTag.attributes[z].nodeName.toLowerCase() == 'width' )
							aTrackWidth = trackTag.attributes[z].nodeValue;
						else if( trackTag.attributes[z].nodeName.toLowerCase() == 'height' )
							aTrackHeight = trackTag.attributes[z].nodeValue;
						else if( trackTag.attributes[z].nodeName.toLowerCase() == 'directory' )
							aTrackDirectory = trackTag.attributes[z].nodeValue;
						else if( trackTag.attributes[z].nodeName.toLowerCase() == 'language' )
							aTrackLang = trackTag.attributes[z].nodeValue;
						else if( trackTag.attributes[z].nodeName.toLowerCase() == 'aspect-ratio' )
							aTrackAspectRatio = trackTag.attributes[z].nodeValue;
					}						
					for (k=0; k<=trackTag.childNodes.length-1; k++) {
						if (trackTag.childNodes[k].nodeName == "data") {
							var aDataType, aDataTime, aDataDuration, aDataURI, aDataValue, aDataServer, aDataMedia;
							
							dataTag = trackTag.childNodes[k];
							
							for( var x = 0; x < dataTag.attributes.length; x++ ) {
								if( dataTag.attributes[x].nodeName.toLowerCase() == 'type' ) 
									aDataType = dataTag.attributes[x].nodeValue;
								else if( dataTag.attributes[x].nodeName.toLowerCase() == 'time' )
									aDataTime = dataTag.attributes[x].nodeValue;
								else if( dataTag.attributes[x].nodeName.toLowerCase() == 'duration' )
									aDataDuration = dataTag.attributes[x].nodeValue;
								else if( dataTag.attributes[x].nodeName.toLowerCase() == 'uri' )
									aDataURI = dataTag.attributes[x].nodeValue;
								else if( dataTag.attributes[x].nodeName.toLowerCase() == 'media' )
									aDataMedia = dataTag.attributes[x].nodeValue;
							}
							
							try{
								aDataValue = dataTag.firstChild.nodeValue;
							}catch(e){
								aDataValue = "";
							}
							
							dataElement = new trackDataObject(aDataType, aDataTime, aDataDuration, aDataURI, aDataValue, aDataServer, aDataMedia);
							aTrackData.push(dataElement);
							delete dataElement;
						}
					}
											
					trackElement = new trackObject(aTrackType, aTrackBitrate, aTrackFPS, aTrackWidth, aTrackHeight, aTrackAspectRatio, aTrackDirectory, aTrackLang, aTrackData);
					aGroupTracks.push(trackElement);
					delete trackElement;
				}
			}
			groupElement = new groupObject(aGroupType, aGroupInstance, aGroupTracks);
			groups.push(groupElement);
			delete groupElement;
		}else if (mainTag.childNodes[i].nodeName == "source-combination") {
			var aSourceType = "";
			var aSourceMedia = ""
			var aSourceUri = "";
			
			// Get the group
			var sourceTag = mainTag.childNodes[i];
			
			for( var v = 0; v < sourceTag.attributes.length; v++ ) {
				if( sourceTag.attributes[v].nodeName.toLowerCase() == 'type' )
					aSourceType = sourceTag.attributes[v].nodeValue;
				else if( sourceTag.attributes[v].nodeName.toLowerCase() == 'media' )
					aSourceMedia = sourceTag.attributes[v].nodeValue;
				else if( sourceTag.attributes[v].nodeName.toLowerCase() == 'uri' )
					aSourceUri = sourceTag.attributes[v].nodeValue;
			}
			sourceElement = new sourceObject(aSourceType, aSourceMedia, aSourceUri);
			sources.push(sourceElement);
			delete sourceElement;
		}
	}
								
	setSessionLoaded();
}

// Generic Info Object...
function genericObject(name, value) {
	this.ntit = name;
	this.nval = value;
}

function additionalDataObject( myDataType, myDataURI, myDataDesc){
	this.dataType = myDataType;
	this.dataURI = myDataURI;
	this.dataDesc = myDataDesc;
}

// source combo objects
function sourceObject(sourceType, sourceMedia, sourceUri) {
	this.sourceType = sourceType;
	this.sourceMedia = sourceMedia;
	this.sourceUri = sourceUri;
}

// Slide Objects...
function groupObject(groupType, groupInstance, groupTracks) {
	this.groupType = groupType;
	this.groupInstance = groupInstance;
	this.groupTracks = groupTracks;
}

function trackObject(trackType, trackBitrate, trackFPS, trackWidth, trackHeight, trackAspectRatio, trackDirectory, trackLanguage, trackData) {
	this.trackType = trackType;
	this.trackFPS = trackFPS;
	this.trackBitrate = trackBitrate;
	this.trackWidth = trackWidth;
	this.trackHeight = trackHeight;
	this.trackDirectory = trackDirectory;
	this.trackLanguage = trackLanguage;
	this.trackAspectRatio = trackAspectRatio;
	this.trackData = trackData;
}

function trackDataObject(trackDataType, trackDataStartTime, trackDataDuration, trackDataURI, trackText, trackDataServer, trackDataMedia) {
	this.trackDataType = trackDataType;
	this.trackDataStartTime = trackDataStartTime;
	this.trackDataDuration = trackDataDuration;
	this.trackDataURI = trackDataURI;
	this.trackDataServer = trackDataServer;
	this.trackText = trackText;
	this.trackDataMedia = trackDataMedia;
}

// get base presentation values
function getPresentationValue(name) {
	for (i in presentation_properties) {
		if (presentation_properties[i].ntit == name) {
			return presentation_properties[i].nval;
		}
	}
}

// get organization values
function getOrganizationValue(name) {
	for (i in organization_properties) {
		if (organization_properties[i].ntit == name) {
			return organization_properties[i].nval;
		}
	}
}

// get presenter values
function getPresenterValue(name) {
	for (i in presenter_properties) {
		if (presenter_properties[i].ntit == name) {
			return presenter_properties[i].nval;
		}
	}
}

// returns the group tracks
function getPresentationGroups(){
	return groups;
}
		
function setSessionLoaded(){
	//alert("Session Info Loading Complete");
	//for (k=0; k<additional_data.length; k++) {
	//	alert("additional_data: " + additional_data[k].dataType + " :: " + additional_data[k].dataURI + " :: " + additional_data[k].dataDesc);
	//}
}
		


/*******************************************************************************
    mobile/general.js
*******************************************************************************/
// Generic Mobile Specific Functions

var isLive = false;
var hasPlayed = false;

var secondsToStart = "";
if( getQueryVariable("secsToStart") != "" ){
	secondsToStart = parseInt(getQueryVariable("secsToStart"));
	if( secondsToStart > 0 ){
		secondsToStart = secondsToStart + 30; // add 30 seconds as it takes that long for iOS streaming to start
	}
}

function findVGASource(useDownload){
	for( i=0; i<sources.length; i++ ){
		if( !useDownload){
			if( sources[i].sourceMedia != "download"){
				mySource = sources[i].sourceUri;
				break;
			}
		}else{
			if( sources[i].sourceMedia == "download"){
				mySource = sources[i].sourceUri;
				break;
			}
		}
	}
}

function findMediaSource(useDownload){
	var k,l,m;
	for (k=0; k<groups.length; k++) {
		if( groups[k].groupType == "primary" ){
			for( l=0; l<groups[k].groupTracks.length; l++ ){
				var currentTrack = groups[k].groupTracks[l];
				if( !useDownload){
					if( currentTrack.trackType == "mobile-video" ){
						for( m=0; m<currentTrack.trackData.length; m++ ){
							var currentTrackData = currentTrack.trackData[m];
							if( currentTrackData.trackDataType == "m4v" ){
								mySource = currentTrackData.trackDataURI;
								break;
							}
						}
					}
				}else{
					if( currentTrack.trackType == "video" ){
						for( m=0; m<currentTrack.trackData.length; m++ ){
							var currentTrackData = currentTrack.trackData[m];
							if( currentTrackData.trackDataType == "m4v" && currentTrackData.trackDataMedia == "download"){
								mySource = currentTrackData.trackDataURI;
								break;
							}
						}
					}
				}
			}
		}
	}
}

function findLiveSource(){
	var k,l,m,n,o,p;
	for (k=0; k<groups.length; k++) {
		if( groups[k].groupType == "primary" ){
			for( l=0; l<groups[k].groupTracks.length; l++ ){
				var currentTrack = groups[k].groupTracks[l];
				if( currentTrack.trackType == "live" ){
					for( m=0; m<currentTrack.trackData.length; m++ ){
						var currentTrackData = currentTrack.trackData[m];
						if( currentTrackData.trackDataType == "sdp" ){
							mySource = currentTrackData.trackDataURI;
							return true;
						}
					}
				}
			}
		}
	}
	
	for (n=0; n<groups.length; n++) {
		if( groups[n].groupType == "projector" ){
			for( m=0; m<groups[n].groupTracks.length; m++ ){
				var currentTrack = groups[n].groupTracks[m];
				if( currentTrack.trackType == "live" ){
					for( o=0; o<currentTrack.trackData.length; o++ ){
						var currentTrackData = currentTrack.trackData[o];
						if( currentTrackData.trackDataType == "sdp" ){
							mySource = currentTrackData.trackDataURI;
							return true;
						}
					}
				}
			}
		}
	}
	
	if( sources.length > 0 ){
		if( sources[0].sourceType == "sdp" ){
			mySource = sources[0].sourceUri
			return true;
		}
	}
}

function findThumbnails(){
	var k,m,l;
	for (k=0; k<groups.length; k++) {
		if( groups[k].groupType == "projector" ){
			for( l=0; l<groups[k].groupTracks.length; l++ ){
				var currentTrack = groups[k].groupTracks[l];
				if( currentTrack.trackType == "thumbnail" ){
					
					thumbDirectory = currentTrack.trackDirectory;
					totalSlides = currentTrack.trackData.length;
					thumbScenes = currentTrack.trackData;
					thumbAspectRatio = currentTrack.trackAspectRatio;
					return 1;
				}
			}
		}
		if( thumbScenes == undefined ){
			if( groups[k].groupType == "primary" ){
				for( l=0; l<groups[k].groupTracks.length; l++ ){
					var currentTrack = groups[k].groupTracks[l];
					if( currentTrack.trackType == "thumbnail" ){
						thumbDirectory = currentTrack.trackDirectory;
						totalSlides = currentTrack.trackData.length;
						thumbScenes = currentTrack.trackData;
						thumbAspectRatio = currentTrack.trackAspectRatio;
						return 2;
					}
				}
			}
		}
	}
	return 0;
}

function checkForFlipbook(){
	for (k=0; k<groups.length; k++) {
		if( groups[k].groupType == "projector" ){
			for( l=0; l<groups[k].groupTracks.length; l++ ){
				var currentTrack = groups[k].groupTracks[l];
				if( currentTrack.trackType == "flipbook" ){
					flipDirectory = currentTrack.trackDirectory;
					flipImage = currentTrack.trackData[0].trackDataURI;
					firstThumbURI = altContentDir + flipDirectory + "/" + flipImage;
					return;
				}
			}
		}
	}
}


/*******************************************************************************
    inline
*******************************************************************************/
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

// // find browser language for display
// var languageTimeout;
// var userLanguage;	

// if (typeof(navigator.language) != "undefined")
//     userLanguage = navigator.language;
// else if (typeof(navigator.browserLanguage) != "undefined")
//     userLanguage = navigator.browserLanguage;
// else
//     userLanguage = "en"; 

// userLanguage = userLanguage.toLowerCase();			
// userLanguage = userLanguage.substring(0, 2);

// // calls in loads in the found language file
// includeScript( getLanguageFile(userLanguage) );

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
