using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Update
    {
        public class Command : IRequest
        {
            public Event? Event { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Event != null)
                {
                    var evt = await _context.Events.FindAsync(request.Event.Id);
                    if (evt != null)
                    {
                        evt.Title = request.Event.Title ?? evt.Title;
                    }
                    await _context.SaveChangesAsync();
                }
                return;
            }
        }
    }
}
