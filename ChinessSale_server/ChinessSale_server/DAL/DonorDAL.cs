
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Project.Models;

namespace project.DAL
{
    public class DonorDAL : IDonorDAL
    {
        private readonly ChineseSaleContext ChineseSaleContext;

        public DonorDAL(ChineseSaleContext ChineseSaleContext)
        {
            this.ChineseSaleContext = ChineseSaleContext;
        }

        public async Task<Donor> AddDonor(Donor donor)
        {
            try
            {
                await ChineseSaleContext.Donors.AddAsync(donor);
                await ChineseSaleContext.SaveChangesAsync();
                return donor;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed!");
            }
        }

        public async Task<List<Donor>> GetAllDonors()
        {
            try
            {
                var d = await ChineseSaleContext.Donors.ToListAsync();
                return d;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task DeleteDonor(int id)
        {
            var d = await ChineseSaleContext.Donors.FirstOrDefaultAsync(d => d.Id == id);
            if (d == null)
            {
                throw new Exception($"Donor {id} not found");
            }
            ChineseSaleContext.Donors.Remove(d);
            await ChineseSaleContext.SaveChangesAsync();
        }
        public async Task<Donor> UpdateDonor(Donor donor)
        {
            ChineseSaleContext.Donors.Update(donor);
            await ChineseSaleContext.SaveChangesAsync();
            return donor;
        }

        public async Task<Donor> GetDonorByIdAsinc(int id)
        {
            try
            {
                var donor =await ChineseSaleContext.Donors.FirstOrDefaultAsync(c => c.Id == id);
                return donor;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Gift>> GetGiftsForDonor(int donorId)
        {
            var donor = await ChineseSaleContext.Donors.Include(d => d.GiftList).FirstOrDefaultAsync(d => d.Id == donorId);
            //return donor?.GiftList ?? Enumerable.Empty<Gift>();
            if (donor == null)
            {
                throw new Exception("donor not found");
            }
            if(donor.GiftList.IsNullOrEmpty())
            {
                throw new Exception("no gifts");
            }
            return donor.GiftList;
        }



    }
}
