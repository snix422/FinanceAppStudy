using FinanceAppWebApi;
using FinanceAppWebApi.Data;
using FinanceAppWebApi.Middleware;
using FinanceAppWebApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NLog.Extensions.Logging;
using NLog.Web;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Logging.AddNLog();
builder.Services.AddLogging();
builder.Services.AddDbContext<FinanceAppDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddAutoMapper(typeof(FinanceMappingProfile).Assembly);
builder.Services.AddScoped<IBudgetService, BudgetService>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<LogginInformationMiddleware>();
builder.Services.AddScoped<ErrorHandlingMiddleware>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy => policy.WithOrigins("http://localhost:3000") // Dodaj URL swojego frontendu
                       .AllowAnyMethod()
        .AllowAnyHeader());
});

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.AddSingleton(jwtSettings);

// Dodanie us³ugi generowania tokenu JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]))
            };
        });

var app = builder.Build();

//app.UseCors("AllowLocalhost");

app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true)
                .AllowCredentials());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<LogginInformationMiddleware>();
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
