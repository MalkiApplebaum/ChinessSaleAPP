using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project.BLL;
using project.DAL;
using Project.Models;
using Project.Models.DTO;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DonorController : ControllerBase
    {

        private readonly IDonorervice Idonor;
        private readonly IMapper _mapper;

        public DonorController(IDonorervice Idonor, IMapper mapper)
        {
            this.Idonor = Idonor;
            this._mapper = mapper;
        }

        [Authorize(Roles = "True")]
        [HttpPost]
        public async Task<Donor> AddDonor(DonorDto dDTO)
        {
            var donor = _mapper.Map<Donor>(dDTO);
            try
            {
                return await Idonor.AddDonor(donor);

            }
            catch (Exception ex)
            {
                throw;
            }

        }
        [Authorize(Roles = "True")]
        [HttpGet]
        public async Task<List<Donor>> GetAllDonors()
        {
            try
            {
                var a = await Idonor.GetAllDonors();
                return a;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [AllowAnonymous]
        private ActionResult<Donor> Ok(List<Donor> donors)
        {
            throw new NotImplementedException();
        }

        [Authorize(Roles = "True")]
        [HttpDelete("{id}")]
        public async Task DeleteDonor(int id)
        {
            try
            {
                await Idonor.DeleteDonor(id);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [Authorize(Roles = "True")]
        [HttpPut("{id}")]
        public async Task<Donor> UpdateDonor(DonorDto DonorDto, int id)
        {
            var donor = _mapper.Map<Donor>(DonorDto);
            return await Idonor.UpdateDonor(donor, id);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<Donor> GetDonorByIdAsinc(int id)
        {
            var donor =await Idonor.GetDonorByIdAsinc(id);
            if (donor != null)
            {

                return donor;
            }
            else
                return null;
        }

        [AllowAnonymous]
        [HttpGet("{id}/gifts")]
        public async Task<IActionResult> GetGiftsForDonor(int id)
        {
            try
            {
                var gifts =await Idonor.GetGiftsForDonor(id);
                if (gifts == null)
                {
                    return NotFound();
                }
                return Ok(gifts);
            }
            catch (Exception ex)
            {
                // Log the exception (ex)
                return StatusCode(500, "Internal server error");
            }
        }

    }
}