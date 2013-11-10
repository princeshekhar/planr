using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Net;
using System.IO;
using System.Text;

namespace BrewBerryCloudService
{
    public static class TitanFTPUploader
    {
        public static string getFile(string filename)
        {
            try
            {
                FtpWebRequest ftpWebRequest = (FtpWebRequest)WebRequest.Create(string.Concat(TitanFTPUploader.getFTP(), filename));
                ftpWebRequest.Method = "RETR";
                FtpWebResponse response = (FtpWebResponse)ftpWebRequest.GetResponse();
                Stream responseStream = response.GetResponseStream();
                StreamReader streamReader = new StreamReader(responseStream);
                string end = streamReader.ReadToEnd();
                streamReader.Close();
                response.Close();
                string str = end;
                return str;
            }
            catch (Exception)
            {
                return "-1";
            }
        }

        public static string getFTP()
        {
          //  string str = "ftp://brewsync%40actonatepanel.com:hakunamatata@ftp.actonatepanel.com:21/";
            string str = "ftp://brewsync%40actonatepanel.com:hakunamatata@ftp.actonatepanel.com:21/";
            return str;
        }

        public static bool uploadFile(string text, string filename)
        {
            try
            {
                FtpWebRequest ftpWebRequest = (FtpWebRequest)WebRequest.Create(string.Concat(TitanFTPUploader.getFTP(), filename));
                ftpWebRequest.Method = "STOR";
                Stream requestStream = ftpWebRequest.GetRequestStream();
                byte[] bytes = Encoding.ASCII.GetBytes(text);
                requestStream.Write(bytes, 0, (int)bytes.Length);
                requestStream.Close();
                FtpWebResponse response = (FtpWebResponse)ftpWebRequest.GetResponse();
                response.Close();
                return true;
            }
            catch(Exception crap)
            {
                return false;
            }
            
        }
    }
}