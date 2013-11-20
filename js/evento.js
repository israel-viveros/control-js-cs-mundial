document.documentElement.className = 'js';
$(document).ready(function() {	
	$("div.calendar_sorteo").find("div.head_calendar ul.nav-tabs>li").click(function()
	    {		
		$("div.calendar_sorteo").find("ul>li").removeClass("active");
			$(this).addClass("active");			
			if($(this).attr("data-bloque")=="fase_1"){
				$(".fase_1").show();
				$(".fase_2").hide();
			}
			else{
				$(".fase_1").hide();
				$(".fase_2").css("display","inline-block").show();
			}
			$("section.calendar_sorteo").find("div.info_partido").hide();
		})
	$("div.calendar_sorteo").find("ul.encuentro  span").click(function(){
		$("div.calendar_sorteo").find("div.info_partido").hide();
		$(this).next().toggle();
	});
	$("div.calendar_sorteo").find("ul.encuentro  div.x").click(function(){
		$(this).parent().hide();
	})
	$("div.calendar_sorteo").find("div.semanas a.enlace_semana1,div.semanas a.enlace_semana2,div.semanas a.enlace_semana3").click(function()
	{
		/*$(".semana1,.semana2,.semana3").hide();
		$("div.calendar_sorteo div.semanas ul.nav").find("li").removeClass("active");
		$(this).parent().addClass("active")
		if($(this).hasClass("enlace_semana1")){
			$(".semana1").show();
		}
		if($(this).hasClass("enlace_semana2")){
			$(".semana2").show();
		}
		if($(this).hasClass("enlace_semana3")){
			$(".semana3").show();
		}*/
	})	
	$("div.fase_2").find("li.fase2_recuadro").click(function()
			{
				$(this).find("div.fase2_detalle_partido").show();
			})
	$("div.fase_2 div.fase2_detalle_partido").find("div.fase2_detalle_partido_cerrar").click(function()
			{
				$(this).parents("div.fase2_detalle_partido").remove();
			})
			$(".bloque").swipe({
				  swipe:function(event, direction, distance, duration, fingerCount) {
					  desplazar(direction,$(this))
					  }
				});
	function desplazar(direction,element)
	{
		if($(window).width()<=623){
			  if(direction=="left") {
				  if(element.hasClass("ul_semana1") && element.next().hasClass("ul_semana2")){
					  element.hide();
					  element.next().show();
				  	  $("a.enlace_semana1").parent().removeClass("active")
				  	  $("a.enlace_semana2").parent().addClass("active")
			  	   }
				  if(element.hasClass("ul_semana2") && element.next().hasClass("ul_semana3")){
					  element.hide();
					  element.next().show();
				  	  $("a.enlace_semana2").parent().removeClass("active")
				  	  $("a.enlace_semana3").parent().addClass("active")
			  	   }
			   }
			  else{
				  if(element.hasClass("ul_semana3") && element.prev().hasClass("ul_semana2")){
					  element.hide();
					  element.prev().show();
				  	  $("a.enlace_semana3").parent().removeClass("active")
				  	  $("a.enlace_semana2").parent().addClass("active")
			  	   }
				  if(element.hasClass("ul_semana2") && element.prev().hasClass("ul_semana1")){
					  element.hide();
					  element.prev().show();
				  	  $("a.enlace_semana2").parent().removeClass("active")
				  	  $("a.enlace_semana1").parent().addClass("active")
			  	   }
			   }    	
	}
	}
});