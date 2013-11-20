var url_partido='',zonah=zhanterior=-6;
var fase='',mes='',dia='',partido=0,hora=0,grupo='',sede='',lugar='',idLocal=0,idVisitante=0;
var nomLocal='', nomVisitante='',aliasLocal='', aliasVisitante='',banLocal='', banVisitante='', golesLocal=0, golesVisitante=0;
var bandera=0;
var teamsA = {};
var partidosA={};
var calendarioA={};
var pantalla=$(window).width();
var ban=0, banf2=0;
var meses={};
meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio','Julio','Agosto','Septiembre', 'Octubre','Noviembre','Diciembre'];
									
function zonaHoraria()
{
	var rightNow = new Date();
	var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
	var temp = jan1.toGMTString();
	var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
	var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
	var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
	temp = june1.toGMTString();
	var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
	var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
	var dst;
	if (std_time_offset == daylight_time_offset) {
		dst = "0"; // daylight savings time is NOT observed
	} else {
		dst = "1"; // daylight savings time is observed
	}
	zhanterior=parseInt(std_time_offset);	
}

$(".horario_local").click(function(){
	zonaHoraria();
	if (zhanterior!=zonah)
	{
		var valor='';
		$(".hora_partido").each(function() {
			var elem = $(this).html().split(':');
			var resta=parseInt(zonah)-(parseInt(zhanterior));
			valor=parseInt(elem[0])+parseInt(resta);
			$(this).html(valor+':'+elem[1]);		
		});
		
		$(".hora_partido").each(function() {
			var elem = $(this).html().split(':');
			var resta=parseInt(zonah)-(parseInt(zhanterior));
			valor=parseInt(elem[0])+parseInt(resta);
			$(this).html(valor+':'+elem[1]);		
		});
	}
	zhanterior=zonah;	
});

