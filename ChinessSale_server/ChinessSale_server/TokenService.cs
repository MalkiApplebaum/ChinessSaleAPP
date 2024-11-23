//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using Microsoft.IdentityModel.Tokens;

//namespace ChinessSale_server
//{
//    public class TokenService
//    {

//    private const string SecretKey = "Dhft0S5uphK3vmCJQrexST1RsyjZBjXWRgJMFPU4"; // שנה בהתאם
//        private const string Issuer = "https://localhost:7235/"; // שנה בהתאם
//        private const string Audience = "https://localhost:7235/"; // שנה בהתאם

//        public string GenerateToken(string username, string role)
//        {
//            var claims = new[]
//            {
//            new Claim(JwtRegisteredClaimNames.Sub, username),
//            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//            new Claim(ClaimTypes.Role, role)
//        };

//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//            var token = new JwtSecurityToken(
//                issuer: Issuer,
//                audience: Audience,
//                claims: claims,
//                expires: DateTime.Now.AddMinutes(30),
//                signingCredentials: creds);

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }
//    }
//}



