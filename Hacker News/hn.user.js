// ==UserScript==
// @name Hacker News Top Parent Collapser
// @namespace Violentmonkey Scripts
// @match https://news.ycombinator.com/item*
// @grant none
// @description Create a button which, when clicked, will collapse the topmost, uncollapsed parent comment in a thread.
// ==/UserScript==

function createButton(text, id, idx, clickFunc){
    const body = document.getElementsByTagName("body")[0]
    body.innerHTML += `<input type="button" value="${text}" id="${id}">` 
    const newButton = document.getElementById(id)
    newButton.style.position = "fixed"
    newButton.style.top = 65 + (idx*28) 
    newButton.style.left = 0
    newButton.style.backgroundColor = "black"
    newButton.style.color = "white"
    newButton.style.borderRadius = "12px"
    newButton.onclick = clickFunc
}

(function(){
    createButton("test", "cc", 0, () => {
        console.log("Hello World!")
    })
})()