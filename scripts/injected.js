"use strict";

window.addEventListener("message", function (event) {
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "ping_injected")) {
        window[event.data.func](event.data.val, event.data.info);

        //window.postMessage({type: "ping_from_injected", volume: 'from injected'}, "*");
    }
}, false);

function pageZoom(val, info) {
    if (val !== '') {
        var body = $('body');
        var z = parseFloat(body.css('zoom'));
        var nz = 1;

        if (val == 'plus') {
            nz = z + 0.1;
        }

        if (val == 'minus') {
            nz = z - 0.1;
        }

        if (val == 'normal') {
            nz = 1;
        }

        body.css({zoom: nz});

        var pageUrl = info.pageUrl;

        chrome.storage.local.get({page_zoom:[]}, function (result) {
            if (isEmpty(result)) {
                chrome.storage.local.set({page_zoom: JSON.stringify([{page: pageUrl, zoom: nz}])}, null);
            } else {
                var pageZoom = JSON.parse(result.page_zoom);
                pageZoom.forEach(function(obj){
                    if (obj.page === pageUrl) {
                        chrome.storage.local.set({page_zoom : JSON.stringify([{page: pageUrl, zoom: nz}])}, null);
                    } else {
                        pageZoom.push({page: pageUrl, zoom: nz});
                        console.log(pageZoom);
                        chrome.storage.local.set({page_zoom : JSON.stringify(pageZoom)}, null);
                    }
                });
            }
        });

        //chrome.storage.local.clear();
    }
}

function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}