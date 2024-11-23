using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using project.BLL;
using project.DAL;
using Project.Models;
using Project.Models.DTO;
using Microsoft.AspNetCore.Authorization;


namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class ManagerController : ControllerBase
    {
        private readonly IManagerService IManager;
        private readonly IMapper _mapper;

        public ManagerController(IManagerService IManager, IMapper mapper)
        {
            this.IManager = IManager;
            this._mapper = mapper;
        }


        [AllowAnonymous]
        [HttpGet("{name}")]
        public ActionResult<Manager> GetManagerByname(string name)
        {
            var user = IManager.GetManagerByname(name);
            if (user != null)
            {
                return Ok(user);
            }
            else
                return BadRequest("user not exist");
        }

    }
}
