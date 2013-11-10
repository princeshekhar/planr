using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using PlanrCloudService.Hubs;

namespace PlanrCloudService.Controllers
{
    public class EventController : ApiController
    {
        public PlanrDBEntities1 _entity = new PlanrDBEntities1();

        [HttpPost, ActionName("create")]
        public CreateEventResult create(EventRequest eventRequest)
        {
            try
            {
                string eventCode = generateCode();
                if (eventCode == null)
                    return new CreateEventResult();

                var userId =
                    (from u in _entity.connections where u.connection_id == eventRequest.connectionId select u).
                        FirstOrDefault();
                @event newEvent = new @event()
                {
                    name = eventRequest.name,
                    user_id = userId.user_id,
                    date = DateTime.Now,
                    code = eventCode
                };
                _entity.events.Add(newEvent);
                _entity.SaveChanges();

                var eventId = (from e in _entity.events where e.code == eventCode select e.id).FirstOrDefault();
                _entity.collaborators.Add(new collaborator()
                                              {
                                                  user_id = userId.user_id,
                                                  event_id = eventId,
                                                  status = 1,
                                                  user_role = 0
                                              });
                _entity.SaveChanges();
                return new CreateEventResult() { code = eventCode, id = eventId };
            }
            catch (Exception)
            {
                return new CreateEventResult();
            }
        }

        [HttpPost, ActionName("eventDetails")]
        public EventDetailsResult eventDetails(EventDetailsRequest eventDetailsRequest)
        {
            try
            {
                if (!verifyUser(eventDetailsRequest.connectionId))
                    return new EventDetailsResult();

                EventDetailsResult eventDetailsResult = new EventDetailsResult();
                eventDetailsResult.collaborators = new List<CollaboratorsResult>();
                eventDetailsResult.dateSuggestions = new List<DateSuggResult>();
                eventDetailsResult.notifications = new List<NotificationsResult>();
                eventDetailsResult.timeSuggestions = new List<TimeSuggResult>();
                eventDetailsResult.venueSuggestions = new List<VenueSuggResult>();
                eventDetailsResult.details = new UserEvents();
                var userId = (from u in _entity.connections where u.connection_id == eventDetailsRequest.connectionId select u).FirstOrDefault();

                var timeSugg = (from s in _entity.time_suggestions
                                where s.suggestion.event_id == eventDetailsRequest.eventId
                                select s).ToList();
                foreach (var id1 in timeSugg)
                {
                    eventDetailsResult.timeSuggestions.Add(new TimeSuggResult()
                                                               {
                                                                   suggestionId = id1.suggestion_id,
                                                                   time = id1.time.ToString(),
                                                                   userName = id1.suggestion.user.name,
                                                                   likes = _entity.user_likes.Where(s => s.suggestion_id == id1.suggestion_id && s.type == 1).Count(),
                                                                   dislikes = _entity.user_likes.Where(s => s.suggestion_id == id1.suggestion_id && s.type == 0).Count()
                                                               });
                }

                var dateSugg = (from s in _entity.date_suggestions
                                where s.suggestion.event_id == eventDetailsRequest.eventId
                                select s).ToList();
                foreach (var id1 in dateSugg)
                {
                    eventDetailsResult.dateSuggestions.Add(new DateSuggResult()
                                                                {
                                                                    suggestionId = id1.suggestion_id,
                                                                    date = id1.date,
                                                                    userName = id1.suggestion.user.name,
                                                                    likes = _entity.user_likes.Where(s => s.suggestion_id == id1.suggestion_id && s.type == 1).Count(),
                                                                    dislikes = _entity.user_likes.Where(s => s.suggestion_id == id1.suggestion_id && s.type == 0).Count()
                                                                });
                }

                var venueSugg = (from s in _entity.venue_suggestions
                                 where s.suggestion.event_id == eventDetailsRequest.eventId
                                 select s).ToList();
                foreach (var id1 in venueSugg)
                {
                    eventDetailsResult.venueSuggestions.Add(new VenueSuggResult()
                                                                {
                                                                    suggestionId = id1.suggestion_id,
                                                                    venue = id1.venue,
                                                                    address = id1.address,
                                                                    description = id1.description,
                                                                    coordinates = id1.coordinates,
                                                                    userName = id1.suggestion.user.name,
                                                                    likes = _entity.user_likes.Where(s => s.suggestion_id == id1.suggestion_id && s.type == 1).Count(),
                                                                    dislikes = _entity.user_likes.Where(s => s.suggestion_id == id1.suggestion_id && s.type == 0).Count()
                                                                });
                }

                var notifications =
                    (from n in _entity.notifications where n.event_id == eventDetailsRequest.eventId select n).ToList();
                foreach (var id1 in notifications)
                {
                    eventDetailsResult.notifications.Add(new NotificationsResult()
                                                             {
                                                                 code = id1.code,
                                                                 text = id1.text,
                                                                 userId = id1.user_id
                                                             });
                }

                var coll =
                    (from c in _entity.collaborators where c.event_id == eventDetailsRequest.eventId select c).ToList();
                var onlineUsers = (from u in _entity.connections select u.user_id).ToList();
                foreach (var id1 in coll)
                {
                    eventDetailsResult.collaborators.Add(new CollaboratorsResult()
                                                             {
                                                                 email = id1.user.email,
                                                                 name = id1.user.name,
                                                                 userId = id1.user_id,
                                                                 colorCode = id1.user.color_code,
                                                                 online = onlineUsers.Contains(id1.user_id)
                                                             });
                }

                var ev1 = (from e in _entity.events where e.id == eventDetailsRequest.eventId select e).FirstOrDefault();
                eventDetailsResult.details.code = ev1.code;
                eventDetailsResult.details.name = ev1.name;
                eventDetailsResult.details.date = ev1.date.HasValue ? ev1.date.Value.ToLongDateString() : "";
                eventDetailsResult.details.time = ev1.time;
                eventDetailsResult.details.isOwner = ev1.user_id == userId.user_id ? 1 : 0;
                eventDetailsResult.details.venue = ev1.venue;
                eventDetailsResult.details.eventId = ev1.id;
                eventDetailsResult.details.createdBy = ev1.user.name;

                return eventDetailsResult;
            }
            catch (Exception)
            {
                return new EventDetailsResult();
            }
        }

