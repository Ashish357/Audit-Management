using AuthorizationMicroservice.Database;
using AuthorizationMicroservice.Database.Entities;
using AuthorizationMicroservice.Provider;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using AuthorizationMicroservice.Db;

namespace AuthorizationMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorizationProvider _authProv;
        // public readonly DatabaseContext _context;

        public AuthorizationController(IAuthorizationProvider authProv/*, DatabaseContext context*/)
        {
            _authProv = authProv;
            // _context = context;
        }

        //public string GenerateJSONWebToken()
        //{


        //var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);


        //    var token = new JwtSecurityToken(
        //      issuer: _configuration["Jwt:Issuer"],
        //      audience: _configuration["Jwt:Issuer"],
        //      null,
        //      expires: DateTime.Now.AddMinutes(15),
        //      signingCredentials: credentials);



        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        //[httpget]
        //public async task<actionresult<string>> getuser(string username, string password)
        //{
        //    return generatejsonwebtoken();
        //}
        [HttpPost]
        public IActionResult AuthenticateUser(UserCredential user )
        {
            
            try
            {
                var token = _authProv.AuthenticateUser(user);
                if (string.IsNullOrEmpty(token))
                {
                   
                    return Unauthorized();
                }

                int UserId = UserDb.userlist.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password).UserId;
                return Ok(new { tokenString = token ,userid= UserId ,username=user.Username});
            }
            catch (Exception exception)
            {
                
                return new StatusCodeResult(500);

            }
        }
    }
}
