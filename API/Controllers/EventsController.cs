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

        [HttpPost(Name = "CreateEvent")]
        public async Task<IActionResult> CreateEvent(Event evt)
        {
            await Mediator.Send(new Create.Command { Event = evt });
            return Ok();
        }

        [HttpPut("{id}", Name = "UpdateEvent")]
        public async Task<IActionResult> UpdateEvent(Guid id, Event evt)
        {
            evt.Id = id;
            await Mediator.Send(new Update.Command { Event = evt });
            return Ok();
        }

        [HttpDelete("{id}", Name = "DeleteEvent")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}
