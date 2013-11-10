using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
namespace BrewBerryCloudService
{
    public class TitanSMSLibrary
    {
        private static string GatewayUrl = "http://smslane.com/vendorsms/pushsms.aspx?user=shoaibmerchant&password=980296&msisdn=[mobile]&sid=WebSMS&msg=[message]&fl=0";

        public static bool SendVerifyMobileSMS(string mobile, string mobCode)
        {
            try
            {
                string requestUrl = GatewayUrl;
                mobile = mobile.Replace("+", "");
                mobile = mobile.Replace("91", "91");

                if (mobile.Length == 10)
                {
                    requestUrl = requestUrl.Replace("[mobile]", "91" + mobile);
                }
                else
                {
                    return false;
                }
                requestUrl = requestUrl.Replace("[message]","Thank you for joining BrewberrysCloud, your mobile verification code is - " + mobCode);
                WebClient client = new WebClient();
                client.DownloadString(requestUrl);

                return true;
            }
            catch(Exception crap)
            {
                return false;
            }
        }
    }
}