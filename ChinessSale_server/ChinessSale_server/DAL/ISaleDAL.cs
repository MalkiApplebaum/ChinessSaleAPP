using Project.Models;

namespace project.DAL
{
    public interface ISaleDAL
    {
        public Task<List<Sale>> GetAllSales();
        public Task<Sale> AddSale(Sale c);
        public Task<List<Sale>> GetSaleByCustomerIdAsinc(int customerId);
        public Task<Sale> GetSaleById(int saleId);
        public Task<Sale> UpdateSaleStatus(Sale s);
        public Task DeleteSale(int id);
        public Task<List<Sale>> GetSaleByGift(int giftId);



    }
}
  