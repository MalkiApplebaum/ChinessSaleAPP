using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;
using Project.Models.DTO;
//namespace ChinessSale_server.DAL
namespace project.DAL
{
    public class ManagerDAL : IManagerDAL
    {
        private readonly ChineseSaleContext ChineseSaleContext;

        public ManagerDAL(ChineseSaleContext ChineseSaleContext)
        {
            this.ChineseSaleContext = ChineseSaleContext;
        }

        public Manager GetManagerByname(string name)
        {
            try
            {
                var manager= ChineseSaleContext.Managers.FirstOrDefault(m => m.Name == name);
                return manager;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }


}
