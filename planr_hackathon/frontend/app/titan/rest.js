/*
 * Titan Frontend Library
 * ---------------------------
 * Developed by Shoaib Merchant
 *
 * http://www.actonate.com/
 */
var TitanService = "http://192.168.43.231:81/PlanrCloudService/api/";

function Titan() {
    this.email = "";
    this.name = "";
    this.inMaintenance = false;
}

Titan.prototype.login = function(loginDetailsObj, _callback) {
    //alert(username + password);
    var url = TitanService + "user/login";

    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(loginDetailsObj)
    }).done(function(data) {
            status = data;
            _callback(data);
    });

    return status;
};

Titan.prototype.getEvents = function(connectionIdObj, _callback) {
    //alert(username + password);
    var url = TitanService + "user/events";


    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(connectionIdObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};

Titan.prototype.getEventDetails = function(EventDetailsRequestObj, _callback) {
    //alert(username + password);
    var url = TitanService + "event/eventDetails";


    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(EventDetailsRequestObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};

Titan.prototype.newVenueSuggestion = function(venueObj, _callback) {
    //alert(username + password);
    var url = TitanService + "suggestion/venueCreate";


    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(venueObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};


Titan.prototype.newDislike = function(suggsetionLikeDislikeObj, _callback) {
    //alert(username + password);
    var url = TitanService + "suggestion/dislike";


    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(suggsetionLikeDislikeObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};

Titan.prototype.createTask = function(newTaskObj, _callback) {
    //alert(username + password);
    var url = TitanService + "task/create";


    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(newTaskObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};


Titan.prototype.newLike = function(suggsetionLikeDislikeObj, _callback) {
    //alert(username + password);
    var url = TitanService + "suggestion/like";


    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(suggsetionLikeDislikeObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};



Titan.prototype.fblogin = function(loginDetailsObj, _callback) {
    //alert(username + password);
    var url = TitanService + "user/fbLogin";

    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(loginDetailsObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};


Titan.prototype.loginRenew = function(loginRenewObj, _callback) {
    //alert(username + password);
    var url = TitanService + "user/loginRenew";

    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(loginRenewObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};


Titan.prototype.createEvent = function(eventObj, _callback) {
    //alert(username + password);
    var url = TitanService + "event/create";

    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(eventObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};


Titan.prototype.addCollab = function(newCollabObj, _callback) {
    //alert(username + password);
    var url = TitanService + "event/addCollaborator";

    var status="";
    $.ajax({
        async:true,
        url: url,
        type: "post",
        context: document.body,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(newCollabObj)
    }).done(function(data) {
            status = data;
            _callback(data);
        });

    return status;
};
