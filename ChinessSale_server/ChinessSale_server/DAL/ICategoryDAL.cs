using Project.Models;
using Project.Models.DTO;

namespace project.DAL
{
    public interface ICategoryDAL
    {
        public Task<Category> AddCategory(Category c);
        public void DeleteCategory(int id);
        public Task<List<Category>> GetAllCategories();
        public Task<Category> UpdateCategory(Category category);
        public Task<Category> GetCategoryById(int id);
        
    }
}
