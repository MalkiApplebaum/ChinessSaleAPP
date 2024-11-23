using project.DAL;
using Project.Models;
using Project.Models.DTO;

namespace project.BLL
{
    public class SaleService: ISaleService
    {

        public readonly ISaleDAL saleDAL;

        public SaleService(ISaleDAL saleDAL)
        {
            this.saleDAL = saleDAL;
        }

        public async Task<List<Sale>> GetAllSales()
        {
            return await saleDAL.GetAllSales();
        }
        public async Task<Sale> AddSale(Sale c)
        {
            return await saleDAL.AddSale(c);
        }
        public async Task<List<Sale>> GetSaleByCustomerIdAsinc(int customerId)
        {
            return await saleDAL.GetSaleByCustomerIdAsinc(customerId);
        }
        public async Task<Sale> GetSaleById(int saleId)
        {
            return await saleDAL.GetSaleById(saleId);
        }
        public async Task<Sale> UpdateSaleStatus(Sale sale, bool status)
        {
            sale.Status = status;
            return await saleDAL.UpdateSaleStatus(sale);
        }
        public async Task DeleteSale(int id)
        {
            await saleDAL.DeleteSale(id);

        }
        public async Task<List<Sale>> GetSaleByGift(int giftId)
        {
            return await saleDAL.GetSaleByGift(giftId);
        }
    }
}

