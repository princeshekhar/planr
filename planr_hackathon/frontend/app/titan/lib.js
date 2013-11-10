/*
 * Titan Frontend Library
 * ---------------------------
 * Developed by Shoaib Merchant
 *
 * http://www.actonate.com/
 */

function TitanUI() {

}

TitanUI.prototype.loadEvents = function(_connectionId, _callback)
{
    var connObj = new ConnectionIdRequest();
    connObj.connectionId = _connectionId;

    titan.getEvents(connObj, function(data)
    {
        _userEventsModel.loadEvents(data);
        _callback();
    });

};

TitanUI.prototype.loadEventDetails = function(_connectionId, _eventId, _callback)
{
    var eventReqObj = new EventDetailsRequest();
    eventReqObj.connectionId = _connectionId;
    eventReqObj.eventId = _eventId;

    titan.getEventDetails(eventReqObj, function(data)
    {
        _eventDetailsModel.loadSuggestions(data);
        _callback();
    });

};