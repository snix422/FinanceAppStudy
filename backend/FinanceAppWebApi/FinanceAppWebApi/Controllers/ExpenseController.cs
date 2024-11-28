using FinanceAppWebApi.Data;
using FinanceAppWebApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FinanceAppWebApi.Controllers
{
    public class ExpenseController : Controller
    {
        private readonly FinanceAppDbContext _context;
        public ExpenseController(FinanceAppDbContext context)
        {
            _context = context;
        }
        private string GetCurrentUserId()
        {
            // Przykład z użyciem Identity (możesz dostosować to do swojego rozwiązania)
            return User.FindFirstValue(ClaimTypes.NameIdentifier); // Zwróci ID użytkownika z claims
        }

        [HttpGet("{budgetId}/expenses")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetAllExpensesForBudget(int budgetId)
        {
            var userId = int.Parse(GetCurrentUserId());

            var budget = await _context.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == userId);

            if (budget == null) return NotFound("Nie znaleziono budżetu");

            var expenses = await _context.Expenses
                            .Where(e => e.BudgetId == budgetId)
                            .ToListAsync();

            return Ok(expenses);
        }

        [HttpPost("{budgetId}/expenses")]
        public async Task<ActionResult<Expense>> CreateExpense(int budgetId, [FromBody] Expense expense)
        {
            var userId = int.Parse(GetCurrentUserId());

            var budget = await _context.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == userId);

            if (budget == null) return NotFound("Nie znaleziono budżetu");

            expense.BudgetId = budgetId;
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return Ok(expense);

        }

        [HttpDelete("{budgetId}/expense/{id}")]
        public async Task<IActionResult> DeleteExpense(int budgetId, int id)
        {
            var userId = int.Parse(GetCurrentUserId());

            var budget = await _context.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == userId);
            if (budget == null) return NotFound("Nie znaleziono budżetu");

            var expense = await _context.Expenses.FirstOrDefaultAsync(e => e.Id == id && e.BudgetId == budgetId);
            if (expense == null) return NotFound("Nie znaleziono wydatku");

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
