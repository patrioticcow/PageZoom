'use strict';

console.log('content script');

function injectJs(link) {
    $('<script type="text/javascript" src="' + link + '"/>').appendTo($('head'));
}


/**
 * inject the script
 */
$(function () {
    var playerIdd = document.getElementById("movie_player");
    if (playerIdd) {
        injectJs(chrome.extension.getURL('scripts/injected.js'));
    }
});

chrome.storage.local.get('ymc_volume', function (result) {
    if (result.ymc_volume === true) {
        var seekState = 0;
    }
});

/**
 * listen for events form the injected script
 */
window.addEventListener("message", function (event) {
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "ping_contentscript")) {
        console.log(event.data.type);
    }

    if (event.data.type && (event.data.type == "ping_from_injected")) {
        console.log(event.data.type);
    }
}, false);

// get messages from bg page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.ping_contentscript) {
        window.postMessage({type: "ping_injected", func: 'pageZoom', val: request.zoom}, "*");

        //sendResponse({pong: true});
        //return;
    }

    console.log(request);
    console.log(sender);
});