namespace FinanceAppWebApi.Entities
{
    public class Budget
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<Expense> Expenses { get; set; } = new List<Expense>();

    }
}
