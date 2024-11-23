using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.DTO;

namespace project.BLL
{
    public interface ICustomerervice
    {
        public Task<List<Customer>> GetAllCustomer();
        Customer AddCustomer(Customer c);
        public  Task<Customer> UpdateCustomer(Customer customer, int id);
        public void DeleteCustomer(int id);
        public Customer CustomerLogin(CustomerDto lc);
        public  Customer GetCustomerById(int id);

    }
}
