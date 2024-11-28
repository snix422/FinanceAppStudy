using FinanceAppWebApi.Data;
using FinanceAppWebApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;

namespace FinanceAppWebApi.Controllers
{
    public class BudgetController : Controller
    {
        private readonly FinanceAppDbContext _context;
        public BudgetController(FinanceAppDbContext context)
        {
            _context = context;
        }
        private string GetCurrentUserId()
        {
            // Przykład z użyciem Identity (możesz dostosować to do swojego rozwiązania)
            return User.FindFirstValue(ClaimTypes.NameIdentifier); // Zwróci ID użytkownika z claims
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Budget>>> GetAllBudgets(int userId)
        {
            //var userId = int.Parse(GetCurrentUserId());

            var budgets = _context.Budgets
                            .Where(b => b.UserId == userId)
                            .Include(b => b.Expenses)
                            .ToList();

            return Ok(budgets);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Budget>>> GetBudgetById(int id)
        {

            var userId = int.Parse(GetCurrentUserId());
            var budget = _context.Budgets
                            .Where(b => b.Id == id &&  b.UserId == userId)
                            .Include(b => b.Expenses)
                            .FirstOrDefaultAsync();

            if (budget == null) return NotFound("Nie znaleziono wybranego budżetu");

            return Ok(budget);
        }

        [HttpPost]
        public async Task<ActionResult<Budget>> CreateBudget([FromBody] Budget budget)
        {
            var userId = int.Parse(GetCurrentUserId());

            budget.UserId = userId;

            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof (GetBudgetById), budget);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBudget(int id)
        {
            var userId = int.Parse(GetCurrentUserId());

            var budget = await _context.Budgets
                            .Where(b => b.Id == id && b.UserId == userId)
                            .FirstOrDefaultAsync();

            if (budget == null) return NotFound("Nie znaleziono budżetu");

            _context.Budgets.Remove(budget);
            await _context.SaveChangesAsync();

            return NoContent();

        }

       
    }
}
