$(document).ready(function(){
	var activo_img = 0;
	var activo_vid = 0;	

	function ocultar()
	{
		$('.wdg_mxm_live_02 .not_here').hide();
		$('.wdg_mxm_live_02 .vid_player_01 .not_here').hide();
		$('.wdg_mxm_live_02 .img_stage_01 .not_here').hide();
		$('.wdg_mxm_live_02 .vid_player_01 .not_here').css('display','none');
		$('.wdg_mxm_live_02 .img_stage_01 .not_here').css('display','none');
		$('.wdg_mxm_live_02 .tvsa-videocamera').removeClass("tvsa-error");
		$('.tvsa-camera').show(); 
	};
	//Click camera
    $('.wdg_mxm_live_02 .tvsa-camera').live('click',function(event){
		$('.wdg_mxm_live_02 .tvsa-videocamera').removeClass("textcolor-title1"); 
		$('.wdg_mxm_live_02 .tvsa-camera').removeClass("textcolor-title1");
		$('.wdg_mxm_live_02 .vid_player_01').removeClass('here').addClass('not_here');
		$('.wdg_mxm_live_02 .img_stage_01').removeClass('here').addClass('not_here');
		$(this).parent().next('.img_stage_01').removeClass('not_here').addClass('here');
		
		ocultar();
		
		var edo_this = $(this).parent().next('.img_stage_01').css('display'); 
		if(edo_this == 'block' ){
			$(this).parent().next('.img_stage_01').removeClass('here').addClass('not_here');
			$(this).parent().next('.img_stage_01').hide();
			$(this).addClass("textcolor-title1");
		}
		else
		{
			$(this).parent().next('.img_stage_01').show();
		}
			
     	$(this).toggleClass("textcolor-title1");
		$(this).parent().siblings('.not_here').hide();
        $(this).parent().siblings('.vid_player_01').hide();
        $(this).parent().siblings('.icon-interactive').find('i').removeClass("textcolor-title1");
	});
    //Click videocamera
    $('.wdg_mxm_live_02 .tvsa-videocamera').live('click',function(event){ 
		$('.tvsa-videocamera').removeClass("active");          
		activo_vid = $(this).attr('class');
		if(activo_vid == "tvsa-videocamera"){
			//Esconder todo
			$('.vid_player_01').hide();
			$('.tvsa-videocamera').removeClass("tvsa-error"); 
			$('.tvsa-videocamera').removeClass("textcolor-title1"); 
			$('.img_stage_01').hide();
			$('.tvsa-camera').removeClass("textcolor-title1");	
			$('.tvsa-camera').show();			
		}
		//vsa-videocamera textcolor-title1 active tvsa-error
		$(this).addClass("active");
        $(this).parent().siblings('.vid_player_01').toggle();
        $(this).toggleClass("textcolor-title1");
        $(this).parent().siblings('.img_stage_01').hide();
        $(this).parent().siblings('.icon-interactive2').find('i').toggle();
        $(this).toggleClass('tvsa-error');
		activo_vid2 = $(this).attr('class');
			
		if( activo_vid2 == "tvsa-videocamera active"){
			$('.tvsa-videocamera').removeClass("active");
		}
	}); 
		
	/*Automatización de json*/
	var url='';
	var longitudini=0,longitud2=0,longitudfin=0,gral=1;
	var minuto=0, icono="",tipo="",comentario="",imagen="",video="";
	var tiempo_ac=0;
	var tc=0;
	var ban=0;
	var w=0,h=0,bandera=0;	
	var fechaEvento='12/06/2013';
	var fechatv=0, timetv=0, horainicio=0;
	var acciones={};
	
	if (parseInt($(window).width())>=400)
	{
		w=624;
		h=351;
	}
	else
	{
		w=250;
		h=200;
	}
	//Funcion acciones mxm
	var mxm = function() {
		return $.ajax({			
			type: 'GET',
			url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/sorteo/mxm.jsonp',
			async: false,
			jsonpCallback: 'mxmSorteo',
			contentType: "application/json",
			dataType: 'jsonp'
    	});		
	}
	var obtenerFecha = function() {
		return $.ajax({	
			type:'GET',		
			url: 'http://mxm.televisadeportes.esmas.com/deportes/home/timetvjsonp.js',			
			async: false,
			jsonpCallback:"timetv",
			contentType:"application/json; charset=utf-8",
			dataType: 'jsonp'
    	});		
	}
		
	function fecha()
	{
		$.when(obtenerFecha()).done(function(request){
			timetv=request.timetv;
			var arrt=timetv.split(":");
			var hor=arrt[0];
			var mint=arrt[1];
			fechatv=request.fechatv;
			var arr='';
			var d=0;
			var m=0;
			var anio=0;
			var fechas=0;
						
			arr=fechatv.replace(/_/gi,"-").split("-");
			d=arr[0];
			m=parseInt(arr[1])+1;
			
			if (String(hor).length==1)
			{
				hor='0'+hor;
			}
			if (String(mint).length==1)
			{
				mint='0'+mint;
			}
			timetv=hor+':'+mint;
			if (String(m).length==1)
			{
				m='0'+m;
			}
			
			anio= parseInt(arr[2])+1900;
			fechas=m+'/'+arr[0]+'/'+anio;
						
			//valida que sea la fecha del evento
			if (d==06 && m==12 && anio==2013)
			{
			
				if (gral>1)
				{
					//guardar la hora en que inicia el evento para despues detener las actualizaciones
					if (bandera==0)
					{
						horainicio=timetv+':00';
						bandera=1;
					}
								
					var f1= new Date(fechaEvento+' '+horainicio);
					var f2= new Date(fechas+' '+timetv+':00');
					var h1=f1.getHours();
					var h2= f2.getHours();
					var htrans=parseInt(h2)-parseInt(h1);
					
					if (htrans<=3)
					{
						//actualizar cada minuto
						tiempo_ac=60000;						
					}
					else
					{
						//detener las actualizaciones
						tiempo_ac=0;
					}
				
				}
				else
				{								
					//actualizar cada 5 minutos
					tiempo_ac=300000;					
				}
			}
			else
			{
				tiempo_ac=0;
			}			
		});
	}
	var recargamxm= function() {
		$.when(mxm()).done(function(request){	
			if (longitudini==0)
			{
				longitudini=request.action.length;
				longitudfin=parseInt(longitudini)-1;
			}
			else
			{	
				if (request.action.length!=longitudini)
				{							
					longitud2=request.action.length;
					longitudfin=parseInt(longitud2)-parseInt(longitudini)-1;
					longitudini=request.action.length;
				}
			}
			
			while (parseInt(longitudfin) >= 0)
			{
				var contenido='';
				imagen='',tituloimg='',descimg='';
				video='',titulovideo='',descimg='';
				icono="";
				minuto=request.action[parseInt(longitudfin)].minute;
				titulo=request.action[parseInt(longitudfin)].titulo;
				comentario=request.action[parseInt(longitudfin)].description;
				tipo=request.action[parseInt(longitudfin)].tipo;
				
				if (request.action[parseInt(longitudfin)].icon!="")
				{
					icono=request.action[parseInt(longitudfin)].icon;
				}
				
				if (request.action[parseInt(longitudfin)].imagePath!="")
				{
					imagen=request.action[parseInt(longitudfin)].imagePath;
				}
				if (request.action[parseInt(longitudfin)].videoId!="")
				{
					video=request.action[parseInt(longitudfin)].videoId;
				}
				
				if(tipo == 'comentario')
				{
				contenido='<li><div class="time_icon"><div class="textcolor-title2 time">'+minuto+'</div><div class="icon-time"></div></div><div class="chronic"><div class="bandera">';
				
				if (icono!="")
				{
					contenido+='<img src="'+icono+'" alt="bandera">';
				}
				contenido+='</div>'+titulo+'<div class="chronic_description">'+comentario+'</div><div class="wdg_mxm_live_02_verMas"><a class="textcolor-title1" href="#">Ver Más</a></div></div>';
				if (imagen!="" || video!="")
				{
					if (imagen!="" && video=="")
					{
						tituloimg=request.action[parseInt(longitudfin)].imagenTitulo;
						descimg=request.action[parseInt(longitudfin)].imagenDesc;
						contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-camera"></i></div><div class="img_stage_01"><div class="img_stage_01_image"><img src="'+imagen+'" alt="Image description"><span class="img_stage_01_sprite video-corner"></span></div><a class="img_stage_01_whtbkg" href="#"><p class="img_stage_01_black">'+tituloimg+'</p><p class="img_stage_01_gray">'+descimg+'</p></a></div>';
					}
					if (video!="" && imagen == "")
					{
						titulovideo=request.action[parseInt(longitudfin)].videoTitulo;
						descvideo=request.action[parseInt(longitudfin)].videoDesc;
						contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-videocamera"></i></div><div class="vid_player_01 not_here mantener"><div class="vid_player_01_image"><iframe id="reproductor" class="img_stage_01_IMG" src="http://tv.televisadeportes.esmas.com/embed/embed_ampp.php?id='+video+'"></iframe><div class="theaterContainer"><div class="theaterSideSpacer leftBarLink"></div><div class="izq_vid"><div class="videoLink"></div><div class="contenedor"></div></div><div class="rightBarLink theaterSideSpacer"></div></div><div class="companionBanner"></div></div></div>';
						//<a href="http://tv.televisadeportes.esmas.com/embed/embed_ampp.php?id='+video+'" target="reproductor" class="btn_vid square"><i class="tvsa-play videobtn"></i></a><div class="vid_player_01_whtbkg"><p class="vid_player_01_black">'+titulovideo+'</p></div>
					}
					if (video!="" && imagen != "")
					{
						tituloimg=request.action[parseInt(longitudfin)].imagenTitulo;
						descimg=request.action[parseInt(longitudfin)].imagenDesc;
						titulovideo=request.action[parseInt(longitudfin)].videoTitulo;
						descvideo=request.action[parseInt(longitudfin)].videoDesc;
						contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-videocamera"></i></div><div class="icon-interactive2 textcolor-title4"><i class="tvsa-camera"></i></div><div class="img_stage_01"><div class="img_stage_01_image"><img src="'+imagen+'" alt="Image description"><span class="img_stage_01_sprite video-corner"></span></div><a class="img_stage_01_whtbkg" href="#"><p class="img_stage_01_black">'+tituloimg+'</p><p class="img_stage_01_gray">'+descimg+'</p></a></div><div class="vid_player_01 not_here mantener"><div class="vid_player_01_image"><img src="'+imagen+'" alt="Image description" class="img_stage_01_IMG"><div class="theaterContainer"><div class="theaterSideSpacer leftBarLink"></div><div class="izq_vid"><div class="videoLink"></div><div class="contenedor"></div></div><div class="rightBarLink theaterSideSpacer"></div></div><div class="companionBanner"></div></div></div>';
						//antes de cerrar el ultimo div <a href="#" class="btn_vid square"> <i class="tvsa-play videobtn"></i></a><div class="vid_player_01_whtbkg"><p class="vid_player_01_black">'+titulovideo+'</p></div>
					}
					contenido+='</div>';					
				}//END comen con video y/o image.
			}else{
					div_tit = titulo.split("@");
					titulo= '@'+div_tit[1];
					tit_opc= div_tit[0];
					contenido='<li><div class="time_icon"><div class="icon-time twitter"><i class="tvsa-twitter"></i></div></div><div class="chronic twitter"><p class="textcolor-title2">'+tit_opc+'<span class="textcolor-title4">'+titulo+'</span></p><div class="chronic_description">'+comentario+'</div></div>';
				}
				
				contenido+='</li>';
				if ($(".div_minutoxminuto_vacio").css('display')!='none')
				{					
					$(".div_minutoxminuto_vacio").css('display','none');
					$(".wdg_mxm_live_02").css('display','block');					
					$(".wdg_mxm_live_02 .azul").css('display','block');					
				}
				$(".wdg_mxm_live_02_list").prepend(contenido);		
				gral++;
				longitudfin--;
			}			
		});
		
		$(window).resize(function() {		
			var pantalla=$(window).width();
			if (parseInt($(window).width())>=400)
			{
				w=900;
				h=400;
			}
			else
			{
				w=250;
				h=200;
			}		
		});
		//mostrar imagen
		setImg = function(divBox,imgUrl) {
			if ($(divBox).html() == ''){
				$(divBox).html('<img src="' + imgUrl + '" alt=""/>');
			}else{
				$(divBox).html('');
			}
			
			if ($('.unom').css('display')=='block')
			{
				//$('.lightbox').show();				
				$('.unom').css('display', 'none');
				$('.dosm').css('display', 'block');
			}
			else
			{
				//$('.lightbox').hide();				
				$('.unom').css('display', 'block');
				$('.dosm').css('display', 'none');
			}
		}
		//mostrar video
		setVid = function(id,idVid) { 
			if (ban==0)
			{	
				var a=$('.vide').css('height');
				
				if ($('.vide').css('height')>='450px')
				{			
					$('#vid'+id).attr('data', 'http://www.tvolucion.com/embed/embed_ampp.php?id=' + idVid+ '&w='+w+'&h='+h+'');
				}
				else
				{			
					$('#vid'+id).attr('data', 'http://www.tvolucion.com/embed/embed_ampp.php?id=' + idVid+ '&w='+w+'&h='+h+'');
				}
				//$('.lightbox').show();
				$('#con_video').show();
				$('#con_video'+id).css('display', 'block');
				$('#vid'+id).css('display', 'block');
				$('.unov').css('display', 'none');
				$('.dosv').css('display', 'block');
				ban=1;
			}
			else
			{
				//$('.lightbox').hide();
				$('#con_video').hide();
				$('#con_video'+id).css('display', 'none');
				$('#vid'+id).css('display', 'none');
				$('.unov').css('display', 'block');
				$('.dosv').css('display', 'none');
				ban=0;
			}
		}
		fecha();		
		
		if (parseInt(tiempo_ac)>0)
  		{
			var refreshId=setTimeout(recargamxm,tiempo_ac); 
		}		
	}	
	recargamxm();				
});



