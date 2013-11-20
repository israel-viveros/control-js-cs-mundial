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
var activeInfo = false;
var stepAnimation = 1;
var activeAnimation = false;
var	hashPots = {};
var	hashGroups = {};

//Funcion getEquipos
var getEquipos = function() {
	return $.ajax({
		type: 'GET',
		url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/teams.jsonp',
		async: false,
		jsonpCallback: 'getTeams',
		contentType: "application/json",
		dataType: 'jsonp'
	});
}
//Funcion getPotes
var getPotes = function() {
	return $.ajax({
		type: 'GET',
		url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/sorteo/pots.jsonp',
		async: false,
		jsonpCallback: 'getPots',
		contentType: "application/json",
		dataType: 'jsonp'
	});
}
//Funcion getGrupos
var getGrupos = function() {
	return $.ajax({
		type: 'GET',
		url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/sorteo/groups.jsonp',
		async: false,
		jsonpCallback: 'getGroups',
		contentType: "application/json",
		dataType: 'jsonp'
	});
}
//Funcion getStatus
var getStatus = function() {
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
var initPots = function(objeto) {
	var html = '<ul>';
    var currentPot = 1;
	$.each(objeto, function(i,pot){
		html += '<li id="p'+pot.id+'" class="pot">';
		html += '<div class="title">ESFERA '+(currentPot++)+'</div>';
		$.each(pot.teams, function(j,team) {
			var classParent = '';
			var classChild = '';
			if(j<pot.teams.length){
				if((j%2)==0){
					classParent = ' borderright';
					classChild = ' marginright'
					if(j>=2) classChild += ' bordertop';
				}else{ 
				    classChild = ' marginleft'
					if(j>=2) classChild += ' bordertop';
				}
			}
			html += '<div id="p'+pot.id+'-'+team.posPot+'" class="team'+classParent+'"><div class="info'+classChild+'"><div class="flag"><img src="'+teams['t'+team.id].bandera+'"></div><div class="name"><span>'+teams['t'+team.id].nombre+'</span></div></div></div>';
		});
		html += '</li>';
		
		if(!hashPots.hasOwnProperty(pot.id))
			hashPots[pot.id] = i;
	});
	html += '</ul>';
	$('#pots').html(html);
}

//Funcion initGroups
var initGroups = function(objeto) {
	var html = '<ul>';
	$.each(objeto, function(i,group){
		html += '<li id=\'g'+group.id+'\' class="group">';
		html += '<div class="title">GRUPO '+group.id+'</div>';
		$.each(group.teams, function(j,team) {
			var classParent = '';
			var classChild = '';
			if(j<group.teams.length){
				if((j%2)==0){
					classParent = ' borderright';
					classChild = ' marginright'
					if(j>=2) classChild += ' bordertop';
				}else{ 
				    classChild = ' marginleft'
					if(j>=2) classChild += ' bordertop';
				}
			}
			var contenido = '<div class="info'+classChild+'"><div class="flag"><img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/empty_24x24.png"></div><div class="name"><span>--</span></div></div>';
			html += '<div id=\'g'+group.id+'-'+team.posGroup+'\' class="team'+classParent+'">'+contenido+'</div>';
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
	var clase = $('#g'+id+'-'+pos+' .info').attr('class');
	var html = '<div class="cerrar">X</div><div class="'+clase+'">'+info+'</div><div class="statistics">'+estadisticas+'</div>';
	$('#g'+id+'-'+pos).css({ opacity: 0.0 }).delay(timing).html(html).animate({ opacity: 1.0 });
}

//Funcion clearDraw
var clearDraw = function() {
	$('#pots .team').css('opacity',1.0);
	$('#groups .team').each(function() {
        var clase = $('.info',this).attr('class');
		$(this).html('<div class="'+clase+'"><div class="flag"><img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/empty_24x24.png"></img></div><div class="name"><span>--</span></div></div>');
	});
}

//Funcion updateDraw
var updateDraw = function() {
	$.when(getStatus()).done(function(request){	
		//Obtenemos la informacion de nuestros feeds.
		statusDraw = request.draw;
		if(statusDraw!==null){
			if(statusDraw.length==1){
				$('.infiniteGroups').show(500).removeAttr('style');
			}
			if(statusDraw.length==32){
				$('.control').show(500).removeAttr('style');
			}
			if(replayStatus==false && statusDraw.length>currentTeam){
				for(var i=currentTeam;i<statusDraw.length;i++){
					replayStatusDraw.push(statusDraw[i]);
				}
				currentTeam=statusDraw.length;
				setTimeout(setCurrentEvent,4000);
			}
		}
	});
}

//Funcion setCurrentEvent
var setCurrentEvent = function() {
    timing = (replayStatus)?1000:4000;
	if(replayStatusDraw.length>0){
        if(!activeAnimation){
            currentEvent = replayStatusDraw.shift();
            animateEvent(currentEvent);
        }
        
		setTimeout(setCurrentEvent,timing);
	}else{
        if(!activeAnimation){
			initEvents();
			if($('.viewMobile').css('display')=='none'){
				deleteEventsMobile();
			}else{
				initEventsMobile();
			}
		}else{
			setTimeout(setCurrentEvent,timing);
		}
	}
}

//Funcion chainedAnimation
var chainedAnimation = function() {
	var timing = 1000;

	switch(stepAnimation){
		case 1:
			timing = (replayStatus)?1000:1000;
			chainedAnimationInit();
			chainedAnimation1(timing);
			timing = 250;
			stepAnimation++;
			break;
		case 2:
			timing = (replayStatus)?250:250;
			chainedAnimation2(timing);
			timing = 2250;
			stepAnimation++;
			break;
		case 3:
			timing = (replayStatus)?1000:1000;
			chainedAnimation3(timing);
			timing = 4000;
			stepAnimation++;
			break;
		case 4:
			timing = (replayStatus)?100:100;
			chainedAnimation4(timing);
			timing = 250;
			stepAnimation++;
			break;
		case 5:
			timing = (replayStatus)?1000:1000;
			chainedAnimation5(timing);
			timing = 500;
			stepAnimation++;
			break;
		case 6:
			timing = (replayStatus)?100:100;
			chainedAnimation6(timing);
			stepAnimation++;
			break;
		default:
			stepAnimation=1;
			activeAnimation=false;		
			if(!replayStatus) reemplazar_texto(currentEvent.group.id+currentEvent.group.posGroup, currentEvent.id);	
	}
	
	if(activeAnimation)
		setTimeout(chainedAnimation,timing);	
}

var chainedAnimationInit = function() {
	var htmlCS = '<div class="info"><div class="flag"><img src="'+teams['t'+currentEvent.id].bandera+'"></div><div class="name"><span>'+teams['t'+currentEvent.id].nombre+'</span></div></div>';
	var htmlGS = '<div class="info"><div class="name">Grupo '+currentEvent.group.id+'</div></div>';
	$('.country_selected').html(htmlCS);
	$('.group_selected').html(htmlGS);
}

var chainedAnimation1 = function(timing) {
	$('.country_selected').attr('style','').css('opacity',0.2).css('visibility','visible').show(timing);
	$('.country_selected').animate({opacity:1.0},timing);
}

var chainedAnimation2 = function(timing) {
	var id = currentEvent.pot.id;
	var pos = currentEvent.pot.posPot;
	$('#p'+id+'-'+pos).animate({ opacity: 0.3 },timing);
}

var chainedAnimation3 = function(timing) {
	$('.group_selected').css('opacity',0.2).css('visibility','visible').show(timing);
	$('.group_selected').animate({opacity:1.0},timing);
}

var chainedAnimation4 = function(timing) {
	$('.group_selected').animate({opacity:0.0},timing).css('visibility','hidden');
}

var chainedAnimation5 = function(timing) {
	var id = currentEvent.group.id;
	var pos = currentEvent.group.posGroup;
	var positionI = $('.country_selected .flag').offset();
	var positionF = $('#g'+id+'-'+pos+' .info .flag').offset();
	$('.country_selected').css('z-index', 100);
	$('.country_selected').transition({ x: (positionF.left-positionI.left), y: (positionF.top-positionI.top), opacity: 0.0 },timing);
}

var chainedAnimation6 = function(timing) {
	updateGroup(currentEvent.group.id,currentEvent.group.posGroup,currentEvent.id,timing);
	$('.country_selected').attr('style','').css('opacity',0).css('visibility','hidden');
	$('.group_selected').attr('style','').css('opacity',0).css('visibility','hidden');
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
	
	replayStatus = false;
	$('#replayDraw').removeAttr('disabled');
	$('#replayDrawMobile').removeAttr('disabled');
	
	$('#groups .info .flag').on('touchstart click', function() {
		var $info = $(this).parent();
		var parentId = $info.parent().attr('id');
		var idSplit = parentId.split('-');
		$('.cerrar').hide();
		$('.statistics').hide();
		var position = $('#'+idSplit[0]).position();
		if($('.viewMobile').css('display')=='none'){
			$info.prev('.cerrar').css('top',position.top-36).css('left',position.left+194);
		}else{
			$info.prev('.cerrar').css('top',position.top-36).css('left',(((currentGroup+1)*$('.group').outerWidth(true))-36));
		}
		$info.next('.statistics').css('top',position.top).css('left',position.left);
		if(currentId!=parentId){
			sameInfo = false;
			$info.prev('.cerrar').show('fast');
			$info.next('.statistics').show('fast');
			currentId = parentId;
		}else{
			sameInfo = !sameInfo;
			if(!sameInfo){
				$info.prev('.cerrar').show('fast');
				$info.next('.statistics').show('fast');
				currentId = parentId;	
			}
		}
		activeInfo = true;
	});		
	
	$('.statistics').on('touchstart click', function() {
		$('.cerrar').hide();
		$('.statistics').hide();
		activeInfo = false;
	});
	
	$('.cerrar').on('touchstart click', function() {
		$('.cerrar').hide();
		$('.statistics').hide();
		activeInfo = false;
	});
}

var initEventsMobile = function() {	
	if(!viewMobile){
		currentPot = 0;
		currentGroup = 0; 
		viewMobile=true;
	}
	activeSwipe = false;
	initSwipes();
	scrollPots = currentPot*$('.pot').outerWidth(true);
	scrollGroups = currentGroup*$('.group').outerWidth(true);
	$('#pots').scrollLeft(scrollPots);
	$('#groups').scrollLeft(scrollGroups);
}

var deleteEventsMobile = function() {
	viewMobile=false;
	$('#pots ul').css('width','');
    $('#groups ul').css('width','');
}

//Metodo principal
var mainDrawWidget = function(countries, pots, groups, status) {
	teamsDraw = countries;
	potsDraw = pots;
	groupsDraw = groups;
	statusDraw = status;
	currentTeam = 0;
	currentPot = 0;
	currentGroup = 0; 
	activeSwipe = false;
	viewMobile = false;
			
	teams = initTeams(teamsDraw.teams);
					
	initPots(potsDraw);
	initGroups(groupsDraw);	
	
	$('.infiniteGroups').css('display','none');
	$('.control').css('display','none');
	
	if(statusDraw.draw!==null){	
		if(statusDraw.draw.length>0){
			$('.infiniteGroups').show(500).removeAttr('style');
		}
		if(statusDraw.draw.length==32){
			$('.control').show(500).removeAttr('style');
		}				
		$.each(statusDraw.draw, function(index,action) {
			updatePot(action.pot.id,action.pot.posPot,action.id,0);
			updateGroup(action.group.id,action.group.posGroup,action.id,0);
			currentTeam++;
		});	
	}
	
	$('.grupos_inoficial').css('opacity',0.2).show(500);
	$('.grupos_inoficial').animate({opacity:1.0},1000);
			
	initEvents();
	if($('.viewMobile').css('display')=='none'){
		deleteEventsMobile();
	}else{
		initEventsMobile();
	}
	
	if(currentTeam<32){				
		timerId = setInterval(updateDraw,4000);
	}
}

$('#replayDraw').on('touchstart click', function() {
	$('#replayDraw').attr('disabled','disabled');
	$('#replayDrawMobile').attr('disabled','disabled');
	$.when(getStatus()).done(function(request){
		replayStatusDraw = request.draw;
		if(replayStatusDraw!==null){
			currentTeam=0;
			activeSwipe = true;
			replayStatus = true;
			clearDraw();
			setTimeout(setCurrentEvent,4000);
		}
	});					
});

$('#replayDrawMobile').on('touchstart click', function() {
	$('#replayDraw').attr('disabled','disabled');
	$('#replayDrawMobile').attr('disabled','disabled');
	$.when(getStatus()).done(function(request){	
		replayStatusDraw = request.draw;
		if(replayStatusDraw!==null){
			currentTeam=0;
			activeSwipe = true;
			replayStatus = true;
			clearDraw();
			setTimeout(setCurrentEvent,4000);
		}
	});					
});

$(window).resize(function() {
	if($('.viewMobile').css('display')=='none'){
		deleteEventsMobile();
	}else{
		initEventsMobile();
	}
	if(activeInfo){
		$('.cerrar').hide();
		$('.statistics').hide();
		activeInfo = false;
	}
});

//Swipe handlers.
var potsLeft = function(event, direction) {
	if(!activeSwipe){
		if(currentPot<($('.pot').length-1)){
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
}
var potsRight = function(event, direction) {
	if(!activeSwipe){
		if(currentPot>0){
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
}
//Swipe handlers.
var groupsLeft = function(event, direction) {
	if(!activeSwipe){
		if(currentGroup<($('.group').length-1)){
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
}
var groupsRight = function(event, direction) {
	if(!activeSwipe){
		if(currentGroup>0){
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
}

var initSwipes = function(){
	$('.infinitePots').swipe( { swipeLeft:potsLeft, swipeRight:potsRight, allowPageScroll:"auto"} ); 
	$('.infiniteGroups').swipe( { swipeLeft:groupsLeft, swipeRight:groupsRight, allowPageScroll:"auto"} );
}