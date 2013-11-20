
/**
 * 
 *         @todo add hash to a pages' URL in order to load a specific image upon pageload (so that one can share links)
 *         the structure would need to be '%component% %album% %image%'
 *         %component% is the n-th occurence of the component within a page - must be a unique ID
 *         %album% the number of the album
 *         %image% the number of the image
 *         
 *         @todo autoplay
 *         @todo expand links
 *         @todo swipe implementation based on: @see http://www.awwwards.com/demo/touchSwipe-gallery-demo.html
 *         @todo device tests
 *			ADD dostats 	|	Viveros
 *			ADD preventDeafult right and left
 * 			19112013
 */

var IMG_WIDTH = 465;
var currentImg=0;
var maxImages=2;
var speed=500;
var imgs;


/**
 * all gallery related behavior
 */
function img_galry_02_init() {
	// this function is fired upon resize, so we need to unbind each listener
	// in order not to have multiple listeners per dom element
	$("div.img_galry_02").each(function(){
		
		/** general configuration - patterns to be replaced in file names:
	    var rendition;
	    rendition['thumb'] = '64.48';
	    rendition['image'] = '624.450';
	    rendition['album'] = '137.105';
	    **/
	
		var rendition = new Array();
	    rendition['thumb'] = 'thumb';
	    rendition['image'] = 'image';
	    rendition['album'] = 'album';
	
	    
	    $parent = $(this);
	    var carousel = $parent;
	    $parent.attr({'data-album':0,'data-image':0});
	    var data = jQuery.parseJSON($parent.find('span.data').text());
	    
	    $parent.find('span.loading').hide();
	    
	    // if we are in mobile: make sure only 3 thumbs are visible onload
	    if ($(window).width() < 624) {
	    	$parent.find('div.carrusel1 li:gt(9)').hide();
	        $parent.find('div.img_galry_02_verMas a').addClass('hidden');
	    } else {
	    	$parent.find('div.carrusel1 li:gt(2)').show().removeClass('hidden');
	    }
	    
	    // Ver más
	    $parent.find('div.img_galry_02_verMas a').unbind();
	    $parent.find('div.img_galry_02_verMas a').click(function(){
	        $parent.find('div.carrusel1 li:gt(2)').toggle();
	        if ($(this).hasClass('hidden')) {
	            $(this).text('Ocultar').removeClass('hidden');
	        } else {
	            $(this).text('Ver más').addClass('hidden')
	        }
	        return false;
	    });
	    
	    // click event (only in tablet and desktop)
	    if ($(window).width() > 623) {
	    	$parent.find('ul.ulcarrusel').unbind();
	    	
	    	var swipeOptions={
	    		triggerOnTouchEnd : true,	
	    		swipeStatus : swipeStatus,
	    		allowPageScroll:"vertical",
	    		threshold:75
	    	}
	    	//$parent.find("div.carrusel1 ul.ulcarrusel").swipe(swipeOptions);
	    	//$parent.find("div.carrusel2 ul.ulcarrusel").swipe(swipeOptions);
	    	
	        $parent.find('ul.ulcarrusel').on('click', 'a', function(e){
	            // general
	            var pos = $(this).data('pos');
				var link_img = $(this).attr('href');
				$('.img_galry_02 .expand').attr('href',link_img);
	            if ($(this).hasClass('album')) {
	                // album
	                $parent.find('a.album').removeClass('active');
	                $(this).addClass('active');
	                $parent.find('span.loading').fadeIn(200);
	                
	                var firstimage = data[pos].images[0].path,
	                desc = data[pos].images[0].description;
	                
	                //console.log(firstimage);
	                //console.log(desc);
	                
	                $parent.find("img.mainimage:eq(0)").on('load', function() {
	                    //console.log($parent.find('div.image-container div.overlay > p:eq(0)').text());
	                    
	                	$parent.find('div.image-container div.overlay > p:eq(0)').text(desc);
	                    $parent.attr('data-album', pos).find('span.loading').hide();
	                    // replace carousel1 with the albums' images
	                    var html = '', src, desc;
	                    $parent.find('p.imageDescription').text(desc);
	                    for (var i=0;i<data[pos].images.length;i++) {
	                        var active = '';
	                        if (i===0) {
	                            active=' active';
	                        }

	                        // add the real link to the final page
	                        html += '<li>'+
	                                    '<a href="' + data[pos].images[i].expandurl + '" class="image' + active + '" data-pos="' + i + '">'+
	                                        '<img src="' + data[pos].images[i].path + '" width="64" height="48" alt="" class="" />'+
	                                        '<span class="border"></span>'+
	                                        '<span class="icon"><i class="tvsa-camera"></i></span>'+
	                                        '<span class="title">' + data[pos].images[i].description + '</span>'+
	                                    '</a>'+
	                                '</li>';
	                    }
	                    $parent.find('div.carrusel1 ul.ulcarrusel').html(html);
	                    $parent.find('p.imageDescription').text(data[pos].images[0].description); // update desc to first image
	                    $parent.find('a.expand').attr({
	                    	'href': data[pos].images[0].expandurl,
	                    	'title' : data[pos].images[0].description
	                    }); // update expand link to detail URL
	                }).attr("src", firstimage).each(function() {
	                    if(this.complete) {
	                        $(this).load();
	                    }
	                });
	            } else {
	                // image
	                $parent.find('a.image').removeClass('active');
	                $(this).addClass('active');
	                 /* Developer : Israel Viveros */

	                var urlVarEnabled = photogalleries.vars();
				    if (!urlVarEnabled['nostats']) {
				        photogalleries.dostat();
				    }
				    /* Developer : Israel Viveros */
	                var src = $(this).find('img:eq(0)').attr('src').replace(rendition['thumb'],rendition['image']),
	                desc = $(this).find('span.title:eq(0)').text();
	                // making sure an image is loaded before showing it
	                $parent.find('span.loading').fadeIn(200);
	                $parent.find("img.mainimage:eq(0)").on('load', function() {
	                    $parent.find('div.image-container div.overlay > p:eq(0)').text(desc);
	                    $parent.find('a.expand').attr({
	                    	'href': $(this).attr('href'),
	                    	'title' : desc
	                    }); // update expand link to detail URL
	                    $parent.attr('data-image', pos).find('span.loading').hide();
	                }).attr("src", src).each(function() {
	                    if(this.complete) {
	                        $(this).load();
	                    }
	                });
	            }
	            return false;
	        });
	        
			/*BEGIN:Evento touch*/
			 $parent.find('ul.ulcarrusel').on('touchstart', 'a', function(e){
				 event.preventDefault();
	            // general
	            var pos = $(this).data('pos');
				var link_img = $(this).attr('href');
				$('.img_galry_02 .expand').attr('href',link_img);
	            if ($(this).hasClass('album')) {
	                // album
	                $parent.find('a.album').removeClass('active');
	                $(this).addClass('active');
	                $parent.find('span.loading').fadeIn(200);
	                
	                var firstimage = data[pos].images[0].path,
	                desc = data[pos].images[0].description;
	                
	                //console.log(firstimage);
	                //console.log(desc);
	                
	                $parent.find("img.mainimage:eq(0)").on('load', function() {
	                    //console.log($parent.find('div.image-container div.overlay > p:eq(0)').text());
	                    
	                	$parent.find('div.image-container div.overlay > p:eq(0)').text(desc);
	                    $parent.attr('data-album', pos).find('span.loading').hide();
	                    // replace carousel1 with the albums' images
	                    var html = '', src, desc;
	                    $parent.find('p.imageDescription').text(desc);
	                    for (var i=0;i<data[pos].images.length;i++) {
	                        var active = '';
	                        if (i===0) {
	                            active=' active';
	                        }

	                        // add the real link to the final page
	                        html += '<li>'+
	                                    '<a href="' + data[pos].images[i].expandurl + '" class="image' + active + '" data-pos="' + i + '">'+
	                                        '<img src="' + data[pos].images[i].path + '" width="64" height="48" alt="" class="" />'+
	                                        '<span class="border"></span>'+
	                                        '<span class="icon"><i class="tvsa-camera"></i></span>'+
	                                        '<span class="title">' + data[pos].images[i].description + '</span>'+
	                                    '</a>'+
	                                '</li>';
	                    }
	                    $parent.find('div.carrusel1 ul.ulcarrusel').html(html);
	                    $parent.find('p.imageDescription').text(data[pos].images[0].description); // update desc to first image
	                    $parent.find('a.expand').attr({
	                    	'href': data[pos].images[0].expandurl,
	                    	'title' : data[pos].images[0].description
	                    }); // update expand link to detail URL
	                }).attr("src", firstimage).each(function() {
	                    if(this.complete) {
	                        $(this).load();
	                    }
	                });
	            } else {
	                // image
	                $parent.find('a.image').removeClass('active');
	                $(this).addClass('active');
	                if(photogalleries.Enabledostat===true){
	                	photogalleries.dostat();	
	                }
	                var src = $(this).find('img:eq(0)').attr('src').replace(rendition['thumb'],rendition['image']),
	                desc = $(this).find('span.title:eq(0)').text();
	                // making sure an image is loaded before showing it
	                $parent.find('span.loading').fadeIn(200);
	                $parent.find("img.mainimage:eq(0)").on('load', function() {
	                    $parent.find('div.image-container div.overlay > p:eq(0)').text(desc);
	                    $parent.find('a.expand').attr({
	                    	'href': $(this).attr('href'),
	                    	'title' : desc
	                    }); // update expand link to detail URL
	                    $parent.attr('data-image', pos).find('span.loading').hide();
	                }).attr("src", src).each(function() {
	                    if(this.complete) {
	                        $(this).load();
	                    }
	                });
	            }
	            return false;
	        });
			/*END:Evento touch*/
			
	        // left-right arrows
	        var carousel = $(this).parents('div:eq(1)').find('ul.ulcarrusel');
	        $parent.find("a.right").click(function(e){
	        	e.preventDefault();
				$('.carruselcontainer').animate({
						'scrollLeft': $('.carruselcontainer').scrollLeft() + 785
					}, 500);
	        });
	        $parent.find("a.left").click(function(e){	        	
	        	e.preventDefault();
	        	$('.carruselcontainer').animate({	        			
						'scrollLeft': $('.carruselcontainer').scrollLeft() - 785
					}, 500);	        	
	        });
	        
			// left-right arrows touch
			/*
	        $parent.find("a.left").bind('touchstart',function(e) {
				 event.preventDefault();
				$(this).parent().siblings('.carruselcontainer').animate({
						'scrollLeft': $(this).scrollLeft() - 455
					}, 500);
	        });
	        $parent.find("a.right").bind('touchstart',function(e) {
				event.preventDefault();
	        	$(this).parent().siblings('.carruselcontainer').animate({
						'scrollLeft': $(this).scrollLeft() + 455
					}, 500);
	        });
			*/
	    } else {
	    	return true;
	    }
		
		//Monitoreo evento touch
		//touchmove "Mientras se mueve"
		//touchstar "Inicia"
		//touchend "Termina"
		$parent.find('.mainimage').bind("touchstart",function(event){
			event.preventDefault();
			$parent.find('.twitter').toggle();
    		$parent.find('.facebook').toggle();
    		$parent.find('.pinterest').toggle();
		});
		
	});
}

