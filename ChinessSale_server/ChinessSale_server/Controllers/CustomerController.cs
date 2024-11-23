using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using project.BLL;
using project.DAL;
using Project.Models;
using Project.Models.DTO;
using Microsoft.AspNetCore.Authorization;


namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class CustomerController : ControllerBase
    {
        private readonly ICustomerervice Icustomer;
        private readonly IMapper _mapper;

        public CustomerController(ICustomerervice Icustomer, IMapper mapper)
        {
            this.Icustomer = Icustomer;
            this._mapper = mapper;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<List<Customer>> GetAllCustomer()
        {
            return await Icustomer.GetAllCustomer();

        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<Customer> GetCustomerById(int id)
        {
            var user = Icustomer.GetCustomerById(id);
            if (user != null)
            {
                return Ok(user);
            }
            else
                return BadRequest("user not exist");
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<Customer> AddCustomer(CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);
            return Icustomer.AddCustomer(customer);
        }




        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<Customer> UpdateCustomer(CustomerDto customerDto, int id)
        {
            var customer = _mapper.Map<Customer>(customerDto);
            return await Icustomer.UpdateCustomer(customer, id);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public void DeleteCustomer(int id)
        {
            Icustomer.DeleteCustomer(id);
        }


        //post--api/Customer/login
        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<Customer> CustomerLogin(CustomerDto lc)
        {
            var user = Icustomer.CustomerLogin(lc);
            if (user != null)
            {
                return Ok(user);
            }
            else
                return BadRequest("user not exist");
        }


    }
}
