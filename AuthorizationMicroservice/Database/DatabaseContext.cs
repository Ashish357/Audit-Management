using AuthorizationMicroservice.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuthorizationMicroservice.Database
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options):base(options)
        {
        }
        public  virtual DbSet<UserCredential>  UserCredentials { get; set; }
    }
}
