// ==UserScript==
// @name Mangadex Popular Scrapes
// @namespace Violentmonkey Scripts
// @match https://mangadex.org/
// @grant none
// ==/UserScript==

$(document).ready(() => {
  const hrefs = new Array();
  const elements = $('#day ul li');
  elements.each((i, elem) => {
    hrefs.push(elem.firstElementChild.firstElementChild.href)
  });

  $('body').append('<input type="button" value="Open Links" id="OL">')
  $("#OL").css("position", "fixed")
          .css("top", 65)
          .css("left", 0)
          .css("background-color", "black")
          .css("color", "white")
          .css("border-radius", "12px")
  $('#OL').click(function(){
    $.each(hrefs, function(i, link) {
      setTimeout(function(){
       window.open(link, '_blank');
      },1000);
    });
  });
});