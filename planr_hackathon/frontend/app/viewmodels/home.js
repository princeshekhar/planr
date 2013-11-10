
define(function() {
    var home = function () {
        //this.displayName = 'Welcome to the Durandal Starter Kit!';
    };




    home.prototype.attached = function (view) {

        ko.applyBindings(_userEventsModel, document.getElementById("home-myevents"));

        $(".app-header-test-container").fadeIn(500);

        $("#homeSideBar").removeClass("hide");
        $(".menu").removeClass("event-menu").removeClass("home-menu").addClass("home-menu");


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

        $(".list-item a").unbind('click');
        $(".list-item a").click(function(e){
            $('body').css("overflow","auto");
        });


    };

    return home;
});