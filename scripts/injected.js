"use strict";

window.addEventListener("message", function (event) {
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "ping_injected")) {
        console.log(event.data);
        window[event.data.func](event.data.val);

        //window.postMessage({type: "ping_from_injected", volume: 'from injected'}, "*");
    }
}, false);

function pageZoom(val)
{
    var body = $('body');
    var z = parseFloat(body.css('zoom'));

    if(val == 'plus'){
        var nz = z + 0.1;
    }

    if(val == 'minus'){
        var nz = z - 0.1;
    }

    if(val == 'normal'){
        var nz = 1;
    }

    body.css({zoom:nz});
}














function main() {
    console.log('test');
    window.postMessage({type: "ping_contentscript", volume: 1, currentTime: 2}, "*");
}

//main();
