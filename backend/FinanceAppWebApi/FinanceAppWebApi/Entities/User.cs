namespace FinanceAppWebApi.Entities
{
    
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }

        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<Budget> Budgets { get; set; }

    }
}
