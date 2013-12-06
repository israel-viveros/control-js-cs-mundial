/*
    Developer: Israel Viveros;
    Version: 1.5;
*/
var countrycode = new Object();

        countrycode.VerificaVar = function (){
            if(typeof(MN_geo) != "undefined"){
                countrycode.valida();
            }else{ 
                $.ajax({
                    url: 'http://geoip.esmas.com',                  
                    dataType: 'script',                 
                })
                .done(function() {
                    countrycode.valida();                     
                })              
            }
        }
        countrycode.valida = function() {
            if (MN_geo.country === "USA") {
                var HeaderNoOficial = '<header class=\"header_inoficial\"><nav><div class=\"inner\"><a href=\"#\"><i class=\"tvsa-caret-down\"></i></a><ul><li class=\"first\"><a href=\"http://televisadeportes.esmas.com/\" title=\"Televisa Deportes\"><span>Home TD</span></a></li><li><a href=\"http://televisadeportes.esmas.com/futbol/futbol-general/\" title=\"Futbol\"><span>Futbol</span></a></li><li><a href=\"http://televisadeportes.esmas.com/futbol/futbolinternacional/\" title=\"Futbol Internacional\"><span>Futbol Internacional</span></a></li><li><a href=\"http://televisadeportes.esmas.com/box/\" title=\"Box\"><span>Box</span></a></li><li class=\"last\"><a href=\"http://televisadeportes.esmas.com/basquetbol/\" title=\"NBA\"><span>NBA</span></a></li></ul></div><div class=\"header_sub_menu\"><ul class=\"ul_menu\"><li class=\"sm_left\"><a href=\"http://televisadeportes.esmas.com/\">Home TD</a></li><li><a href=\"http://televisadeportes.esmas.com/futbol/futbol-general/\">Futbol</a></li><li class=\"sm_left\"><a href=\"http://televisadeportes.esmas.com/futbol/futbolinternacional/\">Futbol Internacional</a></li><li><a href=\"http://televisadeportes.esmas.com/box/\">Box</a></li><li class=\"sm_left\"><a href=\"http://televisadeportes.esmas.com/basquetbol/\">NBA</a></li><li> &nbsp;</li></ul></div></nav><div class=\"inner container_img\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/arte.gif\" class=\"banner_no_oficial\" width=\"850\" height=\"210\"><a href=\"http://televisadeportes.esmas.com/\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoTD.png\" alt=\"Televisa Deportes\" class=\"logo_td\" width=\"150\" height=\"75\"></a><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoBrasil.png\" alt=\"\" class=\"logo_brasil\" width=\"300\" height=\"210\"></div></header>';
                $("#drawHeader").html(HeaderNoOficial);
                photogalleries.menuMobile();

            } else {
                //var HeaderOficial = '<div class=\"header\"><nav><div class=\"inner\"><a href=\"#\"><i class=\"tvsa-caret-down\"></i></a><ul><li class=\"first\"><a href=\"http://televisadeportes.esmas.com/\" title=\"Televisa Deportes\"><span>Home TD</span></a></li><li><a href=\"http://televisadeportes.esmas.com/futbol/futbol-general/\" title=\"Futbol\"><span>Futbol</span></a></li><li><a href=\"http://televisadeportes.esmas.com/futbol/futbolinternacional/\" title=\"Futbol Internacional\"><span>Futbol Internacional</span></a></li><li><a href=\"http://televisadeportes.esmas.com/box/\" title=\"Box\"><span>Box</span></a></li><li class=\"last\"><a href=\"http://televisadeportes.esmas.com/basquetbol/\" title=\"NBA\"><span>NBA</span></a></li></ul></div><div class=\"header_sub_menu\"><ul class=\"ul_menu\"><li class=\"sm_left\"><a href=\"http://televisadeportes.esmas.com/\">Home TD</a></li><li><a href=\"http://televisadeportes.esmas.com/futbol/futbol-general/\">Futbol</a></li><li class=\"sm_left\"><a href=\"http://televisadeportes.esmas.com/futbol/futbolinternacional/\">Futbol Internacional</a></li><li><a href=\"http://televisadeportes.esmas.com/box/\">Box</a></li><li class=\"sm_left\"><a href=\"http://televisadeportes.esmas.com/basquetbol/\">NBA</a></li><li>&nbsp;</li></ul></div></nav><div class=\"inner container_img\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/arteOficial.gif\" class=\"banner_no_oficial\" width=\"850\" height=\"210\"><a href=\"http://televisadeportes.esmas.com/\" title=\"Televisa Deportes\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoTD.png\" alt=\"Televisa Deportes\" class=\"logo_td\" width=\"150\" height=\"75\"></a><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoBrasilOficial.png\" alt=\"\" class=\"logo_brasil\" width=\"300\" height=\"210\"></div></div>';
               var HeaderOficial = '<header class=\"header_inoficial\"><nav><div class=\"inner\"><a href=\"#\"><i class=\"tvsa-caret-down\"></i></a><ul><li class=\"first\"><a href=\"http://televisadeportes.esmas.com/\" title=\"Televisa Deportes\"><span>Home TD</span></a></li><li><a href=\"http://televisadeportes.esmas.com/futbol/futbol-general/\" title=\"Futbol\"><span>Futbol</span></a></li><li><a href=\"http://televisadeportes.esmas.com/futbol/futbolinternacional/\" title=\"Futbol Internacional\"><span>Futbol Internacional</span></a></li><li><a href=\"http://televisadeportes.esmas.com/box/\" title=\"Box\"><span>Box</span></a></li><li class=\"last\"><a href=\"http://televisadeportes.esmas.com/basquetbol/\" title=\"NBA\"><span>NBA</span></a></li></ul></div><div class=\"header_sub_menu\"><ul class=\"ul_menu\"><li class=\"sm_left\"><a href=\"http://televisadeportes.esmas.com/\">Home TD</a></li><li><a href=\"http://televisadeportes.esmas.com/futbol/futbol-general/\">Futbol</a></li><li class=\"sm_left\"><a href=\"http://televisadeportes.esmas.com/futbol/futbolinternacional/\">Futbol Internacional</a></li><li><a href=\"http://televisadeportes.esmas.com/box/\">Box</a></li><li class=\"sm_left\"><a href=\"http://televisadeportes.esmas.com/basquetbol/\">NBA</a></li><li> &nbsp;</li></ul></div></nav><div class=\"inner container_img\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/arte.gif\" class=\"banner_no_oficial\" width=\"850\" height=\"210\"><a href=\"http://televisadeportes.esmas.com/\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoTD.png\" alt=\"Televisa Deportes\" class=\"logo_td\" width=\"150\" height=\"75\"></a><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoBrasil.png\" alt=\"\" class=\"logo_brasil\" width=\"300\" height=\"210\"></div></header>';
                $("#drawHeader").html(HeaderOficial);
                photogalleries.menuMobile();
            }
        }
