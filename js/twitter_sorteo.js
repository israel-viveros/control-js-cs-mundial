$(document).ready(function(e) {
	var $twitter_sorteo_large = 0;
	/*Monitor flechas*/
	$('.twitter_sorteo .tvsa-double-caret-left').addClass('inactive');
	$('.twitter_sorteo .tvsa-double-caret-left').click(function(e) {
		e.preventDefault();
		$('.twitter_sorteo .wdg_carousa .twitter_sorteo_carousel').animate({
						'scrollLeft': $('.twitter_sorteo .wdg_carousa .twitter_sorteo_carousel').scrollLeft() - 329
					}, 500);
		/*Verifico posición del scroll*/ 
					var large_tot = $(this).parent().parent().parent().parent().siblings('.twitter_sorteo_carousel').children().width();
					var position = $(this).parent().parent().parent().parent().siblings('.twitter_sorteo_carousel').scrollLeft();
					med = position + $(this).parent().parent().parent().parent().siblings('.twitter_sorteo_carousel').width() + 201;
					if(position == 0 || position <= 329)
						{
						$(this).addClass('inactive');
						$(this).parents('.twitter_sorteo').children('.bullets').children().removeClass();
						$(this).parents('.twitter_sorteo').children('.bullets').children().eq(0).addClass('background-color1');
						}
						else
						{
						$(this).removeClass('inactive');
						$(this).parents('.twitter_sorteo').children('.bullets').children().removeClass();
						$(this).parents('.twitter_sorteo').children('.bullets').children().eq(1).addClass('background-color1');
						}  
						$(this).parent().parent().siblings('.wt2right').children().children().removeClass('inactive');
		});
		
		$('.twitter_sorteo .tvsa-double-caret-right').click(function(e) {
			e.preventDefault();
			//alert($large);
			// Reafirmamos el ancho del UL --- Problemas en IE
			/*if ($.browser.msie ){
				$('.twitter_sorteo .twitter_sorteo_carousel ul').attr('style', 'width: '+$twitter_sorteo_large+'px !important');
			}*/
			$('.twitter_sorteo .wdg_carousa .twitter_sorteo_carousel').animate({
						'scrollLeft': $('.twitter_sorteo .wdg_carousa .twitter_sorteo_carousel').scrollLeft() + 329
					}, 500);
			/*Verifico posición del scroll*/ 
				var large_tot = $(this).parent().parent().parent().parent().siblings('.twitter_sorteo_carousel').children().width();
				var position = $(this).parent().parent().parent().parent().siblings('.twitter_sorteo_carousel').scrollLeft();
				med = position + $(this).parent().parent().parent().parent().siblings('.twitter_sorteo_carousel').width() + 329;
					$(this).parent().parent().siblings('.wt2left').children().children().removeClass('inactive');  
				if(med == large_tot || med > large_tot)
					{
					$(this).addClass('inactive');
					$(this).parents('.twitter_sorteo').children('.bullets').children().removeClass();
					$(this).parents('.twitter_sorteo').children('.bullets').children().eq(2).addClass('background-color1');
					}
					else
					{
					$(this).removeClass('inactive');
					$(this).parents('.twitter_sorteo').children('.bullets').children().removeClass();
					$(this).parents('.twitter_sorteo').children('.bullets').children().eq(1).addClass('background-color1');
				}
		
		});
});