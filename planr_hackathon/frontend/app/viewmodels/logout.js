
define(['plugins/router', 'durandal/app'], function (router, app) {
    var logout = function () {

    };

    logout.prototype.attached = function (view) {

      sessionStorage.connectionId = "";
      sessionStorage.name = "";
      sessionStorage.email = "";

      titanLive.connectionId = "";
      titan.name = "";
      titan.email = "";

      router.navigate('fblogin');
    };


    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return logout;
});