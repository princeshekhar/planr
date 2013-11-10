using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PlanrCloudService.Controllers
{
    public class TaskController : ApiController
    {
        public PlanrDBEntities1 _entity = new PlanrDBEntities1();

        [HttpPost, ActionName("create")]
        public TaskResult create(TaskRequest taskRequest)
        {
            try
            {
                if (!verifyUser(taskRequest.connectionId))
                    return new TaskResult() { code = 0 };

                _entity.tasks.Add(new task()
                                      {
                                          event_id = taskRequest.eventId,
                                          user_id = taskRequest.userId,
                                          created = DateTime.Now,
                                          deadline = taskRequest.deadline,
                                          description = taskRequest.description,
                                          priority = taskRequest.priority
                                      });
                _entity.SaveChanges();

                return new TaskResult()
                           {
                               code = 1,
                               eventId = taskRequest.eventId,
                               userId = taskRequest.userId,
                               created = DateTime.Now,
                               deadline = taskRequest.deadline,
                               description = taskRequest.description,
                               priority = taskRequest.priority
                           };
            }
            catch (Exception)
            {
                return new TaskResult() { code = 0 };
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
