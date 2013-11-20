$(function(){
  var search = $("#test").attr("class");
  var search = search.split(' ');
  var param = '';
  console.log( location ); 
  if ( search.length > 0 ) {
    $.each( search, function( index, value ) {
      if( value !== '' )
        param += ( index === 0 ) ? 'from:' + value : ' OR from:' + value;
    });
  }

  boxTwitter( param );
  
  setInterval( function(){
    boxTwitter( param );
  },30000);
});

boxTwitter = function( param ) {
    var html = '';
    var url = '';
    if( location.hostname === 'cgs-003.esmas.com' ) {
      url = 'http://cgs-003.esmas.com/deportes30/twitteroauth.php';
    } else if( location.hostname === 'televisadeportes.esmas.com' ){
      url = 'http://televisadeportes.esmas.com/twitteroauth.php';
    } else {
      url = 'twitteroauth.php';
    }
    $.post( 'twitteroauth.php' , { pQ: 'search', param:param  } , function( data ){
      $.each( data, function( index, value ) {
        html += '<li class="showArrows">';
        html += '<div class="wdg_twitt_02_block one showArrows">';
        html += '<div class="wdg_twitt_02_img">';
        html += '<a href="#" title="'+value[0]['description']+'" class="ui-link"><img src="'+value[0]['image_profile']+'" alt="'+value[0]['description']+'"></a>';
        html += '</div>';
        html += '<div class="wdg_twitt_02_txt">';
        html += '<a href="#" title="'+value[0]['text']+'" class="ui-link">';
        html += '<h3 class="textcolor-title2">'+value[0]['name']+'<span class="cta_twitter textcolor-title4"> @'+value[0]['screen_name']+'</span></h3>';
        html += '<p>'+value[0]['text']+'</p>';
        html += '</a>';
        html += '<span class="wdg_twitt_02_blue">'+value[0]['time'];
        html += '- <a href="https://twitter.com/intent/tweet?in_reply_to='+value[0]['idTweet']+'" title="Link description" class="ui-link">Reply</a>';
        html += '- <a href="https://twitter.com/intent/retweet?tweet_id='+value['idTweet']+'" title="Link description" class="ui-link">Retweet</a>';
        html += '- <a href="https://twitter.com/intent/favorite?tweet_id='+value[0]['idTweet']+'" title="Link description" class="ui-link">Favorito</a>';
        html += '</span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="wdg_twitt_02_block showArrows">';
        html += '<div class="wdg_twitt_02_img">';
        html += '<a href="#" title="'+value[1]['description']+'" class="ui-link"><img src="'+value[1]['image_profile']+'" alt="'+value[1]['description']+'"></a>';
        html += '</div>';
        html += '<div class="wdg_twitt_02_txt">';
        html += '<a href="#" title="'+value[1]['text']+'" class="ui-link">';
        html += '<h3 class="textcolor-title2">'+value[1]['name']+'<span class="cta_twitter textcolor-title4"> @'+value[1]['screen_name']+'</span></h3>';
        html += '<p>'+value[1]['text']+'</p>';
        html += '</a>';
        html += '<span class="wdg_twitt_02_blue">'+value[1]['time']+'';
        html += '- <a href="https://twitter.com/intent/tweet?in_reply_to='+value[1]['idTweet']+'" title="Link description" class="ui-link">Reply</a>';
        html += '- <a href="https://twitter.com/intent/retweet?tweet_id='+value[1]['idTweet']+'" title="Link description" class="ui-link">Retweet</a>';
        html += '- <a href="https://twitter.com/intent/favorite?tweet_id='+value[1]['idTweet']+'" title="Link description" class="ui-link">Favorito</a>';
        html += '</span>';
        html += '</div>';
        html += '</div>';
        html += '</li>';
        
        $('.wdg_twitt_02_carousel').find('ul').html(html);
      });
    },'json');
  };