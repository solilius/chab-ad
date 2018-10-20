$(document).ready(function(){
    $('a').on('click', function(e){
        e.preventDefault();
        var ref = $(this).attr('href');
        goToPage(ref);
    });
    
    goToPage('/BannersViewer/banners_viewer.html');
  });
  
  function goToPage(ref){
    $.ajax({
        url: ref,
        type: 'GET',
        dataType: 'text',
        success: function(res){
            $('#view').html(res);
        },
        error: function(err){
            console.log('error: ',err);
        }
    });
  };