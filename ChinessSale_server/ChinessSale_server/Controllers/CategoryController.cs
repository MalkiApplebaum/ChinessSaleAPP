using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using project.BLL;
using Project.Models.DTO;
using Project.Models;
using Microsoft.AspNetCore.Authorization;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService ICategory;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService ICategory, IMapper mapper)
        {
            this.ICategory = ICategory;
            this._mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<List<Category>> GetAllCategories()
        {
            return await ICategory.GetAllCategories();

        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<Category> GetCategoryById(int id)
        {
            var category = ICategory.GetCategoryById(id);
            if (category != null)
            {

                return await category;
            }
            else
                return null;
        }

        [Authorize(Roles = "True")]
        [HttpPost]
        public async Task<Category> AddCategory(CategoryDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            return await ICategory.AddCategory(category);
        }
        [Authorize(Roles = "True")]
        [HttpPut("{id}")]
        public async Task<Category> UpdateCategory(CategoryDto categoryDto, int id)
        {
            var category = _mapper.Map<Category>(categoryDto);
            return await ICategory.UpdateCategory(category, id);
        }

        [Authorize(Roles = "True")]
        [HttpDelete("{id}")]
        public void DeleteCategory(int id)
        {
            ICategory.DeleteCategory(id);
        }


    }
}

