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

            int role;
            if (registerDto.Email.EndsWith("@admin.com"))
            {
                role = 1; // Jeśli e-mail kończy się na @admin.com, przypisz rolę Admin
            }
            else
            {
                role = 2; // W przeciwnym razie przypisz rolę User
            }

            // Tworzenie nowego użytkownika
            var newUser = new User
            {
                Email = registerDto.Email,
                PasswordHash = hashedPassword,
                FullName = registerDto.Name,
                RoleId = role, // Przypisanie roli użytkownika
                CreatedAt = DateTime.Now,
                Budgets = new List<Budget>()
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO loginUserDTO)
        {
            

           
            // Wyszukanie użytkownika na podstawie e-maila
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == loginUserDTO.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginUserDTO.Password, user.PasswordHash))
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
            // Sprawdzamy, czy konfiguracja zawiera wymagane wartości
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

            // Tworzymy klucz symetryczny do podpisywania tokena
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Tworzymy roszczenia (claims)
            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role.Name.ToString()) // Dodanie roli do tokena
    };

            // Tworzymy token JWT
            var token = new JwtSecurityToken( 
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            // Zwracamy wygenerowany token w formie stringa
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
