using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BrewBerryCloudService
{
    public static class TitanLibrary
    {
        private static readonly Random _rng = new Random();
        private const string _chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string _num = "0123456789";

        public static string RandomString(int size)
        {
            char[] buffer = new char[size];

            for (int i = 0; i < size; i++)
            {
                buffer[i] = _chars[_rng.Next(_chars.Length)];
            }
            return new string(buffer);
        }

        public static string RandomNumbers(int size)
        {
            char[] buffer = new char[size];

            for (int i = 0; i < size; i++)
            {
                buffer[i] = _num[_rng.Next(_num.Length)];
            }
            return new string(buffer);
        }

      
    }
}