using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace PlanrCloudService.Hubs
{
    public class TitanHub : Hub
    {
        public PlanrDBEntities1 _entity = new PlanrDBEntities1();

        public override Task OnConnected()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            try
            {
                foreach (var id1 in _entity.connections)
                {
                    if (id1.connection_id == Context.ConnectionId)
                    {
                        id1.status = 0;
                        break;
                    }
                }
            }
            catch (Exception)
            { }

            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            return base.OnDisconnected();
        }
        public string InitiateConnection()
        {
            try
            {
                string connectionId = Context.ConnectionId;
                return Context.ConnectionId;
            }
            catch (Exception crap)
            {
                return "[error]";
            }
            //Clients.All.hello();
        }
    }

    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
    }

    public static class TitanSync
    {
        public static bool NotifyClient(string connectionId, string text, string userName)
        {
            try
            {
                var context = GlobalHost.ConnectionManager.GetHubContext<TitanHub>();
                context.Clients.Client(connectionId).Notify(text, userName);
                return true;

                //System.Diagnostics.Debug.WriteLine(UserHandler.ConnectedIds.Count);
                //context.Clients.All.Notify();
            }
            catch (Exception crap)
            {
                return false;
            }

        }
    }
}