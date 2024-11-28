using FinanceAppWebApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinanceAppWebApi.Data
{
    public class FinanceAppDbContext : DbContext
    {
        public FinanceAppDbContext(DbContextOptions<FinanceAppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Budgets)
                .WithOne(b => b.User)
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<Budget>()
                .HasMany(b => b.Expenses)
                .WithOne(e => e.Budget)
                .HasForeignKey(e => e.BudgetId);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Category)
                .WithMany(c => c.Expenses)
                .HasForeignKey(e => e.CategoryId);
        }
    }
}
