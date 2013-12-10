 $(document).ready(function() {	
     /*if(navigator.appVersion.indexOf("MSIE 7.")!=-1){alert(7);}*/

 	$('.videos_relacionados .left2').click(function(e) {
        e.preventDefault();
		if($(window).width() > 960){var $bg5_move = 972;}
		/*if ($.browser.msie && parseInt($.browser.version, 10) <= 9){var $bg5_move = 995;}*/
		if (navigator.appVersion.indexOf("MSIE 9.")!=-1 || navigator.appVersion.indexOf("MSIE 8.")!=-1 || navigator.appVersion.indexOf("MSIE 7.")!=-1){var $bg5_move = 995;}
		
		$(this).parent().parent().parent().siblings('.carrusel').animate({
                    'scrollLeft': $(this).parent().parent().parent().siblings('.carrusel').scrollLeft() - $bg5_move
                }, 500);		
	});
	$('.videos_relacionados .right2').click(function(e) {
        e.preventDefault();
		if($(window).width() > 960){var $bg5_move = 972;}
		
		if (navigator.appVersion.indexOf("MSIE 9.")!=-1 || navigator.appVersion.indexOf("MSIE 8.")!=-1 || navigator.appVersion.indexOf("MSIE 7.")!=-1){var $bg5_move = 995;}
		$(this).parent().parent().parent().siblings('.carrusel').animate({
                    'scrollLeft': $(this).parent().parent().parent().siblings('.carrusel').scrollLeft() + $bg5_move
                }, 500);		
	});
	
	if($(window).width() >= 624){$b6p9_move = 648;}else{$b6p9_move = 325;}
	 	 $('.videos_relacionados .carrusel').on('swiperight',function(e) {
	        e.preventDefault();
	  
	        $(this).animate({
	            'scrollLeft': $(this).scrollLeft() - $b6p9_move
	        });    
	    });

	    $('.videos_relacionados .carrusel').on('swipeleft',function(e) {
	        e.preventDefault();
	        
	       $(this).animate({
	            'scrollLeft': $(this).scrollLeft() + $b6p9_move
	        });
	    });
	
    var lis = $('.videos_relacionados .type1a:first .carrusel ul li');
    var margin = 0;
    var ulWidth = 0;
    for(var i=0; i<lis.length; i++){
        margin += parseInt($(lis[i]).css("margin-left"));
        ulWidth += $(lis[i]).width();
    }
	$(window).load(function(){
		if($(window).width() < 624){var extra = 12;}else{var extra = 0;}
		ancho = ulWidth + margin + extra;
		$(".videos_relacionados .type1a .carrusel ul").width(ancho);
		// Sacamos el ancho total del UL del carrusel
		anchoTotalUL = $(".videos_relacionados .type1a .carrusel ul").width(); // 100%
	});

	// sacamos cuantas imagenes
	//var totalImagenes = $(".videos_relacionados .type1a .carrusel ul").length;
	
	// Sacamos el ancho total del UL del carrusel
	var anchoTotalUL = $(".videos_relacionados .type1a .carrusel ul").width(); // 100%
	
	
	var bulletSelected;
	var scrollLeft;
	
	if (navigator.appVersion.indexOf("MSIE 7.")!=-1){
		var anchoVentna = document.body.offsetWidth;
		//alert($.width());
		//alert(document.body.offsetWidth);
	}
	else{
		var anchoVentna =  $(window).width();
	}
	
	
	$('.videos_relacionados .type1a .carrusel').scroll(function(e){
		var $widthT = $(this).scrollLeft() + $(this).width();
		$(this).children('ul').width();
		if($(this).scrollLeft()==0){
			$(this).siblings('.title').children('.flechas').children('.izq').children().children('i').addClass('arrow_inactive');
			$(this).siblings('.title').children('.flechas').children('.izq').children().children('i').removeClass('arrow_active');	
		}
		else{
			$(this).siblings('.title').children('.flechas').children('.izq').children().children('i').removeClass('arrow_inactive');
			$(this).siblings('.title').children('.flechas').children('.izq').children().children('i').addClass('arrow_active');	
			//$('.videos_relacionados .carouselArrowLeft i').removeClass('arrow_inactive');
			//$('.videos_relacionados .carouselArrowLeft i').addClass('arrow_active');	
		}
		if($widthT==$('.videos_relacionados .type1a .carrusel ul').width()){
			$(this).siblings('.title').children('.flechas').children('.der').children().children('i').addClass('arrow_inactive');
			$(this).siblings('.title').children('.flechas').children('.der').children().children('i').removeClass('arrow_active');	
			//$('.videos_relacionados .carouselArrowRight i').addClass('arrow_inactive');
			//$('.videos_relacionados .carouselArrowRight i').removeClass('arrow_active');	
		}
		else{
			$(this).siblings('.title').children('.flechas').children('.der').children().children('i').removeClass('arrow_inactive');
			$(this).siblings('.title').children('.flechas').children('.der').children().children('i').addClass('arrow_active');	
			//$('.videos_relacionados .carouselArrowRight i').removeClass('arrow_inactive');
			//$('.videos_relacionados .carouselArrowRight i').addClass('arrow_active');	
		}

		if ($(window).width()<624){
			scrollLeft = $(this).scrollLeft()  + (anchoVentna/2.5) ;
			var porcentaje =  ( scrollLeft * 100) / anchoTotalUL; 
			if( scrollLeft <= 320)
				bulletSelected = 1;
			else if( scrollLeft >= 321 && scrollLeft <= 630)
				bulletSelected = 2;
			else if( scrollLeft >= 630 && scrollLeft <= 940)
				bulletSelected = 3;
			else if( scrollLeft >= 940 && scrollLeft <= 1250)
				bulletSelected = 4;
			else if( scrollLeft >= 1250 && scrollLeft <= 1560)
				bulletSelected = 5;
			else 
				bulletSelected = 6;
			$(this).parents('.type1a').siblings('.bullets').find('li').removeClass('background-color1');
			
			$(this).parents('.type1a').siblings('.bullets').find('li:nth-child('+bulletSelected+')').addClass('background-color1');
		}else{
			scrollLeft = $(this).scrollLeft()  + (anchoVentna/2.5) ;
			var porcentaje =  ( scrollLeft * 100) / anchoTotalUL; 
			if( scrollLeft <= 520)
				bulletSelected = 1;
			else if( scrollLeft >= 520 && scrollLeft <= 980)
				bulletSelected = 2;
			else 
				bulletSelected = 3;
			$(this).parents('.type1a').siblings('.bullets').find('li').removeClass('background-color1');
			
			$(this).parents('.type1a').siblings('.bullets').find('li:nth-child('+bulletSelected+')').addClass('background-color1');
		}
    });

});