        [HttpPost, ActionName("addCollaborator")]
        public bool addCollaborator(AddCollaboratorRequest addCollaboratorRequest)
        {
            try
            {
                if (!verifyUser(addCollaboratorRequest.connectionId))
                    return false;

                var userId =
                    (from u in _entity.users where u.email == addCollaboratorRequest.userEmail select u).FirstOrDefault();
                if (userId == null)
                    return false;

                _entity.collaborators.Add(new collaborator()
                                              {
                                                  user_id = userId.id,
                                                  event_id = addCollaboratorRequest.eventId,
                                                  user_role = addCollaboratorRequest.role
                                              });
                _entity.SaveChanges();

                var connection = (from c in _entity.connections where c.user_id == userId.id select c).FirstOrDefault();
                if (connection != null)
                {
                    var context = GlobalHost.ConnectionManager.GetHubContext<TitanHub>();
                    context.Clients.Client(connection.connection_id).ReloadEvents();
                    TitanSync.NotifyClient(connection.connection_id, userId.name + " has been added as a collaborator!", "");
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public string generateCode()
        {
            string newCode = "";
            do
            {
                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var random = new Random();
                newCode = new string(
                    Enumerable.Repeat(chars, 4)
                              .Select(s => s[random.Next(s.Length)])
                              .ToArray());
            } while ((from e in _entity.events select e.code).ToList().Contains(newCode));

            return newCode;
        }

        public bool verifyUser(string connectionId)
        {
            var user1 = (from c in _entity.connections
                         where c.connection_id == connectionId
                         select c).FirstOrDefault();
            if (user1 == null)
                return false;
            else
                return true;
        }
    }
}
