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

    var storage = '';

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

        //chrome.storage.local.clear();

        chrome.storage.local.get({page_zoom: []}, function (result) {
            var pageZoom = result.page_zoom;
            console.log(pageZoom);

            if (pageZoom.length === 0) {
                pageZoom.push([
                    {zoom: nz, page_url: pageUrl}
                ]);
            } else {
                pageZoom.forEach(function (v) {
                    console.log(v);
                    if (v.page_url === pageUrl) {
                        pageZoom.push([
                            {zoom: nz, page_url: pageUrl}
                        ]);
                    } else {
                        pageZoom.push([
                            {zoom: nz, page_url: pageUrl}
                        ]);
                    }
                });
            }

        });

        chrome.storage.local.set({page_zoom: pageZoom}, null);
    }
}