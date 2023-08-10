/* ========================================================================= */
/*	Preloader
/* ========================================================================= */

jQuery(window).load(function(){

	$("#preloader").fadeOut("slow");

});


$(document).ready(function(){

	/* ========================================================================= */
	/*	Menu item highlighting
	/* ========================================================================= */

	jQuery('#nav').singlePageNav({
		offset: jQuery('#nav').outerHeight(),
		filter: ':not(.external)',
		speed: 1200,
		currentClass: 'current',
		easing: 'easeInOutExpo',
		updateHash: true,
		beforeStart: function() {
			console.log('begin scrolling');
		},
		onComplete: function() {
			console.log('done scrolling');
		}
	});
	
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#navigation").css("background-color","#F2A0C6");
        } else {
            $("#navigation").css("background-color","rgba(16, 22, 54, 0.2)");
        }
    });
	
	/* ========================================================================= */
	/*	Fix Slider Height
	/* ========================================================================= */	

	var slideHeight = $(window).height();
	
	$('#slider, .carousel.slide, .carousel-inner, .carousel-inner .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#slider, .carousel.slide, .carousel-inner, .carousel-inner .item').css('height',slideHeight);
	});
	
	
	/* ========================================================================= */
	/*	Portfolio Filtering
	/* ========================================================================= */	
	
	
    // portfolio filtering

    $("#project1").mixItUp({
        selectors: {
            target: '.work-item', // The class of the items inside Gallery 1
            filter: '.filter-gallery1' // The class for the filter buttons of Gallery 1
        }
    });

    $("#project2").mixItUp({
        selectors: {
            target: '.work-item', // The class of the items inside Gallery 2
            filter: '.filter-gallery2' // The class for the filter buttons of Gallery 2
        }
    });

    $(".fancybox").fancybox({
        padding: 0,
        openEffect: 'elastic',
        openSpeed: 650,
        closeEffect: 'elastic',
        closeSpeed: 550,
        closeClick: true,
    });

    $(function() {
        // Utilizamos el método load de jQuery para cargar el contenido de "galeria_imagenes.html" en el div con id "includedContent"
        $("#includedContent").load("galeria1.html");
    });
	
	
	
	/* ========================================================================= */
	/*	Parallax
	/* ========================================================================= */	
	
	$('#facts').parallax("50%", 0.3);
	
	/* ========================================================================= */
	/*	Timer count
	/* ========================================================================= */

	"use strict";
    $(".number-counters").appear(function () {
        $(".number-counters [data-to]").each(function () {
            var e = $(this).attr("data-to");
            $(this).delay(6e3).countTo({
                from: 50,
                to: e,
                speed: 3e3,
                refreshInterval: 50
            })
        })
    });
	
	/* ========================================================================= */
	/*	Back to Top
	/* ========================================================================= */
	
	
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#back-top").fadeIn(200)
        } else {
            $("#back-top").fadeOut(200)
        }
    });
    $("#back-top").click(function () {
        $("html, body").stop().animate({
            scrollTop: 0
        }, 1500, "easeInOutExpo")
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#back-top1").fadeIn(200)
        } else {
            $("#back-top1").fadeOut(200)
        }
    });
    $("#back-top1").click(function () {
        $("html, body").stop().animate({
            scrollTop: 0
        }, 1500, "easeInOutExpo")
    });
	
});
//Slider
const slides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;
let intervalId;

function showSlide(slideIndex) {
  if (slideIndex !== currentSlide) { // Evitar que se active la animación si es el slide actual
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'fadeIn');
      if (index === slideIndex) {
        slide.classList.add('active', 'fadeIn');
      }
    });
    currentSlide = slideIndex;
  }
}

function nextSlide() {
  const nextSlideIndex = (currentSlide + 1) % slides.length;
  showSlide(nextSlideIndex);
}

function prevSlide() {
  const prevSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prevSlideIndex);
}

const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

prevButton.addEventListener('click', () => {
  clearInterval(intervalId);
  prevSlide();
  intervalId = setInterval(nextSlide, 5000);
});

nextButton.addEventListener('click', () => {
  clearInterval(intervalId);
  nextSlide();
  intervalId = setInterval(nextSlide, 5000);
});

// Show the first slide initially
showSlide(currentSlide);

// Auto-rotate the carousel every 9 seconds
intervalId = setInterval(nextSlide, 9000);


