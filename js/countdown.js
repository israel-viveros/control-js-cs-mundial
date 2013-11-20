$(function() {
	var parentCountDown = $(".countdown");
	var anioCountDown = parseInt(parentCountDown.data("anio"));
	var mesCountDown = parseInt(parentCountDown.data("mes"))-1;
	var diaCountDown = parseInt(parentCountDown.data("dia"));
	var horaCountDown = parseInt(parentCountDown.data("hora"));
	var minutoCountDown = parseInt(parentCountDown.data("minuto"));
	var cm2014Start = new Date(anioCountDown, mesCountDown,diaCountDown, horaCountDown, minutoCountDown);	
	$('div.countdown div.wrapper').countdown({until: cm2014Start});	
});