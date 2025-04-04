using FinanceAppWebApi.Data;
using FinanceAppWebApi.DTOs;
using FinanceAppWebApi.Entities;
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

        public AuthController(IAuthService authService)
        {
           
            _authService = authService; 
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO registerDto)
        {
            var registerResult = await _authService.RegisterUser(registerDto);

            return Ok(new { Message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO loginUserDTO)
        {
            var loginResult = await _authService.LoginUser(loginUserDTO);
            return Ok(loginResult);
        }

        [HttpGet("users")]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            var users = await _authService.GetAllUsers();
            return Ok(users);
        }

        
    }
}
