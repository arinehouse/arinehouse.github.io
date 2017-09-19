'use strict'

var curIndex = 0;
var curSection = 0;

var pages = ['about', 'projects', 'music', 'contact'];

$(window).on('load', function() {
  $('.page-trigger').on('click', function() {

    if ($(this).siblings('.page-trigger').length > 0) {
      curIndex = $(this).index();
      setOpacityForAllExcept(curIndex, 0);
    } else {
      setOpacityForAllExcept(curIndex, 0);
      curIndex = $(this).index();
    }
    
    // cycle to the other section
    cycleSections(curSection, curIndex).then(function() {
      resetPages(curIndex);
      placeUnderbar(curIndex, false);
      setOpacityForAllExcept(curIndex, 1);

      // allow vertical scrolling
      $('body').css({ 'overflow-y': 'scroll' });
    });
    curSection = (curSection + 1) % 2
  });

  $('.nav-item').on('click', function() {
    var clickedIndex = $(this).index();

    cyclePages(curIndex, clickedIndex);

    curIndex = clickedIndex;
  });
});


/* cyclePages
 * cycles between pages within the portfolio section
 * @param curIndex, the current index in the portfolio section
 * @param newIndex, the target auxiliary section index
 */
var cyclePages = function(curIndex, newIndex) {
  if (curIndex === newIndex) {
    // we clicked the current pane; do nothing
    return;
  }

  // otherwise, animate the transition from current panel to new panel
  else if (curIndex < newIndex) {
    // animate left
    $('#' + pages[curIndex]).animate({ left: '-100%' });
  } else {
    //animate right
    $('#' + pages[curIndex]).animate({ left: '100%' }, 600);
  }
  $('#' + pages[newIndex]).animate({ left: 0 }, 600, resetPages(newIndex));

  // place the underbar for the nav menu
  placeUnderbar(newIndex, true);
};

/* cycleSections
 * cycles between the main section and the auxiliary sections
 * @param curSection, either 0 (main page) or 1 (auxiliary)
 * @param curIndex, the index of the auxiliary section
 */
var cycleSections = function(section, index) {
  return new Promise(function(resolve) {
    if (section === 0) {
      // current section is main page, scroll right to indicated page
      $('.port-pages').animate({ left: 0 }, 700);
      $('#' + pages[index]).animate({ left: 0 }, 700);
      $('#home').animate({ left: '-100%' }, 700, function() { resolve() });
    } else {
      // current section is portfolio, scroll left to main section
      $('.port-pages').animate({ left: '100%' }, 700);
      $('#' + pages[index]).animate({ left: '100%' }, 700);
      $('#home').animate({ left: 0 }, 700, function() { resolve() });
    }
  });
};

/* placeUnderbar
 * places the "current index" underbar appropriately
 * @param index, the index of the navbar where the underbar belongs
 * @param animate, a boolean that indicates whether the underbar should animate or just appear
 */
var placeUnderbar = function(index, animate) {
  var width = $('.nav-item:eq(' + index + ')').innerWidth();
  var offset = $('.nav-item:eq(' + index + ')').offset();

  if (animate) {
    $('#underbar').animate({ width, left: offset.left + 'px' }, 600);
  } else {
    $('#underbar').css({ opacity: 1, width, left: offset.left + 'px' });
  }
};

/* resetPages
 * Resets the CSS of the hidden pages so they appear offscreen
 */
var resetPages = function(skipIndex) {
  for (var i = 0; i < skipIndex; i++) {
    $('#' + pages[i]).css({ left: '-100%' });
  }
  for (var i = skipIndex + 1; i < pages.length; i++) {
    $('#' + pages[i]).css({ left: '100%' });
  }
}

/* setOpacityForAllExcept
 * Sets the opacity of all pages excepty for the skipped index to the desired opacity
 * @param skipIndex, the index to be skipped
 * @param opacity, the desire opacity in range [0..1]
 */
var setOpacityForAllExcept = function(skipIndex, opacity) {
  for (var i = 0; i < pages.length; i++) {
    if (i != skipIndex) {
      $('#' + pages[i]).css({ opacity: opacity });
    }
  }
}
