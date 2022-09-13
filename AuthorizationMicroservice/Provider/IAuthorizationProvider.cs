using AuthorizationMicroservice.Database.Entities;

namespace AuthorizationMicroservice.Provider
{
    public interface IAuthorizationProvider
    {
        public string AuthenticateUser(UserCredential user);
    }
}
