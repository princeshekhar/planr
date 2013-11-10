/*
 * Titan Frontend Library
 * ---------------------------
 * Developed by Shoaib Merchant
 *
 * http://www.actonate.com/
 */

var LoginRequest = function()
{
    this.connectionId = "";
    this.username = "";
    this.password = "";
}

var EventDetailsRequest = function()
{
    this.eventId = "";
    this.connectionId = "";
}


var NewTaskRequest = function()
{
    this.connectionId = "";
    this.eventId = "";
    this.userId = "";
    this.description = "";
    this.deadline = "";
    this.priority = "";
}



var LikeDislikeObj = function()
{
    this.eventId = "";
    this.connectionId = "";
    this.suggestionId = "";
}

var NewVenueSuggestion = function()
{
    this.eventId = "";
    this.connectionId = "";
    this.address = "";
    this.venue = "";
    this.coordinates = "";
    this.description = "";
}

var ConnectionIdRequest = function()
{
    this.connectionId = "";
}

var AddCollaboratorRequest = function(){
    this.connectionId = "";
    this.userEmail = "";
    this.eventId = "";
    this.role = 1;
}

var NewEventRequest = function()
{
    this.connectionId = "";
    this.name = "";
}

var FbLoginRequest = function()
{
    this.connectionId = "";
    this.name = "";
    this.email = "";
    this.fb_token = "";
}

var LoginRenewal = function(){
    this.oldId = "";
    this.newId = "";
}

var CurrentEventModel = function() {
    var self = this;

    self.eventId = ko.observable('');
    self.createdBy = ko.observable('');
    self.name = ko.observable('');

}

var NewCollaboratorsModel = function() {
    var self = this;

    self.collabos = ko.observableArray([]);

    self.addCollab = function(newEmail) {
        self.collabos.push({ email: newEmail });
    };

    self.loadCollab = function(data){
       self.collabos.removeAll();

        for(var i=0;i<data.length;i++)
        {
            this.collabos.push(data[i]);
        }
    }

    self.removePerson = function() {
        self.collabos.remove(this);
    }
};

var UserEventsModel = function() {
    var self = this;

    self.loaded = ko.observable(false);

    self.myevents = ko.observableArray([]);

    self.addMyEvent = function(newEvent) {
        self.myevents.push(newEvent);
    };

    self.attending_events = ko.observableArray([]);

    self.addAttendingEvent = function(newEvent) {
        self.attending_events.push(newEvent);
    };

    self.loadEvents = function(data)
    {
        self.loaded(true);
        //this.cafes = ko.observableArray(data);
        this.myevents.removeAll();
        this.attending_events.removeAll();

        if(data.myEvents == null)
        {
            self.loaded(false);
            return;
        }

        for(var i=0;i<data.myEvents.length;i++)
        {

            this.myevents.push(data.myEvents[i]);
        }

        for(var i=0;i<data.attendingEvents.length;i++)
        {
            this.attending_events.push(data.attendingEvents[i]);
        }
    };
};


var EventDetailsModel = function() {
    var self = this;

    self.loaded = ko.observable(false);
    self.eventId = ko.observable(0);
    self.name = ko.observable('');
    self.createdBy = ko.observable('');
    self.code = ko.observable('');
    self.date = ko.observable('');
    self.time = ko.observable('');
    self.venue = ko.observable('');
    self.isOwner = ko.observable(0);

    self.notifications = ko.observableArray([]);
    self.venueSuggestions = ko.observableArray([]);
    self.dateSuggestions = ko.observableArray([]);
    self.timeSuggestions = ko.observableArray([]);
    self.collaborators = ko.observableArray([]);
    self.tasks = ko.observableArray([]);


    self.loadSuggestions = function(data)
    {
        if(data.details == null)
        {
            return;
        }
        else{
            this.eventId(data.details.eventId);
            this.name(data.details.name);
            this.createdBy(data.details.createdBy);
            this.code(data.details.code);
            this.date(data.details.date);
            this.time(data.details.time);
            this.venue(data.details.venue);
            this.isOwner(data.details.isOwner);
        }

        self.loaded(true);

        this.notifications.removeAll();
        this.venueSuggestions.removeAll();
        this.dateSuggestions.removeAll();
        this.timeSuggestions.removeAll();
        this.collaborators.removeAll();
        this.tasks.removeAll();


        for(var i=0;i<data.notifications.length;i++)
        {
            this.notifications.push(data.notifications[i]);
        }

        for(var i=0;i<data.venueSuggestions.length;i++)
        {
            this.venueSuggestions.push(data.venueSuggestions[i]);
        }

        for(var i=0;i<data.dateSuggestions.length;i++)
        {
            this.dateSuggestions.push(data.dateSuggestions[i]);
        }

        for(var i=0;i<data.timeSuggestions.length;i++)
        {
            this.timeSuggestions.push(data.timeSuggestions[i]);
        }

        for(var i=0;i<data.collaborators.length;i++)
        {
            this.collaborators.push(data.collaborators[i]);
        }

        for(var i=0;i<data.tasks.length;i++)
        {
            this.tasks.push(data.tasks[i]);
        }
    };
};

var _userEventsModel = new UserEventsModel();
var _eventDetailsModel = new EventDetailsModel();

/*
var CollaboratorsModel = function(first) {
    this.collabos = ko.observable(first);
};
*/

