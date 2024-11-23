using Project.Models;

namespace project.BLL
{
    public interface ISaleService
    {
        public Task<List<Sale>> GetAllSales();
        public Task<Sale> AddSale(Sale sale);
        public Task<List<Sale>> GetSaleByCustomerIdAsinc(int customerId);
        Task<Sale> GetSaleById(int saleId);
        public Task<Sale> UpdateSaleStatus(Sale sale, bool status);
        public Task DeleteSale(int id);
        public Task<List<Sale>> GetSaleByGift(int giftId);

    }
}
