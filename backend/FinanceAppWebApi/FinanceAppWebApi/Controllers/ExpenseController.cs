using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FinanceAppWebApi.Controllers
{
    [ApiController]
    [Route("/api")]
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

        [HttpPost("{budgetId}/expense/create")]
        public async Task<ActionResult<Expense>> CreateExpense(int budgetId, [FromBody] ExpenseDTO expenseDTO)
        {
            var userId = int.Parse(GetCurrentUserId());

            // Sprawdź, czy budżet należy do użytkownika
            var budget = await _context.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == userId);
            if (budget == null)
            {
                return NotFound("Nie znaleziono budżetu.");
            }

            // Znajdź kategorię po nazwie
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Title == expenseDTO.Category);

            if (category == null)
            {
                return BadRequest("Nie znaleziono kategorii o podanej nazwie.");
            }

            // Tworzenie nowego Expense
            var expense = new Expense
            {
                Description = expenseDTO.Description,
                Amount = expenseDTO.Amount,
                DateTime = DateTime.UtcNow, // Możesz ustawić aktualny czas
                BudgetId = budgetId,
                CategoryId = category.Id, // Ustawienie ID kategorii
                Category = category        // Możesz również ustawić obiekt Category, jeśli jest to wymagane
            };

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
