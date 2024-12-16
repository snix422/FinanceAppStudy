namespace FinanceAppWebApi.DTOs
{
    public class BudgetDTO
    {
        public string Title { get; set; } = string.Empty;
        public string TotalAmount { get; set; }
        public string StartDate { get; set; } = string.Empty; 
        public string EndDate { get; set; } = string.Empty;
    }
}
