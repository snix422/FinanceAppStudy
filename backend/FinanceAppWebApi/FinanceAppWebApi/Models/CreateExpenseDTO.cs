namespace FinanceAppWebApi.Models
{
    public class CreateExpenseDTO
    {
        public string Description { get; set; }
        public decimal Amount { get; set; } 
        public string CategoryName { get; set; }
    }
}
