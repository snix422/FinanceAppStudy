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
        Task<Expense> CreateExpense(int budgetId, int userId, CreateExpenseDTO expenseDTO);
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

            var budgetWithExpenses = await _dbContext.Budgets
                .Where(b => b.Id == budgetId && b.UserId == userId)
                .Include(b => b.Expenses)
                    .ThenInclude(e => e.Category)
                .FirstOrDefaultAsync();

            if (expenses == null) throw new NotFoundException("Nie znaleziono wydatku");

            var expensesDTO = _mapper.Map<List<ExpenseDTO>>(expenses);  

            return expensesDTO;
        }

        public async Task<Expense> CreateExpense(int budgetId, int userId, CreateExpenseDTO expenseDTO) 
        {
            var budget = await _dbContext.Budgets.FirstOrDefaultAsync(b => b.Id == budgetId && b.UserId == userId);
            if (budget == null) throw new NotFoundException("Nie znaleziono budżetu");
         
            var category = await _dbContext.Categories
                .FirstOrDefaultAsync(c => c.Title.ToLower() == (expenseDTO.Category).ToLower());

            if (category == null) throw new NotFoundException("Nie znaleziono wybranej kategorii");
           
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

            return new Expense
            {
                Id = expense.Id,
                Amount = expense.Amount,
                DateTime = expense.DateTime,
                BudgetId = expense.BudgetId,
                CategoryId = category.Id,
            };
        }

        public async Task DeleteExpense(int budgetId, int userId, int expenseId)
        {
            var expense = await _dbContext.Expenses
               .Include(e => e.Budget)
               .FirstOrDefaultAsync(e =>
                    e.Id == expenseId &&
                    e.BudgetId == budgetId &&
                    e.Budget.UserId == userId);

            if (expense == null)
                throw new NotFoundException("Nie znaleziono wydatku lub budżetu");

            _dbContext.Expenses.Remove(expense);
            await _dbContext.SaveChangesAsync();
        }
    }
}
