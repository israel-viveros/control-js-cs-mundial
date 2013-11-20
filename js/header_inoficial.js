
$(document).ready(function(){
	$('.header_inoficial i').on('click',function(){
		$('.header_inoficial nav').find('.header_sub_menu').slideToggle('slow');
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
			    return 'tvsa-caret-down';
		  	} else {
			    return 'tvsa-caret-up';
		  	}
		});*/
	});
});