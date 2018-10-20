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