/**
* Catch each phase of the swipe.
* move : we drag the div.
* cancel : we animate back to where we were
* end : we animate to the next image
*/			
function swipeStatus(event, phase, direction, distance, carousel) {
	if (currentImg === "undefined") currentImg = 0;
	// If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
	if( phase=="move" && (direction=="left" || direction=="right") ) {
		var duration=0;
		if (direction == "left") {
			scrollImages((IMG_WIDTH * currentImg) + distance, duration, carousel);
		} else if (direction == "right") {
			scrollImages((IMG_WIDTH * currentImg) - distance, duration, carousel);
		}
	} else if ( phase == "cancel") {
		scrollImages(IMG_WIDTH * currentImg, speed, carousel);
	} else if ( phase =="end" ) {
		if (direction == "right") {
			previousImage(carousel);
		} else if (direction == "left") {
			nextImage(carousel);
		}
	}
}

/**
 * go to next image
 * @param carousel
 */
function previousImage(carousel) {
	if (currentImg === "undefined") currentImg = 0;
	currentImg = Math.max(currentImg-1, 0);
	scrollImages( IMG_WIDTH * currentImg, speed, carousel);
}

/**
 * go to previous image
 * @param carousel
 */
function nextImage(carousel) {
	if (currentImg === "undefined") currentImg = 0;
	currentImg = Math.min(currentImg+1, maxImages-1);
	scrollImages( IMG_WIDTH * currentImg, speed, carousel);
}
function carru_next(run){
	img_f1_delay = 3000;
	findNextImgGallery(1);
}
function carru_stop(){
	run = 0;
	img_f1_delay = 99999999999999999;
}
function ply_mov(){
	$('div.img_galry_02 .image-container a.td_bg.play').hide();
	$('div.img_galry_02 .image-container a.td_bg.pause_mov').css('visibility','visible');
	carru_next();
}
function pause_mov(){
	$('div.img_galry_02 .image-container a.td_bg.pause_mov').css('visibility','hidden');
	$('div.img_galry_02 .image-container a.td_bg.play').show();
	carru_stop();
}
// funciones que encuentra la siguiente y anterior imagen al hacer click tomando en cuenta la que está YA seleccionada
function findPrevImgGallery(run){
// Buscamos la imagen anterior
	//Verifico si era el fin del carril...
	$order_list = $('.img_galry_02 a.image.active').parent().index();
	if($order_list != 0)
	{
var txt = $('.img_galry_02 a.image.active').closest('li').prev().find('a').attr('title');
var img_n = $('.img_galry_02 a.image.active').closest('li').prev().find('a').children('img').attr('src');
$('.img_galry_02 a.image.active').addClass('e');
$('.img_galry_02 a.image.active').closest('li').prev().find('a').addClass('active');
$('.img_galry_02 a.image.active.e').removeClass('active e');
img_n = img_n.replace("thumb", "image");
	$('.img_galry_02 p.imageDescription').text(txt);
	$('.img_galry_02 .mainimage').attr('src',img_n);
		//Llamada con autoplay
		if(run == 1){
			setTimeout("findPrevImgGallery(1)", img_f1_delay);	
		}
	}
	else
	{
		if(run == 1){
			setTimeout("findNextImgGallery(2)", img_f1_delay);	
		}
	}
}

