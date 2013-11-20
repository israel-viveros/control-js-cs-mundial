/*
    Developer: viveros 1.5
*/
var MundialFunctions = new Object;

MundialFunctions.Photoplayer = function() {
    //var variablesPhoto = "/embed?pausa=true&fullscreen=false&nostats=1";
    var variablesPhoto = "?nostats=1";
    $(".GeneratesrcGallery").find("iframe").attr("src", $(".GeneratesrcGallery iframe").data("galeria") + variablesPhoto);
}


MundialFunctions.Videoplayer = function() {
    $(".Mundial-clickToPlayVideoOnStage").click(function(event) {
        event.preventDefault();
        var urlVideo = "http://tvolucion.esmas.com/embed/embed_ampp.php?id=";
        var videoStage = $(this).data("stage");
        var idvideo = $(this).data("id");
        $("#" + videoStage).html('<iframe src= "'+urlVideo+idvideo+'&autoplay=true" width="100%" height="100%"  class="MundialVideoPlayer" allowtransparency="true" frameborder="0" scrolling="no"></iframe>');

    });
}

var CalcutateHeightIframe = new Object;
    CalcutateHeightIframe.Video = function (){
        var relation = 0.61;
        var ActualWidth = $("#PlayIDTagVideoPlayer").outerWidth();
        var newHeight = ActualWidth*relation;
         $("#PlayIDTagVideoPlayer iframe, .video, .videoWrapper").css("height",newHeight+"px");
    }
    CalcutateHeightIframe.Fotoplayer = function (){
        var relation = 0.85;
        var ActualWidth = $(".GeneratesrcGallery").find("iframe").outerWidth();
        var newHeight = ActualWidth*relation;
         $(".GeneratesrcGallery iframe, .GeneratesrcGallery").css("height",newHeight+"px");
    }



//Calling MundialFunctions

$(function() {
    if ($(".GeneratesrcGallery").length) {
        MundialFunctions.Photoplayer();
    }

    if ($(".Mundial-clickToPlayVideoOnStage").length) {
        MundialFunctions.Videoplayer();
    }


    if($("#PlayIDTagVideoPlayer").length){
        CalcutateHeightIframe.Video();
        $(".Mundial-clickToPlayVideoOnStage").click(function(event) {
            CalcutateHeightIframe.Video();
        });
    }
    if($(".GeneratesrcGallery").length){
        CalcutateHeightIframe.Fotoplayer(); 
    }
    
    $(window).resize(function(event) {
        if($("#PlayIDTagVideoPlayer").length){
            CalcutateHeightIframe.Video();
        }
        if($(".GeneratesrcGallery").length){
            CalcutateHeightIframe.Fotoplayer(); 
        }
    });

});

