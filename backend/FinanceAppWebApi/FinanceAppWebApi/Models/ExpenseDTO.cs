namespace FinanceAppWebApi.Models
{
    public class ExpenseDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int BudgetId { get; set; }
        public string BudgetTitle { get; set; }



    }
}
