var timer_actualizar = 0;
$(document).ready(function(){	
	var url='';
	var fechaEvento='12/06/2013 12:30:00';
	var fechatv=0, timetv=0, horainicio=0;			
			
	var obtenerFecha = function() {
		return $.ajax({	
			type:'GET',		
			url: 'http://mxm.televisadeportes.esmas.com/deportes/home/timetvjsonp.js',				
			async: false,
			jsonpCallback:"timetv",
			contentType:"application/json",
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
			//if (d==06 && m==12 && anio==2013)
			if (d==12 && m==11 && anio==2013)
			{
				var dif_horas=parseInt(hor)-12;
				//valida que sea la hora
				if ((hor>=12 && mint>=30) || (dif_horas<=4 && dif_horas>=0))
				{
					//actualizar cada 4 segundos
					timer_actualizar=4000;
				}
				else
				{
					//actualizar cada 5 minutos
					timer_actualizar=300000;
				}				
			}
			else
			{
				//no actualizar
				timer_actualizar=0;
			}				
		});
	}	
	fecha();
});