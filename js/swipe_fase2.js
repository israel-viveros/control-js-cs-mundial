document.documentElement.className = 'js';
$(document).ready(function() {	
var currentImg=0;
var band=0;
	$("div.calendar_sorteo").find("div.head_calendar ul.nav-tabs>li").click(function()
	    {		
			$("div.calendar_sorteo div.head_calendar").find("ul>li").removeClass("active");
			$(this).addClass("active");			
			if($(this).attr("data-bloque")=="fase_1"){
				//$(".fase_1").show('slow');
				$(".fase_1").fadeIn(600);
				//$(".fase_2").hide('fast');				
				$(".fase_2").fadeOut(600);				
				if($(window).width()<=623)
				{
					$("div.calendar_sorteo").find(".semanas").show();
					imgs = $(".fase_2_imgs");
					imgs.swipe( swipeOptions );
				}
			}
			else{
				//$(".fase_1").hide('fast');
				$(".fase_1").fadeOut(300);
				//$(".fase_2").css("display","inline-block").show('slow');
				$(".fase_2").css("display","inline-block").fadeIn(300);
				//$("div.calendar_sorteo").find(".semanas").hide('fast');
				$("div.calendar_sorteo").find(".semanas").fadeOut(300);
				hover1()
			}
			//$("section.calendar_sorteo").find("div.info_partido").hide();
			$("section.calendar_sorteo").find("div.info_partido").fadeOut(300);
		})
	//$("div.calendar_sorteo").find("ul.encuentro span").click(function(){
	$("div.calendar_sorteo").find("ul.encuentro span").on('touchstart click',function(){
		/*$("div.calendar_sorteo").find("div.info_partido").hide();
		$(this).next().toggle();*/
		$("div.calendar_sorteo").find("div.info_partido").hide('fast');
		$(this).next().toggle(300);
	});
	
	//$("div.calendar_sorteo").find("ul.encuentro div.x").click(function(){
	$("div.calendar_sorteo").find("ul.encuentro div.x").on('touchstart click',function(){
		//$(this).parent().hide();
		$(this).parent().hide('fast');
	})
	$("div.calendar_sorteo").find("div.semanas a.enlace_semana1,div.semanas a.enlace_semana2,div.semanas a.enlace_semana3").click(function()
	{
		$("div.semanas ul").find("li").removeClass("active")
		$(this).parent().addClass("active")
		if($(this).hasClass("enlace_semana1")){
			if(currentImg==1){
				swipeStatus("click", "move", "right", "271");
				swipeStatus("click", "end", "right", "271");
			}
			if(currentImg==2){
				swipeStatus("click", "move", "right", "271");
				swipeStatus("click", "end", "right", "271");
				swipeStatus("click", "move", "right", "271");
				swipeStatus("click", "end", "right", "271")
			}
		}
		if($(this).hasClass("enlace_semana2")){			
			if(currentImg==0){
				swipeStatus("click", "move", "left", "271");
				swipeStatus("click", "end", "left", "271");
			}
			if(currentImg==2){
				swipeStatus("click", "move", "right", "271");
				swipeStatus("click", "end", "right", "271");
			}
		}
		if($(this).hasClass("enlace_semana3")){
			if(currentImg==0){
				swipeStatus("click", "move", "left", "271");
				swipeStatus("click", "end", "left", "271");
				swipeStatus("click", "move", "left", "271");
				swipeStatus("click", "end", "left", "271");
			}
			if(currentImg==1){
				swipeStatus("click", "move", "left", "271");
				swipeStatus("click", "end", "left", "271");
			}
		}
			
	})	
	$("div.fase2_div_fecha_azul,div.fase2_div_fecha_naranja,div.fase2_div_fecha_verde").click(function()
			{
				/*$(".fase2_detalle_partido").hide();
				$(this).next().next().show();*/
				$(".fase2_detalle_partido").hide('fast');
				$(this).next().next().show('slow');
			})
	$("div.fase_2 div.fase2_detalle_partido").find("div.fase2_detalle_partido_cerrar").click(function()
			{
				//$(this).parent().hide();
				$(this).parent().hide('fast');
			})
			
	var banderaCuartos = 0;
	var banderaOctavos = 1;
	var banderaSemis = 0;
	var banderaFinal = 0;
	function hover1()
	{
	$("ul.cuartos").mouseover(function()
			{
			if($(window).width()<=623)
			{
				if(banderaCuartos == 0)
					{
						$("ul.octavos").off("mouseover");
						$("ul.semis").off("mouseover");
						++banderaCuartos;
						if(banderaSemis > 0){ condicion = "+=225"; }
						else { condicion = "-=160"}
						banderaOctavos = 0;
						banderaSemis = 0;
						$( "div.div_eliminatoria,.ul_tab_fase_2" ).animate({
						    marginLeft: condicion,
						}, 250, function() 
						{
							hover2();
							hover3();
						});						
					}	
				}
			})
	}		
	function hover2()
	{
	$("ul.octavos").mouseover(function()
			{
			if($(window).width()<=623)
			{
				if(banderaOctavos == 0)
					{
						$("ul.cuartos").off("mouseover");
						++banderaOctavos;
						banderaCuartos = 0;
						$( "div.div_eliminatoria,.ul_tab_fase_2" ).animate({
						    marginLeft: "+=160",
						}, 250, function() 
						{
							hover1();
						});
					}	
				}
			})
	}
	function hover3()
	{
	$("ul.semis").mouseover(function()
			{
			if($(window).width()<=623)
			{
				if(banderaSemis == 0)
					{				
						$("ul.cuartos").off("mouseover");
						$("ul.final,ul.ul_tercer_lugar").off("mouseover");
						if(banderaFinal > 0){ condicion = "+=225"; }
						else { condicion = "-=225"}
						banderaCuartos = 0;
						banderaFinal = 0;
						++banderaSemis;
						$( "div.div_eliminatoria,.ul_tab_fase_2" ).animate({
						    marginLeft: condicion,
						}, 250, function() 
						{
							hover1();
							hover4();
						});
					}
				}
			})
	}		
	function hover4()
	{
	$("ul.final,ul.ul_tercer_lugar").mouseover(function()
			{
			if($(window).width()<=623)
			{
				if(banderaFinal == 0)
					{
						$("ul.semis").off("mouseover");
						++banderaFinal;
						banderaSemis = 0;
						$( "div.div_eliminatoria,.ul_tab_fase_2" ).animate({
						    marginLeft: "-=225",
						}, 250, function() 
						{
							hover3();
						});
					}	
				}
			})	
	}		
/******************************************************** Swipe y transicion *********************************************/
	var IMG_WIDTH = 271;
	
	var maxImages=3;
	var speed=1000;
	var band=0;
	
	var imgs;
		//allowPageScroll:"vertical",
	var swipeOptions=
	{
		triggerOnTouchEnd : true,	
		swipeStatus : swipeStatus,
		allowPageScroll:"auto",
		threshold:75			
		}
	
	$(function()
	{				
		if($(window).width()<=623)
		{
			imgs = $(".fase_2_imgs");
			imgs.swipe( swipeOptions );
		}
	});
	
		
	/**
	* Catch each phase of the swipe.
	* move : we drag the div.
	* cancel : we animate back to where we were
	* end : we animate to the next image
	*/			
	function swipeStatus(event, phase, direction, distance)
	{
		
		//If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
		
		
			//console.log("phase"+phase);
		if(phase=="move" && (direction=="left" || direction=="right") )
		{	
		//band=1;
		//console.log("band: "+band);
		if (band==0)
		{
			//band=1;											
			var duration=0;
			if (direction == "left"){
				//console.log("distance left: "+distance);
				//console.log("IMG_WIDTH left: "+IMG_WIDTH);
				if (currentImg<2 && currentImg>=0)
				{					console.log("currentImg left: "+currentImg);
					//scrollImages((IMG_WIDTH * currentImg) + distance, duration);
					scrollImages((IMG_WIDTH * currentImg), duration);
					//scrollImages((IMG_WIDTH) + distance, duration);
					//scrollImages((IMG_WIDTH * currentImg), duration);
					//scrollImages(total, duration);
					band=0;
					currentImg++;
				}
			
				else
				return;
			}
			
			else if (direction == "right"){
				
				if (currentImg<=2 && currentImg>=0)
				{
					//console.log("en la dirección right: "+currentImg);
					console.log("currentImg rigth: "+currentImg);
				//console.log("distance right: "+distance);
				//console.log("IMG_WIDTH right: "+IMG_WIDTH);
				scrollImages((IMG_WIDTH * currentImg), duration);
				//scrollImages((IMG_WIDTH * currentImg) - distance, duration);
				//scrollImages((IMG_WIDTH) - distance, duration);
				//scrollImages((IMG_WIDTH * currentImg), duration);
				//scrollImages((IMG_WIDTH  - distance), duration);
				//scrollImages(total, duration);
				currentImg--;
				}
				else
				{
					return;
				}
			}
			//band=0;
		}
		}
		
		
		/*else if (phase == "cancel")
		{
			if (currentImg==2)
			{
				return;
			}
			else
			{
			//scrollImages(IMG_WIDTH * currentImg, speed);
			scrollImages(IMG_WIDTH, speed);
			}
		}*/
		
		else if (phase =="end" )
		{
			if (currentImg<=2)
			{
			if (direction == "right")
				previousImage()
								
			else if (direction == "left")			
				nextImage()
			}
			
				
			$("div.semanas ul").find("li").removeClass("active")
			if(currentImg == 0){ $("a.enlace_semana1").parent().addClass("active") }
			if(currentImg == 1){ $("a.enlace_semana2").parent().addClass("active") }
			if(currentImg == 2){ $("a.enlace_semana3").parent().addClass("active") }
			band=0;
		}
		
		
	}
			
	
	
	function previousImage()
	{		
		if (currentImg>=0 && currentImg<=2)
		{
			//currentImg = Math.max(currentImg-1, 0);
			console.log("currentImg previous: "+currentImg);
			scrollImages( IMG_WIDTH * currentImg, speed);
		}
		else
		{
			return;
		}		
	}	
	function nextImage()
	{
		if(currentImg>=0 && currentImg<2)
		{			
			//currentImg = Math.min(currentImg+1, maxImages-1);
			console.log("currentImg next: "+currentImg);
			scrollImages( IMG_WIDTH * currentImg, speed);
		
		}
		else
		{
			return;
		}
	}
		
	/**
	* Manuallt update the position of the imgs on drag
	*/
	function scrollImages(distance, duration)
	{
		imgs.css("-webkit-transition-duration", (duration/500).toFixed(1) + "s");
		
		//inverse the number we set in the css
		var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
		
		imgs.css("-webkit-transform", "translate("+value +"px)");/*Crhome*/
		imgs.css("-ms-transform","translate("+value+"px)");/*I9*/
		imgs.css("transform","translate("+value+"px)");/*Safari*/
	}
			
});