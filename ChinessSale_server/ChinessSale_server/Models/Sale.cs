namespace Project.Models
{
    public class Sale
    {
        //all the gifts of this user. The both status.
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int GiftId { get; set; }
        public bool Status { get; set; }
        public int Count { get; set; }
        public Customer Customer { get; set; }
        public Gift Gift { get; set; }
    }
}
