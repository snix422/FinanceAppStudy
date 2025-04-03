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
        Task<Budget> CreateBudget(CreateBudgetDTO budget, int  userId);
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
              .Include(b => b.Expenses)
                .ThenInclude(e => e.Category)
                .ToListAsync();

            if (!budgets.Any()) throw new NotFoundException("Nie znaleziono budżetów");

            var budgetsDTO = _mapper.Map<List<BudgetDTO>>(budgets);

            return budgetsDTO;
        }

        public async Task<BudgetDTO> GetBudgetById(int budgetId, int userId)
        {
            var budget = await _dbContext.Budgets
                            .Where(b => b.Id == budgetId && b.UserId == userId)
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

            if (budget == null) throw new NotFoundException("Nie znaleziono wybranego budżetu");

            var budgetDTO = _mapper.Map<BudgetDTO>(budget);

            return budgetDTO;

        }

        public async Task<Budget> CreateBudget(CreateBudgetDTO budget, int userId)
        {
            if (budget.EndDate < budget.StartDate)
            {
                throw new ArgumentException("Data zakończenia musi być późniejsza niż data rozpoczęcia.");
            }

            var newBudget = new Budget
            {
                Title = budget.Title,
                TotalAmount = budget.TotalAmount,
                StartDate = budget.StartDate,
                EndDate = budget.EndDate,
                UserId = userId,
            };

            _dbContext.Budgets.Add(newBudget);
            await _dbContext.SaveChangesAsync();

            return newBudget;
        }

        public async Task<int> DeleteBudget(int id)
        {
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
