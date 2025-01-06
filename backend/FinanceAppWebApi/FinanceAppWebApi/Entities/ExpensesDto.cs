namespace FinanceAppWebApi.Entities
{
    public class ExpensesDto
    {
        public int Id {  get; set; } 
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string CategoryName { get; set; }
    }
}
