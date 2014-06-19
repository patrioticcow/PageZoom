'use strict';

var state = 0;

function injectJs(link) {
    $('<script type="text/javascript" src="' + link + '"/>').appendTo($('head'));
}

/**
 * inject the script
 */
$(function () {
    injectJs(chrome.extension.getURL('scripts/jquery.js'));
    injectJs(chrome.extension.getURL('scripts/jquery.zoomooz.min.js'));
    //injectJs(chrome.extension.getURL('scripts/injected.js'));
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

/**
 * get messages from bg page
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.info.selectionText) {
        var text = window.getSelection ? window.getSelection().focusNode.parentNode : document.selection.createRange().parentElement();
        text = $(text);

        text.zoomTarget();
        text.zoomTo({closeclick: true});
    }

    if (request.info.mediaType) {
        var src = new URL(request.info.srcUrl);
        if (request.info.mediaType === 'image') {
            var media = $("img[src$='" + src.pathname + "']");
        }
        media.zoomTarget();
        media.zoomTo({closeclick: true});
    }

    if (request.ping_contentscript) {
        window.postMessage({type: "ping_injected", func: 'pageZoom', val: request.zoom, info: request.info}, "*");

        //sendResponse({pong: true});
        //return;
    }
});

chrome.storage.local.get('page_zoom', function (result) {
    if (!isEmpty(result)) {
        var pageZoom = JSON.parse(result.page_zoom);
        pageZoom.forEach(function(obj){
            if (obj.page === window.location.href) {
                $('body').css({zoom: obj.zoom});
            }
        });
    }
});

// not used yet
$(document).mousedown(function (e) {
    switch (e.which) {
        case 1:
            //left Click
            break;
        case 2:
            // middle click and scroll
            state = state === 1 ? 0 : 1;
            break;
        case 3:
            //right Click
            break;
    }

    return true;
});

function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}