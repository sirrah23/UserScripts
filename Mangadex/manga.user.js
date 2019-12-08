// ==UserScript==
// @name Mangadex Popular Scrapes
// @namespace Violentmonkey Scripts
// @match https://mangadex.org/
// @grant none
// @description Adds buttons that open all popular manga from the following categories: past six hours, past day, and past week
// @version 1.0
// ==/UserScript==

class hrefContainer{

  constructor(xpath){
    this.hrefs = new Array()
    this.elements = $(xpath)
    this.parseHREFs()
  }

  parseHREFs(){
    for(let i = 0; i < this.elements.length; i++){
      this.hrefs.push(this.elements[i].firstElementChild.firstElementChild.href)
    }
  }

  getLinks(){
    return this.hrefs
  }
}

function createButton(container, text, id, idx){
  $('body').append(`<input type="button" value="${text}" id="${id}">`)
  $(`#${id}`).css("position", "fixed")
          .css("top", 65+(idx*28))
          .css("left", 0)
          .css("background-color", "black")
          .css("color", "white")
          .css("border-radius", "12px")
  $(`#${id}`).click(function(){
    $.each(container.getLinks(), function(i, link) {
      setTimeout(function(){
       window.open(link, '_blank');
      },1000);
    });
  });
}


$(document).ready(() => {
  const sixContainer = new hrefContainer('#six_hours ul li')
  const dayContainer = new hrefContainer('#day ul li')
  const weekContainer = new hrefContainer('#week ul li')
  createButton(sixContainer,  "six",  "SL", 0)
  createButton(dayContainer,  "day",  "DL", 1)
  createButton(weekContainer, "week", "WL", 2)
});