function todo()
{
	
	
	function desplazar(direction,element)
	{
		if($(window).width()<=623){
			/*if(direction=="left") {
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
			
			$("section.calendar_sorteo").find("div.info_partido").hide('fast');
			
			$("div.calendar_sorteo").find("ul.encuentro span").click(function(){
				$("div.calendar_sorteo").find("div.info_partido").hide('fast');
				$(this).next().toggle(300);
			});	
			$("div.calendar_sorteo").find("ul.encuentro div.x").click(function(){
				$(this).parent().hide('fast');
			})*/
			    	
		}
	}
		
	$("div.calendar_sorteo").find("div.head_calendar ul.nav-tabs>li").click(function()
	{		
		$("div.calendar_sorteo").find("ul>li").removeClass("active");
		$(this).addClass("active");			
		
		if($(this).attr("data-bloque")=="fase_1"){
			/*$(".fase_1").show();
			$(".fase_2").hide();*/
			$(".fase_1").fadeIn(300)
			$(".fase_2").fadeOut(300);
		}
		else{
			/*$(".fase_1").hide();
			$(".fase_2").css("display","inline-block").show();*/
			$(".fase_1").fadeOut(300);
			$(".fase_2").css("display","inline-block").fadeIn(300);
		}
		$("section.calendar_sorteo").find("div.info_partido").hide('fast');
	})	
	$("div.calendar_sorteo").find("ul.encuentro span").click(function(){
		$("div.calendar_sorteo").find("div.info_partido").hide('fast');
		$(this).next().toggle(300);
	});	
	$("div.calendar_sorteo").find("ul.encuentro div.x").click(function(){
		//$(this).parent().hide();
		$(this).parent().hide('fast');
	})		
	/*$("div.calendar_sorteo").find("div.semanas a.enlace_semana1,div.semanas a.enlace_semana2,div.semanas a.enlace_semana3").click(function()
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
	})*/	
	
	$("div.fase_2").find("li.fase2_recuadro").click(function()
	{
		//$(this).find("div.fase2_detalle_partido").show();
		$(this).find("div.fase2_detalle_partido").show('slow');
	})
	
	$("div.fase_2 div.fase2_detalle_partido").find("div.fase2_detalle_partido_cerrar").click(function()
	{
		/*$(this).parent('.fase2_detalle_partido').hide();				
		$(this).parent().hide();
		$(this).parent('.fase2_detalle_partido').css('display','none');*/
		$(this).parent('.fase2_detalle_partido').hide(300);				
		$(this).parent().hide(300);
		$(this).parent('.fase2_detalle_partido').css('display','none').hide(300);
	})
	
	$("div.fase_2 div.fase2_detalle_partido").find("div.fase2_detalle_partido_final_cerrar").click(function()
	{
		/*$(this).parent('.fase2_detalle_partido').hide("fast");				
		$(this).parent().hide();
		$(this).parent('.fase2_detalle_partido').css('display','none');*/
		$(this).parent('.fase2_detalle_partido').hide(300);				
		$(this).parent().hide(300);
		$(this).parent('.fase2_detalle_partido').css('display','none').hide(300);
	})
	
	if($(window).width()<=623){
	$(".bloque").swipe({
		swipe:function(event, direction, distance, duration, fingerCount) {
			desplazar(direction,$(this))
		}					  
	});				
	}
	
		if($(window).width()<=623){
		var wrap = jQuery('.img_slides_wrap'),slides = wrap.find('.img_slide'),active = slides.filter('.active'),i = slides.index(active),width = wrap.width(),inicio=0,fin=2;	
		

		console.log("i: "+i);
		slides.on('swipeleft', function(e) {	
		console.log("entro al left");
		if (i === fin) {return; }
		
				slides.eq(i + 1).trigger('activate');
				console.log("entro al actiate");
			}
			).on('swiperight', function(e) {
				if (i === inicio) { return; }
				slides.eq(i - 1).trigger('activate');
			})
			.on('activate', function(e) {
				slides.eq(i).removeClass('active');				
				
				jQuery(e.target).addClass('active');
				// Update the active slide index
				i = slides.index(e.target);
			})
			.on('movestart', function(e) {
				// If the movestart heads off in a upwards or downwards
				// direction, prevent it so that the browser scrolls normally.
				if ((e.distX > e.distY && e.distX < -e.distY) ||
					(e.distX < e.distY && e.distX > -e.distY)) {
					e.preventDefault();
					return;
				}wrap.addClass('notransition');
			})
			.on('move', function(e) {
				var left = 100 * e.distX / width;
				// Move slides with the finger
				if (e.distX < 0) {
					if (slides[i+1]) {
						slides[i].style.left = left + '%';
						slides[i+1].style.left = (left+100)+'%';
					}
					else {
						slides[i].style.left = left/4 + '%';
					}
				}if (e.distX > 0) {
					if (slides[i-1]) {
						slides[i].style.left = left + '%';
						slides[i-1].style.left = (left-100)+'%';
					}
					else {
						slides[i].style.left = left/5 + '%';
					}
				}
			})
			.on('moveend', function(e) {
				wrap.removeClass('notransition');
				slides[i].style.left = '';
				if (slides[i+1]) {
					slides[i+1].style.left = '';
				}
				if (slides[i-1]) {
					slides[i-1].style.left = '';
				}
				});
				$('.nav nav-tabs').click(function(e) {		
			var href = e.currentTarget.hash;
			jQuery(href).trigger('activate');
			e.preventDefault();										
		});
		
		//$("div.calendar_sorteo").find("ul.encuentro  span").click(function(){
			$("div.calendar_sorteo").find("ul.encuentro  span").on('touchstart click',function(){
		//$('#replayDraw').on('touchstart click', function() {
		//$("div.calendar_sorteo").find("div.info_partido").hide();
		$("div.calendar_sorteo").find("div.info_partido").hide('fast');
		$(this).next().toggle(300);
	});
	$("div.calendar_sorteo").find("ul.encuentro  div.x").click(function(){
		//$(this).parent().hide();
		$(this).parent().hide('fast');
	})
		
				}
}

//Funcion calendario
var getCalendario = function() {
	return $.ajax({
		type: 'GET',
		url:'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/calendario.jsonp',
		async: false,
		jsonpCallback: 'calendario',
		contentType: "application/json",
		dataType: 'jsonp'
	});
}
//Funcion partidos
var getPartidos = function() {
	return $.ajax({
		type: 'GET',
		url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/partidos.jsonp',
		async: false,
		jsonpCallback: 'partidos',
		contentType: "application/json",
		dataType: 'jsonp'
	});
}

