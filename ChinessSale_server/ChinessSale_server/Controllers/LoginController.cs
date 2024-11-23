
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;
using project.DAL;
using ChinessSale_server.Models.DTO;
using Project.Models;

namespace ChineseOction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly ChineseSaleContext ChineseSaleContext;
        private readonly IMapper _mapper;

        public LoginController(IConfiguration config, ChineseSaleContext ChineseSaleContext, IMapper mapper)
        {
            _config = config;
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.ChineseSaleContext = ChineseSaleContext ?? throw new ArgumentNullException(nameof(ChineseSaleContext));
        }

        //[AllowAnonymous]
        //[HttpPost]
        //public ActionResult<object> Login(CustomerLoginDto userLogin)
        //{
        //    var user = Authenticate(userLogin);
        //    if (user != null)
        //    {
        //        var token = Generate(user);
        //        return new { token };
        //    }
        //    return Unauthorized();
        //}
        [AllowAnonymous]
        [HttpPost]
        public ActionResult<object> Login(CustomerLoginDto userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = Generate(user);
                var userDetails = new
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    IsManager = user.IsManager // assuming the User entity has this property
                };
                return new { token, user = userDetails };
            }
            return Unauthorized();
        }
        //private string Generate(Customer user)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new[]
        //        {
        //            new Claim(ClaimTypes.Role, user.IsManager.ToString()),
        //            new Claim("Id", user.Id.ToString()),
        //            new Claim("Name", user.Name)
        //        }),
        //        Expires = DateTime.UtcNow.AddHours(1),
        //        Issuer = _config["Jwt:Issuer"],
        //        Audience = _config["Jwt:Audience"],
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };

        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    return tokenHandler.WriteToken(token);
        //}

        private string Generate(Customer user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, user.IsManager.ToString()),
                new Claim("Id", user.Id.ToString()),
                new Claim("Name", user.Name)
            };

            // Add role claim based on IsManager
            if (user.IsManager)
            {
                claims.Add(new Claim(ClaimTypes.Role, user.IsManager.ToString()));
                claims.Add(new Claim(ClaimTypes.Role, "Manager"));
            }
            else
            {
                claims.Add(new Claim(ClaimTypes.Role, "User"));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        private Customer Authenticate(CustomerLoginDto userLogin)
        {
            return ChineseSaleContext.Customers.FirstOrDefault(p =>
                p.Email.ToLower() == userLogin.Email.ToLower() &&
                p.Password == userLogin.Password.ToLower());
        }
    }
}
