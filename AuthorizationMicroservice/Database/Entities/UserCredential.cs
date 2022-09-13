using System.ComponentModel.DataAnnotations;

namespace AuthorizationMicroservice.Database.Entities
{
    public class UserCredential
    {
        [Key]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
