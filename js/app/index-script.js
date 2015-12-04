/*
index-script.js v1.0
Author: Vicktor Sichevoy
(c) 2012-2015 IT DEV GROUP
http://it-devgroup.com
*/
//scroll disable for modal
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
e = e || window.event;
if (e.preventDefault)
   e.preventDefault();
e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
 if (keys[e.keyCode]) {
     preventDefault(e);
     return false;
 }
}

function disableScroll() {
if (window.addEventListener)
   window.addEventListener('DOMMouseScroll', preventDefault, false);
window.onwheel = preventDefault; 
window.onmousewheel = document.onmousewheel = preventDefault;
window.ontouchmove  = preventDefault;
document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
 if (window.removeEventListener)
     window.removeEventListener('DOMMouseScroll', preventDefault, false);
 window.onmousewheel = document.onmousewheel = null; 
 window.onwheel = null; 
 window.ontouchmove = null;  
 document.onkeydown = null;  
}

function mainSlider(){
	var sliderObj = $('.js_main-slider');
	var botMenu = $('#main-menu')
	var oneSlide = sliderObj.find('.slick-slide');
	oneSlide.height($(window).height() - botMenu.outerHeight())
	oneSlide.each(function(){
		var thisImg = $(this).find("img");
		thisImg.hide();
		$(this).css({
			'background-image':'url('+thisImg.attr('src')+')'
		});
		// setTimeout(function(){
		// 	var tableSlide = $(this).find('.slide-content');
		// 	tableSlide.width(oneSlide.width());
		// 	tableSlide.height($(window).height() - botMenu.outerHeight());
		// }, 500);
	});
	setTimeout(function(){
		var tableSlide = $(this).find('.slide-content');
		tableSlide.width(oneSlide.width());
		if($(window).width() <= 980 || $(window).height() <= 600){
			oneSlide.height($(window).height());
			tableSlide.height($(window).height());
			$('.main-menu > li').addClass('mob-subs');
		}
		else{
			tableSlide.height($(window).height() - botMenu.outerHeight());
			$('.main-menu > li').removeClass('mob-subs');
		}
	}, 500);
}
function mainMenu(){
	var menuObj = $('#main-menu');
	var chAmount = menuObj.find('>li').length;
	menuObj.find('>li').each(function(){
		var thisImg = $(this).find("img");
		thisImg.hide();
		var widthVal = 100 / chAmount;
		$(this).css({
			'width': ''+widthVal+'%',
			'background-image':'url('+thisImg.attr('src')+')'
		})
		var subMenu = $(this).find('.sub-menu');
		var subAmount = subMenu.find('>li').length;
		subMenu.find('>li').each(function(){
			var widthVal = 100 / subAmount;
			$(this).css({
				'width': ''+widthVal+'%',
			})
		});
		if(subMenu.find('>li').length >= 6){
			subMenu.addClass('large-menu');
		}
	});

	menuObj.find('li').on('mouseover', function(){
		$('.sub-menu').removeClass('active');
		$(this).find('.sub-menu').addClass('active');
		$('.inner-text').removeClass('active');
		$(this).find('.inner-text').addClass('active');
	});
	// menuObj.find('li').on('mouseout', function(){
	// 	$(this).find('.sub-menu').removeClass('active');
	// });
	$('body').on('click', '.js_main-slider', function(){
		$('.sub-menu').removeClass('active');
		$('.inner-text').removeClass('active');
	});
}

function modalWindow(){
	var tElem = $('.js_dialog')
	tElem.each(function(){
		tWidht = $(this).outerWidth();
	    tHeight = $(this).outerHeight();
	    winWidth = $(window).width();
	    winHeight = $(window).height();
		$(this).css({
			'left': (winWidth/2)  - (tWidht/2),
			'top' : (winHeight/2) - (tHeight/2)
		});
	});

}


$(document).ready(function(){
	$('.js_main-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		draggable: false,
		//autoplay: true,
		//autoplaySpeed: 6000,
		//speed: 700,
	});
	mainSlider();
	mainMenu();
	modalWindow();

	$("#mob-menu").mmenu({});

	$('body').on('click', '.main-menu', function(){
		var body = $('html, body');
		body.animate({scrollTop:0}, '500');
	});

	// Link to open the dialog
	$('.js_trigger-read' ).click(function( event ) {
		$('.js_modal-read').fadeIn();
		$('.dialog-overlay').fadeIn();
		event.preventDefault();
	});

	$('.js_close').on('click', function(){
		$(this).closest('.dialog-wrap').fadeOut();
		$('.dialog-overlay').fadeOut();
	});

	$('body').on('click', '.dialog-overlay', function(event){
		$('.js_dialog').fadeOut();
		$(this).fadeOut();
		event.preventDefault();
	});

});//end document ready


$(window).resize(function(){
	mainSlider();
	//mainMenu();
});


$(window).scroll(function(){
	
});


$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});