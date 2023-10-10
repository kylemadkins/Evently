using Application.Core;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit?>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit?>> Handle(Command request, CancellationToken cancellationToken)
            {
                var evt = await _context.Events.FindAsync(request.Id);
                if (evt == null) return Result<Unit?>.Success(null);
                _context.Remove(evt);
                await _context.SaveChangesAsync();
                return Result<Unit?>.Success(Unit.Value);
            }
        }
    }
}
