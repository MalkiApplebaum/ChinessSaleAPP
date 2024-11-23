
using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.DTO;

namespace project.BLL
{
    public interface IDonorervice
    {

        public Task<Donor> AddDonor(Donor donor);
        public Task<List<Donor>> GetAllDonors();
        public Task DeleteDonor(int id);
        public Task<Donor> UpdateDonor(Donor donor, int id);
        public Task<Donor> GetDonorByIdAsinc(int id);
        //public Task<IEnumerable<Gift>> GetGiftsByDonorIdAsync(int donorId);
        public Task<IEnumerable<Gift>> GetGiftsForDonor(int donorId);

    }


}
