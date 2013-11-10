define(['plugins/router', 'durandal/app'], function (router, app) {
    var manageVenue = function () {
        //this.displayName = 'Welcome to the Durandal Starter Kit!';
    };


    var eventId = 0;

    function initializeMap() {
        var myLatlng = new google.maps.LatLng(28.6139, 77.2089);
        var mapOptions = {
            center: myLatlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("suggest-loc"),
            mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Sample',
            draggable: true

        });

        google.maps.event.addListener(marker, 'dragend', function(evt){
           $("#suggest-loc-coord").val(evt.latLng);

            var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + evt.latLng.lat() + "," + evt.latLng.lng() + "&sensor=true";

            $.get(url, function(data)
            {
                if(data.results.length>0)
                {
                    $("#suggest-loc-address").val(data.results[0].formatted_address);
                    $("#sugg-add").html(data.results[0].formatted_address);
                }
                else{
                    $("#suggest-loc-address").val();

                }
            })
        });
        map.setCenter(myLatlng);
    }

    function init()
    {
        initializeMap();

        $(".list-item a").unbind('click');
        $(".list-item a").click(function(e){
            $('body').css("overflow","auto");
        });

        if(_eventDetailsModel.loaded() == false || (_eventDetailsModel.loaded()==true && (_eventDetailsModel.eventId()!=eventId)))
        {
            titanUI.loadEventDetails(titanLive.connectionId, eventId, function()
            {
                ko.applyBindings(_eventDetailsModel, $(".page-host .row")[0]);
            });
        }
        else{
            ko.applyBindings(_eventDetailsModel, $(".page-host .row")[0]);
        }

        $("body").on( "click", ".up-button", function(e) {

           var id = $(this).attr("id");

           var likeObj = new LikeDislikeObj();

           likeObj.connectionId = titanLive.connectionId;
           likeObj.eventId = eventId;
           likeObj.suggestionId = id;

           titan.newLike(likeObj, function(data)
           {
               if(data == false)
               {
                   addAlert("warning","regular","You cannot vote twice.");
               }
           })
        });

        $("body").on( "click", ".down-button", function(e) {

            var id = $(this).attr("id");

            var dislikeObj = new LikeDislikeObj();

            dislikeObj.connectionId = titanLive.connectionId;
            dislikeObj.eventId = eventId;
            dislikeObj.suggestionId = id;

            titan.newDislike(dislikeObj, function(data)
            {
                if(data == false)
                {
                    addAlert("warning","regular","You cannot vote twice.");
                }
            })
        });

        $(".add-loc").click(function(e)
        {
            var newVenue = new NewVenueSuggestion();

            newVenue.connectionId = titanLive.connectionId;
            newVenue.eventId = eventId;
            newVenue.coordinates = $("#suggest-loc-coord").val();
            newVenue.address = $("#suggest-loc-address").val();

            titan.newVenueSuggestion(newVenue, function(data)
            {
               if(data.code == 0)
               {
                   addAlert("error","regular","Sorry, an error occurred.");
               }
                else{
                   addAlert("success","regular","Your Event Suggestion has been added.");
               }
            });
        })
        $('#data-suggest').slideUp(0);
        // $('#suggest-loc').removeClass('solid-hide');
        $('#suggestALocation').click(function(){
            $('#data-suggest').slideToggle(500);
        });
        $('.closeSuggest').click(function(){
            $('#data-suggest').slideUp(500);
        });



        $(".app-header-test-container").find(".top-icon.search").remove();

        if($(".app-header-test").find("#onlineCount").length==0)
        {
            $(".app-header-test").append('<div id="onlineCount" class="columns small-2 top-icon online"></div>');
        }

        $(".menu").unbind('click');
        $(".menu").click(function(e){
            if(!$("#eventSideBar").is(".showing"))
            {
                $("#eventSideBar").show();
                $("#eventSideBar").addClass("showing");
                $("#rightBarOnline").hide();
                $("#rightBarOnline").removeClass("showing");
                $('body').css("overflow","hidden");
            }
            else{
                $("#eventSideBar").hide();
                $("#eventSideBar").removeClass("showing");
                $('body').css("overflow","auto");
            }

        });

        $("#onlineCount").unbind('click');
        $("#onlineCount").click(function()
        {
            if(!$("#rightBarOnline").is(".showing"))
            {
                $("#rightBarOnline").show();
                $("#rightBarOnline").addClass("showing");
                $("#eventSideBar").hide();
                $("#eventSideBar").removeClass("showing");
                $('body').css("overflow","hidden");
            }
            else{
                $("#rightBarOnline").hide();
                $("#rightBarOnline").removeClass("showing");
                $('body').css("overflow","auto");
            }


        });
    }


    manageVenue.prototype.attached = function (view) {
       init();
    };

    manageVenue.prototype.activate = function(context){
        if(context == undefined)
        {
            return router.navigate('error');
        }
        eventId = parseInt(context);

    };


    return manageVenue;
});