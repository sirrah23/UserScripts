// ==UserScript==
// @name Hacker News Top Parent Collapser
// @namespace Violentmonkey Scripts
// @match https://news.ycombinator.com/item*
// @grant none
// @description Adds button to Hacker News threads that collapses topmost, uncollapsed parent comment and scrolls to it afterwards.
// @version 1.1
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

function getCollapser(){
    const commentToggles = document.getElementsByClassName("togg") 
    const comments = document.getElementsByClassName("comment")
    const isFlaggedComments = Array.prototype.slice.call(comments).map(ce => ce.innerText === "[flagged]")

    function getNumChildren(toggleText){
        const numOfChildrenRegex = /\d+/
        return parseInt(numOfChildrenRegex.exec(toggleText)) - 1
    }

    function isUncollapsedComment(c){
        return c.innerHTML === "[–]" || c.innerHTML === "[-]"
    }

    return function(){
        let parentToCollapseIndex = null;
        let numChildrenToSkip = 0;

        for(let i = 0; i < commentToggles.length; i++){
            if(numChildrenToSkip > 0){
                if(!isFlaggedComments[i]){
                    --numChildrenToSkip
                }
                continue
            }
            if(isUncollapsedComment(commentToggles[i])){
                parentToCollapseIndex = i
                break
            } else {
                numChildrenToSkip = getNumChildren(commentToggles[i].innerHTML)
            }
        }
        if(parentToCollapseIndex !== null){
            commentToggles[parentToCollapseIndex].click()
            commentToggles[parentToCollapseIndex].scrollIntoView()
        }
    }
}


(function(){
    createButton("cc", "cc", 0, getCollapser())
})()