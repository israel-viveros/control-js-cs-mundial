// JavaScript Document
$(document).ready(function(e) { 
		
		$('.top_ten').each(function(ix, element) {   
			$wt10_elements = $('.top_ten .top_ten_carousel ul li').size();     
		    $wt10_large = $('.top_ten .top_ten_carousel').width(); 
			$wt10_large = $wt10_elements * $wt10_large + (29 * ($wt10_elements - 1));
			//$wt10_large = 620;
			//window.setTimeout("$('.top_ten .top_ten_carousel').children().attr('style', 'width: '+$wt10_large+'px !important');",500);
			$wt10_move = 0;
		}); 
		
		if($(window).width() >624)
			{
				$wt10_large = 620;
				window.setTimeout("$('.top_ten .top_ten_carousel').children().attr('style', 'width: '+$wt10_large+'px !important');",500);
			}
			else
			{
				$wt10_div = $(window).width() + 18;
				$('.top_ten .div_content').css('width',$wt10_div);
				$wt10_large = (4 * $wt10_div) - 18;
				window.setTimeout("$('.top_ten .top_ten_carousel').children().attr('style', 'width: '+$wt10_large+'px !important');",500);
			}
		$(window).resize(function(){
			if ($(window).width() > 624) {
				$wt10_div = 300;
				$('.top_ten .div_content').css('width',$wt10_div);
				$wt10_large = 620;
				$('.top_ten .top_ten_carousel').children().attr('style', 'width: '+$wt10_large+'px !important');
			}
			else
			{
				$wt10_div = $(window).width() + 18;
				$('.top_ten .div_content').css('width',$wt10_div);
				$wt10_large = (4 * $wt10_div) - 18;
				$('.top_ten .top_ten_carousel').children().attr('style', 'width: '+$wt10_large+'px !important');
			}
		});
		/*Monitor flechas*/ 
		$('.top_ten .tvsa-double-caret-left').click(function(e) {
			e.preventDefault();  
		if($wt10_move == 0){}else{$wt10_move = $wt10_move - 1;} 
		$(this).parents('.top_ten').find('.top_ten_carousel').animate({
						'scrollLeft': $(this).parents('.top_ten').find('.top_ten_carousel').scrollLeft() - 329
					}, 500);
			if($wt10_move <= 0)
			{
				$(this).addClass('inactive');
				$(this).parent().parent().siblings().children().children('.tvsa-double-caret-right').removeClass('inactive');
				$(this).parents('.top_ten').children('.bullets').children().removeClass();
				$(this).parents('.top_ten').children('.bullets').children().eq(0).addClass('background-color1');
			} 
			else
			{
				$(this).parents('.top_ten').find('.bullets').children().removeClass();
				$(this).parents('.top_ten').find('.bullets').children().eq(1).addClass('background-color1');
			}    
			$(this).parent().parent().siblings('.wt2right').children().children().css('color', '#000000');
		});


		$('.top_ten .tvsa-double-caret-right').click(function(e) {
			e.preventDefault();
		/*Verifico posición del scroll*/ 
		if (navigator.appVersion.indexOf("MSIE 7.")!=-1 || navigator.appVersion.indexOf("MSIE 8.")!=-1){
			var $wt10_large = 625;
			$('.top_ten .top_ten_carousel').children().attr('style', 'width: '+$wt10_large+'px !important');
		}

		$(this).parents('.top_ten').find('.top_ten_carousel').animate({
						'scrollLeft': $(this).parents('.top_ten').find('.top_ten_carousel').scrollLeft() + 329
					}, 500);
		if($wt10_move == 1){}else{$wt10_move = $wt10_move + 1;}  
					if($wt10_move == 1)
						{
						$(this).addClass('inactive');
						$(this).parents('.top_ten').find('.tvsa-double-caret-left').removeClass('inactive');
						$(this).parents('.top_ten').find('.bullets').children().removeClass();
						}
						else
						{
						$(this).removeClass('inactive');
						$(this).parents('.top_ten').find('.bullets').children().removeClass();
						$(this).parents('.top_ten').find('.bullets').children().eq(1).addClass('background-color1');
						}
		
		});


		/*Swipe*/ 
		$(function() {      
		  $(".top_ten .wdg_carousa .top_ten_carousel").swipe( { swipeLeft:swipe1, swipeRight:swipe2, allowPageScroll:"auto"} );
		  //Swipe handlers.
		  function swipe1(event, direction) {
			if($wt10_move == 3){}else{$wt10_move = $wt10_move + 1;}
			$(this).parents('.top_ten').find('.bullets').children().removeClass();
			$(this).parents('.top_ten').find('.bullets').children().eq($wt10_move).addClass('background-color1'); 
			$('.top_ten .wdg_carousa .top_ten_carousel').animate({
						'scrollLeft': $('.top_ten .wdg_carousa .top_ten_carousel').scrollLeft() + $wt10_div
					}, 500);
		  }
		  function swipe2(event, direction) {
			  if($wt10_move == 0){}else{$wt10_move = $wt10_move - 1;}
			  $(this).parents('.top_ten').find('.bullets').children().removeClass();
			  $(this).parents('.top_ten').find('.bullets').children().eq($wt10_move).addClass('background-color1'); 
			$('.top_ten .wdg_carousa .top_ten_carousel').animate({
						'scrollLeft': $('.top_ten .wdg_carousa .top_ten_carousel').scrollLeft() - $wt10_div
					}, 500);
		  }
		});
		/*$('.top_ten .wdg_carousa .top_ten_carousel').bind('swipeleft',function(){
				$('.top_ten .wdg_carousa .top_ten_carousel').animate({
						'scrollLeft': $('.top_ten .wdg_carousa .top_ten_carousel').scrollLeft() + 329
				}, 500); 
		}); 

		$('.top_ten .wdg_carousa .top_ten_carousel').bind('swiperight',function(){
				$('.top_ten .wdg_carousa .top_ten_carousel').animate({
						'scrollLeft': $('.top_ten .wdg_carousa .top_ten_carousel').scrollLeft() - 329
				}, 500);
		}); */

		/*Monitoreo scroll*/
		$('.top_ten .top_ten_carousel').scroll(function() {
			var $wt10_position = $(this).scrollLeft();
			var $wt10_med = $wt10_position;
		});

		$('.top_ten').bind("touchmove",function(event){
    		event.preventDefault();
    	});    
});  