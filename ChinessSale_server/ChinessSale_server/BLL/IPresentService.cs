
using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.DTO;

namespace project.BLL
{
    public interface IGiftervice
    {
        public List<Gift> GetAllGift();
        public Gift AddPresent(Gift p);
        public void DeletePresent(int id);
        public Gift GetPresentByName(string description);
        public Task<Gift> UpdatePresent(Gift gift, int id);
        public Task<List<Gift>> GetPresentByDonorId(int donorId);
        public Task<Gift> GetGiftByIdAsinc(int id);
    }
}