"use strict";

function initOptions() {
    storage('nil');

    $('body').on('click', '.delete', function () {
        var l = $(this).data('link');
        storage(l);
    });
}

function storage(del) {
    chrome.storage.local.get('page_zoom', function (result) {
        if (!isEmpty(result)) {
            var html = '';
            var pageZoom = JSON.parse(result.page_zoom);

            if (del !== "nil") {
                pageZoom.splice(del, 1);
                chrome.storage.local.set({page_zoom: JSON.stringify(pageZoom)}, null);
                storage();
            } else {
                pageZoom.forEach(function (obj, k) {
                    html += ('<a href="#" class="list-group-item disabled"><button class="btn btn-danger delete" data-link="' + k + '">x</button> ' + obj.zoom.toFixed(2).replace(/\.?0+$/, "") + ': ' + obj.page + '</a>');
                });

                $('#listGroup').html(html);
            }
        }
    });
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

document.addEventListener('DOMContentLoaded', initOptions);