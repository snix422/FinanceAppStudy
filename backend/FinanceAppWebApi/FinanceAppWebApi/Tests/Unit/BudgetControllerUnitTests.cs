using FinanceAppWebApi.Controllers;
using FinanceAppWebApi.Entities;
using FinanceAppWebApi.Models;
using FinanceAppWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NLog.Web.LayoutRenderers;
using Xunit;

namespace FinanceAppWebApi.Tests.Unit
{
    public class BudgetControllerUnitTests
    {
        private readonly Mock<ILogger<BudgetController>> _loggerMock;
        private readonly Mock<IBudgetService> _budgetServiceMock;
        private readonly BudgetController _budgetController;

        public BudgetControllerUnitTests()
        {
            _loggerMock = new Mock<ILogger<BudgetController>>();
            _budgetServiceMock = new Mock<IBudgetService>();
            _budgetController = new BudgetController(_loggerMock.Object,_budgetServiceMock.Object);
        }

        [Fact]
        public async Task GetBudgets_ReturnsOkResult_WithListOfBudgets()
        {
            var budgets = new List<BudgetDTO>()
            {
                new BudgetDTO { Id = 1, Title = "Movie 1", TotalAmount=1000},
                new BudgetDTO { Id = 2, Title = "Movie 2", TotalAmount = 12000},
                new BudgetDTO {Id =3 , Title = "Movie 3", TotalAmount = 5000}
            };

            _budgetServiceMock.Setup(service => service.GetAllBudgets(2)).ReturnsAsync(budgets);
            var result = await _budgetController.GetAllBudgets();
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<BudgetDTO>>(result.Value);
            Assert.Equal(3, returnValue.Count());
            Assert.Contains(returnValue, b => b.Title == "Movie 1");
        }

        [Fact]
        public async Task GetBudgetsByUserId_ReturnsOkResult_WithListOfBudgets()
        {
            var budgets = new List<BudgetDTO>()
            {
                new BudgetDTO { Id = 1, Title = "Movie 1", TotalAmount=1000},
                new BudgetDTO { Id = 2, Title = "Movie 2", TotalAmount = 12000},
                new BudgetDTO { Id =3 , Title = "Movie 3", TotalAmount = 5000}
            };

            _budgetServiceMock.Setup(service => service.GetBudgetsByUserId(2)).ReturnsAsync(budgets);
            var result = await _budgetController.GetBudgetByUserId(2);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<BudgetDTO>>(result.Value);
            Assert.Equal(3, returnValue.Count());
            Assert.Equal(1000, returnValue[0].TotalAmount);
            Assert.Contains(returnValue, b => b.Title == "Movie 3");
        }

        [Fact]
        public async Task GetBudgetById_ReturnsOkResult_WithBudget()
        {
            var budget = new BudgetDTO() { Id = 1, Title = "Movie 1", TotalAmount = 1000 };
            _budgetServiceMock.Setup(service => service.GetBudgetById(2,5)).ReturnsAsync(budget);
            var result = await _budgetController.GetBudgetById(2);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<BudgetDTO>(result.Value);
            Assert.Equal("Movie 1", returnValue.Title);
            Assert.Equal(1000, returnValue.TotalAmount);
        }

        [Fact]
        public async Task CreateBudget_ReturnsOkResult()
        {
            var createBudgetDTO = new CreateBudgetDTO() { Title = "Movie 1", TotalAmount= 1000 };
            var budgetResult = new Budget() { Title = "Movie 1" , TotalAmount = 1000 };
            _budgetServiceMock.Setup(service => service.CreateBudget(createBudgetDTO, 2)).ReturnsAsync(budgetResult);
            var result = await _budgetController.CreateBudget(createBudgetDTO);
            var createdResult = Assert.IsType<CreatedResult>(result.Result);
            Assert.Equal(201, createdResult.StatusCode);
            Assert.Equal("Budżet został stworzony pomyślnie", createdResult.Value);
        }

        [Fact]
        public async Task DeleteBudget_ReturnsOkResult()
        {
            _budgetServiceMock.Setup(service => service.DeleteBudget(2)).ReturnsAsync(2);
            var result = await _budgetController.DeleteBudget(2);
            var deletedResult = Assert.IsType<NoContentResult>(result);
            Assert.Equal(204,deletedResult.StatusCode);
        }
    }
}
