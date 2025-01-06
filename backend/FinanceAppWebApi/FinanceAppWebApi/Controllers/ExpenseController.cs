using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json.Serialization;
using System.Text.Json;

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

        [Authorize]
        [HttpGet("{budgetId}/expenses")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetAllExpensesForBudget(int budgetId)
        {
            var userId = int.Parse(GetCurrentUserId());

            if(userId == null) return Unauthorized("Użytkownik nie zalogowany");

            var budget = await _context.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == userId);

            if (budget == null) return NotFound("Nie znaleziono budżetu");

            var expenses = await _context.Expenses
                            .Where(e => e.BudgetId == budgetId)
                            .ToListAsync();

            return Ok(expenses);
        }

        [Authorize]
        [HttpPost("{budgetId}/expense/create")]
        public async Task<ActionResult<Expense>> CreateExpense(int budgetId, [FromBody] ExpenseDTO expenseDTO)
        {
            var userId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            Console.WriteLine(userId);
            if (userId == null)
            {
                return Unauthorized("Użytkownik nie jest zalogowany");
            }
            if (!int.TryParse(userId.Value, out int idValue))
            {
                return BadRequest("Identyfikator użytkownika jest nieprawidłowy");
            }

            var budget = await _context.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == idValue);
            if (budget == null)
            {
                return NotFound("Nie znaleziono budżetu.");
            }

            Console.WriteLine(budget);
            
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Title.ToLower() == (expenseDTO.Category).ToLower());

            if (category == null)
            {
                return BadRequest("Nie znaleziono kategorii o podanej nazwie.");
            }

           
            var expense = new Expense
            {
                Description = expenseDTO.Description,
                Amount = expenseDTO.Amount,
                DateTime = DateTime.UtcNow, 
                BudgetId = budgetId,
                CategoryId = category.Id,      
            };

            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve, // Zapobiega cyklicznym zależnościom
                MaxDepth = 32 // Zwiększa maksymalną głębokość serializacji, jeżeli problem jest związany z głębokością
            };

            // Serializowanie obiektu Expense z ustawionymi opcjami
            var serializedExpense = JsonSerializer.Serialize(expense, options);

            return new JsonResult(serializedExpense);
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
