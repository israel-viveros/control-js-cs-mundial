$(document).ready(function() {
	var urlVideo = 'http://tv.televisadeportes.esmas.com/embed/embed_ampp.php?id=';
    var activo = $('.video .lista_video .select').children().first();
	
	//Inicializamos video priorizado
	if(activo.length>0){
		var id = activo.attr('data-id');
		$('#videoplayer').attr('src',urlVideo+id);
	}       
	
	$('.link-iframe').on('touchstart click', function() {
		if(activo.length>0){
			activo.parent().removeAttr('class');
		}
		var id = $(this).attr('data-id');
		$('#videoplayer').attr('src',urlVideo+id);
		$(this).parent().attr('class','select');
		activo = $(this);
	});
      
});