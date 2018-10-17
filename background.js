chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'delivery.streaming.sydney.edu.au'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.webRequest.onBeforeSendHeaders.addListener(
    info => {
        // Replace the User-Agent header
        let headers = info.requestHeaders;
        headers.forEach((header, i) => {
            if (header.name.toLowerCase() == 'user-agent')
                header.value = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1';
        });
        return {requestHeaders: headers};
    },
    // Request filter
    {
        // Modify the headers for these pages
        urls: [
            '*://view.streaming.sydney.edu.au/*',
        ],
        // In the main window and frames
        types: ['main_frame', 'sub_frame']
    },
    ['blocking', 'requestHeaders']
);
