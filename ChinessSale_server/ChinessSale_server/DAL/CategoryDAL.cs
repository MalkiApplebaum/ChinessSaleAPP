using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.DAL;
using Project.Models;
using Project.Models.DTO;
namespace project.DAL
{
    public class CategoryDAL : ICategoryDAL
    {

        private readonly ChineseSaleContext ChineseSaleContext;

        public CategoryDAL(ChineseSaleContext ChineseSaleContext)
        {
            this.ChineseSaleContext = ChineseSaleContext;
        }
        public async Task<List<Category>> GetAllCategories()
        {
            try
            {
                var c = await ChineseSaleContext.Categories.Select(x => x).ToListAsync();
                return c;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Category> AddCategory(Category c)
        {
            try
            {
                ChineseSaleContext.Categories.Add(c);
                ChineseSaleContext.SaveChanges();
                return c;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Category> UpdateCategory(Category category)
        {
            ChineseSaleContext.Categories.Update(category);
            await ChineseSaleContext.SaveChangesAsync();
            return category;
        }

        public void DeleteCategory(int id)
        {
            var c = ChineseSaleContext.Categories.FirstOrDefault(c => c.Id == id);
            if (c == null)
            {
                throw new Exception($"category {id} not found");
            }
            ChineseSaleContext.Categories.Remove(c);
            ChineseSaleContext.SaveChanges();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            try
            {
                var category =  ChineseSaleContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
                return await category;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




    }
}

