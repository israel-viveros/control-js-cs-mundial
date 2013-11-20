/*
    Developer: Israel Viveros;
    Version: 1.0;
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
                var HeaderNoOficial = '<header class=\"header_inoficial\"><nav><div class=\"inner\"><a href=\"#\"><i class=\"tvsa-caret-down\"></i></a><ul><li class=\"first\"><a href=\"#\" title=\"Link Description\"><span>Home TD</span></a></li><li><a href=\"#\" title=\"Link Description\"><span>Futbol</span></a></li><li><a href=\"#\" title=\"Link Description\"><span>Futbol Internacional</span></a></li><li class=\"active\"><a href=\"#\" title=\"Link Description\"><span>Box</span></a></li><li class=\"last\"><a href=\"#\" title=\"Link Description\"><span>NBA</span></a></li></ul></div><div class=\"header_sub_menu\"><ul class=\"ul_menu\"><li class=\"sm_left\"><a href=\"#\">Home TD</a></li><li><a href=\"#\">Futbol</a></li><li class=\"sm_left\"><a href=\"#\">Futbol Internacional</a></li><li><a href=\"#\">Box</a></li><li class=\"sm_left\"><a href=\"#\">NBA</a></li><li> &nbsp;</li></ul></div></nav><div class=\"inner container_img\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/arte.gif\" alt=\"Imagen description\" class=\"banner_no_oficial\" width=\"850\" height=\"210\"><a href=\"#\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoTD.png\" alt=\"\" class=\"logo_td\" width=\"150\" height=\"75\"></a><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoBrasil.png\" alt=\"\" class=\"logo_brasil\" width=\"300\" height=\"210\"></div></header>';
                $("#drawHeader").html(HeaderNoOficial);

            } else {
                var HeaderOficial = '<div class=\"header\"><nav><div class=\"inner\"><a href=\"#\"><i class=\"tvsa-caret-down\"></i></a><ul><li class=\"first\"><a href=\"#\" title=\"Link Description\"><span>Home TD</span></a></li><li><a href=\"#\" title=\"Link Description\"><span>Futbol</span></a></li><li><a href=\"#\" title=\"Link Description\"><span>Futbol Internacional</span></a></li><li class=\"active\"><a href=\"#\" title=\"Link Description\"><span>Box</span></a></li><li class=\"last\"><a href=\"#\" title=\"Link Description\"><span>NBA</span></a></li></ul></div><div class=\"header_sub_menu\"><ul class=\"ul_menu\"><li class=\"sm_left\"><a href=\"#\">Home TD</a></li><li><a href=\"#\">Futbol</a></li><li class=\"sm_left\"><a href=\"#\">Futbol Internacional</a></li><li><a href=\"#\">Box</a></li><li class=\"sm_left\"><a href=\"#\">NBA</a></li><li>&nbsp;</li></ul></div></nav><div class=\"inner container_img\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/arteOficial.gif\" alt=\"Imagen description\" class=\"banner_no_oficial\" width=\"850\" height=\"210\"><a href=\"#nolink?\" title=\"notitle?\"><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoTD.png\" alt=\"\" class=\"logo_td\" width=\"150\" height=\"75\"></a><img src=\"http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/img/logoBrasilOficial.png\" alt=\"\" class=\"logo_brasil\" width=\"300\" height=\"210\"></div></div>';
                $("#drawHeader").html(HeaderOficial);
            }
        }
var photogalleries = new Object;

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
        