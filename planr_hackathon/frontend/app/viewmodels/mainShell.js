define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: 'fblogin', title:'Facebook Login', moduleId: 'viewmodels/fblogin', nav: true },
                { route: 'login', title:'Login', moduleId: 'viewmodels/login', nav: true },
                { route: 'home', title:'Home', moduleId: 'viewmodels/home', nav: true },
                { route: 'createEvent', title:'Create Event', moduleId: 'viewmodels/createEvent', nav: true },
                { route: 'manageEvent/:id', title:'Manage Event', moduleId: 'viewmodels/manageEvent', nav: true },
                { route: 'manageVenue/:id', title:'Manage Venue', moduleId: 'viewmodels/manageVenue', nav: true },
                { route: 'manageDate/:id', title:'Manage Date', moduleId: 'viewmodels/manageDate', nav: true },
                { route: 'manageTasks/:id', title:'Manage Tasks', moduleId: 'viewmodels/manageTasks', nav: true },
                { route: 'error', title:'Error', moduleId: 'viewmodels/error', nav: true },
                { route: 'logout', title:'Logout', moduleId: 'viewmodels/logout', nav: true }
            ]).buildNavigationModel();


            router.activate();

            if(sessionStorage.connectionId == "" || sessionStorage.connectionId == undefined)
            {
                return router.navigate('fblogin');
            }
            else if(sessionStorage.connectionId != titanLive.connectionId)
            {
                //Put code for Session Renewal
                var loginRenew = new LoginRenewal();
                loginRenew.oldId = sessionStorage.connectionId;
                loginRenew.newId = titanLive.connectionId;

                titan.loginRenew(loginRenew, function(data)
                {

                    if(data == true)
                    {
                        sessionStorage.connectionId = titanLive.connectionId;

                        var hash = window.location.hash;

                        titanUI.loadEvents(titanLive.connectionId, function()
                        {

                        });

                        if(hash != "")
                        {
                            return router.navigate(hash);
                        }
                        return router.navigate('home');
                    }
                    else{
                        return router.navigate('error');
                    }
                });
            }
            else if(sessionStorage.connectionId  == titanLive.connectionId)
            {
                var hash = window.location.hash;

                titanUI.loadEvents(titanLive.connectionId, function()
                {

                });

                if(hash != "")
                {
                    return router.navigate(hash);
                }
                return router.navigate('home');
            }
            else{
                return router.navigate('error');
            }

        }
    };
});