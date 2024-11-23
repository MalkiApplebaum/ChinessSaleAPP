using Microsoft.AspNetCore.Mvc;
using Project.Models;

namespace project.BLL
{
    public interface ICategoryService
    {
        public Task<List<Category>> GetAllCategories();

        public Task<Category> AddCategory(Category category);
        public Task<Category> UpdateCategory(Category category, int id);

        public void DeleteCategory(int id);
        public Task<Category> GetCategoryById(int id);

    }
}