function llenarDiv(aliasLocal, aliasVisitante, mes, dia, hora, grupo, banLocal, nomLocal, banVisitante, nomVisitante, partido, sede, lugar,golesLocal,golesVisitante,video,numero)
{
	if (video=="")
	{
		video='http://televisadeportes.esmas.com/copa-mundial-fifa-brasil-2014/sorteo.html';
	}
	
	var clase_li='';
	if (parseInt(numero)<4)
	{
		clase_li='class="dotted-bottom"';
	}
	
	
	contenido='<li '+clase_li+'><span data-local="'+aliasLocal+'" data-visitante="'+aliasVisitante+'">'+aliasLocal+' <span class="vs">vs.</span>'+aliasVisitante+'</span><div class="info_partido"><div class="x">X</div><div class="div_gris"><span class="dia_partido">'+mes+' '+dia+'</span><span class="hora_partido">'+hora+'</span></div><div class="div_obscuro"><span class="grupo_partido">Grupo '+grupo+'</span><img data-banderalocal="'+aliasLocal+'" class="bandera1" src="'+banLocal+'" alt="'+nomLocal+'" width="10" height="10">     <span class="marcador1">'+golesLocal+'</span><span data-nomlocal="'+aliasLocal+'" class="pais1">'+nomLocal+'</span><span class="dooted"><span class="vs">vs</span></span><img data-banderavisitante="'+aliasVisitante+'" class="bandera1" src="'+banVisitante+'" alt="'+nomVisitante+'" width="10" height="10"><span class="marcador1">'+golesVisitante+'</span><span data-nomvisitante="'+aliasVisitante+'" class="pais1 ">'+nomVisitante+'</span></div><div class="div_gris"><span class="partido_no">Partido # '+partido+'</span><span class="arena ">'+sede+' <span class="sede">'+lugar+'</span></span></div></div></li>';
	
	$("#"+dia+"").append(contenido);
}
	
