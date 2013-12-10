$(document).ready(function(e) {
        var $m = $('.vid_4vids_03 .general'),
        animationDelay = 500;
        var $count = 0;
		
            // Support the click event on arrows
            $('.vid_4vids_03 a.wdg_carousa_left_e').click(function(e) {
                e.preventDefault();
				if( $(window).width() >= 624 && $(window).width() <= 960  ){
					$(this).parents('vid_4vids_03').find('general').animate({
						'scrollLeft': $(this).parents('vid_4vids_03').find('general').scrollLeft() - 300
					}, animationDelay);
				}else
				{
					$(this).parents('.vid_4vids_03').find('.general').animate({
						'scrollLeft': $(this).parents('.vid_4vids_03').find('.general').scrollLeft() - 329
					}, animationDelay);
				}
			});
            $('.vid_4vids_03 a.wdg_carousa_right_e').click(function(e) {
                e.preventDefault();
				if( $(window).width() >= 624 && $(window).width() <= 960  ){
					$(this).parents('.vid_4vids_03').find('.general').animate({
						'scrollLeft': $(this).parents('.vid_4vids_03').find('.general').scrollLeft() + 300
					}, animationDelay);
				}else
				{
					$(this).parents('.vid_4vids_03').find('.general').animate({
                    'scrollLeft': $(this).parents('.vid_4vids_03').find('.general').scrollLeft() + 329
                	}, animationDelay);
				}
            });
		/*Swipe*/
			/*horizontal*/
		$(function() {      
		  $(".vid_4vids_03 .general").swipe( { swipeLeft:swipe1, swipeRight:swipe2, allowPageScroll:"vertical"} );
		  //Swipe handlers.
		  function swipe1(event, direction) {
			if($(window).width() > 624){$v4v4_move = 330;}else{$v4v4_move = 320;}
			$(this).animate({
						'scrollLeft': $(this).scrollLeft() + $v4v4_move
					}, 500);
		  }
		  function swipe2(event, direction) {
			if($(window).width() > 624){$v4v4_move = 330;}else{$v4v4_move = 320;}
				$(this).animate({
						'scrollLeft': $(this).scrollLeft() - $v4v4_move
					}, 500);
		  }
		});
		
		/*Monitoreo scroll*/
	$('.vid_4vids_03 .general').scroll(function() {
		/*Horizontal*/
		var $v43_position = $(this).scrollLeft();
		var $v43_med = $v43_position;
		if($v43_position == 0){
			$(this).siblings('.encabezado').find('.tvsa-double-caret-left').addClass('inactive');
				$(this).parents('.vid_4vids_03').children('.bullets').children().removeClass();
				$(this).parents('.vid_4vids_03').children('.bullets').children().eq(0).addClass('background-color1');
		}
		else{
			$(this).siblings('.encabezado').find('.tvsa-double-caret-left').removeClass('inactive');
			$(this).siblings('.encabezado').find('.tvsa-double-caret-right').removeClass('inactive');
			$(this).parents('.vid_4vids_03').children('.bullets').children().removeClass();
			$(this).parents('.vid_4vids_03').children('.bullets').children().eq(1).addClass('background-color1');
		}
		if($v43_med > 350){
			$(this).siblings('.encabezado').find('.tvsa-double-caret-right').addClass('inactive');
			$(this).parents('.vid_4vids_03').children('.bullets').children().removeClass();
			$(this).parents('.vid_4vids_03').children('.bullets').children().eq(2).addClass('background-color1');
		}
		//console.log('Scroll: '+$v43_position2+' suma: '+$v43_med2+' alt_tot: '+$v43_alt);
	});
	
});

