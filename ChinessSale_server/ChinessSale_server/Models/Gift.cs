
using System.Reflection.Metadata;

namespace Project.Models
{
    public class Gift
    {
        public int Id { get; set; }
        public int DonorId { get; set; }
        public float Price { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        //public byte[] Image { get; set; }
        public string image { get; set; }

        public Donor Donor { get; set; }
        public Category Category1 { get; set; }
        public IEnumerable<Sale> SaleList { get; set; }

    }
}
