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
using FinanceAppWebApi.Services;
using FinanceAppWebApi.Models;


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
            
        }
        private string GetCurrentUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier); 
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Budget>>> GetAllBudgets()
        {
            _logger.LogInformation("Pobieranie wszystkich budżetów...");
          
            var userId = int.Parse(GetCurrentUserId());

            var budgets = _budgetService.GetAllBudgets(userId);

            return Ok(budgets);

        }

        /*[HttpGet("/budget/{id}")]
        public async Task<ActionResult<BudgetDto>> GetBudgetById(int id)
        {
            _logger.LogInformation("Pobieranie budżetu po ID");
            var userId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            if(userId == null)
            {
                return Unauthorized("Użytkownik nie jest zalogowany");
            }
           

           


            //return Ok(budget);
        }*/

        [HttpGet("{id}")]
        public async Task<ActionResult<BudgetDto>> GetBudgetByUserId(int id)
        {

            var userId = int.Parse(GetCurrentUserId());

            var budget = _budgetService.GetBudgetById(id,userId);

            return Ok(budget);
        }

        [HttpPost]
        public async Task<ActionResult<Budget>> CreateBudget([FromBody] CreateBudgetDTO budget)
        {
            _logger.LogInformation("Tworzenie budżetu...");
           
            var userId = int.Parse(GetCurrentUserId());

            var newBudget = _budgetService.CreateBudget(budget,userId);

            return CreatedAtAction(nameof(GetBudgetByUserId), new { id = newBudget.Id }, newBudget);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBudget(int id)
        {
            _logger.LogInformation("Usuwanie budżetu po ID");
         
            _budgetService.DeleteBudget(id);

            return NoContent();

        }

       
    }
}
