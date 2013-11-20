// JavaScript Document
$(document).ready(function() {
	//Variables globales
	var teams = {};
	var teamsDraw = {};
	var potsDraw = {};
	var groupsDraw = {};
	var statusDraw = {};
	var replayStatus = false;
	var replayStatusDraw = new Array();
	var currentEvent;
	var currentPot = 0;
	var currentGroup = 0;
	var currentTeam;
	var timerId;
	var currentId = '';
	var sameInfo = false;
	var viewMobile = false;
	var scrollPots = 0;
	var scrollGroups = 0;
	var activeSwipe = false;
	var stepAnimation = 1;
	var activeAnimation = false;
	var	hashPots = {};
	var	hashGroups = {};
	
	var	testing = 0;
	
	//Funcion getTeams
	var getTeams = function() {
    	return $.ajax({
			type: 'GET',
			url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/teams.jsonp',
			async: false,
			jsonpCallback: 'getTeams',
			contentType: "application/json",
			dataType: 'jsonp'
    	});
	}
	//Funcion getPots
	var getPots = function() {
    	return $.ajax({
			type: 'GET',
			url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/sorteo/pots.jsonp',
			async: false,
			jsonpCallback: 'getPots',
			contentType: "application/json",
			dataType: 'jsonp'
    	});
	}
	//Funcion getGroups
	var getGroups = function() {
    	return $.ajax({
			type: 'GET',
			url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/sorteo/groups.jsonp',
			async: false,
			jsonpCallback: 'getGroups',
			contentType: "application/json",
			dataType: 'jsonp'
    	});
	}
	//Funcion getStatusDraw
	var getStatusDraw = function() {
    	return $.ajax({
			type: 'GET',
			url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/sorteo/drawlive.jsonp',
			async: false,
			jsonpCallback: 'getDrawLive',
			contentType: "application/json",
			dataType: 'jsonp'
    	});
	}
	
	//Funcion initTeams
	var initTeams = function(objeto) {
		var temp = {};
		$.each(objeto, function(id,team){
			if(!team.hasOwnProperty('t'+team.id))
				temp['t'+team.id] = team;
		});
		return temp;
	}
	
	//Funcion initPots
	var initPots = function(objeto, teams) {
		var html = '<ul>';
		var currentPot = 1;
		$.each(objeto, function(i,pot){
			html += '<li id="p'+pot.id+'" class="pot">';
			html += '<div class="title">POTE '+(currentPot++)+'</div>';
			$.each(pot.teams, function(j,team) {
				var clase = '';
				if(j<pot.teams.length-2){
					if((j%2)==0){
						clase = ' bordertop';
					}else{
						clase = ' borderlasttop';
					}
				}
				if(j==pot.teams.length-2){
					clase = ' borderbottom';	
				}
									
				html += '<div id="p'+pot.id+'-'+team.posPot+'" class="team'+clase+'"><div class="flag"><img src="'+teams['t'+team.id].bandera+'"></div><div class="name"><span>'+teams['t'+team.id].nombre+'</span></div></div>';
			});
			html += '</li>';
			
			if(!hashPots.hasOwnProperty(pot.id))
				hashPots[pot.id] = i;
		});
		html += '</ul>';
		$('#pots').html(html);
	}
	
	//Funcion initGroups
	var initGroups = function(objeto, teams) {
		var html = '<ul>';
		$.each(objeto, function(i,group){
			html += '<li id=\'g'+group.id+'\' class="group">';
			html += '<div class="title">GRUPO '+group.id+'</div>';
			$.each(group.teams, function(j,team) {
				var clase = '';
				if(j<group.teams.length-2){
					if((j%2)==0){
						clase = ' bordertop';
					}else{
						clase = ' borderlasttop';
					}
				}
				if(j==group.teams.length-2){
					clase = ' borderbottom';	
				}
				var contenido = '<div class="info"><div class="flag"><img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/empty_24x24.png"></div><div class="name"><span>--</span></div></div>';
				html += '<div id=\'g'+group.id+'-'+team.posGroup+'\' class="team'+clase+'">'+contenido+'</div>';
			});
			html += '</li>';
			
			if(!hashGroups.hasOwnProperty(group.id))
				hashGroups[group.id] = i;
		});
		html += '</ul>';
		$('#groups').html(html);
	}
	
	//Funcion animatePot
	var animatePot = function(id, timing) {
		var displacement = (hashPots[id]-currentPot)
		scrollPots += displacement*$('.pot').outerWidth(true);
		currentPot = hashPots[id];
		$('#pots').filter(':not(:animated)').animate({
			scrollLeft : scrollPots
		},timing);
	}
	
	//Funcion animateGroup
	var animateGroup = function(id, timing) {
		var displacement = (hashGroups[id]-currentGroup)
		scrollGroups += displacement*$('.group').outerWidth(true);
		currentGroup = hashGroups[id];
		$('#groups').filter(':not(:animated)').animate({
			scrollLeft : scrollGroups
		},timing);
	}
		
	//Funcion updatePot
	var updatePot = function(id, pos, team, timing) {
		$('#p'+id+'-'+pos).delay(timing).animate({ opacity: 0.3 });
	}
	
	//Funcion updatePot
	var updateGroup = function(id, pos, team, timing) {
		var info = '<div class="flag"><img src="'+teams['t'+team].bandera+'"></div><div class="name"><span>'+teams['t'+team].nombre+'</span></div>';
		var estadisticas = '<div class="country">'+teams['t'+team].nombre.toUpperCase()+'</div>' +
		                   '<div class="stats">Estad&iacute;sticas hist&oacute;ricas</div>' +
						   '<div class="data">' +
								'<ul><li><div class="statistic"><div class="parameter">PJ</div><div class="value">'+teams['t'+team].estadisticas['JJ']+'</div></div></li>' +
		                        '<li><div class="statistic"><div class="parameter">PG</div><div class="value">'+teams['t'+team].estadisticas['JG']+'</div></div></li>' +
								'<li><div class="statistic"><div class="parameter">PE</div><div class="value">'+teams['t'+team].estadisticas['JE']+'</div></div></li>' +
								'<li><div class="statistic"><div class="parameter">PP</div><div class="value">'+teams['t'+team].estadisticas['JP']+'</div></div></li>' +
								'<li><div class="statistic"><div class="parameter">GF</div><div class="value">'+teams['t'+team].estadisticas['GF']+'</div></div></li>' +
								'<li><div class="statistic"><div class="parameter">GC</div><div class="last">'+teams['t'+team].estadisticas['GC']+'</div></div></li></ul>' +
							'</div>';
		var html = '<div class="cerrar">X</div><div class="info">'+info+'</div><div class="statistics">'+estadisticas+'</div>';
		$('#g'+id+'-'+pos).css({ opacity: 0.0 }).html(html).delay(timing).animate({ opacity: 1.0 });
	}
	
	//Funcion clearDraw
	var clearDraw = function() {
		$('#pots .team').css('opacity',1.0);
		$('#groups .team').html('<div class="info"><div class="flag"><img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/empty_24x24.png"></img></div><div class="name"><span>--</span></div></div>');
	}
	
	//Funcion updateDraw
	var updateDraw = function() {
		$.when(getStatusDraw()).done(function(request){	
			//Obtenemos la informacion de nuestros feeds.
			statusDraw = request.draw;
			if(replayStatus==false && statusDraw.length>currentTeam){
				$('#replayDraw').attr('disabled','disabled');
				for(var i=currentTeam;i<statusDraw.length;i++){
					replayStatusDraw.push(statusDraw[i]);
				}
				currentTeam=statusDraw.length;
				setTimeout(setCurrentEvent,3000);
			}
		});
	}
	//Funcion setCurrentEvent
	var setCurrentEvent = function() {
		timing = (replayStatus)?1000:3000;
		if(replayStatusDraw.length>0){
			if(!activeAnimation){
				currentEvent = replayStatusDraw.shift();
				animateEvent(currentEvent);
			}
			setTimeout(setCurrentEvent,timing);
		}else{
			if(!activeAnimation){
				replayStatus = false;
				$('#replayDraw').removeAttr('disabled');
				$('#replayDrawMobile').removeAttr('disabled');
				initEvents();
				if($('.viewMobile').css('display')=='inline-block'){
					initEventsMobile();
				}else{
					deleteEventsMobile();
				}
			}else{
				setTimeout(setCurrentEvent,timing);
			}
		}
	}
	
	var chainedAnimation = function() {
		var timing = 1000;
		switch(stepAnimation){
			case 1:
				timing = (replayStatus)?500:2000;
				chainedAnimationInit();
				chainedAnimation1(timing);
				stepAnimation++;
				break;
			case 2:
				timing = (replayStatus)?250:1000;
				chainedAnimation2(timing);
				stepAnimation++;
				break;
			case 3:
				timing = (replayStatus)?1000:4000;
				chainedAnimation3(timing);
				stepAnimation++;
				break;
			case 4:
				timing = (replayStatus)?500:2000;
				chainedAnimation4(timing);
				stepAnimation++;
				break;
			case 5:
				timing = (replayStatus)?500:2000;
				chainedAnimation5(timing);
				stepAnimation++;
				break;
			case 6:
				timing = (replayStatus)?100:500;
				chainedAnimation6(timing);
				stepAnimation++;
				break;
			default:
				stepAnimation=1;
				activeAnimation=false;			
		}
		
		if(activeAnimation)
			setTimeout(chainedAnimation,timing);	
	}
	
	var chainedAnimationInit = function() {
		var htmlCS = '<div class="flag"><img src="'+teams['t'+currentEvent.id].bandera+'"></div><div class="name">'+teams['t'+currentEvent.id].nombre+'</div>';
		var htmlGS = 'Grupo '+currentEvent.group.id;
		$('.country_selected').html(htmlCS);
		$('.group_selected').html(htmlGS);
	}
	
	var chainedAnimation1 = function(timing) {
		$('.country_selected').attr('style','').css('opacity',0).show();
		$('.country_selected').animate({opacity:1.0},timing);
	}
	
	var chainedAnimation2 = function(timing) {
		var id = currentEvent.pot.id;
		var pos = currentEvent.pot.posPot;
		$('#p'+id+'-'+pos).animate({ opacity: 0.3 },timing);
	}
	
	var chainedAnimation3 = function(timing) {
		$('.group_selected').css('opacity',0).show();
		$('.group_selected').animate({opacity:1.0},timing);
	}
	
	var chainedAnimation4 = function(timing) {
		$('.group_selected').animate({opacity:0.0},timing).hide();
	}
	
	var chainedAnimation5 = function(timing) {
		var id = currentEvent.group.id;
		var pos = currentEvent.group.posGroup;
		var positionI = $('.country_selected').offset();
        var positionF = $('#g'+id+'-'+pos).offset();
		$('.country_selected').css('z-index', 100);
        $('.country_selected').transition({ x: (positionF.left-positionI.left), y: (positionF.top-positionI.top), opacity: 0.0 },timing);
	}
	
	var chainedAnimation6 = function(timing) {
		updateGroup(currentEvent.group.id,currentEvent.group.posGroup,currentEvent.id,timing);
	}
	
	//Funcion animateEvent
	var animateEvent = function(currentEvent) {
		var timing;
		
		if(!activeAnimation){
			
			if(replayStatus)
				currentTeam++;
				
			activeAnimation = true;
			if(viewMobile){
				timing = 1000;
				animatePot(currentEvent.pot.id,timing);
				
				timing = 1000;
				animateGroup(currentEvent.group.id,timing);	
			}
			setTimeout(chainedAnimation,1000);
		}
	}
	
	var initEvents = function() {
		$('#groups .info').on('click', function() {
			var parentId = $(this).parent().attr('id');
			var idSplit = parentId.split('-');
			$('.cerrar').hide();
			$('.statistics').hide();
			var position = $('#'+idSplit[0]).position();
			$(this).prev('.cerrar').css('top',position.top-20).css('left',position.left+209);
			$(this).next('.statistics').css('top',position.top).css('left',position.left);
			if(currentId!=parentId){
				sameInfo = false;
				$(this).prev('.cerrar').show('fast');
				$(this).next('.statistics').show('fast');
				currentId = parentId;
			}else{
				sameInfo = !sameInfo;
				if(!sameInfo){
					$(this).prev('.cerrar').show('fast');
					$(this).next('.statistics').show('fast');
					currentId = parentId;	
				}
			}
		});		
		
		$('.statistics').on('click', function() {
			$('.cerrar').hide();
			$('.statistics').hide();
		});
		
		$('.cerrar').on('click', function() {
			$('.cerrar').hide();
			$('.statistics').hide();
		});
	}
	
	var initEventsMobile = function() {	
		activeSwipe = false;
		currentPot = 0;
		currentGroup = 0; 
		scrollPots = 0;
		scrollGroups = 0;
		$('#pots').scrollLeft(scrollPots);
		$('#groups').scrollLeft(scrollGroups);
		$('#pots ul').css('width',$('.pot').length*$('.pot').outerWidth(true));
		$('#groups ul').css('width',$('.group').length*$('.group').outerWidth(true));
		$('.infinitePots').on('swipeleft', function() {
			if(!activeSwipe){
				if(scrollPots<($('.pot').length*$('.pot').outerWidth(true))){
					activeSwipe = true;
					scrollPots += $('.pot').outerWidth(true);
					$('#pots').filter(':not(:animated)').animate({
						scrollLeft : scrollPots
					},function(){
						activeSwipe = false;
						currentPot++;
					});
				}
			}
		});
		$('.infinitePots').on('swiperight', function() {
			if(!activeSwipe){
				if(scrollPots>0){
					activeSwipe = true;
					scrollPots -= $('.pot').outerWidth(true);
					$('#pots').filter(':not(:animated)').animate({
						scrollLeft : scrollPots
					},function(){
						activeSwipe = false;
						currentPot--;
					});
				}
			}
		});
		$('.infiniteGroups').on('swipeleft', function() {
			if(!activeSwipe){
				if(scrollGroups<($('.group').length*$('.group').outerWidth(true))){
					activeSwipe = true;
					scrollGroups += $('.group').outerWidth(true);
					$('#groups').filter(':not(:animated)').animate({
						scrollLeft : scrollGroups
					},function(){
						activeSwipe = false;
						currentGroup++;
					});
				}
			}
		});
		$('.infiniteGroups').on('swiperight', function() {
			if(!activeSwipe){
				if(scrollGroups>0){
					activeSwipe = true;
					scrollGroups -= $('.group').outerWidth(true);
					$('#groups').filter(':not(:animated)').animate({
						scrollLeft : scrollGroups
					},function(){
						activeSwipe = false;
						currentGroup--;
					});
				}
			}
		});
		viewMobile=true;	
	}	
	var deleteEventsMobile = function() {
		$('#pots ul').css('width','');
		$('#groups ul').css('width','');
		$('.infinitePots').off('swipeleft');
		$('.infinitePots').off('swiperight');
		$('.infiniteGroups').off('swipeleft');
		$('.infiniteGroups').off('swiperight');
	}
	//Metodo principal
	$.when(getTeams(), getPots(), getGroups(), getStatusDraw()).done(function(request1, request2, request3, request4){	
		if(request1[1]==='success'&&request2[1]==='success'&&request3[1]==='success'&&request4[1]==='success'){
			//Obtenemos la informacion de nuestros feeds.
			teamsDraw = request1[0];
			potsDraw = request2[0];
			groupsDraw = request3[0];
			statusDraw = request4[0];
			currentTeam = 0;
			
			teams = initTeams(teamsDraw.teams);
									
			initPots(potsDraw, teams);
			initGroups(groupsDraw, teams);
													
			$.each(statusDraw.draw, function(index,action) {
				updatePot(action.pot.id,action.pot.posPot,action.id,0);
				updateGroup(action.group.id,action.group.posGroup,action.id,0);
				currentTeam++;
			});	
			
			initEvents();

			if($('.viewMobile').css('display')=='inline-block'){
				initEventsMobile();
			}else{
				deleteEventsMobile();
			}
									
			timerId = setInterval(updateDraw,3000);
		}	
	});
	
	$('#replayDraw').on('click', function() {
		$('#replayDraw').attr('disabled','disabled');
		$('#replayDrawMobile').attr('disabled','disabled');
		$.when(getStatusDraw()).done(function(request){
			currentTeam=0;
			activeSwipe = true;
			replayStatus = true;
			clearDraw();
			deleteEventsMobile();
			replayStatusDraw = request.draw;
			setTimeout(setCurrentEvent,3000);
		});					
    });
	
	$('#replayDrawMobile').on('click', function() {
		$('#replayDraw').attr('disabled','disabled');
		$('#replayDrawMobile').attr('disabled','disabled');
		$.when(getStatusDraw()).done(function(request){	
			currentTeam=0;
			activeSwipe = true;
			replayStatus = true;
			clearDraw();
			deleteEventsMobile();
			replayStatusDraw = request.draw;
			setTimeout(setCurrentEvent,3000);
		});					
    });
	
	$(window).resize(function() {
        if($('.viewMobile').css('display')=='inline-block'){
			initEventsMobile();
		}else{
			deleteEventsMobile();
		}
    });
});