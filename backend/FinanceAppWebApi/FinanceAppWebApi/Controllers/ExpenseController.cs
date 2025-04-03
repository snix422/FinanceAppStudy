using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json.Serialization;
using System.Text.Json;
using FinanceAppWebApi.Models;
using FinanceAppWebApi.Services;

namespace FinanceAppWebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/budgets/{budgetId}/expenses")]
    public class ExpenseController : Controller
    {
        
        private readonly IExpenseService _expenseService;
        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }
        private string GetCurrentUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier); 
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetAllExpensesForBudget(int budgetId)
        {
           var userId = int.Parse(GetCurrentUserId());

           var expenses = _expenseService.GetAllExpensesForBudget(budgetId,userId);

           return Ok(expenses);
        }

      
        [HttpPost]
        public async Task<ActionResult<Expense>> CreateExpense(int budgetId, [FromBody] CreateExpenseDTO expenseDTO)
        {
            var userId = int.Parse(GetCurrentUserId());
            
            var newExpense = _expenseService.CreateExpense(budgetId, userId, expenseDTO);

            return Created("", newExpense);
        }

        [HttpDelete("{expenseId}")]
        public async Task<IActionResult> DeleteExpense(int budgetId, int expenseId)
        {
            var userId = int.Parse(GetCurrentUserId());

            _expenseService.DeleteExpense(budgetId,userId,expenseId);

            return NoContent();
        }

    }
}
