// ==UserScript==
// @name Mangadex Mark Read
// @namespace Violentmonkey Scripts
// @match https://mangadex.org/title/*
// @grant none
// @description Adds a button to mark all english manga on the page as read.
// @version 1.0
// ==/UserScript==

function createButton(text, id, idx, onClickCb) {
    $('body').append(`<input type="button" value="${text}" id="${id}">`)
    $(`#${id}`).css("position", "fixed")
        .css("top", 65 + (idx * 28))
        .css("left", 0)
        .css("background-color", "black")
        .css("color", "white")
        .css("border-radius", "12px")
    $(`#${id}`).click(onClickCb);
}

$(document).ready(() => {
    createButton("mark read", "sus_markRead", 0, function () {
        const chapters = document.getElementsByClassName("chapter-row");
        if (!chapters.length) {
            return;
        }
        for (let i = 0; i < chapters.length; i++) {
            const currentChapter = chapters[i];
            const flag = currentChapter.getElementsByClassName("flag");
            if (!flag.length) {
                continue;
            }
            const language = flag[0].getAttribute("title").toLowerCase().trim();
            if (language !== "english") {
                continue;
            }
            const readIndicator = currentChapter.getElementsByClassName("fa-eye-slash");
            if (!readIndicator.length) {
                continue;
            }
            readIndicator[0].click();
        }
    });
});
