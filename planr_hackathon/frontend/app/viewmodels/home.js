
define(function() {
    var home = function () {
        //this.displayName = 'Welcome to the Durandal Starter Kit!';
    };




    home.prototype.attached = function (view) {

        ko.applyBindings(_userEventsModel);

        $(".app-header-test-container").fadeIn(500);

        $("#homeSideBar").removeClass("hide");
        $(".menu").removeClass("event-menu").removeClass("home-menu").addClass("home-menu");

    };

    return home;
});