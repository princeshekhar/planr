using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanrCloudService
{
    public class LoginRequest
    {
        public string username;
        public string password;
        public string connectionId;
    }

    public class FbLoginRequest
    {
        public string email;
        public string name;
        public string fb_token;
        public string connectionId;
    }

    public class LoginResult
    {
        public int code;
        public string name;
        public string email;
    }

    public class LoginRenew
    {
        public string oldId;
        public string newId;
    }

    public class UserEvents
    {
        public int eventId;
        public string name;
        public string createdBy;
        public string date;
        public string time;
        public string venue;
        public int isOwner;
        public string code;
    }

    public class ConnectionId
    {
        public string connectionId;
    }

    public class EventsResult
    {
        public List<UserEvents> myEvents;
        public List<UserEvents> attendingEvents;
    }

    public class EventRequest
    {
        public string name;
        public string connectionId;
    }

    public class CreateEventResult
    {
        public string code;
        public int id;
    }

    public class VenueSuggRequest
    {
        public string connectionId;
        public int eventId;
        public string venue;
        public string coordinates;
        public string address;
        public string description;
    }

    public class VenueSuggResult
    {
        public int code;
        public int suggestionId;
        public string venue;
        public string coordinates;
        public string address;
        public string description;
        public string userName;
        public int likes;
        public int dislikes;
    }

    public class DateSuggRequest
    {
        public string connectionId;
        public DateTime date;
        public int eventId;
    }

    public class DateSuggResult
    {
        public int code;
        public DateTime date;
        public int suggestionId;
        public string userName;
        public int likes;
        public int dislikes;
    }

    public class TimeSuggRequest
    {
        public string connectionId;
        public DateTime time;
        public int eventId;
    }

    public class TimeSuggResult
    {
        public int code;
        public string time;
        public int suggestionId;
        public string userName;
        public int likes;
        public int dislikes;
    }

    public class LikeRequest
    {
        public string connectionId;
        public int eventId;
        public int suggestionId;
    }

    public class FinalizeRequest
    {
        public string connectionId;
        public int suggestionId;
    }

    public class EventDetailsRequest
    {
        public string connectionId;
        public int eventId;
    }

    public class NotificationsResult
    {
        public int userId;
        public string text;
        public int code;
    }

    public class CollaboratorsResult
    {
        public int userId;
        public string name;
        public string email;
        public bool online;
        public string colorCode;
    }

    public class EventDetailsResult
    {
        public UserEvents details;
        public List<NotificationsResult> notifications;
        public List<VenueSuggResult> venueSuggestions;
        public List<DateSuggResult> dateSuggestions;
        public List<TimeSuggResult> timeSuggestions;
        public List<CollaboratorsResult> collaborators;
    }

    public class AddCollaboratorRequest
    {
        public string connectionId;
        public string userEmail;
        public int eventId;
        public int role;
    }

    public class TaskRequest
    {
        public string connectionId;
        public int eventId;
        public int userId;
        public string description;
        public DateTime deadline;
        public int priority;
    }

    public class TaskResult
    {
        public int code;
        public int eventId;
        public int userId;
        public string description;
        public DateTime deadline;
        public DateTime created;
        public int priority;
    }

    public class UserTaskRequest
    {
        public string connectionId;
    }
}