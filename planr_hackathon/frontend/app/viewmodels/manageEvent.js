define(['plugins/router', 'durandal/app'], function (router, app) {
    var manageEvent = function () {
        //this.displayName = 'Welcome to the Durandal Starter Kit!';
    };

    var collaboratorsModel = new NewCollaboratorsModel();

    var eventId = 0;
    var selectedEvent;


    function init()
    {
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


        //ko.applyBindings(collaboratorsModel, document.getElementById('collab-area'));


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


        })
        $("#addCollaboratorSubmit").click(function(e)
        {
           var collabEmail = $("#addCollaboratorEmail").val();

            if(collabEmail == "")
            {
                addAlert("warning","regular","Please mention Collaborator's email.");
                return;
            }

            var newCollab = new AddCollaboratorRequest();
            newCollab.connectionId = titanLive.connectionId;
            newCollab.eventId = eventId;
            newCollab.userEmail = collabEmail;

            titan.addCollab(newCollab, function(data)
            {
                if(data == true)
                {
                    addAlert("success","regular","User has been successfully added.");
                    collaboratorsModel.addCollab(collabEmail);
                }
                else{
                    addAlert("error","regular","Sorry an error occurred.");
                }
            })
        });
    }

    manageEvent.prototype.attached = function (view) {
       init();
    };

    manageEvent.prototype.activate = function(context){
        if(context == undefined)
        {
            return router.navigate('error');
        }
        eventId = parseInt(context);

    };

    manageEvent.prototype.deactivate = function(context){


    };

    manageEvent.prototype.detach = function(context){


    };


    return manageEvent;
});