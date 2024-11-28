using FinanceAppWebApi.Data;
using FinanceAppWebApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceAppWebApi.Controllers
{
    public class CategoriesController : Controller
    {
        private readonly FinanceAppDbContext _context;

        public CategoriesController(FinanceAppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategories()
        {
            var categories = await _context.Categories.ToListAsync();

            if(categories == null) return NotFound("Nie znaleziono kategorii");

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategoryById(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null) return NotFound("Nie znaleziono kategorii");

            return Ok(category);
        }
    }
}
