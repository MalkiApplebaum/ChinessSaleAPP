using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.DTO;

namespace project.DAL
{
    public interface ICustomerDAL
    {
        public Task<List<Customer>> GetAllCustomer();
        Customer AddCustomer(Customer c);
        public  Task<Customer> UpdateCustomer(Customer customer);

        public void DeleteCustomer(int id);
        public Customer CustomerLogin(CustomerDto lc);
        public Customer GetCustomerById(int id);


    }
}
