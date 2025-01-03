using FinanceAppWebApi.DTOs;

namespace FinanceAppWebApi.Entities
{
    public class BudgetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public List<Expense> Expenses { get; set; }
    }
}
