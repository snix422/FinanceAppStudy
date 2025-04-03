using AutoMapper;
using FinanceAppWebApi.Entities;
using FinanceAppWebApi.Models;

namespace FinanceAppWebApi
{
    public class FinanceMappingProfile : Profile
    {
        public FinanceMappingProfile() 
        {
            CreateMap<Budget, BudgetDTO>()
                .ForMember(b => b.UserEmail, c => c.MapFrom(s => s.User.Email))
                .ForMember(b => b.UserFullName, c => c.MapFrom(s => s.User.FullName));

            CreateMap<Expense, ExpenseDTO>()
                .ForMember(e => e.CategoryId, c => c.MapFrom(s => s.Category.Id))
                .ForMember(e => e.CategoryName, c => c.MapFrom(s => s.Category.Title))
                .ForMember(e => e.BudgetId, c => c.MapFrom(s => s.Budget.Id))
                .ForMember(e => e.BudgetTitle, c => c.MapFrom(s => s.Budget.Title));

            CreateMap<User,UserDTO>()
                .ForMember(e => e.RoleName, c => c.MapFrom(s => s.Role.Name));
            
        }
    }
}
