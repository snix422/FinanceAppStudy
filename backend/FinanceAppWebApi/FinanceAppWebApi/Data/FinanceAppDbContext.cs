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
        public DbSet<Role> Roles { get; set; }

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

            modelBuilder.Entity<Role>().HasData(
            new Role { Id = 1, Name = "Admin" },
            new Role { Id = 2, Name = "User" }
        );

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Title="Kredyt"},
                new Category { Id = 2, Title="Rachunki"},
                new Category { Id = 3, Title = "Zakupy"},
                new Category { Id = 4, Title = "Paliwo"}
                );
        }
    }
}
