using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FinanceAppWebApi.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly FinanceAppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(FinanceAppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO registerDto)
        {
            // Sprawdzenie, czy użytkownik z danym e-mailem już istnieje
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return BadRequest(new { Message = "User with this email already exists." });
            }

            // Haszowanie hasła
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            UserRole role;
            if (registerDto.Email.EndsWith("@admin.com"))
            {
                role = UserRole.Admin; // Jeśli e-mail kończy się na @admin.com, przypisz rolę Admin
            }
            else
            {
                role = UserRole.User; // W przeciwnym razie przypisz rolę User
            }

            // Tworzenie nowego użytkownika
            var newUser = new User
            {
                Email = registerDto.Email,
                PasswordHash = hashedPassword,
                FullName = registerDto.Name,
                Role = role // Przypisanie roli użytkownika
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO loginDto)
        {
            // Wyszukanie użytkownika na podstawie e-maila
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                return Unauthorized(new { Message = "Invalid email or password." });
            }

            // Generowanie tokena JWT
            var token = GenerateJwtToken(user);

            return Ok(new
            {
                Token = token,
                Role = user.Role,
                Name = user.FullName
            });
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString()) // Dodanie roli do tokena
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
