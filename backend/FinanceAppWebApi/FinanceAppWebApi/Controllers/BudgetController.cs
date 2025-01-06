using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using FinanceAppWebApi.Entities;
using BudgetDTO = FinanceAppWebApi.DTOs.BudgetDTO;


namespace FinanceAppWebApi.Controllers
{
    [ApiController]
    [Route("/api")]
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

        [HttpGet("/user/budgets")]
       
        public async Task<ActionResult<IEnumerable<Budget>>> GetAllBudgets()
        {
            var userEmailClaim = User.Claims.First(c => c.Type == ClaimTypes.Email);
            if (userEmailClaim == null || string.IsNullOrEmpty(userEmailClaim.Value))
            {
                return Unauthorized("Email not found in token.");
            }

            var userEmail = userEmailClaim.Value;

            // Pobieranie użytkownika z bazy danych
            var user = await _context.Users.FirstOrDefaultAsync(i => i.Email == userEmail);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Pobieranie budżetów dla użytkownika
            /*var budgets = await _context.Budgets
                .Where(b => b.UserId == user.Id)
                .Include(b => b.Expenses)
                .ToListAsync();*/

            var budgets = await _context.Budgets
                .Where(b => b.UserId == user.Id)
                .Include(b => b.Expenses)
        .ThenInclude(e => e.Category)
    .Select(b => new
    {
        Id = b.Id,
        Name = b.Title,
        Amount = b.TotalAmount,
        Expenses = b.Expenses.Select(e => new ExpensesDto
        {
            Id = e.Id,
            Description = e.Description,
            Amount = e.Amount,
            CategoryName = e.Category.Title
        }).ToList()
    })
    .ToListAsync();

            return Ok(budgets);

        }

        [HttpGet("/budget/{id}")]
        public async Task<ActionResult<BudgetDto>> GetBudgetById(int id)
        {

            var userId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            if(userId == null)
            {
                return Unauthorized("Użytkownik nie jest zalogowany");
            }
            if (!int.TryParse(userId.Value, out int idValue))
            {
                return BadRequest("Identyfikator użytkownika jest nieprawidłowy");
            }

            var budget = await _context.Budgets
                            .Where(b => b.Id == id &&  b.UserId == idValue)
                            .Include(b => b.Expenses)
                            .ThenInclude(e => e.Category)
                            .Select(b => new BudgetDto
                            {
                                Id = b.Id,
                                Name = b.Title,
                                Amount = b.TotalAmount,
                                Expenses = b.Expenses.Select(e => new ExpensesDto
                                {
                                    Id = e.Id,
                                    Description = e.Description,
                                    Amount = e.Amount,
                                    CategoryName = e.Category.Title
                                }).ToList()
                            })
                            .FirstOrDefaultAsync();

            if (budget == null) return NotFound("Nie znaleziono wybranego budżetu");

            Console.WriteLine(budget);

            return Ok(budget);
        }

        [HttpPost("/budget/create")]
        public async Task<ActionResult<Budget>> CreateBudget([FromBody] BudgetDTO budget)
        {
            if (!DateTime.TryParse(budget.StartDate, out var startDate))
            {
                return BadRequest("Invalid start date format.");
            }
            if (!DateTime.TryParse(budget.EndDate, out var endDate))
            {
                return BadRequest("Invalid end date format.");
            }
           if (!decimal.TryParse(budget.TotalAmount, out var totalAmount))
            {
                return BadRequest("Invalid total amount format.");
            }

            if (endDate < startDate)
            {
                return BadRequest("End date must be after start date.");
            }

            var userId = int.Parse(GetCurrentUserId());

            if (userId == null)
            {
                return Unauthorized("Użytkownik nie został zalogowany");
            }

            var newBudget = new Budget
            {
                Title = budget.Title,
                TotalAmount = totalAmount,
                StartDate = startDate,
                EndDate = endDate,
                UserId = userId,
            };

            _context.Budgets.Add(newBudget);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBudgetById), new { id = newBudget.Id }, budget);
        }

        [HttpDelete("/budget/{id}")]
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
