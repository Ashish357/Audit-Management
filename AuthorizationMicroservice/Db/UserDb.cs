using AuthorizationMicroservice.Database;
using AuthorizationMicroservice.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthorizationMicroservice.Db
{
    public class UserDb
    {
        public static List<UserCredential> userlist= new List<UserCredential>()
        {
            new UserCredential()
            {
                UserId = 1,
                Username = "abc",
                Password="abc123"
            }
        };
    }
}