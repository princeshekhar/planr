
define(function() {
    var createEvent = function () {
        //this.displayName = 'Welcome to the Durandal Starter Kit!';
    };

    var createdEventId = 0;
    var createdEventCode = "";


    var collaboratorsModel = new NewCollaboratorsModel();


    function init()
    {
        ko.applyBindings(collaboratorsModel, document.getElementById('collab-area'));

        $(".list-item a").unbind('click');
        $(".list-item a").click(function(e){
            $('body').css("overflow","auto");
        });

        $("#eventCreateSubmit").click(function(e){


            var eventName = $("#eventCreateName").val();

            if(eventName == "")
            {
                addAlert("warning","regular","Please mention Event name.");
                return;
            }

            var eventObj = new NewEventRequest();
            eventObj.connectionId = titanLive.connectionId;
            eventObj.name = eventName;


            titan.createEvent(eventObj, function(data)
            {
                if(data.code == 0)
                {
                    addAlert("error","regular","Sorry an error occurred.");
                }
                else{

                    addAlert("success","regular","Yay! Your Event has been created.");

                    $("#QRText").html(data.code);

                    $("#QRText").fadeIn(500);

                    var qrcode = new QRCode("qrcode");
                    function makeCode () {
                        var elText = $('#QRText').html();
                        qrcode.makeCode(elText);
                    }
                    makeCode();

                    createdEventCode = data.code;
                    createdEventId = data.id;

                    $(".create-event-options").fadeIn(500);

                    titanUI.loadEvents(titanLive.connectionId, function()
                    {

                    });
                }


            });
        });

        $(".menu").unbind('click');
        $(".menu").click(function(e){
            if(!$("#homeSideBar").is(".showing"))
            {
                $("#homeSideBar").show();
                $("#homeSideBar").addClass("showing");

                $('body').css("overflow","hidden");
            }
            else{
                $("#homeSideBar").hide();
                $("#homeSideBar").removeClass("showing");
                $('body').css("overflow","auto");
            }
        });



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
            newCollab.eventId = createdEventId;
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

    createEvent.prototype.attached = function (view) {
       init();
    };


    return createEvent;
});