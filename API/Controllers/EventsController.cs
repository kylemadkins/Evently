using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class EventsController : ApiController
    {
        private readonly DataContext _context;

        public EventsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetEvents")]
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }

        [HttpGet("{id}", Name = "GetEvent")]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            var record = await _context.Events.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }
            return record;
        }
    }
}
