'use strict'

var menuHidden = true;
var currentIndex = 0;
var clockID;
var interval = 3.5; // unit in seconds for the change of words on the front page

$(document).ready(function() {
  tickThrough();

  $('#hamburger-menu').on('click', function() {
    if (menuHidden) {
      $('#line1').animate({left: '30px', opacity: 0}, 400);
      $('#line2').animate({left: '-30px', opacity: 0}, 400);
      $('#line3').animate({left: '30px', opacity: 0}, 400);
      setTimeout(function() {
        $('#line1').css({left: '30px', top: '-15px', transform: 'rotate(-45deg)'});
        $('#line1').animate({left: 0, top: '15px', opacity: 1}, 400);
        $('#line2').css({left: '-30px', top: '-15px', transform: 'rotate(45deg)'});
        $('#line2').animate({left: 0, top: '15px', opacity: 1}, 400);
      }, 500);
      menuHidden = false;
    } else {
      $('#line1').animate({left: '-30px', top: '40px', opacity: 0}, 400);
      $('#line2').animate({left: '30px', top: '40px', opacity: 0}, 400);
      setTimeout(function() {
        $('#line1').css({left: '30px', top: 0, transform: 'rotate(0deg)'});
        $('#line1').animate({left: 0, opacity: 1}, 400);
        $('#line2').css({left: '-30px', top: '15px', transform: 'rotate(0deg)'});
        $('#line2').animate({left: 0, opacity: 1}, 400);
        $('#line3').animate({left: 0, opacity: 1}, 400);
      }, 450);
      menuHidden = true;
    }
  });

  $('.more').hover(function() {
    $('.ellipse').css({display: 'inline-flex', justifyContent: 'space-between'});
    $('.ellipse').animate({width: '120px', marginLeft: '20px'});
    $('.ellipse-dot').animate({fontSize: '20px', margin: '4px 4px 10px 10px'});
    $('.ellipse-dot').css({height: 0, width: 0});
  }, function() {
    $('.ellipse').css({display: 'block'});
    $('.ellipse').animate({top: '521px', width: '120px', marginLeft: 0});
    $('.ellipse-dot').animate({fontSize: '2px', margin: '-2px', width: '4px', height: '4px', width: '4px'});
  });

  function tickThrough() {
    clockID = setInterval(function() {
      currentIndex = (currentIndex + 1) % 4;
      cycleFrontPage(currentIndex);
    }, 1000 * interval)
  }

  $('.dotcontainer').on('click', function() {
    clearInterval(clockID);
    currentIndex = $(this).index();
    cycleFrontPage(currentIndex);
    tickThrough();
  });

  function cycleFrontPage(index) {
    $('.dot').removeClass('active');
    $('#dot' + index).addClass('active');

    var word = $('.things-i-make').html();
    var flag = false;

    switch (index) {
      case 0:
        if (word === 'Websites') return;
        else if (word === 'History') {
          flag = true;
        }
        word = 'Websites'
        break;
      case 1:
        if (word === 'Music') return;
        else if (word === 'History') {
          flag = true;
        }
        word = 'Music'
        break;
      case 2:
        if (word === 'Memories') return;
        else if (word === 'History') {
          flag = true;
        }
        word = 'Memories';
        break;
      case 3:
        if (word === 'History') return;
        word = 'History';
        break;
      default:
        word = 'Websites';
    }

    $('.things-i-make').animate({marginLeft: '40px', opacity: '0'}, 500);
    if (flag || word === 'History'){
      $('#i-make').animate({marginLeft: '40px', opacity: '0'}, 500);
    }
    setTimeout(function() {
      $('.things-i-make').css({marginLeft: 0, marginRight: '40px'}).html(word);
      $('.things-i-make').animate({marginRight: 0, opacity: 1}, 500);
      if (flag) {
        $('#i-make').css({marginLeft: 0, marginRight: '40px'}).html('I Make');
        $('#i-make').animate({marginRight: 0, opacity: 1}, 500);
      } else if (word == 'History') {
        $('#i-make').css({marginLeft: 0, marginRight: '40px'}).html('Let\'s Make');
        $('#i-make').animate({marginRight: 0, opacity: 1}, 500);
      }
    }, 550);
  };
});
