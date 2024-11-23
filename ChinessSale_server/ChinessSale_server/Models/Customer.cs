namespace Project.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public IEnumerable<Sale> SaleList { get; set; }
        public bool IsManager { get; set; }

        public Customer()
        {
            IsManager = false;
        }
    }
}
