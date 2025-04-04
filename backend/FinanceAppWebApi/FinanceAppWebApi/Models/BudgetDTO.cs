namespace FinanceAppWebApi.Models
{
    public class BudgetDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal TotalAmount { get; set; }
    
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string UserEmail { get; set; }
        public string UserFullName { get; set; }

        public List<ExpenseDTO> Expenses { get; set; } = new List<ExpenseDTO>();
        

    }
}
