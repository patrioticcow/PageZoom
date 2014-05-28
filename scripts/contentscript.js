'use strict';

function injectJs(link) {
    $('<script type="text/javascript" src="' + link + '"/>').appendTo($('head'));
}

function init() {

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

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        setVars(event);
        init();
    }
}, false);