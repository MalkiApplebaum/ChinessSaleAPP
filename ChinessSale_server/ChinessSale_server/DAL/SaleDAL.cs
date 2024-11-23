using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace project.DAL
{
    public class SaleDAL: ISaleDAL
    {
        private readonly ChineseSaleContext ChineseSaleContext;


        public SaleDAL(ChineseSaleContext ChineseSaleContext)
        {
            this.ChineseSaleContext = ChineseSaleContext;
        }
        public async Task<List<Sale>> GetAllSales()
        {
            try
            {
           
                var s=await ChineseSaleContext.Sales.Select(x => x).ToListAsync();
                return s;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Sale> AddSale(Sale c)
        {
            try
            {
                ChineseSaleContext.Sales.Add(c);
                ChineseSaleContext.SaveChanges();
                return c;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<Sale>> GetSaleByCustomerIdAsinc(int customerId)
        {
            return await ChineseSaleContext.Sales.Where(s => s.CustomerId == customerId).ToListAsync();
        }
        public async Task<Sale> GetSaleById(int saleId)
        {
            return await ChineseSaleContext.Sales.FirstOrDefaultAsync(s => s.Id == saleId);
        }

        public async Task<Sale> UpdateSaleStatus(Sale updatedSale)
        {
            var saleToUpdate = await ChineseSaleContext.Sales.FindAsync(updatedSale.Id);
            if (saleToUpdate != null)
            {
                saleToUpdate.Status = updatedSale.Status;
                await ChineseSaleContext.SaveChangesAsync();
            }
            return saleToUpdate;
        }

        public async Task DeleteSale(int id)
        {
            var s = await ChineseSaleContext.Sales.FirstOrDefaultAsync(s => s.Id == id);
            if (s == null)
            {
                throw new Exception($"Sale {id} not found");
            }
            ChineseSaleContext.Sales.Remove(s);
            await ChineseSaleContext.SaveChangesAsync();
        }
        public async Task<List<Sale>> GetSaleByGift(int giftId)
        {
            return await ChineseSaleContext.Sales.Where(s => s.GiftId == giftId).ToListAsync();
        }

    }
}
