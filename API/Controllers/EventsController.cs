using Application.Events;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : ApiController
    {
        [HttpGet(Name = "GetEvents")]
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}", Name = "GetEvent")]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost(Name = "CreateEvent")]
        public async Task<ActionResult<Unit>> CreateEvent(Event evt)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = evt }));
        }

        [HttpPut("{id}", Name = "UpdateEvent")]
        public async Task<ActionResult<Unit?>> UpdateEvent(Guid id, Event evt)
        {
            evt.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Event = evt }));
        }

        [HttpDelete("{id}", Name = "DeleteEvent")]
        public async Task<ActionResult<Unit?>> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
