using System.ComponentModel.DataAnnotations;

namespace FinanceAppWebApi.Models
{
    public class CreateBudgetDTO
    {
        [Required(ErrorMessage = "Tytuł jest wymagany")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Kwota budżetu jest wymagana")]
        [Range(0.01,double.MaxValue, ErrorMessage = "Kwota budżetu musi być większa niż 0")]
        public decimal TotalAmount { get; set; }
        [Required(ErrorMessage = "Data początku budżetu jest wymagana")]
        public DateOnly StartDate { get; set; }
        [Required(ErrorMessage = "Data końca budżetu jest wymagana")]
        public DateOnly EndDate { get; set; }

    }
}
