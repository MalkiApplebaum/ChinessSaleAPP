using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using project.BLL;
using Project.Models;
using Project.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PresentController : ControllerBase
    {

        private readonly IGiftervice Ipresent;
        private readonly IMapper _mapper;

        public PresentController(IGiftervice Ipresent, IMapper mapper)
        {
            this.Ipresent = Ipresent;
            this._mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public List<Gift> GetAllGift()
        {
            return Ipresent.GetAllGift();
        }

        [Authorize(Roles = "True")]
        [HttpPost]
        //[Authorize(Roles = "manager")]
        public ActionResult<Gift> AddPresent(GiftDto giftDTO)
        {
            if (giftDTO == null)
            {
                return BadRequest("GiftDTO is null");
            }

            var present = _mapper.Map<Gift>(giftDTO);
            var addedGift = Ipresent.AddPresent(present);
            return Ok(addedGift);
        }

        [Authorize(Roles = "True")]
        [HttpDelete("{id}")]
        public void DeletePresent(int id)
        {
            Ipresent.DeletePresent(id);
        }
        [AllowAnonymous]

        [HttpGet("{name}")]
        public Gift GetPresentByName(string description)
        {
            return Ipresent.GetPresentByName(description);
        }

        [Authorize(Roles = "True")]
        [HttpPut("{id}")]
        public async Task<Gift> UpdatePresent(GiftDto GiftDto, int id)
        {
            var gift = _mapper.Map<Gift>(GiftDto);
            return await Ipresent.UpdatePresent(gift, id);
        }
        [AllowAnonymous]
        [HttpGet("GetPresentByDonorId{donorId}")]
        public Task<List<Gift>> GetPresentByDonorId(int donorId)
        {
            return Ipresent.GetPresentByDonorId(donorId);
        }
        [AllowAnonymous]
        [HttpGet("GetGiftById{id}")]
        public async Task<Gift> GetGiftByIdAsinc(int id)
        {
            var gift = await Ipresent.GetGiftByIdAsinc(id);
            if (gift != null)
            {

                return gift;
            }
            else
                return null;
        }





    }
}