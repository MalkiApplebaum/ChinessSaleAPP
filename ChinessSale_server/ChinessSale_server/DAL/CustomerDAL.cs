using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;
using Project.Models.DTO;
namespace project.DAL
{
    public class CustomerDAL : ICustomerDAL
    {
        private readonly ChineseSaleContext ChineseSaleContext;

        public CustomerDAL(ChineseSaleContext ChineseSaleContext)
        {
            this.ChineseSaleContext = ChineseSaleContext;
        }

        public async Task<List<Customer>>GetAllCustomer()
        {
            try
            {
                var c= await ChineseSaleContext.Customers.Select(x => x).ToListAsync();
                return c;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Customer AddCustomer(Customer c)
        {
            var manager = ChineseSaleContext.Managers.FirstOrDefault(m => m.Name == c.Name);
            try
            {
                if (manager != null)
                    c.IsManager = true;

                ChineseSaleContext.Customers.Add(c);
                ChineseSaleContext.SaveChanges();
                return c;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Customer> UpdateCustomer(Customer customer)
        {
            ChineseSaleContext.Customers.Update(customer);
            await ChineseSaleContext.SaveChangesAsync();
            return customer;
        }

        public void DeleteCustomer(int id)
        {
            var c = ChineseSaleContext.Customers.FirstOrDefault(c => c.Id == id);
            if (c == null)
            {
                throw new Exception($"customer {id} not found");
            }
            ChineseSaleContext.Customers.Remove(c);
            ChineseSaleContext.SaveChanges();
        }

        public Customer CustomerLogin(CustomerDto lc)
        {
            try
            {
                var customer = ChineseSaleContext.Customers.FirstOrDefault(c => c.Name == lc.Name && c.Password == lc.Password);
                return customer;
            }
            catch(Exception ex)
            {
                throw ex;
            }

        }

        public Customer GetCustomerById(int id)
        {
            try
            {
                var customer = ChineseSaleContext.Customers.FirstOrDefault(c => c.Id == id);
                return customer;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }


}
