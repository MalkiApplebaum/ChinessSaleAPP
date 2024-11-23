using project.DAL;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.DTO;

namespace project.BLL
{
    public class Customerervice : ICustomerervice
    {
        public readonly ICustomerDAL customerDAL;

        public Customerervice(ICustomerDAL customerDAL)
        {
            this.customerDAL = customerDAL;
        }

        public async Task<List<Customer>> GetAllCustomer()

        {
            return await customerDAL.GetAllCustomer();
        }

      

        public Customer AddCustomer(Customer c)
        {
            return customerDAL.AddCustomer(c);
        }

        public async Task<Customer> UpdateCustomer(Customer customer, int id)
        {
            customer.Id = id;
            return await customerDAL.UpdateCustomer(customer);
        }


        public void DeleteCustomer(int id)
        {
            customerDAL.DeleteCustomer(id);
        }

        public Customer CustomerLogin(CustomerDto lc)
        {
            return customerDAL.CustomerLogin(lc);
        }

        public Customer GetCustomerById(int id)
        {
            return customerDAL.GetCustomerById(id);
        }

    }
}
