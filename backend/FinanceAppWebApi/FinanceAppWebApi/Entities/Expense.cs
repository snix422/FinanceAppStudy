using System.ComponentModel;

namespace FinanceAppWebApi.Entities
{
    public class Expense
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateTime { get; set; }
        public int BudgetId { get; set; }
        public Budget Budget { get; set; } = null!;
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

    }
}
