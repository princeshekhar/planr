$(document).ready(function(e){
	// $('.show-loading').click(function(e){
	// 	if(!$(this).hasClass('selected'))
	// 	{
	// 		// $('#primary-ajax-content').fadeOut(800);
	// 		$('#ajax-loader').fadeIn(800);
	// 	}
	// });
	// ajaxFetcher($('.first-load').attr('href') , '#primary-ajax-content');
	// $('.side-btn').click(function(e){
	// 	if(!$(this).hasClass('selected'))
	// 	{
	// 		$(this).closest('.sidebar').find('.selected').removeClass('selected');
	// 		$(this).addClass('selected');
	// 		ajaxFetcher($(this).attr('href') , '#primary-ajax-content');
	// 	}
	// });
	// function ajaxFetcher(url,where_to_load)
	// {
	// 	$.ajax({
	// 		url : url,
	// 		success:function(data){
	// 			$(where_to_load).html(data);
	// 			$(where_to_load).fadeIn(800);
	// 			$('#ajax-loader').fadeOut(800);
	// 		}
	// 	})
	// }
	// TXN Notifications

		$('.alert-generator').click(function(){
			$alert= $(this);
			var alertType = $alert.attr('alert-type');
			var alertMessage = $alert.attr('alert-message');
			var alertSticky = $alert.attr('alert-sticky');
			addAlert(alertType,alertSticky,alertMessage);
		});
		$(document).on('click','.technited-alert' ,function(){
			$(this).animate({'marginTop' : '-45px' , 'opacity' : '0.0'},800 , function(){
			$(this).remove();
			if($(this).hasClass('regular'))
			alertCount--;
			// console.log('Alert Click :: ' + alertCount);
			});
		});


	//TXN CLicks
	$('.please-wait').click(function(){
		$(this).addClass('disabled');
		var width = $(this).css('width');
		$(this).css('width',width);
		$(this).html('Please Wait');
	});

});

var alertCount=0;
function addAlert(type,sticky,message)
{
    var htmlDom='<div class="technited-alert '+type+' '+sticky+'">'+message+'</div>';
    $('.alert-container').append(htmlDom);
    if(alertCount==0)
    {
        startRemoving();
    }
    if(sticky == 'regular')
        alertCount++;
    // console.log('AddAlert :: ' + alertCount);
}

function startRemoving()
{
    setTimeout(
        function() {
            $('.alert-container').find('.technited-alert.regular').first().animate({'marginTop' : '-45px' , 'opacity' : '0.0'},800 , function(){
                $('.alert-container').find('.technited-alert.regular').first().remove();
                alertCount--;
                // console.log('StartRemoving :: ' + alertCount);
                startRemoving();
            });
        }
        , 2000);
}