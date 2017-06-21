$(function(){

    $('.content-border').on('click',function(e){
        // alert(1);
        var $div = $(this);
        var $others = $div.siblings();
        if($div.hasClass('content-border')){
            $div.removeClass('content-border').addClass('content-change');
         }else{
            $div.removeClass('congtent-change').addClass('content-border');
        }
         $others.addClass('content-border').removeClass('content-change');
        })



});