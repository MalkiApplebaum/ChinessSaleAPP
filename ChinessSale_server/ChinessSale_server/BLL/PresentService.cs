
using Microsoft.AspNetCore.Mvc;
using project.DAL;
using Project.Models;
using Project.Models.DTO;

namespace project.BLL
{
    public class Giftervice : IGiftervice
    {
        public readonly IPresentDAL presentDAL;

        public Giftervice(IPresentDAL presentDAL)
        {
            this.presentDAL = presentDAL;
        }
        public List<Gift> GetAllGift()
        {
            return presentDAL.GetAllGift();
        }
        public Gift AddPresent(Gift p)
        {
            return presentDAL.AddPresent(p);
        }
        public void DeletePresent(int id)
        {
            presentDAL.DeletePresent(id);
        }

        public Gift GetPresentByName(string description)
        {
            return presentDAL.GetPresentByName(description);
        }
        public async Task<Gift> UpdatePresent(Gift gift, int id)
        {
            gift.Id = id;
            return await presentDAL.UpdatePresent(gift);
        }
        public async Task<List<Gift>> GetPresentByDonorId(int donorId)
        {
            return await presentDAL.GetPresentByDonorId(donorId);
        }

        public async Task<Gift> GetGiftByIdAsinc(int id)
        {
            return await presentDAL.GetGiftByIdAsinc(id);
        }
    }
}