namespace FinanceAppWebApi.Entities
{
    public class BudgetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public List<ExpensesDto> Expenses { get; set; }
    }
}
