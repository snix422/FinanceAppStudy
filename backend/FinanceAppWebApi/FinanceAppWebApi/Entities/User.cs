namespace FinanceAppWebApi.Entities
{
    public enum UserRole
    {
        Admin,
        User
    }
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public UserRole Role { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<Budget> Budgets { get; set; }

    }
}