function findNextImgGallery(run){
	/* Developer : Israel Viveros */
	var urlVarEnabled = photogalleries.vars();
	if (!urlVarEnabled['nostats']) {
		photogalleries.dostat();
	}
	/* Developer : Israel Viveros */
// Buscamos la siguiente imagen
    var txt = null;
	//Move scroll
	$('.img_galry_02 .carruselcontainer').animate({
								'scrollLeft': $('.img_galry_02 .carruselcontainer').scrollLeft() + 77
							}, 1500);
	//Llego al final vuelta al carrusel
	if(run==2){
		$('.img_galry_02 a.image.active').removeClass('active');
		$('.img_galry_02 a.image').eq(0).addClass('active');
		txt = $('.img_galry_02 a.image.active').attr('title');
		var img_n = $('.img_galry_02 a.image.active').children('img').attr('src');
		var img_n = img_n.replace("thumb", "image");
		var link_img = $('.img_galry_02 a.image.active').attr('href');
		$('.img_galry_02 .mainimage').attr('src',img_n);
		setTimeout(function(){
				  $('.img_galry_02 p.imageDescription').text(txt);
				}, 50);
		$('.img_galry_02 .expand').attr('href',link_img);
		$('.img_galry_02 .carruselcontainer').animate({
								'scrollLeft': 0
							}, 500);
		setTimeout("findNextImgGallery(1)", img_f1_delay);
	}
//Verifico si era el fin del carril...
	$large_elements = $('.img_galry_02 ul.ulcarrusel li').size() - 1;
	$order_list = $('.img_galry_02 a.image.active').parent().index();
	if($order_list != $large_elements && run != 2)
	{
var img_n = $('.img_galry_02 a.image.active').closest('li').next().find('a').children('img').attr('src');
var txt = $('.img_galry_02 a.image.active').closest('li').next().find('a').attr('title');
var link_img = $('.img_galry_02 a.image.active').closest('li').next().find('a').attr('href');
$('.img_galry_02 a.image.active').addClass('e');
$('.img_galry_02 a.image.active').closest('li').next().find('a').addClass('active');
$('.img_galry_02 a.image.active.e').removeClass('active e');
img_n = img_n.replace("thumb", "image");
	//alert(img_n);
	$('.img_galry_02 .image-container .mainimage').attr('src',img_n);
	//alert($('.img_galry_02 .image-container .mainimage').attr('src'));
	//alert(txt);
	setTimeout(function(){
				  $('.img_galry_02 p.imageDescription').text(txt);
				}, 50);
	$('.img_galry_02 .expand').attr('href',link_img);
	//$('.img_galry_02 p.imageDescription').text(txt);
	
	
		//Llamada con autoplay
		if(run == 1){
			setTimeout(function(){
				  findNextImgGallery(1);
				}, img_f1_delay);	
		}
	}
	else
	{
		if(run == 1){
			setTimeout("findNextImgGallery(2)", img_f1_delay);	
		}
	}
}


