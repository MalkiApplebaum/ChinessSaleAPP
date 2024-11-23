//namespace ChinessSale_server.Controllers
//{
//    using Microsoft.AspNetCore.Mvc;

//    [ApiController]
//    [Route("api/[controller]")]
//    public class AuthController : ControllerBase
//    {
//        private readonly TokenService _tokenService;

//        public AuthController(TokenService tokenService)
//        {
//            _tokenService = tokenService;
//        }

//    //    [HttpPost("login")]
//    //    public IActionResult Login([FromBody] LoginModel model)

//    //    {
//    //        // בדוק את שם המשתמש והסיסמה מול ה-DB
//    //        var user = AuthenticateUser(model.Username, model.Password);
//    //        if (user == null)
//    //            return Unauthorized();

//    //        var token = _tokenService.GenerateToken(user.Username, user.Role);
//    //        return Ok(new { token });
//    //    }

//    //    private UserModel AuthenticateUser(string username, string password)
//    //    {
//    //        // בדיקה בסיסית לדוגמה בלבד
//    //        if (username == "admin" && password == "password")
//    //        {
//    //            return new UserModel { Username = "admin", Role = "manager" };
//    //        }
//    //        return null;
//    //    }
//    //}

//    [HttpPost("login")]
//    public IActionResult Login(string username, string password)
//    {
//        // בדוק את שם המשתמש והסיסמה מול ה-DB
//        var user = AuthenticateUser(username, password);
//        if (user == null)
//            return Unauthorized();

//        var token = _tokenService.GenerateToken(user.Username, user.Role);
//        return Ok(new { token });
//    }

//    private UserModel AuthenticateUser(string username, string password)
//    {
//        // בדיקה בסיסית לדוגמה בלבד
//        if (username == "admin" && password == "password")
//        {
//            return new UserModel { Username = "admin", Role = "manager" };
//        }
//        return null;
//    }
//}

//public class LoginModel
//    {
//        public string Username { get; set; }
//        public string Password { get; set; }
//    }

//    public class UserModel
//    {
//        public string Username { get; set; }
//        public string Role { get; set; }
//    }

//}
