using AuthorizationMicroservice.Database.Entities;

namespace AuthorizationMicroservice.Repository
{
    public interface IAuthorizationRepository
    {
        public string GenerateToken(UserCredential user);
    }
}
