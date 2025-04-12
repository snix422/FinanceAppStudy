using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using FinanceAppWebApi.Entities;
using BudgetDTO = FinanceAppWebApi.Models.BudgetDTO;
using FinanceAppWebApi.Services;
using FinanceAppWebApi.Models;
using Microsoft.AspNetCore.Http.HttpResults;


namespace FinanceAppWebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/budgets")]
    public class BudgetController : Controller
    {
   
        private readonly ILogger<BudgetController> _logger;
        private readonly IBudgetService _budgetService;
        public BudgetController(ILogger<BudgetController> logger, IBudgetService budgetService)
        {
           
            _logger = logger;
            _budgetService = budgetService;
            
        }
        private string GetCurrentUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier); 
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Budget>>> GetAllBudgets()
        {
            _logger.LogInformation("Pobieranie wszystkich budżetów...");
          
            var userId = GetCurrentUserId();

            if (userId == null)
            {
                return Unauthorized("Nie udało się pobrać ID użytkownika.");
            }

            var budgets = await _budgetService.GetAllBudgets(int.Parse(userId));

            return Ok(budgets);

        }

        [HttpGet("/api/user/{userId}/budgets")]
        public async Task<ActionResult<List<BudgetDTO>>> GetBudgetByUserId(int userId)
        {
            
            var budget = await _budgetService.GetBudgetsByUserId(userId);
            Console.WriteLine(budget);
            return Ok(budget);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BudgetDTO>> GetBudgetById(int id)
        {
           
            var userId = GetCurrentUserId();
           
            var budget = await _budgetService.GetBudgetById(id,int.Parse(userId));
           
            return Ok(budget);
        }

        [HttpPost]
        public async Task<ActionResult<Budget>> CreateBudget([FromBody] CreateBudgetDTO budget)
        {
            _logger.LogInformation("Tworzenie budżetu...");
           
            var userId = int.Parse(GetCurrentUserId());

            var newBudget = _budgetService.CreateBudget(budget,userId);

            return Created("","Budżet został stworzony pomyślnie");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBudget(int id)
        {
            _logger.LogInformation("Usuwanie budżetu po ID");
            Console.WriteLine(id);
            await _budgetService.DeleteBudget(id);

            return NoContent();

        }

       
    }
}
