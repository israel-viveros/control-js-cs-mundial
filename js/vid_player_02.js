vid_player_02_player = new Object();

vid_player_02_player.width = 625; // Delay entre cambio y cambio de imagenes en el autoplay
vid_player_02_player.height = 380;

$(document).ready(function() {
	
	// Si existe el componente de video
	if($('.vid_player_02')){
		
		// Click  del btn play
		$('.vid_player_02 .btn_vid').click(function (e){
			e.preventDefault();
			$search = $(this).parent().find('img');
			$search2 = $(this).parent().find('.vid_player_01_whtbkg');
			$search3 = $(this).parent().prev().children('div');
			$search4 = $(this).parent().find('.tvsa-expand');
			$search5 = $(this).parent().siblings('.overlay');
			$tag = $search3.prop("tagName");
			$clase = $search3.attr("class");
			//alert($tag+' '+$clase);
			$($search).closest('.img_stage_01_IMG').hide();
			//$('.vid_player_02 #img_stage_01_IMG').hide();
			//$('.vid_player_02 .vid_player_02_whtbkg').hide();
			$(this).hide();
			$($search2).hide();
			$($search4).hide();

			setPlayerSize();
			$($search5).css('margin-top','25px');
			$('.vid_player_01 .overlay').css('margin-top','25px');
			$($search3).show();
			//$('.vid_player_02 #theaterContainer').show();
		});
		
		// ponemos el thumb y el titulo del video 
		
		/*if (typeof(objHtml5) != "undefined"){
			$('.vid_player_02 .vid_player_02_black').text(objHtml5.properties.title);
			$('.vid_player_02 #img_stage_01_IMG').attr('src', objHtml5.properties.thumbnail);
		}*/
		
		
		
		$(window).resize(function() {
			setPlayerSize();
		});
	}
	
});


function setPlayerSize(){
	
	if (navigator.appVersion.indexOf("MSIE 7.")!=-1){
		var anchoVentna = document.body.offsetWidth;
		
	}
	else{
		var anchoVentna =  $(window).width();
	}
	
	// Si el version movil obtenemos el alto y ancho de la imagen para adaptar el tamaño del player
	if( anchoVentna <= 590 ){
		
		// proporcion entre el ancho y alto fijos con el ancho variable
		var altoVentana = (anchoVentna * vid_player_02_player.height) / vid_player_02_player.width;
		
		$('.vid_player_02 #myExperience').width( anchoVentna );
		$('.vid_player_02 #myExperience').height( altoVentana );
		
		$('.vid_player_02 #contenedor').width( anchoVentna );
		$('.vid_player_02 #contenedor').height( altoVentana );
	}
	else{
		
		$('.vid_player_02 #myExperience').width( vid_player_02_player.width );
		$('.vid_player_02 #myExperience').height( vid_player_02_player.height );
		
		$('.vid_player_02 #contenedor').width( vid_player_02_player.width );
		$('.vid_player_02 #contenedor').height( vid_player_02_player.height );
		
	}
}