function llenarDiv2(aliasLocal, aliasVisitante, mes, dia, hora, grupo, banLocal, nomLocal, banVisitante, nomVisitante, partido, sede, lugar,golesLocal,golesVisitante,video)
{
	var arrt=dia.split("_");
	var dia2=arrt[0];
	var detalle='';
	if (video=="")
	{
		video='http://televisadeportes.esmas.com/copa-mundial-fifa-brasil-2014/sorteo.html';
	}
		
	if (grupo=='FINAL')
	{
		contenido='<li class="li_finalista"><div class="bandera_local"><img data-banderalocal="'+aliasLocal+'" class="bandera1" src="'+banLocal+'" alt="'+aliasLocal+'"></div><span data-local="'+aliasLocal+'" class="nombre_local">'+aliasLocal+'</span></li><li class="li_vs li_finalista_vs"><span>vs.</span></li><li class="li_finalista visitante_finalista"><div class="bandera_local"><img data-banderavisitante="'+aliasVisitante+'" class="bandera1" src="'+banVisitante+'" alt="'+aliasVisitante+'"></div><span data-visitante="'+aliasVisitante+'" class="nombre_local">'+aliasVisitante+'</span></li>';
	
		detalle='<div class="fase2_detalle_partido_final_cerrar">X</div><div class="fase2_detalle_partido_head"><span class="fase2_detalle_partido_head_fecha_final">'+mes+' '+dia2+'</span><span class="fase2_detalle_partido_hora_final">'+hora+'</span></div><div class="fase2_detalle_partido_body_final"><ul class="ul_partido_final"><li><div class="bandera_local"><img data-banderalocal="'+aliasLocal+'" src="'+banLocal+'" alt="'+nomLocal+'"></div><span data-nomlocal="'+aliasLocal+'" class="nombre_local">'+aliasLocal+'</span></li><li class="li_vs"><span>vs.</span></li><li class="list_visitante"><div class="bandera_local"><img data-banderavisitante="'+aliasVisitante+'" src="'+banVisitante+'" alt="'+aliasVisitante+'"></div><span data-nomvisitante="'+aliasVisitante+'" class="nombre_local">'+aliasVisitante+'</span></li></ul><span class="num_partido_final"> Partido # '+partido+'</span><span class="maracana_final">'+sede+'<span class="rio_final">'+lugar+'</span></span></div>';
	
	}
	else
	{
		contenido='<li><div class="bandera_local"><img data-banderalocal="'+aliasLocal+'" class="bandera1" src="'+banLocal+'" alt="'+aliasLocal+'"> </div><span data-local="'+aliasLocal+'" class="nombre_local">'+aliasLocal+'</span></li><li class="li_vs"><span>vs.</span></li><li class="list_visitante"><div class="bandera_local"><img data-banderavisitante="'+aliasVisitante+'" class="bandera1" src="'+banVisitante+'" alt="'+aliasVisitante+'"></div><span data-visitante="'+aliasVisitante+'" class="nombre_local">'+aliasVisitante+'</span></li>';
	
		detalle='<div class="fase2_detalle_partido_cerrar">X</div><div class="fase2_detalle_partido_head"><span class="fase2_detalle_partido_head_fecha">'+mes+' '+dia2+'</span><span class="fase2_detalle_partido_hora">'+hora+'</span></div><div class="fase2_detalle_partido_body"><ul class="ul_partido"><li><div class="bandera_local"><img data-banderalocal="'+aliasLocal+'" class="bandera1" src="'+banLocal+'" alt="'+nomLocal+'"></div><span data-nomlocal="'+aliasLocal+'" class="nombre_local">'+aliasLocal+'</span></li><li class="li_vs"><span>vs.</span></li><li class="list_visitante"><div class="bandera_local"><img data-banderavisitante="'+aliasVisitante+'" class="bandera1" src="'+banVisitante+'" alt="'+aliasVisitante+'"></div><span data-nomvisitante="'+aliasVisitante+'" class="nombre_local">'+aliasVisitante+'</span></li></ul><span class="num_partido"> Partido # '+partido+'</span><span class="maracana">'+sede+'<span class="rio">'+lugar+'</span></span></div>';
	}	
	
	grupo=grupo.toLowerCase();
	$("#"+grupo+dia+" ul").html(contenido);
	$("#d"+grupo+dia+"").html(detalle);
}
//empieza función para recargar cada 3 segundos
function reemplazar_texto(div, valor)
{
	//valida que sean los valores para el equipo local
	if (($(".calendar_sorteo").find('span[data-local='+div+']')).length>0)
	{
		//asignar los nuevos valores (alias Local)
		var htmlLocal=$(".calendar_sorteo").find('span[data-local='+div+']').html();
		var newstr = htmlLocal.replace(div, teams['t'+valor].alias, "gi");
		$(".calendar_sorteo").find('span[data-local='+div+']').html(newstr);
		
		if (($(".calendar_sorteo").find('img[data-banderalocal='+div+']')).length>0)
		{
			//asignar los nuevos valores (bandera Local)
			$(".calendar_sorteo").find('img[data-banderalocal='+div+']').attr('src',teams['t'+valor].bandera);
		}
		if (($(".calendar_sorteo").find('span[data-nomlocal='+div+']')).length>0)
		{
			//asignar los nuevos valores (nombre Local)
			var nombreLocal=$(".calendar_sorteo").find('span[data-nomlocal='+div+']').html();
			var newLocal = nombreLocal.replace(div, teams['t'+valor].alias, "gi");
			$(".calendar_sorteo").find('span[data-nomlocal='+div+']').html(newLocal);
		}		
	}
	else
	{
		//valida que sean valores para el equipo visitante
		if (($(".calendar_sorteo").find('span[data-visitante='+div+']')).length>0)
		{	
			//asignar los nuevos valores (alias Visitante)
			var htmlVisitante=$(".calendar_sorteo").find('span[data-visitante='+div+']').html();
			var newstr = htmlVisitante.replace(div, teams['t'+valor].alias, "gi");
			$(".calendar_sorteo").find('span[data-visitante='+div+']').html(newstr);
			
			if (($(".calendar_sorteo").find('img[data-banderavisitante='+div+']')).length>0)
			{
				//asignar los nuevos valores (bandera Visitante)
				$(".calendar_sorteo").find('img[data-banderavisitante='+div+']').attr('src',teams['t'+valor].bandera);
			}
			if (($(".calendar_sorteo").find('span[data-nomvisitante='+div+']')).length>0)
			{
				//asignar los nuevos valores (nombre Visitante)
				var nombreVisitante=$(".calendar_sorteo").find('span[data-nomvisitante='+div+']').html();
				var newVisitante = nombreVisitante.replace(div, teams['t'+valor].alias, "gi");
				$(".calendar_sorteo").find('span[data-nomvisitante='+div+']').html(newVisitante);			
			}					
		}
		
	}
}
//termina función que se actualiza cada 3 segundos

