using AutoMapper;
using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using FinanceAppWebApi.Exceptions;
using FinanceAppWebApi.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ExpenseDTO = FinanceAppWebApi.Models.ExpenseDTO;

namespace FinanceAppWebApi.Services
{

    public interface IExpenseService
    {
        Task<List<ExpenseDTO>> GetAllExpensesForBudget(int budgetId, int userId);
        Task<CreateExpenseDTO> CreateExpense(int budgetId, int userId, CreateExpenseDTO expenseDTO);
        Task DeleteExpense(int budgetId, int userId, int expenseId);
    }

    public class ExpenseService : IExpenseService
    {
        private readonly FinanceAppDbContext _dbContext;
        private readonly IMapper _mapper;
        public ExpenseService(FinanceAppDbContext dbContext, IMapper mapper) 
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<List<ExpenseDTO>> GetAllExpensesForBudget(int budgetId, int userId)
        {
            var budget = await _dbContext.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == userId);

            if (budget == null) throw new NotFoundException("Nie znaleziono budżetu");

            var expenses = await _dbContext.Expenses
                            .Where(e => e.BudgetId == budgetId)
                            .Include(c => c.Category)
                            .Include(b => b.Budget)
                            .ToListAsync();

            if (expenses == null) return new List<ExpenseDTO>();

            var expensesDTO = _mapper.Map<List<ExpenseDTO>>(expenses);  

            return expensesDTO;
        }

        public async Task<CreateExpenseDTO> CreateExpense(int budgetId, int userId, CreateExpenseDTO expenseDTO) 
        {
            var budget = await _dbContext.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == userId);
            if (budget == null) throw new NotFoundException("Nie znaleziono budżetu");
         
            var category = await _dbContext.Categories
                .FirstOrDefaultAsync(c => c.Title.ToLower() == (expenseDTO.Category).ToLower());

            if (category == null) throw new Exception("Nie znaleziono wybranej kategorii");
           
            var expense = new Expense
            {
                Description = expenseDTO.Description,
                Amount = expenseDTO.Amount,
                DateTime = DateTime.UtcNow,
                BudgetId = budgetId,
                CategoryId = category.Id,
            };

            _dbContext.Expenses.Add(expense);
            await _dbContext.SaveChangesAsync();

            return expenseDTO;
        }

        public async Task DeleteExpense(int budgetId, int userId, int expenseId)
        {
            var budget = await _dbContext.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == userId);
            if (budget == null) throw new NotFoundException("Nie znaleziono budżetu");

            var expense = await _dbContext.Expenses.FirstOrDefaultAsync(e => e.Id == expenseId && e.BudgetId == budgetId);
            if (expense == null) throw new NotFoundException("Nie znaleziono wydatku");

            _dbContext.Expenses.Remove(expense);
            await _dbContext.SaveChangesAsync();
        }
    }
}
