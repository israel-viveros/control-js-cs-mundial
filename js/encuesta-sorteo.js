
(function() {
    $(document).ready(function() {
        $('.encuesta_sorteo .submitButton').click(function(){
            console.log('dentro');
            $('.encuesta_sorteo .encuesta_sorteo_results').show();
            $('.encuesta_sorteo .encuesta_sorteo_texttotal').show();
            $('.encuesta_sorteo .encuesta_sorteo_totalvotes').show();            
            $('.encuesta_sorteo form .question').hide();
            $(this).hide();
        	/*
			*/
        });

    }); 
}());

 



