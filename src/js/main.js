    $('.banner').slick({
      dots: true,
      infinite: true,
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplay: false,
      autoplaySpeed: 2000,
      arrows: false
    });


    $(".section").hover(function () {
    	$(this).find(".image").toggleClass("hover");
    });


    /*******************************************/
     

    $('.testimonials_slider').slick({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 3000,
	  speed: 1000,
      fade: true,
	  cssEase: 'linear',
      arrows: true
    });



    $(".click_to_read").on('click', function () {
		//$(window).trigger('resize');
        $(".section_more_details").hide();
		if($(".sectionNav").hasClass('section-nav')){
			$('.section-nav').slick('unslick');
			$('.section-for').slick('unslick');
		}
        $(".sectionNav").removeClass('section-nav');
        var get_id = $(this).attr("id");
        $("."+get_id).find('.sectionNav').addClass('section-nav');		
        $("."+get_id).show();
        $(".services_open_container").show();
		$('html, body').animate({
        scrollTop: $(".services_open_container").offset().top
    }, 1000);
		
		$('.section-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.section-nav',
      autoplay: false,
      autoplaySpeed: 3000,
      cssEase: 'ease',
      easing: 'linear'
    });
	
    $('.section-nav').slick({
      slidesToShow: 8,
      slidesToScroll: 1,
      asNavFor: '.section-for',
      dots: false,
      focusOnSelect: true,
      autoplay: false
    });
		
    });

    /****************************************************How to Section*/

    var $animation_elements = $('.how_to_icon1, .how_to_icon2, .how_to_icon3, .how_to_icon4, .step_copy, .banner_book_now_section');
    var $window = $(window);

    function check_if_in_view() {
      var window_height = $window.height();
      var window_top_position = $window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);

      $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
          $element.addClass('animation');
        } else {
        //   $element.removeClass('animation');
        }
      });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
/*********************************************************************************Form*/
$(".join_us_form_open").on("click", function () {
    $(".overlay").fadeIn(1000);
	$(".sign_in_wrapper").addClass('hide').removeClass('show');
	$(".sign_in_wrapper.sign_up_form").removeClass('hide').addClass('show');
});
$(".login_form_open").on("click", function () {
    $(".overlay").fadeIn(1000);
	$(".sign_in_wrapper").addClass('hide').removeClass('show');
	$(".sign_in_wrapper.sign_in_form").removeClass('hide').addClass('show');
});
$(".book_now_btn").on("click", function () {
    $(".overlay").fadeIn(1000);
	$(".sign_in_wrapper").addClass('hide').removeClass('show');
	$(".sign_in_wrapper.book_now").removeClass('hide').addClass('show');
});
$(".close_form, .overlay").on("click", function () {
    $(".overlay").fadeOut(1000);
	$(".sign_in_wrapper").removeClass('show');
	$(".sign_in_wrapper").addClass('hide');
});
