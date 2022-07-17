using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if(await UserExists(registerDTO.Username))
                return BadRequest("User name is taken");
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDTO.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };
             
            _context.Users.Add(user);

            await _context.SaveChangesAsync();
            return new UserDTO
            {
                Username=user.UserName,
                Token = _tokenService.CreateToken(user),
            };
        }

        [HttpPost("Login")]
        public  async Task<ActionResult<UserDTO>> Login(Login login)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == login.Username.ToLower());

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for(int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Unautorized password");
            }
            return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}