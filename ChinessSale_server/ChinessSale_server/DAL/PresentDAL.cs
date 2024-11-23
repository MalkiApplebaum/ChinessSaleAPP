
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace project.DAL
{
    public class PresentDAL : IPresentDAL
    {
        private readonly ChineseSaleContext ChineseSaleContext;


        public PresentDAL(ChineseSaleContext ChineseSaleContext)
        {
            this.ChineseSaleContext = ChineseSaleContext;
        }

        public List<Gift> GetAllGift()
        {
            try
            {
                ChineseSaleContext.Gifts.ToList();
                //ChineseSaleContext.SaveChanges();
                return ChineseSaleContext.Gifts.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public Gift AddPresent(Gift p)
        {
            try
            {
                ChineseSaleContext.Gifts.Add(p);
                ChineseSaleContext.SaveChanges();
                return p;
            }
            catch (Exception ex)
            {
                // הוסף לוג לשגיאה כדי לעקוב אחריה
                Console.WriteLine(ex.Message);
                throw;
            }
        }


        public void DeletePresent(int id)
        {
            var p = ChineseSaleContext.Gifts.FirstOrDefault(c => c.Id == id);
            if (p == null)
            {
                throw new Exception($"Present {id} not found");
            }
            ChineseSaleContext.Gifts.Remove(p);
            ChineseSaleContext.SaveChanges();
        }

        public Gift GetPresentByName(string description)
        {
            var P = ChineseSaleContext.Gifts.FirstOrDefault(p => p.Description == description);
            if (P == null)
            {
                throw new Exception($"Present {description} not found");
            }
            return P;
        }

        public async Task<Gift> UpdatePresent(Gift gift)
        {
            ChineseSaleContext.Gifts.Update(gift);
            await ChineseSaleContext.SaveChangesAsync();
            return gift;
        }

        public async Task<List<Gift>> GetPresentByDonorId(int donorId)
        {
            return await ChineseSaleContext.Gifts.Where(d=>d.DonorId==donorId).ToListAsync();
        }
        public async Task<Gift> GetGiftByIdAsinc(int id)
        {
            try
            {
                var gift = await ChineseSaleContext.Gifts.FirstOrDefaultAsync(g => g.Id == id);
                return gift;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