$(document).ready(function(){
    // making sure that this works even if there's two or more of this component in a page...
    img_galry_02_init();

    $('div.img_galry_02 .mainimage, div.img_galry_02 .social_icon_top').on('mouseenter', function(){
    	$('div.img_galry_02 .lnk_twitter').css('visibility','visible');
		$('div.img_galry_02 .lnk_facebook').css('visibility','visible'); 
		$('div.img_galry_02 .pin-it-button').css('visibility','visible'); 
    }).on('mouseleave', function(){
    	$('div.img_galry_02 .lnk_twitter').css('visibility','hidden');
		$('div.img_galry_02 .lnk_facebook').css('visibility','hidden'); 
		$('div.img_galry_02 .pin-it-button').css('visibility','hidden'); 
    });
    

    
    if($(window).width() < 431){
        $('div.img_galry_02 .overlay').css('margin-top','-65px')
    }
    $(window).resize(function() {
    	if($(window).width() < 431){
     	  $('div.img_galry_02 .overlay').css('margin-top','-65px')     	  
   		}	
   		else{
   			$('div.img_galry_02 .overlay').css('margin-top','-65px')   			
   		}

    });
    if($(window).width()<624){
        $('.img_galry_02 .txt1').removeClass('dotted-right');
        $('.img_galry_02 .txt1').addClass('dotted-bottom');
    }
	//swipe
			$(this).find('.carruselcontainer').bind('swipeleft',function(){
				$(this).animate({
								'scrollLeft': $(this).scrollLeft() + 455
							}, 500);
			});
			$(this).find('.carruselcontainer').bind('swiperight',function(){
				$(this).animate({
								'scrollLeft': $(this).scrollLeft() - 455
							}, 500);
			});
			
	//swipe principal
		var $list = $('.img_galry_02').find('ul.ulcarrusel li').size();
			$(this).find('.mainimage').bind('swipeleft',function(){
				$order_list2 = $(this).parent().parent().find('a.image.active').parent().index();
				$large_elements2 = $('.img_galry_02 ul.ulcarrusel li').size() - 1;
				if($large_elements2 == $order_list2){$('.img_galry_02 a.right').trigger( "click" );}
				findNextImgGallery(0);
				$('.img_galry_02 .carruselcontainer').animate({
								'scrollLeft': $('.img_galry_02 .carruselcontainer').scrollLeft() + 77
							}, 500);
			});
			$(this).find('.mainimage').bind('swiperight',function(){
				findPrevImgGallery(0);
				$('.img_galry_02 .carruselcontainer').animate({
								'scrollLeft': $('.img_galry_02 .carruselcontainer').scrollLeft() - 77
							}, 500);
			});
	//swipe secundario
			$(this).find('.carruselcontainer').bind('swipeleft',function(){
				$(this).animate({
								'scrollLeft': $(this).scrollLeft() + 455
							}, 500);
			});
			$(this).find('.carruselcontainer').bind('swiperight',function(){
				$(this).animate({
								'scrollLeft': $(this).scrollLeft() - 455
							}, 500);
			});			
	// scroll
	$(this).find('.carruselcontainer').scroll(function() {
		var $ig4_position = $(this).scrollLeft();
		var $id4_med = $ig4_position + $(this).width();
		var $id4_lt = $(this).children().width(); 
		if($ig4_position == 0){
			$(this).siblings('.arrowLeft').children().children('.tvsa-double-caret-left').css('color','#BABABA');
		}
		else{
			$(this).siblings('.arrowLeft').children().children('.tvsa-double-caret-left').css('color','#000000');
		}
		if($id4_med == $id4_lt){
			$(this).siblings('.arrowRight').children().children('.tvsa-double-caret-right').css('color','#BABABA');
		}
		else{
			$(this).siblings('.arrowRight').children().children('.tvsa-double-caret-right').css('color','#000000');
		}
		//console.log('scroll: '+$ig4_position+' suma: '+$id4_med+' large: '+$id4_lt);
	});
	
	/*
    $(window).resize(function() {
    	if($(window).width()<624){
     	   	$('.img_galry_02 .txt1').removeClass('dotted-right');
        	$('.img_galry_02 .txt1').addClass('dotted-bottom');
   		}	
   		else{
        	$('.img_galry_02 .txt1').removeClass('dotted-bottom');
   			$('.img_galry_02 .txt1').addClass('dotted-right');
   		}
    });
    */
	
	$parent.find('a.play').click(function(e){
	   e.preventDefault();
       ply_mov();
	});
	$parent.find('a.pause_mov').click(function(){
        pause_mov();
	});
});


