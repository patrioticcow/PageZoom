"use strict";

window.addEventListener("message", function (event) {
    if (event.source != window)
        return;

    var playerId = document.getElementById("movie_player");

    if (event.data.type && (event.data.type == "FROM_CONTENTSCRIPT_SEEK")) {
        if (event.data.key === 'seek') {
            if (playerId.hasOwnProperty('seekTo')) {
                playerId.seekTo(event.data.value);
            }
        }
    }
}, false);

function main(typeName) {
    var playerId = document.getElementById("movie_player");
    if (playerId) {
        if (playerId.hasOwnProperty('getVolume')) {
            var volume = playerId.getVolume();
            var currentTime = playerId.getCurrentTime();

            window.postMessage({type: typeName, volume: volume, currentTime: currentTime}, "*");
        }
    }
}

main("FROM_PAGE");
