using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using project.BLL;
using Project.Models;
using Project.Models.DTO;
using Microsoft.AspNetCore.Authorization;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaleController: ControllerBase
    {
        private readonly ISaleService ISale;
        private readonly IMapper _mapper;

        public SaleController(ISaleService ISale, IMapper mapper)
        {
            this._mapper = mapper;
            this.ISale = ISale;
        }
        [AllowAnonymous]

        [HttpGet]
        public async Task<List<Sale>> GetAllSales()
        {
            return await ISale.GetAllSales();
        }
        [AllowAnonymous]

        [HttpPost]
        public async Task<Sale> AddSale(SaleDto saleDto)
        {
            var sale = _mapper.Map<Sale>(saleDto);
            return await ISale.AddSale(sale);
        }
        [AllowAnonymous]

        [HttpGet("GetSaleByCustomerIdAsinc{customerId}")]
        public async Task<List<Sale>> GetSaleByCustomerIdAsinc(int customerId)
        {
            return await ISale.GetSaleByCustomerIdAsinc(customerId);
        }
        [AllowAnonymous]

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSaleStatus(int id)
        {
            try
            {
                var sale = await ISale.GetSaleById(id);
                if (sale == null)
                {
                    return NotFound($"Sale with ID {id} not found");
                }
                var updatedSale = await ISale.UpdateSaleStatus(sale, true);
                return Ok(updatedSale);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [AllowAnonymous]

        [HttpDelete("{id}")]
        public async Task DeleteSale(int id)
        {
            try
            {
                await ISale.DeleteSale(id);
            }
            catch (Exception)
            {
                throw;
            }

        }
        [AllowAnonymous]

        [HttpGet("GetSaleByGift/{giftId}")]
        public async Task<List<Sale>> GetSaleByGift(int giftId)
        {
            return await ISale.GetSaleByGift(giftId);
            //return await _context.Purchases
            //                     .Where(p => p.GiftId == giftId)
            //                     .Include(p => p.Gift)
            //                     .ToListAsync();
        }
        [AllowAnonymous]

        [HttpGet("{id}")]
        public async Task<Sale> GetSaleById(int id)
        {
            var sale = await ISale.GetSaleById(id);
            if (sale != null)
            {

                return sale;
            }
            else
                return null;
        }

    }
}
