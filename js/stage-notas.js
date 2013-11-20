$(function(){
    $(".StageContainerThumbs").carouFredSel({
        auto:false,prev:".PrevCarouselMundial",
        next:".NextCarouselMundial",
        responsive:true,
        swipe:{onTouch:true},
        items:{visible:4},
        scroll:{items:1}
    });
    $(".StageContainterLarge").carouFredSel({
        auto:true,
        responsive:true,
        width:"100%",
        swipe:{onTouch:true},
        items:{visible:1},
        synchronise:"#StageContainerThumbs",
        scroll:{timeoutDuration:5000,onBefore:function(){
            $(".StageContainerThumbs li").removeClass("active");
            $(".descriptionOutMundial .TitleEdiStageContainerLarge").hide("fast").removeClass("active");
        },
        onAfter:function(b){
            var c=b.items.visible.first().data("statuslider");
            $(".descriptionOutMundial .TitleEdiStageContainerLarge").each(function(){
                if($(this).data("statuslider")===c){
                    var d=$(this);d.show("fast").addClass("active");
                }
            });
            $(".StageContainerThumbs li").each(function(){
                if($(this).data("statuslider")===c){
                    var d=$(this);d.addClass("active");
                }
            });
        }}
    });
    $(".StageContainerThumbs").find("li").bind("click",function(){
        var b=$(this).data("statuslider");
    $(".StageContainterLarge").trigger("slideTo",
        ['li[data-statuslider="'+b+'"]']);
    });
    $(window).bind("resize",a);
    function a(i){
        var d=$(window).width();
        var b=$(".buttonViewMoreNts a").data("corto");
        var g=$(".buttonViewMoreNts a").data("largo");
        if(d<624){$(".StageContainerThumbs").trigger("configuration",["items",7]);
            $(".buttonViewMoreNts a").text(b);
        }else{
            $(".StageContainerThumbs").trigger("configuration",["items",4]);
            $(".buttonViewMoreNts a").text(g);
        }
        var f=$(".StageContainterLarge").find("li").outerWidth();
        var k=f/1.33;var h=$(".StageContainterLarge li").parent("ul");
        var c=$(".StageContainterLarge").parent(".caroufredsel_wrapper");
        var j=$(".StageContainterLarge li");
        h.css({height:k});
        c.css({height:k});
        j.css({height:k});
    }
a();
});