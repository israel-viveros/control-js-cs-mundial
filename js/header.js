$(document).ready(function(){
	$('.header i').on('click',function(e){
		e.preventDefault();
		$('.header nav').find('.header_sub_menu').slideToggle('slow');
		var class_i = $(this).attr('class');
		if(class_i == 'tvsa-caret-down')
		{
			$(this).removeClass('tvsa-caret-down').addClass('tvsa-caret-up');
		}
		else
		{
			$(this).removeClass('tvsa-caret-up').addClass('tvsa-caret-down');
		}
		/*$(this).toggleClass(function(){
			 if($(this).is('.tvsa-caret-up')){
				 //Ocultar sub_menu
			    return 'tvsa-caret-down';
		  	} else {
				//Mostrar sub_menu
			    return 'tvsa-caret-up';
		  	}
		});*/
	});
});