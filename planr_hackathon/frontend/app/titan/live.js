var TitanWebSocket = "http://192.168.43.231:81/PlanrCloudService/signalr";
var connection = $.hubConnection(TitanWebSocket);
var TitanHubProxy = connection.createHubProxy('TitanHub');
var titanLive;

titanLive = new TitanLive();

connection.start().done(function(data) {
    TitanHubProxy.invoke('initiateConnection').done(function(data)
    {
        if(data != "[error]")
        {
            titanLive.connectionId = data;
        }
        else{
            console.log("initiateConnection failed with errors");
        }
    });
});

function TitanLive() {
	//this.filePath="http://brewberryscloud.azurewebsites.net/"

    if(sessionStorage.connectionId == "" || sessionStorage.connectionId == undefined)
    {
        this.connectionId = "";
    }
    else{
        this.connectionId = sessionStorage.connectionId;
    }
}

TitanHubProxy.on('notify', function(text, userid) {
    addAlert("success","regular",text);
});


TitanHubProxy.on('reloadEvents', function() {
    titanUI.loadEvents(titanLive.connectionId, function()
    {

    });
});

TitanHubProxy.on('reloadEventDetails', function(eventId) {
    if(_eventDetailsModel.loaded()==true && _eventDetailsModel.eventId() == eventId)
    {
        titanUI.loadEventDetails(titanLive.connectionId, eventId ,function()
        {

        });
    }

});



