
define(['plugins/router', 'durandal/app'], function (router, app) {
    var login = function () {

    };

    login.prototype.attached = function (view) {

        $(".app-header-test-container").fadeOut(0);

        $("#mainLoginFormSubmit").click(function(){
           var username = $("#mainLoginFormUsername").val();
           var password = $("#mainLoginFormPassword").val();

           var login = new LoginRequest();

           login.username = username;
           login.password = password;
           login.connectionId = titanLive.connectionId;


           titan.login(login, function(data){
               if(data.code == 0){
                   addAlert("error","regular","Sorry, couldn't log you in.");
               }
               else if(data.code == 1){
                    titan.name = data.name;
                    titan.email = data.email;

                    sessionStorage.name = data.name;
                    sessionStorage.email = data.email;
                    sessionStorage.connectionId = titanLive.connectionId;

                   addAlert("success","regular","Thank you for signing in.");

                   titanUI.loadEvents(titanLive.connectionId, function()
                   {

                   });

                   router.navigate('home');
               }
           });
        });
    };


    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return login;
});