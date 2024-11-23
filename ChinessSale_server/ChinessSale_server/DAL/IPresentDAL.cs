
using Microsoft.AspNetCore.Mvc;
using Project.Models;

namespace project.DAL
{
    public interface IPresentDAL
    {

        public List<Gift> GetAllGift();
        public Gift AddPresent(Gift p);
        public void DeletePresent(int id);
        public Gift GetPresentByName(string description);
        public Task<Gift> UpdatePresent(Gift gift);
        public Task<List<Gift>> GetPresentByDonorId(int donorId);
        public Task<Gift> GetGiftByIdAsinc(int id);

    }

}