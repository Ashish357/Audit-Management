using AuthorizationMicroservice.Database.Entities;
using AuthorizationMicroservice.Repository;
using System;

namespace AuthorizationMicroservice.Provider
{
    public class AuthorizationProvider : IAuthorizationProvider
    {
        private readonly IAuthorizationRepository _authRepo;

        public AuthorizationProvider(IAuthorizationRepository authRepo)
        {
            _authRepo = authRepo;
        }

        public string AuthenticateUser(UserCredential user)
        {
            string token = null;
            try
            {
                
                token = _authRepo.GenerateToken(user);
                
            }
            catch (Exception exception)
            {
                
            }
            return token;
        }
    }
}
