using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.DTO;

//namespace ChinessSale_server.BLL
namespace project.BLL
{
    public interface IManagerService
    {
        public Manager GetManagerByname(string name);

    }
}
