using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using FinanceAppWebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FinanceAppWebApi.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUser(RegisterUserDTO registerUserDTO);
        Task<LoginResponseDTO> LoginUser(LoginUserDTO loginUserDTO);
        Task<List<User>> GetAllUsers();    
    }

    

    public class AuthService : IAuthService
    {
        private readonly FinanceAppDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public AuthService(FinanceAppDbContext dbContext, IConfiguration configuration) 
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<bool> RegisterUser(RegisterUserDTO registerUserDTO) 
        {
            if (await _dbContext.Users.AnyAsync(u => u.Email == registerUserDTO.Email))
            {
                throw new Exception("E-mail jest już zajęty");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerUserDTO.Password);

            int role;
            if (registerUserDTO.Email.EndsWith("@admin.com"))
            {
                role = 1; 
            }
            else
            {
                role = 2; 
            }

            var newUser = new User
            {
                Email = registerUserDTO.Email,
                PasswordHash = hashedPassword,
                FullName = registerUserDTO.Name,
                RoleId = role,
                CreatedAt = DateTime.Now,
                Budgets = new List<Budget>()
            };

            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();

            return true;

        }

        public async Task<LoginResponseDTO> LoginUser(LoginUserDTO loginUserDTO)
        {
            var user = await _dbContext.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == loginUserDTO.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginUserDTO.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            
            var token = GenerateJwtToken(user);

            var loginResponse = new LoginResponseDTO
            {
                Token = token,
                userRole = user.Role.Name,
                userFullName = user.FullName,
            };

            return loginResponse;

        }

        public async Task<List<User>> GetAllUsers()
        {
            var users = await _dbContext.Users.ToListAsync();
            return users;
        }




        private string GenerateJwtToken(User user)
        {

            var secretKey = _configuration["JwtSettings:SecretKey"];
            var issuer = _configuration["JwtSettings:Issuer"];
            var audience = _configuration["JwtSettings:Audience"];

            if (string.IsNullOrEmpty(secretKey))
            {
                throw new ArgumentNullException("Jwt:Secret", "Secret key for JWT is not configured.");
            }

            if (string.IsNullOrEmpty(issuer))
            {
                throw new ArgumentNullException("Jwt:Issuer", "Issuer for JWT is not configured.");
            }

            if (string.IsNullOrEmpty(audience))
            {
                throw new ArgumentNullException("Jwt:Audience", "Audience for JWT is not configured.");
            }


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role.Name.ToString())
    };


            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