var photogalleries = new Object;

photogalleries.menuMobile = function (){

    $('nav i').on('click',function(e){
                        e.preventDefault();
                        $('nav').find('.header_sub_menu').slideToggle('slow');
                        var class_i = $(this).attr('class');
                        if(class_i == 'tvsa-caret-down')
                        {
                            $(this).removeClass('tvsa-caret-down').addClass('tvsa-caret-up');
                        }
                        else
                        {
                            $(this).removeClass('tvsa-caret-up').addClass('tvsa-caret-down');
                        }
                        
                    });
}

photogalleries.carrusel = function() {
    var nuevo = $.parseJSON($('span.data').text());
    var carruselBody = "";
    var FlagFirstImg = false;

    $.each(nuevo, function(k, v) {
        $.each(v, function(e, r) {
            $.each(r, function(l, u) {
                if (l === 0 && FlagFirstImg === false) {
                    $("img.mainimage").attr({
                        "src": u.path,
                        "alt": u.description
                    });
                    $(".imageDescription").html(u.description);
                    FlagFirstImg = true;
                };
                carruselBody += '<li>';
                carruselBody += '<a href="#" class="image" data-pos="' + parseInt(l + 1) + '" title="' + u.description + '">';
                carruselBody += '<img src="' + u.path + '" width="64" height="48" alt="' + u.description + '" class="" />';
                carruselBody += '<span class="border"></span>';
                carruselBody += '<span class="icon"><i class="tvsa-camera"></i></span>';
                carruselBody += '<span class="title">' + u.description + '</span>';
                carruselBody += '</a>';
                carruselBody += '</li>';
            });

        });
    });
    $("ul.ulcarrusel").html(carruselBody);
    $("ul.ulcarrusel li:nth-child(1)").children("a").addClass("active");
}

photogalleries.vars = function() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
photogalleries.embed = function() {
    var urlVars = photogalleries.vars();
    if (urlVars['embed']) {
        $("div#drawHeader, footer, div.content, div.container-right").remove();
    }
}

photogalleries.dostat = function() {
    var pix = new Image();
    pix.src = doStats('return');
}
photogalleries.DisableDoStat = function(){
    var urlVarEnabled = photogalleries.vars();
    if (urlVarEnabled['nostats']) {
        return true;
    }
}

$(function() {
    countrycode.VerificaVar();
    photogalleries.carrusel(); 
    photogalleries.embed(); 

});
        