//-----------------------------------------------------------------------------------------------------------------
//Asigna el ancho al carrusel que contiene las imagenes
//-----------------------------------------------------------------------------------------------------------------
$(window).load(function(){
			var $elements = $('.img_galry_02').find('ul.ulcarrusel li').size();								
			var $sizeLi = $('.img_galry_02').find('ul.ulcarrusel li').width();
			var $sizeLi = $sizeLi + 12;       //El número 12 es el margen que tiene entre cada uno de los LI.					
			var $widthCarrusel = $sizeLi * $elements
			
			//Agrega clase y asigna ancho al carrusel...
			$('.img_galry_02').find('ul.ulcarrusel').addClass('my');
			$('.img_galry_02').find('.my').width($widthCarrusel);    	
});
//-----------------------------------------------------------------------------------------------------------------


$(window).resize(function(){
	if ($(window).width() < 624 && $('body:eq(0)').data('viewport') > 623) {
		// mobile reached
//		console.log('firing the init.');
		img_galry_02_init();
	}
	if ($(window).width() >= 624) {
		var $elements = $('.img_galry_02').find('ul.ulcarrusel li').size();								
		var $sizeLi = $('.img_galry_02').find('ul.ulcarrusel li').width();
		var $sizeLi = $sizeLi + 12;       //El número 12 es el margen que tiene entre cada uno de los LI.					
		var $widthCarrusel = $sizeLi * $elements
		
		//Agrega clase y asigna ancho al carrusel...
		$('.img_galry_02').find('ul.ulcarrusel').addClass('my');
		$('.img_galry_02').find('.my').width($widthCarrusel);
		
		// tablet and desktop reached
		img_galry_02_init();
	}
	$('body:eq(0)').attr('data-viewport',$(window).width());
});