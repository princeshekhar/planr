using System;
using System.Net;
using System.Net.Mail;

namespace PlanrCloudService
{
    public class TitanMailLibrary
    {
        public static bool SendVerifyUserMail(string mailTo, string name, string mailCode)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpConfig mySmtp = new SmtpConfig();

                message.From = new MailAddress(mySmtp.From);
                message.To.Add(new MailAddress(mailTo));

                message.Subject = "[Planr] Verify your Account";
                message.IsBodyHtml = true;

                string messageText = @"
                Welcome to Planr, you have been added as a user. Please verify your email address before logging in.
                Your email verification code is - 
            
                Verification Code - " + mailCode + @"
                http://www.Planr.com

                Thank you
                Planr Team
                ";
                String Body = mySmtp.MailBody.Replace("[Message]", messageText);
                Body = Body.Replace("[Subject]", "Verify your Account");

                message.Body = Body;

                SmtpClient client = new SmtpClient();
                client.Host = mySmtp.Host;
                client.Port = mySmtp.Port;
                client.EnableSsl = mySmtp.useSSL;
                client.Credentials = new NetworkCredential(mySmtp.From, mySmtp.Password);

                client.Send(message);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool SendSupportMail(string email, string subject, string type, string content)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpConfig mySmtp = new SmtpConfig();

                message.From = new MailAddress(mySmtp.From);
                message.To.Add(new MailAddress(mySmtp.MailTo));

                message.Subject = "[Planr] Support Request";
                message.IsBodyHtml = true;

                string messageText = @"
                You have been sent a Support Request by the email id - " + email + @"
            
                Subject - " + subject + @"
                    
                Type - " + type + @"

                Message - " + Environment.NewLine + subject + @"

                Thank you
                Planr Team
                ";
                String Body = mySmtp.MailBody.Replace("[Message]", messageText);
                Body = Body.Replace("[Subject]", "New Support Request");

                message.Body = Body;

                SmtpClient client = new SmtpClient();
                client.Host = mySmtp.Host;
                client.Port = mySmtp.Port;
                client.EnableSsl = mySmtp.useSSL;
                client.Credentials = new NetworkCredential(mySmtp.From, mySmtp.Password);

                client.Send(message);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
    public class SmtpConfig
    {
        public string From { get; set; }
        public string Password { get; set; }
        public string MailBody { get; set; }
        public string MailTo { get; set; }
        public string Host { get; set; }
        public Int32 Port { get; set; }
        public bool useSSL { get; set; }


        public SmtpConfig()
        {
            From = "noreply@Planr.com";
            Password = "magnacloud6218";

            MailTo = "support@actonate.com";
            //MailBody = "Trotez Mailer" + Environment.NewLine + Environment.NewLine + "[Message]" + Environment.NewLine + Environment.NewLine + "Do not reply to this mail.";

            MailBody = @"
                        <div id=""outer-div"" style=""width:inherit;margin-left:auto;margin-right:auto;background-color:#eee;padding-top:2%;padding-bottom:7%"">
		        <div id=""inner-div"" style=""width:75%;margin-left:auto;margin-right:auto;background-color:#fefefe;min-height:250px;padding-top:3%;padding-bottom:3%;border-radius:10px;"">
				        <img id=""logo"" src=""http://Planr.com/logo.png"" style=""float:right;width:25%;margin-right:5%;margin-top:-10px;""/>
				        <div id=""subject"" style=""float:left;font-size:1.4em;color:#0cb1d1;margin-left:5%;margin-right:5%;margin-top:5px;padding-bottom:2%;font-family:Georgia, 'Times New Roman', Times, serif;border-bottom:1px #fff solid;max-width:400px;overflow:hidden;"">[Subject]</div>
				        <div id=""clear"" style=""clear:both""></div>
				        <div id=""message"" style=""font-size:0.85em;color:#7e7e7e;margin-left:5%;margin-right:5%;margin-top:1%;font-family:Georgia, 'Times New Roman', Times, serif;"">
				
				        [Message]
				
				        </div>
				        <div id=""clear"" style=""clear:both""></div>
				        <div id=""footer"" style=""font-size:0.55em;color:#aaa;margin-left:5%;margin-right:5%;margin-top:10%;padding-top:2%;font-family:Georgia, 'Times New Roman', Times, serif;text-align:left;border-top:1px #eee solid;;line-height:150%;"">
										        Brew Berrys Hospitality India pvt ltd<br /><br/>
						        &copy; 2012 Planr.<br />
						        Information transmitted by this email is intended only for the use by the addressee(s).If you are not the intended recipient 
						        you are notified that any use or dissemination and or copying of this email in any manner is 
						        strictly prohibited and you are requested to delete this e-mail immediately.
				        </div>
		        </div>	
	        </div>
            ";



            Host = "mail.Planr.com";
            Port = 25;
            useSSL = false;
        }
    }
}