/* bullshit. Why use JS for something you can do in plain HTML? The HTML is in header/html.xml now  */
$('#noexplore a#close').click(function(){
	$('#noexplore').hide();
});
$(window).scroll(function() {
	if($(window).scrollTop() != 0){
		$('#noexplore').css('position','fixed');
	}else
	{
		$('#noexplore').css('position','relative');
	}
})