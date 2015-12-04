/*
main.js v1.0
Author: Vicktor Sichevoy
(c) 2012-2015 IT DEV GROUP
http://it-devgroup.com
*/

function menuPlg(){
	menu = $('#menu-item');
	menuPoint = menu.find('>li');
	menuPoint.each(function(i){
		$(this).attr('data-id', i+1);
	});
	submenu = menuPoint.find('ul');
	submenu.each(function(){
		parentId = $(this).closest('li').attr("data-id")
		$(this).attr('data-sub', parentId);
		obj = $(this).clone();
		$(this).remove();
		obj.appendTo($('.aside-panel')).addClass('sub-menu');;
	})

	$('#menu-item').on('click', 'a[href="#"]', function(e){
		e.preventDefault();
		var elemId = $(this).closest('li').attr('data-id');
		$('#menu-item').addClass('hidden-menu');
		subs = $('.aside-panel').find('ul');
		console.log(subs)
		subs.each(function(){
			if($(this).attr('data-sub') == elemId){
				$(this).addClass('opened');
			}
		});
	});
	$('.sub-menu').on('click', '.back-trigger', function(){
		$('#menu-item').removeClass('hidden-menu');
		$(this).closest('ul').removeClass('opened');
	});
	
}



function wrapperHeight(){
	//for fixed in bottom footer
	$('.wrapper').css({
		'min-height': $(window).outerHeight()
	});
	$('.aside-panel').css({
		'min-height': $(window).outerHeight()
	});
};

function getSlide(){
	var active = $('.js_get-slide').find('.slick-active');
	var activeImg = active.find('img');
	$('.js_get-slide').addClass('parall-bg');
	$('.js_get-slide').css({
		'background-image': 'url('+activeImg.attr('src')+')'
	})

	var gSlide = $('.js_slide-bg').find('.slick-slide');
	gSlide.each(function(){
		thisImg = $(this).find('img');
		thisImg.hide();
		$(this).css({
			'background-image': 'url('+thisImg.attr('src')+')'
		})
		thisHeight = $(this).outerHeight();
		$(this).find('.table').height(thisHeight);
	});
}

function getBox(){
	var gblock = $('.js_chose-section').find('li');
	gblock.each(function(){
		thisImg = $(this).find('img');
		thisImg.hide();
		$(this).find('>div').css({
			'background-image': 'url('+thisImg.attr('src')+')'
		})
		thisHeight = $(this).outerHeight();
		$(this).find('.table').height(thisHeight);
	});
}

function takeImage(){
	var el = $('.js_take-img')
	el.each(function(){
		thisImg = $(this).find('img');
		thisImg.hide();
		$(this).css({
			'background-image': 'url('+thisImg.attr('src')+')'
		})
	});
}

function fullPageSlider(){
	var elem = $('.js_full-slider');
	slide = elem.find('.slick-slide');
	slide.each(function(){
		var imgItem = $(this).find('img');
		$(this).height($(window).height());
		$(this).css({
			'background-image': 'url('+imgItem.attr('src')+')'
		});
		imgItem.hide();
	});
	$('.text-wrapper').find('.table').height($(window).height());
}

function errorPage(){
	$('.error-wrap').find('.table').height($(window).outerHeight());
}

function aboutSlider(){
	var el = $('.js_simple-slider')
	slide = el.find('.slick-slide')
	slide.each(function(){
		$(this).find('.img-block').width($(this).width())
	});
}
function docWidth(){
	$('body, html').css('overflow', 'hidden');
    var screenWidth1 = $(window).width();
    $('body, html').css('overflow', 'visible');
    var screenWidth2 = $(window).width();
	console.log(screenWidth1, screenWidth2);
}

function mobAside(){$('.mob-aside').height($(window).outerHeight())}

$(document).ready(function(){
	menuPlg();
	wrapperHeight();
	setTimeout(function(){
		wrapperHeight();
	}, 100);
	mobAside();
	$("#mob-menu").mmenu({
		navbar: {
			title:"<img src='../img/logo.svg' alt='logo-img' />",
		},
		dragOpen: {
			open: true,
			maxStartPos: 40,
			threshold: 100,
			pageNode: $('.mob-aside'),
		}
    });
    $('#mm-1 a.mm-title').attr('href', '/');
	$('.js_wall-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		fade: true,
		draggable: true,
		autoplay: true,
		autoplaySpeed: 4000,
	});
	$('.js_country-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		draggable: true,
		// autoplay: true,
		// autoplaySpeed: 4000,
		responsive: [
			{
				breakpoint: 1250,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 980,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});
	getSlide();
	$('.js_wall-slider').on('beforeChange', function(event){
		getSlide();
	});
	getBox();
	takeImage();
	$('.js_full-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		fade: false,
		draggable: false,
	});
	fullPageSlider();
	$('.js_simple-slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		arrows: false,
		dots: true,
		fade: false,
		draggable: true,
		responsive: [
			{
				breakpoint: 1250,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 980,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});
	aboutSlider();
	errorPage();

});//end document ready


$(window).resize(function(){
	wrapperHeight();
	fullPageSlider();
	errorPage();
	aboutSlider();
	mobAside();
	getBox();
});

$(window).scroll(function(){
	
});


$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});