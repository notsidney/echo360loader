# Echo360 Loader
<a href="https://chrome.google.com/webstore/detail/hekcgkbebmbmbclcgikaocemhaeafpbf/" target="_blank" rel="noopener noreferrer">
    <img src="https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_496x150.png" width="248" alt="Link to Chrome Web Store page" />
</a>

Get it on the [Chrome Web Store](https://chrome.google.com/webstore/detail/hekcgkbebmbmbclcgikaocemhaeafpbf/)
or as a .crx file on the
[releases tab](https://github.com/notseenee/echo360loader/releases) above.

A Chrome extension to load USYD Echo360 videos without Flash.
Includes playback speed controls and thumbnail seeking.

![Screenshot](images/screenshot@2x.png)

[Instructions to download the video using ffmpeg](downloadinstructions.md)

## Under the hood
This extension redirects the browser from the default (horrible) Flash player to
the iPad version of the player. It then uses hls.js to play the HLS stream in
the Chrome video player.

- `background.js` enables the toolbar icon on `delivery.streaming.sydney.edu.au`
  pages
- `redirect.js` redirects `view.streaming.sydney.edu.au` pages to the iPad
  player at
  `http://delivery.streaming.edu.au/echo/templates/.../echo_files/echo_ipad.htm`
- `hls.js` is the bundled hls.js
- `contentScript.js` plays the HLS stream, adds custom controls below the video,
  re-adds the metadata on the top of the page, and fixes thumbnail seeking

### HTTPS issues
This extension uses the non-HTTPS version of the iPad player since the HLS
stream is not served with HTTPS, so could not be loaded in Chrome without the
user enabling mixed content every time they watch a video.

This also means the metadata on the top of the player page was broken, since it
gets data from a HTTPS iframe on the page, which Chrome blocks if the main page
is HTTP. `contentScript.js` fixes this. 

## Extending this extension
This extension is limited to USYD’s implementation of Echo360. If you want to
extend this extension to your own university’s Echo360 system, replace the
`streaming.sydney.edu.au` host names on the following files with the corresponding
host names:
- [`manifest.json`](src/manifest.json) lines 10 and 14
- [`background.js`](src/background.js) line 5

## Version history
### 1.1.0
Clean up code and add README.md

### 1.0.0
Initial release to the Chrome Web Store

--------------------------------------------------------------------------------

This extension bundles [hls.js](https://github.com/video-dev/hls.js/), which is
licensed under Apache Licence 2.0.