var calendarioLlenar = function (calendario, partido, equipos)
{
	calendarioA = calendario;
	partidosA = partido;
	teamsA = equipos;
			
	$.each(calendarioA.fase1, function(key,value) {
		mes=key;
		$.each(value, function(key2,value2) {
			var nump=0;
			dia=key2;
			$.each(value2, function(key3,value3) {
				nump++;
				hora=value3.hora;
				sede=value3.sede;
				lugar=value3.lugar;
				grupo=value3.grupo;
				partido=value3.partido;
				$.each(partidosA.partidos, function(key22,value22) {
					if (value22.idPartido==partido)
					{
						idLocal=value22.local;
						idVisitante=value22.visitante;
								
						if ((value22.resultado.goleslocal=="" && value22.resultado.golesvisitantes==""))
						{
							golesLocal='--';
							golesVisitante='--';
						}
						
						if (parseInt(idLocal))
							{
								$.each(teamsA.teams, function(key33,value33) {
									if (value33.id==idLocal)
									{
										nomLocal=value33.nombre;
										aliasLocal=value33.alias;
										banLocal=value33.bandera;
									}											
								});
							}
							else
							{								
								nomLocal=idLocal;
								aliasLocal=idLocal;
								banLocal="";								
							}
							
							if (parseInt(idVisitante))
							{
								$.each(teamsA.teams, function(key33,value33) {
									if (value33.id==idVisitante)
									{
										nomVisitante=value33.nombre;
										aliasVisitante=value33.alias;
										banVisitante=value33.bandera;
									}										
								});
							}
							else
							{
								nomVisitante=idVisitante;
								aliasVisitante=idVisitante;
								banVisitante="";
							}
							
						
						llenarDiv(aliasLocal, aliasVisitante, mes, dia, hora, grupo, banLocal, nomLocal, banVisitante, nomVisitante, partido, sede, lugar,golesLocal,golesVisitante,url_partido,nump);
								
						nomLocal="";
						aliasLocal="";
						banLocal="";
						nomVisitante="";
						aliasVisitante="";
						banVisitante="";
						url_partido="";
					}
				});
			});
		});
	});
	//fase de grupos
	$.each(calendarioA.fase2, function(key,value) {
		mes=key;
		$.each(value, function(key2,value2) {
			banf2=0
			dia=key2;
			$.each(value2, function(key3,value3) {
				hora=value3.hora;
				sede=value3.sede;
				lugar=value3.lugar;
				grupo=value3.grupo;
				partido=value3.partido;					
				$.each(partidosA.partidos, function(key22,value22) {
					if (value22.idPartido==partido)
					{
						idLocal=value22.local;
						idVisitante=value22.visitante;
						url_partido=value22.video;
						
						if ((value22.resultado.goleslocal=="" && value22.resultado.golesvisitantes==""))
						{
							golesLocal='--';
							golesVisitante='--';
						}
						if (parseInt(idLocal))
							{
								$.each(teamsA.teams, function(key33,value33) {
									if (value33.id==idLocal)
									{
										nomLocal=value33.nombre;
										aliasLocal=value33.alias;
										banLocal=value33.bandera;
									}											
								});
							}
							else
							{								
								nomLocal=idLocal;
								aliasLocal=idLocal;
								banLocal="";								
							}
							
							if (parseInt(idVisitante))
							{
								$.each(teamsA.teams, function(key33,value33) {
									if (value33.id==idVisitante)
									{
										nomVisitante=value33.nombre;
										aliasVisitante=value33.alias;
										banVisitante=value33.bandera;
									}										
								});
							}
							else
							{
								nomVisitante=idVisitante;
								aliasVisitante=idVisitante;
								banVisitante="";
							}
							
						
						if (banf2>0)
						{
							dia+='_'+banf2;
						}
						
						llenarDiv2(aliasLocal, aliasVisitante, mes, dia, hora, grupo, banLocal, nomLocal, banVisitante, nomVisitante, partido, sede, lugar,golesLocal,golesVisitante,url_partido);		
						
						nomLocal="";
						aliasLocal="";
						banLocal="";
						nomVisitante="";
						aliasVisitante="";
						banVisitante="";
						url_partido="";
					}
				});
				banf2++;
			});
		});
	});		
	todo();
}