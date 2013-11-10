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
    public class UserController : ApiController
    {
        public PlanrDBEntities1 _entity = new PlanrDBEntities1();
        public string[] colors = new string[] { "red","green","blue","yellow","orange","dark-gray","cyan","violet","maroon","light-green"};

        [HttpPost, ActionName("login")]
        public LoginResult login(LoginRequest loginRequest)
        {
            try
            {
                user user1 = (from u in _entity.users
                              where u.email == loginRequest.username && u.password == loginRequest.password
                              select u).FirstOrDefault();
                if (user1 == null || loginRequest.connectionId == null)
                {
                    return new LoginResult() { code = 0 };
                }
                else
                {
                    foreach (var id1 in _entity.connections)
                    {
                        if (id1.user_id == user1.id)
                            _entity.connections.Remove(id1);
                    }

                    connection c = new connection()
                                       {
                                           created = DateTime.Now,
                                           connection_id = loginRequest.connectionId,
                                           user_id = user1.id,
                                           status = 1
                                       };
                    _entity.connections.Add(c);
                    _entity.SaveChanges();
                    return new LoginResult() { code = 1, email = user1.email, name = user1.name };
                }
            }
            catch (Exception ex)
            {
                return new LoginResult() { code = 0 };
            }
        }

        [HttpPost, ActionName("loginRenew")]
        public bool loginRenew(LoginRenew loginRenew)
        {
            try
            {
                var exisitinguser = (from m in _entity.connections where m.connection_id == loginRenew.oldId select m).FirstOrDefault();
                if (exisitinguser == null)
                    return false;

                exisitinguser.connection_id = loginRenew.newId;
                exisitinguser.status = 1;
                _entity.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPost, ActionName("fbLogin")]
        public LoginResult fbLogin(FbLoginRequest fbloginRequest)
        {
            int userId;
            try
            {
                if (fbloginRequest.connectionId == null)
                    return new LoginResult() { code = 0 };

                var existingUser =
                    (from u in _entity.users where u.email == fbloginRequest.email select u).FirstOrDefault();
                if (existingUser == null)
                {
                    Random r = new Random(9);
                    _entity.users.Add(new user() { name = fbloginRequest.name, email = fbloginRequest.email, fb_token = fbloginRequest.fb_token, password = "fb"});
                    _entity.SaveChanges();

                    userId = (from u in _entity.users where u.email == fbloginRequest.email select u.id).FirstOrDefault();
                    _entity.connections.Add(new connection() { connection_id = fbloginRequest.connectionId, user_id = userId, created = DateTime.Now, status = 1 });
                    _entity.SaveChanges();

                    user user1 = (from u in _entity.users where u.id == userId select u).FirstOrDefault();
                    return new LoginResult() { name = user1.name, code = 1, email = user1.email };
                }
                else
                {
                    userId = existingUser.id;
                    existingUser.fb_token = fbloginRequest.fb_token;
                    foreach (var id1 in _entity.connections)
                    {
                        if (id1.user_id == existingUser.id)
                        {
                            _entity.connections.Remove(id1);
                        }
                    }

                    _entity.connections.Add(new connection() { connection_id = fbloginRequest.connectionId, user_id = existingUser.id, created = DateTime.Now, status = 1 });
                    _entity.SaveChanges();
                    return new LoginResult() { name = existingUser.name, code = 1, email = existingUser.email };
                }
            }
            catch (Exception)
            {
                return new LoginResult() { code = 0 };
            }
        }

        [HttpPost, ActionName("events")]
        public EventsResult events(ConnectionId connectionId)
        {
            try
            {
                if (!verifyUser(connectionId.connectionId))
                    return new EventsResult();

                List<UserEvents> myEvents1 = new List<UserEvents>();
                List<UserEvents> attendingEvents1 = new List<UserEvents>();

                List<string> s1, s2;
                int userId =
                    (from c in _entity.connections where c.connection_id == connectionId.connectionId select c.user_id).
                        FirstOrDefault();

                var e11 = (from e in _entity.collaborators where e.user_id == userId select e.event_id).ToList();
                foreach (var id1 in e11)
                {
                    var currEvent = (from e in _entity.events where e.id == id1 select e).FirstOrDefault();
                    myEvents1.Add(new UserEvents()
                                {
                                    eventId = currEvent.id,
                                    createdBy = currEvent.user.name,
                                    date = currEvent.date.HasValue ? currEvent.date.Value.ToLongDateString() : "",
                                    name = currEvent.name,
                                    time = currEvent.time,
                                    venue = currEvent.venue,
                                    isOwner = currEvent.user_id == userId ? 1 : 0,
                                    code = currEvent.code
                                });
                }
                var e12 = (from e in _entity.user_attending where e.user_id == userId select e.event_id).ToList();
                foreach (var id1 in e12)
                {
                    var currEvent = (from e in _entity.events where e.id == id1 select e).FirstOrDefault();
                    myEvents1.Add(new UserEvents()
                                {
                                    eventId = currEvent.id,
                                    createdBy = currEvent.user.name,
                                    date = currEvent.date.HasValue ? currEvent.date.Value.ToLongDateString() : "",
                                    name = currEvent.name,
                                    time = currEvent.time,
                                    venue = currEvent.venue,
                                    isOwner = currEvent.user_id == userId ? 1 : 0,
                                    code = currEvent.code
                                });
                }

                return new EventsResult() { myEvents = myEvents1, attendingEvents = attendingEvents1 };
            }
            catch (Exception)
            {
                return new EventsResult();
            }
        }

        //[HttpPost, ActionName("tasks")]
        //public UserTaskResult tasks(UserTasksRequest userTasksRequest)
        //{
        //    try
        //    {

        //    }
        //    catch (Exception)
        //    {
        //        return;
        //    }
        //}

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
