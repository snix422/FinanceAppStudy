namespace FinanceAppWebApi.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public ICollection<Expense> Expenses { get; set; } = new List<Expense>();
    }
}
