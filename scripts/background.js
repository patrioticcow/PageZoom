'use strict';

// A generic onclick callback function.
function genericOnClick(info, tab) {
    console.log(info);
    console.log(tab);

    // send message to the content script
    chrome.tabs.sendMessage(tab.id, {ping_contentscript: true}, function (response) {
        console.log(tab.id);
        console.log(response);
    });
}

function plusZoom(info, tab) {
    chrome.tabs.sendMessage(tab.id, {ping_contentscript: true, zoom: 'plus'}, function (response) {
        console.log(response);
    });
}

function minusZoom(info, tab) {
    chrome.tabs.sendMessage(tab.id, {ping_contentscript: true, zoom: 'minus'}, function (response) {
        console.log(response);
    });
}

function normalZoom(info, tab) {
    chrome.tabs.sendMessage(tab.id, {ping_contentscript: true, zoom: 'normal'}, function (response) {
        console.log(response);
    });
}

// Create one test item for each context type.
var contexts = ["page", "selection", "link", "editable", "image", "video", "audio"];
for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    if (context !== 'page') {
        var title = "Zoom " + context;
        var id = chrome.contextMenus.create({
            "title": title,
            "contexts": [context],
            "onclick": genericOnClick
        });
    }
}

chrome.contextMenus.create({
    "title": '+ More Zoom',
    "onclick": plusZoom
});

chrome.contextMenus.create({
    "title": '- Less Zoom',
    "onclick": minusZoom
});

chrome.contextMenus.create({
    "title": 'Reset Zoom',
    "onclick": normalZoom
});
