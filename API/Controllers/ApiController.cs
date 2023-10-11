using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()!;

        protected ActionResult<T> HandleResult<T>(Result<T> result)
        {
            if (result.Successful)
            {
                if (result.Value == null) return NotFound();
                return result.Value;
            }
            return BadRequest(result.Error);
        }
    }
}
