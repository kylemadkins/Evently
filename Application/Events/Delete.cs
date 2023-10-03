using MediatR;
using Persistence;

namespace Application.Events
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var evt = await _context.Events.FindAsync(request.Id);
                if (evt != null)
                {
                    _context.Remove(evt);
                }
                await _context.SaveChangesAsync();
            }
        }
    }
}
