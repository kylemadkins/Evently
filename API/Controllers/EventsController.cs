using Application.Events;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : ApiController
    {
        [HttpGet(Name = "GetEvents")]
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}", Name = "GetEvent")]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            var evt = await Mediator.Send(new Details.Query { Id = id });
            if (evt == null)
            {
                return NotFound();
            }
            return evt;
        }
    }
}
