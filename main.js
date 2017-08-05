var menuHidden = true;

$(document).ready(function() {

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
      }, 450);
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

  $('.dotcontainer').on('click', function() {
    var index = $(this).index() + 1;

    $('.dot').removeClass('active');
    $('#dot' + index).addClass('active');

    var newWord;

    switch (index) {
      case 1:
        newWord = 'Websites';
        break;
      case 2:
        newWord = 'Music';
        break;
      case 3:
        newWord = 'Journeys';
        break;
      case 4:
        newWord = 'Memories';
        break;
      case 5:
        newWord = 'Friends';
        break;
      default:
        newWord = 'Wumbo';
    }

    $('.imake').animate({marginLeft: '40px', opacity: '0'}, 500);
    setTimeout(function() {
      $('.imake').css({marginLeft: 0, marginRight: '40px'}).html(newWord);
      $('.imake').animate({marginRight: 0, opacity: 1});
    }, 550);
  });
});
