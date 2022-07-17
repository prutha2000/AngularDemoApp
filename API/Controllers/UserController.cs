using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Authentication;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        public readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context; 
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
       {
            var users = _context.Users.ToListAsync();
            return await users;
        }

        // api
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id); 
        }
    }
}
