using AutoMapper;
using Project.Models.DTO;

namespace Project.Models
{
    public class ProjectProfile: Profile
    {
        public ProjectProfile()
        {
            CreateMap<CustomerDto, Customer>();
            CreateMap<CategoryDto, Category>();
            CreateMap<DonorDto, Donor>();
            CreateMap<GiftDto, Gift>();
            CreateMap<SaleDto, Sale>();


        }
    }
}
