namespace Project.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Gift> GiftList { get; set; }

    }
}
