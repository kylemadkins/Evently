using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Create
    {
        public class Command : IRequest
        {
            public Event Event { get; set; } = null!;
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Event).SetValidator(new EventValidator());
            }
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
                    _context.Events.Add(request.Event);
                    await _context.SaveChangesAsync();
                }
                return;
            }
        }
    }
}
