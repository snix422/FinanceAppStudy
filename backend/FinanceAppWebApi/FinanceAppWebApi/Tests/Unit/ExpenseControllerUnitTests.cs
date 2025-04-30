using FinanceAppWebApi.Controllers;
using FinanceAppWebApi.Services;
using Moq;

namespace FinanceAppWebApi.Tests.Unit
{
    public class ExpenseControllerUnitTests
    {
        private readonly Mock<ILogger<ExpenseController>> _logger;
        private readonly Mock<IExpenseService> _expenseService;
        private readonly ExpenseController _expenseController;

        public ExpenseControllerUnitTests()
        {
            _logger = new Mock<ILogger<ExpenseController>>();
            _expenseService = new Mock<IExpenseService>();
            _expenseController = new ExpenseController(_expenseService.Object);
        }
    }
}
