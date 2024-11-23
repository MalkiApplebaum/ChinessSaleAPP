using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.DTO;

//namespace ChinessSale_server.DAL
namespace project.DAL
{
    public interface IManagerDAL
    {
        public Manager GetManagerByname(string name);

    }
}
