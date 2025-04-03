using FinanceAppWebApi.Data;
using FinanceAppWebApi.Entities;
using FinanceAppWebApi.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace FinanceAppWebApi.Services
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategories();
        Task<Category> GetCategoryById(int id);
    }
    public class CategoryService : ICategoryService
    {
        private readonly FinanceAppDbContext _dbContext;
        public CategoryService(FinanceAppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async  Task<List<Category>> GetAllCategories() 
        {
            var categories = await _dbContext.Categories.ToListAsync();

            if (categories == null) throw new NotFoundException("Nie znaleziono kategorii");

            return categories;
        }

        public async Task<Category> GetCategoryById(int id)
        {
            var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null) throw new NotFoundException("Nie znaleziono kategorii");

            return category;
        }
    }
}
