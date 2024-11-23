using Microsoft.AspNetCore.Mvc;
using project.DAL;
using Project.Models;
using Project.Models.DTO;

namespace project.BLL
{
    public class CategoryService: ICategoryService
    {
        public readonly ICategoryDAL categoryDAL;

        public CategoryService(ICategoryDAL categoryDAL)
        {
            this.categoryDAL = categoryDAL;
        }

        
        public async Task<List<Category>> GetAllCategories()
        {
            return await categoryDAL.GetAllCategories();
        }

        public async Task<Category> AddCategory(Category c)
        {
            return await categoryDAL.AddCategory(c);
        }
        public async Task<Category> UpdateCategory(Category category, int id)
        {
            category.Id = id;
            return await categoryDAL.UpdateCategory(category);
        }

        public void DeleteCategory(int id)
        {
             categoryDAL.DeleteCategory(id);
        }

        public async Task<Category> GetCategoryById(int id)
        {
            return await categoryDAL.GetCategoryById(id);
        }





    }
}
