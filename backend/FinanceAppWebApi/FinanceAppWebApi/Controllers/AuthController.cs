using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
using FinanceAppWebApi.Models;
using FinanceAppWebApi.Services;
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

        private readonly IAuthService _authService;
        private readonly IEmailService _emailService;

        public AuthController(IAuthService authService, IEmailService emailService)
        {

            _authService = authService;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO registerDto)
        {
            var registerResult = await _authService.RegisterUser(registerDto);
            var body = $@"
    <html>
    <head>
        <style>
            .container {{
                font-family: Arial, sans-serif;
                padding: 20px;
                border: 1px solid #ccc;
                background-color: #f9f9f9;
            }}
            .title {{
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
            }}
            .content {{
                font-size: 16px;
                color: #333;
            }}
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='title'>Cześć {registerDto.Name}!</div>
            <div class='content'>
                Twoje konto zostało pomyślnie utworzone.<br/>
                Możesz teraz zalogować się przy użyciu swojego adresu email: <strong>{registerDto.Email}</strong>.<br/><br/>
                <em>Nie odpowiadaj na tego maila — został wysłany automatycznie.</em>
            </div>
        </div>
    </body>
    </html>
    ";

            await _emailService.SendEmailAsync(registerDto.Email,body);

            return Ok(new { Message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO loginUserDTO)
        {
            var loginResult = await _authService.LoginUser(loginUserDTO);
            return Ok(loginResult);
        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            var users = await _authService.GetAllUsers();
            return Ok(users);
        }


    }
}
