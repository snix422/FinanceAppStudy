using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using FinanceAppWebApi.Exceptions;
using FinanceAppWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using BudgetDTO = FinanceAppWebApi.Models.BudgetDTO;
using AutoMapper;

namespace FinanceAppWebApi.Services
{
    public interface IBudgetService
    {
        Task<List<BudgetDTO>> GetAllBudgets(int userId);
        Task<BudgetDTO> GetBudgetById(int budgetId,int userId);
        Task<List<BudgetDTO>> GetBudgetsByUserId(int userId);
        Task<CreateBudgetDTO> CreateBudget(CreateBudgetDTO budget, int  userId);
        Task<int> DeleteBudget(int id);
    }

    public class BudgetService : IBudgetService
    {
       
        private readonly FinanceAppDbContext _dbContext;
        private readonly IMapper _mapper;

       
        public BudgetService(FinanceAppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<BudgetDTO>> GetAllBudgets(int userId)
        {
            var budgets = await _dbContext.Budgets
                .Where(b => b.UserId == userId)
                .Include(u => u.User)
                .Include(b => b.Expenses)
                    .ThenInclude(e => e.Category)
        
                .ToListAsync() ?? new List<Budget>();

            if (budgets == null || budgets.Count == 0)
                return new List<BudgetDTO>();

            var budgetsDTO = _mapper.Map<List<BudgetDTO>>(budgets);

            return budgetsDTO;
        }

        public async Task<BudgetDTO> GetBudgetById(int budgetId, int userId)
        {
            
            var budget = await _dbContext.Budgets
                            .Where(b => b.Id == budgetId && b.UserId == userId)
                            .Include(u => u.User)
                            .Include(b => b.Expenses)
                            .ThenInclude(e => e.Category)
                            .FirstOrDefaultAsync();
           
            if (budget == null) return new BudgetDTO();
         
            var budgetDTO = _mapper.Map<BudgetDTO>(budget);
            
            return budgetDTO;

        }

        public async Task<List<BudgetDTO>> GetBudgetsByUserId(int userId)
        {

            var budget = await _dbContext.Budgets
                            .Where(b => b.UserId == userId)
                            .Include(u => u.User)
                            .Include(b => b.Expenses)
                            .ThenInclude(e => e.Category)
                            .ToListAsync();

            if (budget == null) return new List<BudgetDTO>();

            var budgetDTO = _mapper.Map<List<BudgetDTO>>(budget);

            return budgetDTO;

        }

        public async Task<CreateBudgetDTO> CreateBudget(CreateBudgetDTO budget, int userId)
        {
          

            var startDate = Convert.ToDateTime(budget.StartDate);
            var endDate = Convert.ToDateTime(budget.EndDate);

            if (endDate < startDate)
            {
                throw new ArgumentException("Data zakończenia musi być późniejsza niż data rozpoczęcia.");
            }
            
            
            var newBudget = new Budget
            {
                Title = budget.Title,
                TotalAmount = budget.TotalAmount,
                StartDate = startDate,
                EndDate = endDate,
                UserId = userId,
            };

            var result = new CreateBudgetDTO
            {
               
                Title = newBudget.Title,
                TotalAmount = newBudget.TotalAmount,
                StartDate = budget.StartDate,
                EndDate = budget.EndDate,
            };

            _dbContext.Budgets.Add(newBudget);
            await _dbContext.SaveChangesAsync();

            return result;
        }

        public async Task<int> DeleteBudget(int id)
        {
            Console.WriteLine(id);
            var budget = await _dbContext.Budgets
                            .Where(b => b.Id == id)
                            .FirstOrDefaultAsync();

            if (budget == null) throw new NotFoundException("Nie znaleziono budżetu");

            _dbContext.Budgets.Remove(budget);
            await _dbContext.SaveChangesAsync();

            return id;
        }
    }
}
