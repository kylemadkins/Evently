using Application.Events;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : ApiController
    {
        private readonly IMediator _mediator;

        public EventsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet(Name = "GetEvents")]
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}", Name = "GetEvent")]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            return Ok();
        }
    }
}
