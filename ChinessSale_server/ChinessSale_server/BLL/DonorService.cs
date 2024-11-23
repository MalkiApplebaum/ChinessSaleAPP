using Microsoft.AspNetCore.Mvc;
using project.DAL;
using Project.Models;
using Project.Models.DTO;

namespace project.BLL
{
    public class Donorervice : IDonorervice
    {
        public readonly IDonorDAL donorDAL;

        public Donorervice(IDonorDAL donorDAL)
        {
            this.donorDAL = donorDAL;
        }


        public async Task<Donor> AddDonor(Donor donor)
        {
            return await donorDAL.AddDonor(donor);
        }

        public async Task<List<Donor>> GetAllDonors()
        {
            return await donorDAL.GetAllDonors();

        }

        public async Task DeleteDonor(int id)
        {
            await donorDAL.DeleteDonor(id);

        }
        public async Task<Donor> UpdateDonor(Donor donor, int id)
        {
            donor.Id = id;
            return await donorDAL.UpdateDonor(donor);
        }

        public async Task<Donor> GetDonorByIdAsinc(int id)
        {
            return await donorDAL.GetDonorByIdAsinc(id);
        }

        public async Task<IEnumerable<Gift>> GetGiftsForDonor(int donorId)
        {
            var donor =await donorDAL.GetDonorByIdAsinc(donorId);
            return donor?.GiftList;
        }


    }
}

