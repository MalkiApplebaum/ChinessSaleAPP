
using project.DAL;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.DTO;

//namespace ChinessSale_server.BLL

namespace project.BLL
{
    public class ManagerService : IManagerService
    {
        public readonly IManagerDAL managerDAL;

        public ManagerService(IManagerDAL managerDAL)
        {
            this.managerDAL = managerDAL;
        }

        public Manager GetManagerByname(string name)
        {
            return managerDAL.GetManagerByname(name);
        }

    }
}
