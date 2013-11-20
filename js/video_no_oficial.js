video_no_oficial_player = new Object();

video_no_oficial_player.width = 625; // Delay entre cambio y cambio de imagenes en el autoplay
video_no_oficial_player.height = 380;

$(document).ready(function() {
	//Funcion menu subrayado
	$('.video .menu_video ul li a').on('mouseenter',function(e){
        	if($(this).parent().hasClass('select')){
			}else{
				$(this).parents('li').addClass('select new');
			}
        }).on('mouseleave',function(e){
        	if($(this).parent().hasClass('select new')){
        		$(this).parent().removeClass('select');
				$(this).parent().removeClass('new');
        	}else{
        		//No elimina la clase
        	}
        	
        });
	
	
	// Si existe el componente de video
	if($('.video_no_oficial')){
		
		// Click  del btn play
		$('.video .btn_vid').click(function (e){
			e.preventDefault();
			$(this).parent().siblings('.content_video').html("");
			$(this).hide();
			$(this).parent().children('.video_whtbkg').hide();
			$(this).parent().siblings('.video_nota').show();
			setPlayerSize();
		});
		
		// ponemos el thumb y el titulo del video 
		
		/*if (typeof(objHtml5) != "undefined"){
			$('.video_no_oficial .video_no_oficial_black').text(objHtml5.properties.title);
			$('.video_no_oficial #img_stage_01_IMG').attr('src', objHtml5.properties.thumbnail);
		}*/

		$(window).resize(function() {
			setPlayerSize();
		});
	}
	
});

function setPlayerSize(){
	
	if ($.browser.msie && parseInt($.browser.version, 10) <= 7){
		var anchoVentna = document.body.offsetWidth;
		
	}
	else{
		var anchoVentna =  $(window).width();
	}
	
	// Si el version movil obtenemos el alto y ancho de la imagen para adaptar el tamaÃ±o del player
	if( anchoVentna <= 590 ){
		
		// proporcion entre el ancho y alto fijos con el ancho variable
		var altoVentana = (anchoVentna * video_no_oficial_player.height) / video_no_oficial_player.width;
		
		$('.video_no_oficial .contenedor').width( anchoVentna );
		$('.video_no_oficial .contenedor').height( altoVentana );
	}
	else{
		
		$('.video_no_oficial .contenedor').width( video_no_oficial_player.width );
		$('.video_no_oficial .contenedor').height( video_no_oficial_player.height );
		
	}
}