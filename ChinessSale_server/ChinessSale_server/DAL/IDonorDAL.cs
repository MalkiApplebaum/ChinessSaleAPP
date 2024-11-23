
using Microsoft.AspNetCore.Mvc;
using Project.Models;

namespace project.DAL
{
    public interface IDonorDAL
    {
        public Task<Donor> AddDonor(Donor donor);
        public Task<List<Donor>> GetAllDonors();
        public Task DeleteDonor(int id);
        public Task<Donor> UpdateDonor(Donor donor);
        public Task<Donor> GetDonorByIdAsinc(int id);
        public Task<IEnumerable<Gift>> GetGiftsForDonor(int donorId);

        //public Task<IEnumerable<Gift>> GetGiftsByDonorIdAsync(int donorId);

    }
}