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
    public class SuggestionController : ApiController
    {
        public PlanrDBEntities1 _entity = new PlanrDBEntities1();

        [HttpPost, ActionName("venueCreate")]
        public VenueSuggResult venueCreate(VenueSuggRequest venueSugg)
        {
            try
            {
                if (!verifyUser(venueSugg.connectionId))
                    return new VenueSuggResult() { code = 0 };

                var userId = (from u in _entity.connections where u.connection_id == venueSugg.connectionId select u).FirstOrDefault();
                suggestion s1 = new suggestion()
                                    {
                                        created = DateTime.Now,
                                        event_id = venueSugg.eventId,
                                        user_id = userId.user_id
                                    };
                _entity.suggestions.Add(s1);
                _entity.SaveChanges();

                var lastId = s1.id;
                _entity.venue_suggestions.Add(new venue_suggestions()
                            {
                                address = venueSugg.address,
                                coordinates = venueSugg.coordinates,
                                description = venueSugg.description,
                                venue = venueSugg.venue,
                                suggestion_id = lastId
                            });
                _entity.SaveChanges();

                var context = GlobalHost.ConnectionManager.GetHubContext<TitanHub>();
                var collabos = (from c in _entity.collaborators where c.event_id == venueSugg.eventId select c.user_id).ToList();
                foreach (var id1 in _entity.connections)
                {
                    if(collabos.Contains(id1.user_id))
                    {
                        context.Clients.Client(id1.connection_id).ReloadEventDetails(venueSugg.eventId);
                        TitanSync.NotifyClient(id1.connection_id, "New Venue Suggestion Added!", userId.user.name);
                    }
                }

                return new VenueSuggResult()
                           {
                               code = 1,
                               address = venueSugg.address,
                               coordinates = venueSugg.coordinates,
                               description = venueSugg.description,
                               suggestionId = lastId,
                               venue = venueSugg.venue
                           };

            }
            catch (Exception)
            {
                return new VenueSuggResult() { code = 0 };
            }
        }

        [HttpPost, ActionName("dateCreate")]
        public DateSuggResult dateCreate(DateSuggRequest dateSugg)
        {
            try
            {
                if (!verifyUser(dateSugg.connectionId))
                    return new DateSuggResult() { code = 0 };

                var userId = (from u in _entity.connections where u.connection_id == dateSugg.connectionId select u).FirstOrDefault();
                _entity.suggestions.Add(new suggestion()
                            {
                                created = DateTime.Now,
                                event_id = dateSugg.eventId,
                                user_id = userId.user_id
                            });
                _entity.SaveChanges();

                var lastId = (from s in _entity.suggestions select s).OrderBy(s => s.id).Last();
                _entity.date_suggestions.Add(new date_suggestions()
                            {
                                date = dateSugg.date.Date,
                                suggestion_id = lastId.id
                            });
                _entity.SaveChanges();

                var context = GlobalHost.ConnectionManager.GetHubContext<TitanHub>();
                var collabos = (from c in _entity.collaborators where c.event_id == dateSugg.eventId select c.user_id).ToList();
                foreach (var id1 in _entity.connections)
                {
                    if (collabos.Contains(id1.user_id))
                    {
                        context.Clients.Client(id1.connection_id).ReloadEventDetails(dateSugg.eventId);
                        TitanSync.NotifyClient(id1.connection_id, "New Date Suggestion Added!", userId.user.name);
                    }
                }

                return new DateSuggResult()
                            {
                                code = 1,
                                suggestionId = lastId.id,
                                date = dateSugg.date.Date
                            };

            }
            catch (Exception)
            {
                return new DateSuggResult() { code = 0 };
            }
        }

        [HttpPost, ActionName("timeCreate")]
        public TimeSuggResult timeCreate(TimeSuggRequest TimeSugg)
        {
            try
            {
                if (!verifyUser(TimeSugg.connectionId))
                    return new TimeSuggResult() { code = 0 };

                var userId = (from u in _entity.connections where u.connection_id == TimeSugg.connectionId select u).FirstOrDefault();
                _entity.suggestions.Add(new suggestion()
                            {
                                created = DateTime.Now,
                                event_id = TimeSugg.eventId,
                                user_id = userId.user_id
                            });
                _entity.SaveChanges();

                var lastId = (from s in _entity.suggestions select s).OrderBy(s => s.id).Last();
                _entity.time_suggestions.Add(new time_suggestions()
                            {
                                time = TimeSugg.time.TimeOfDay.ToString(),
                                suggestion_id = lastId.id
                            });
                _entity.SaveChanges();

                var context = GlobalHost.ConnectionManager.GetHubContext<TitanHub>();
                var collabos = (from c in _entity.collaborators where c.event_id == TimeSugg.eventId select c.user_id).ToList();
                foreach (var id1 in _entity.connections)
                {
                    if (collabos.Contains(id1.user_id))
                    {
                        context.Clients.Client(id1.connection_id).ReloadEventDetails(TimeSugg.eventId);
                        TitanSync.NotifyClient(id1.connection_id, "New Time Suggestion Added!", userId.user.name);
                    }
                }

                return new TimeSuggResult()
                            {
                                code = 1,
                                suggestionId = lastId.id,
                                time = TimeSugg.time.ToString()
                            };
            }
            catch (Exception)
            {
                return new TimeSuggResult() { code = 0 };
            }
        }

        [HttpPost, ActionName("finalize")]
        public bool finalize(FinalizeRequest finalizeRequest)
        {
            try
            {
                var eventId =
                    (from s in _entity.suggestions where s.id == finalizeRequest.suggestionId select s.event_id).
                        FirstOrDefault();
                var admin = (from c in _entity.events where c.id == eventId select c.user_id).FirstOrDefault();
                var userId = (from u in _entity.connections where u.connection_id == finalizeRequest.connectionId select u).FirstOrDefault();
                if (admin != userId.id)
                    return false;

                var sugg =
                    (from s in _entity.suggestions where s.id == finalizeRequest.suggestionId select s).FirstOrDefault();
                sugg.status = 1;
                _entity.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpPost, ActionName("like")]
        public bool like(LikeRequest likeRequest)
        {
            try
            {
                if (!verifyUser(likeRequest.connectionId))
                    return false;

                var userId = (from u in _entity.connections where u.connection_id == likeRequest.connectionId select u).FirstOrDefault();
                var exisitingVote = (from v in _entity.user_likes
                                     where v.user_id == userId.id && v.suggestion_id == likeRequest.suggestionId
                                     select v).FirstOrDefault();
                if (exisitingVote == null)
                {
                    _entity.user_likes.Add(new user_likes()
                                               {
                                                   suggestion_id = likeRequest.suggestionId,
                                                   user_id = userId.user_id,
                                                   type = 1
                                               });
                }
                else if(exisitingVote.type == 1)
                {
                    return false;
                }
                else
                {
                    exisitingVote.type = 1;
                }

                _entity.SaveChanges();

                var context = GlobalHost.ConnectionManager.GetHubContext<TitanHub>();
                var collabos = (from c in _entity.collaborators where c.event_id == likeRequest.eventId select c.user_id).ToList();
                foreach (var id1 in _entity.connections)
                {
                    if (collabos.Contains(id1.user_id))
                    {
                        context.Clients.Client(id1.connection_id).ReloadEventDetails(likeRequest.eventId);
                        TitanSync.NotifyClient(id1.connection_id, userId.user.name +" liked a suggestion!", userId.user.name);
                    }
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpPost, ActionName("dislike")]
        public bool dislike(LikeRequest likeRequest)
        {
            try
            {
                if (!verifyUser(likeRequest.connectionId))
                    return false;

                var userId = (from u in _entity.connections where u.connection_id == likeRequest.connectionId select u).FirstOrDefault();
                var exisitingVote = (from v in _entity.user_likes
                                     where v.user_id == userId.id && v.suggestion_id == likeRequest.suggestionId
                                     select v).FirstOrDefault();
                if (exisitingVote == null)
                {
                    _entity.user_likes.Add(new user_likes()
                    {
                        suggestion_id = likeRequest.suggestionId,
                        user_id = userId.user_id,
                        type = 0
                    });
                }
                else if (exisitingVote.type == 0)
                {
                    return false;
                }
                else
                {
                    exisitingVote.type = 0;
                }

                _entity.SaveChanges();

                var context = GlobalHost.ConnectionManager.GetHubContext<TitanHub>();
                var collabos = (from c in _entity.collaborators where c.event_id == likeRequest.eventId select c.user_id).ToList();
                foreach (var id1 in _entity.connections)
                {
                    if (collabos.Contains(id1.user_id))
                    {
                        context.Clients.Client(id1.connection_id).ReloadEventDetails(likeRequest.eventId);
                        TitanSync.NotifyClient(id1.connection_id, userId.user.name + " disliked a suggestion!", userId.user.name);
                    }
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
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
