using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class FinanceMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Categories",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Budgets",
                newName: "Title");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Categories",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Budgets",
                newName: "Name");
        }
    }
}
